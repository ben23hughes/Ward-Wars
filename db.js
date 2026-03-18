require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

module.exports = {
  async createUser(username, hash) {
    const { data, error } = await supabase
      .from('users')
      .insert({ username, password_hash: hash })
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data;
  },

  async getUserByUsername(username) {
    const { data } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .single();
    return data;
  },

  async getUserById(id) {
    const { data } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();
    return data;
  },

  async createSession(token, userId) {
    const { error } = await supabase
      .from('sessions')
      .insert({ token, user_id: userId });
    if (error) throw new Error(error.message);
  },

  async getSession(token) {
    const { data } = await supabase
      .from('sessions')
      .select('*')
      .eq('token', token)
      .single();
    return data;
  },

  async deleteSession(token) {
    await supabase.from('sessions').delete().eq('token', token);
  },

  async recordGame(p1Id, p2Id, winnerId, p1Crowns, p2Crowns) {
    await supabase.from('games').insert({
      player1_id: p1Id,
      player2_id: p2Id,
      winner_id: winnerId,
      p1_crowns: p1Crowns,
      p2_crowns: p2Crowns,
    });
    if (winnerId === p1Id) {
      await supabase.rpc('increment_wins', { uid: p1Id });
      await supabase.rpc('increment_losses', { uid: p2Id });
    } else {
      await supabase.rpc('increment_wins', { uid: p2Id });
      await supabase.rpc('increment_losses', { uid: p1Id });
    }
  },

  async updateTrophies(userId, delta) {
    await supabase.rpc('update_trophies', { uid: userId, delta });
  },

  // ── Cards ────────────────────────────────────────────────────────────────
  async initUserCards(userId) {
    const DEFAULT_DECK = ['missionary', 'scriptures', 'moroni', 'nauvoo'];
    const ALL_IDS = [
      'missionary','scriptures','moroni','nauvoo','prophet','ctrKid','jello','beehive',
      'holyGhost','striplingWarrior','captainMoroni','liahona','brotherOfJared','ammon',
      'threeNephites','seersStone','samuelLamanite','titleOfLiberty','teancum','antiNephiLehi',
      'josephSmith','destroyingAngel',
    ];
    const rows = ALL_IDS.map(id => ({
      user_id: userId,
      card_id: id,
      uses: 0,
      in_deck: DEFAULT_DECK.includes(id),
    }));
    await supabase.from('user_cards').insert(rows);
  },

  async backfillUserCards(userId, existingCards) {
    const ALL_IDS = [
      'missionary','scriptures','moroni','nauvoo','prophet','ctrKid','jello','beehive',
      'holyGhost','striplingWarrior','captainMoroni','liahona','brotherOfJared','ammon',
      'threeNephites','seersStone','samuelLamanite','titleOfLiberty','teancum','antiNephiLehi',
      'josephSmith','destroyingAngel',
    ];
    const have = new Set(existingCards.map(r => r.card_id));
    const missing = ALL_IDS.filter(id => !have.has(id));
    if (!missing.length) return;
    const rows = missing.map(id => ({ user_id: userId, card_id: id, uses: 0, in_deck: false }));
    await supabase.from('user_cards').insert(rows);
  },

  async getUserCards(userId) {
    const { data } = await supabase
      .from('user_cards')
      .select('*')
      .eq('user_id', userId);
    return data || [];
  },

  async updateDeck(userId, cardIds) {
    await supabase.from('user_cards').update({ in_deck: false }).eq('user_id', userId);
    for (const cardId of cardIds) {
      await supabase.from('user_cards').update({ in_deck: true })
        .eq('user_id', userId).eq('card_id', cardId);
    }
  },

  // ── Chests ───────────────────────────────────────────────────────────────────
  async addChest(userId, type) {
    const { data, error } = await supabase
      .from('chests').insert({ user_id: userId, type }).select().single();
    if (error) throw new Error(error.message);
    return data;
  },

  async getPendingChests(userId) {
    const { data } = await supabase
      .from('chests').select('*').eq('user_id', userId).order('created_at');
    return data || [];
  },

  async _awardChestRewards(userId, type) {
    const { data: cards } = await supabase
      .from('user_cards').select('card_id').eq('user_id', userId);
    const cardIds = (cards || []).map(c => c.card_id);
    const CONFIGS = {
      wood:    { count: 1, min: 1, max: 1 },
      silver:  { count: 2, min: 1, max: 2 },
      gold:    { count: 3, min: 2, max: 3 },
      magical: { count: 4, min: 4, max: 8 },
    };
    const cfg = CONFIGS[type] || CONFIGS.wood;
    const shuffled = [...cardIds].sort(() => Math.random() - 0.5);
    const picked = shuffled.slice(0, Math.min(cfg.count, cardIds.length));
    const rewards = [];
    for (const cardId of picked) {
      const amount = cfg.min + Math.floor(Math.random() * (cfg.max - cfg.min + 1));
      await supabase.rpc('add_card_copies', { uid: userId, cid: cardId, amount });
      rewards.push({ cardId, amount });
    }
    return rewards;
  },

  async openChest(userId, chestId) {
    const { data: chest } = await supabase
      .from('chests').select('*').eq('id', chestId).eq('user_id', userId).single();
    if (!chest) throw new Error('Chest not found');
    const rewards = await this._awardChestRewards(userId, chest.type);
    await supabase.from('chests').delete().eq('id', chestId);
    return { type: chest.type, rewards };
  },

  async openInstantChest(userId, type) {
    const rewards = await this._awardChestRewards(userId, type);
    return { type, rewards };
  },

  async claimDailyChest(userId) {
    const today = new Date().toISOString().slice(0, 10);
    const { data: user } = await supabase
      .from('users').select('last_daily').eq('id', userId).single();
    if (user?.last_daily === today) throw new Error('Already claimed today');
    await supabase.from('users').update({ last_daily: today }).eq('id', userId);
    return this._awardChestRewards(userId, 'gold');
  },

  async deductGold(userId, amount) {
    const { data: user } = await supabase
      .from('users').select('gold').eq('id', userId).single();
    if (!user || user.gold < amount) throw new Error('Not enough gold');
    await supabase.from('users').update({ gold: user.gold - amount }).eq('id', userId);
  },

  async deductGems(userId, amount) {
    const { data: user } = await supabase
      .from('users').select('gems').eq('id', userId).single();
    if (!user || user.gems < amount) throw new Error('Not enough gems');
    await supabase.from('users').update({ gems: user.gems - amount }).eq('id', userId);
  },

  // ── Friends ───────────────────────────────────────────────────────────────
  async searchUsers(query, currentUserId) {
    const { data } = await supabase
      .from('users')
      .select('id, username, trophies')
      .ilike('username', `%${query}%`)
      .neq('id', currentUserId)
      .limit(10);
    return data || [];
  },

  async sendFriendRequest(requesterId, receiverId) {
    const { error } = await supabase
      .from('friends')
      .insert({ requester_id: requesterId, receiver_id: receiverId, status: 'pending' });
    if (error) throw new Error(error.message);
  },

  async acceptFriendRequest(requesterId, receiverId) {
    const { error } = await supabase
      .from('friends')
      .update({ status: 'accepted' })
      .eq('requester_id', requesterId)
      .eq('receiver_id', receiverId);
    if (error) throw new Error(error.message);
  },

  async removeFriend(userId, otherId) {
    await supabase.from('friends').delete()
      .or(`and(requester_id.eq.${userId},receiver_id.eq.${otherId}),and(requester_id.eq.${otherId},receiver_id.eq.${userId})`);
  },

  async getFriends(userId) {
    const { data: rows } = await supabase
      .from('friends')
      .select('requester_id, receiver_id')
      .eq('status', 'accepted')
      .or(`requester_id.eq.${userId},receiver_id.eq.${userId}`);
    if (!rows || !rows.length) return [];
    const friendIds = rows.map(r => r.requester_id === userId ? r.receiver_id : r.requester_id);
    const { data: users } = await supabase
      .from('users')
      .select('id, username, trophies')
      .in('id', friendIds);
    return users || [];
  },

  async getPendingRequests(userId) {
    const { data: rows } = await supabase
      .from('friends')
      .select('requester_id')
      .eq('receiver_id', userId)
      .eq('status', 'pending');
    if (!rows || !rows.length) return [];
    const requesterIds = rows.map(r => r.requester_id);
    const { data: users } = await supabase
      .from('users')
      .select('id, username, trophies')
      .in('id', requesterIds);
    return users || [];
  },

  async getFriendStatus(userId, otherId) {
    const { data } = await supabase
      .from('friends')
      .select('status, requester_id')
      .or(`and(requester_id.eq.${userId},receiver_id.eq.${otherId}),and(requester_id.eq.${otherId},receiver_id.eq.${userId})`)
      .single();
    return data || null;
  },
};
