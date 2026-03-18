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
    const ALL_IDS = ['missionary','scriptures','moroni','nauvoo','prophet','ctrKid','jello','beehive'];
    const rows = ALL_IDS.map(id => ({
      user_id: userId,
      card_id: id,
      uses: 0,
      in_deck: DEFAULT_DECK.includes(id),
    }));
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

  async incrementCardUses(userId, cardIds) {
    for (const cardId of [...new Set(cardIds)]) {
      await supabase.rpc('increment_card_uses', { uid: userId, cid: cardId });
    }
  },
};
