// ══════════════════════════
//  MULTIPLAYER
// ══════════════════════════
const MULTIPLAYER = new URLSearchParams(window.location.search).get('mode') === 'multi';
let mpWs = null;
let mpReady = false;

if (MULTIPLAYER) {
  const token = localStorage.getItem('cc_token');
  if (!token) { window.location.href = 'login.html'; }

  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('overlay-title').textContent = '⚔️ Finding Opponent…';
    document.getElementById('overlay-msg').textContent = 'Searching for a worthy adversary…\n\nYou will be matched with another player automatically.';
    document.getElementById('start-btn').style.display = 'none';
  });

  const wsProto = location.protocol === 'https:' ? 'wss' : 'ws';
  mpWs = new WebSocket(`${wsProto}://${location.host}`);

  mpWs.onopen = () => mpWs.send(JSON.stringify({ type: 'auth', token }));

  mpWs.onmessage = (event) => {
    const msg = JSON.parse(event.data);

    if (msg.type === 'auth_ok') {
      mpWs.send(JSON.stringify({ type: 'queue' }));
    }
    else if (msg.type === 'auth_fail') {
      localStorage.removeItem('cc_token');
      window.location.href = 'login.html';
    }
    else if (msg.type === 'queued') {
      const el = document.getElementById('overlay-msg');
      if (el) el.textContent = 'In queue… waiting for an opponent.\n\nHave another player open this page to be matched instantly!';
    }
    else if (msg.type === 'matched') {
      mpReady = true;
      const titleEl = document.getElementById('overlay-title');
      const msgEl   = document.getElementById('overlay-msg');
      const btn      = document.getElementById('start-btn');
      if (titleEl) titleEl.textContent = '⚔️ Opponent Found!';
      if (msgEl) msgEl.textContent =
        `You face: ${msg.opponentName}\n\nDeploy faithful troops on YOUR half!\n\n🧑‍⚕️ Missionary — Converts on death\n📖 Scriptures — Freezes target\n👼 Angel Moroni — Heals allies\n🏔️ Nauvoo Guard — AOE charge\n🧓 Prophet — Shields allies\n🧒 CTR Kid — Spawns 3 at once\n🍑 Jello — Splash damage\n🐝 Beehive — Bee swarm\n\n⛪ Chapel = 1 crown  |  🕍 Temple = Victory`;
      if (btn) { btn.style.display = ''; }
    }
    else if (msg.type === 'opp_play') {
      receiveOpponentPlay(msg.cardId, msg.pct_x, msg.pct_y);
    }
    else if (msg.type === 'opp_left') {
      if (!gameOver) endGame(true, 'Opponent fled the battlefield!');
    }
    else if (msg.type === 'result') {
      const delta = msg.trophyDelta >= 0 ? '+' + msg.trophyDelta : String(msg.trophyDelta);
      const msgEl = document.getElementById('overlay-msg');
      if (msgEl) msgEl.textContent += '\n\nTrophies: ' + delta;
    }
  };

  mpWs.onerror = () => {
    const el = document.getElementById('overlay-title');
    if (el) el.textContent = '⚠️ Connection Error';
    const msg = document.getElementById('overlay-msg');
    if (msg) msg.textContent = 'Could not connect to server. Make sure the server is running.';
  };
}

function receiveOpponentPlay(cardId, pct_x, pct_y) {
  if (!gameStarted || gameOver) return;
  const cardIdx = CARDS.findIndex(c => c.id === cardId);
  if (cardIdx < 0) return;
  const card = CARDS[cardIdx];
  enemyElixir = Math.max(0, enemyElixir - card.cost);
  updateEnemyElixirUI();
  const aw = arenaW(), ah = arenaH();
  // Mirror vertically: opponent's bottom half is our top half
  const x = pct_x * aw;
  const y = (1 - pct_y) * ah;
  spawnTroop(cardIdx, x, y, 'enemy');
}

// buildTroopHTML is defined in sprites.js (loaded before this file)

// ══════════════════════════
//  CARD DEFINITIONS
// ══════════════════════════
const CARDS = [
  {id:'missionary', name:'Missionary',   emoji:'🧑‍⚕️',cost:3,hp:240,atk:75, spd:1.0, isRange:false,ability:'missionary', abilityTxt:'Converts on death'},
  {id:'scriptures', name:'Scriptures',   emoji:'📖',  cost:2,hp:140,atk:50, spd:1.3, isRange:true, ability:'scriptures', abilityTxt:'Freezes target'},
  {id:'moroni',     name:'Angel Moroni', emoji:'👼',  cost:5,hp:380,atk:120,spd:0.85,isRange:true, ability:'moroni',     abilityTxt:'Heals all allies'},
  {id:'nauvoo',     name:'Nauvoo Guard', emoji:'🏔️', cost:4,hp:320,atk:90, spd:1.0, isRange:false,ability:'nauvoo',     abilityTxt:'AOE charge'},
  {id:'prophet',    name:'Prophet',      emoji:'🧓',  cost:5,hp:550,atk:55, spd:0.65,isRange:false,ability:'prophet',    abilityTxt:'Shields all allies'},
  {id:'ctrKid',     name:'CTR Kid',      emoji:'🧒',  cost:3,hp:100,atk:60, spd:1.5, isRange:false,ability:'ctrKid',     abilityTxt:'Spawns 3 at once'},
  {id:'jello',      name:'Jello',        emoji:'🍑',  cost:3,hp:160,atk:100,spd:0.9, isRange:true, ability:'jello',      abilityTxt:'Splash damage'},
  {id:'beehive',    name:'Beehive',      emoji:'🐝',  cost:4,hp:420,atk:45, spd:0.75,isRange:false,ability:'beehive',    abilityTxt:'Sends bee swarm'},
  {id:'apostate',   name:'Apostate',     emoji:'😤',  cost:3,hp:220,atk:70, spd:1.0, isRange:false,ability:'apostate',   abilityTxt:'Curses on death'},
  {id:'temptation', name:'Temptation',   emoji:'🍎',  cost:2,hp:130,atk:45, spd:1.35,isRange:true, ability:'temptation', abilityTxt:'Slows target'},
  {id:'deceiver',   name:'Deceiver',     emoji:'🐍',  cost:5,hp:380,atk:115,spd:0.9, isRange:true, ability:'deceiver',   abilityTxt:'Goes invisible'},
  {id:'antiChrist', name:'Anti-Christ',  emoji:'😈',  cost:4,hp:300,atk:95, spd:1.0, isRange:true, ability:'antiChrist', abilityTxt:'AOE on spawn'},
  {id:'korihor',    name:'Korihor',      emoji:'🤵',  cost:5,hp:500,atk:60, spd:0.7, isRange:false,ability:'korihor',    abilityTxt:'Weakens nearby foes'},
  {id:'laman',      name:'Laman',        emoji:'😠',  cost:2,hp:110,atk:55, spd:1.4, isRange:false,ability:'laman',      abilityTxt:'Splits on death'},
  {id:'gadianton',  name:'Gadianton',    emoji:'🗡️', cost:3,hp:180,atk:110,spd:0.95,isRange:true, ability:'gadianton',  abilityTxt:'Always hits towers'},
  {id:'nehor',      name:'Nehor',        emoji:'💰',  cost:4,hp:440,atk:50, spd:0.8, isRange:false,ability:'nehor',      abilityTxt:'Taunts enemies',           unlockArena:1},
  // ── Arena 2 unlocks ──
  {id:'holyGhost',        name:'Holy Ghost',        emoji:'🕊️', cost:3,hp:180,atk:55, spd:1.4, isRange:true, ability:'holyGhost',       abilityTxt:'Goes invisible briefly', unlockArena:2},
  {id:'striplingWarrior', name:'Stripling Warrior',  emoji:'⚔️', cost:2,hp:160,atk:70, spd:1.3, isRange:false,ability:'striplingWarrior', abilityTxt:'Revives once on death',  unlockArena:2},
  // ── Arena 3 unlocks ──
  {id:'captainMoroni',    name:'Captain Moroni',     emoji:'🚩', cost:5,hp:500,atk:100,spd:0.8, isRange:false,ability:'captainMoroni',    abilityTxt:'Buffs all allies',       unlockArena:3},
  {id:'liahona',          name:'Liahona',            emoji:'🧭', cost:3,hp:120,atk:40, spd:1.2, isRange:true, ability:'liahona',          abilityTxt:'Speeds up allies',       unlockArena:3},
  // ── Arena 4 unlocks ──
  {id:'brotherOfJared',   name:'Brother of Jared',   emoji:'💎', cost:4,hp:300,atk:80, spd:0.9, isRange:true, ability:'brotherOfJared',   abilityTxt:'Blinds enemies',         unlockArena:4},
  {id:'ammon',            name:'Ammon',              emoji:'🗡️',cost:4,hp:280,atk:130,spd:1.1, isRange:false,ability:'ammon',            abilityTxt:'Stuns on hit',           unlockArena:4},
  // ── Arena 5 unlocks ──
  {id:'threeNephites',    name:'Three Nephites',     emoji:'👥', cost:4,hp:150,atk:65, spd:1.2, isRange:false,ability:'threeNephites',    abilityTxt:'Respawns once',          unlockArena:5},
  {id:'seersStone',       name:"Seer's Stone",       emoji:'🔮', cost:2,hp:100,atk:35, spd:1.5, isRange:true, ability:'seersStone',       abilityTxt:'Reveals invisible',      unlockArena:5},
  // ── Arena 6 unlocks ──
  {id:'samuelLamanite',   name:'Samuel the Lamanite',emoji:'🏹', cost:3,hp:200,atk:85, spd:0.95,isRange:true, ability:'samuelLamanite',   abilityTxt:'Immune to first hit',    unlockArena:6},
  {id:'titleOfLiberty',   name:'Title of Liberty',   emoji:'🏴', cost:4,hp:350,atk:75, spd:0.85,isRange:false,ability:'titleOfLiberty',   abilityTxt:'Rallies nearby allies',  unlockArena:6},
  // ── Arena 7 unlocks ──
  {id:'teancum',          name:'Teancum',            emoji:'🎯', cost:3,hp:180,atk:150,spd:1.1, isRange:true, ability:'teancum',          abilityTxt:'Targets towers',         unlockArena:7},
  {id:'antiNephiLehi',    name:'Anti-Nephi-Lehi',    emoji:'🕊️',cost:3,hp:450,atk:0,  spd:0.7, isRange:false,ability:'antiNephiLehi',    abilityTxt:'Reflects damage',        unlockArena:7},
  // ── Arena 8 unlocks ──
  {id:'josephSmith',      name:'Joseph Smith',        emoji:'📜', cost:6,hp:600,atk:90, spd:0.6, isRange:true, ability:'josephSmith',      abilityTxt:'Summons extras on spawn',unlockArena:8},
  {id:'destroyingAngel',  name:'Destroying Angel',   emoji:'⚡', cost:5,hp:250,atk:200,spd:1.0, isRange:true, ability:'destroyingAngel',  abilityTxt:'Huge AoE strike',        unlockArena:8},
  // ── Enemy arena 2 ──
  {id:'rameumptom',       name:'Rameumptom',         emoji:'🏛️',cost:4,hp:400,atk:70, spd:0.8, isRange:false,ability:'rameumptom',       abilityTxt:'Taunts all enemies',     unlockArena:2},
  // ── Enemy arena 3 ──
  {id:'sherem',           name:'Sherem',             emoji:'🧑‍💼',cost:3,hp:200,atk:80,spd:1.1, isRange:true, ability:'sherem',           abilityTxt:'Debuffs target',         unlockArena:3},
  // ── Enemy arena 4 ──
  {id:'secretCombination',name:'Secret Combination', emoji:'🤫', cost:3,hp:150,atk:60, spd:1.3, isRange:false,ability:'secretCombination',abilityTxt:'Spawns hidden units',     unlockArena:4},
  // ── Enemy arena 5 ──
  {id:'kishkumen',        name:'Kishkumen',          emoji:'🥷', cost:3,hp:200,atk:130,spd:1.2, isRange:false,ability:'kishkumen',        abilityTxt:'Goes invisible',         unlockArena:5},
  // ── Enemy arena 6 ──
  {id:'amlici',           name:'Amlici',             emoji:'👑', cost:5,hp:450,atk:85, spd:0.85,isRange:false,ability:'amlici',           abilityTxt:'Buffs nearby enemies',   unlockArena:6},
  // ── Enemy arena 7 ──
  {id:'morianton',        name:'Morianton',          emoji:'🪓', cost:3,hp:230,atk:95, spd:1.0, isRange:false,ability:'morianton',        abilityTxt:'Flees when low HP',      unlockArena:7},
  // ── Enemy arena 8 ──
  {id:'zerahemnah',       name:'Zerahemnah',         emoji:'💀', cost:5,hp:550,atk:110,spd:0.9, isRange:false,ability:'zerahemnah',       abilityTxt:'Gains power from fallen',unlockArena:8},
];
const PLAYER_POOL=[0,1,2,3,4,5,6,7,16,17,18,19,20,21,22,23,24,25,26,27,28,29];
const ENEMY_POOL =[8,9,10,11,12,13,14,15,30,31,32,33,34,35,36];
const TOWER_DEF={
  'p-left': {side:'player',hp:600, maxHp:600, atk:80, rateMs:1400},
  'p-right':{side:'player',hp:600, maxHp:600, atk:80, rateMs:1400},
  'p-king': {side:'player',hp:1200,maxHp:1200,atk:100,rateMs:1800,isKing:true},
  'e-left': {side:'enemy', hp:600, maxHp:600, atk:80, rateMs:1400},
  'e-right':{side:'enemy', hp:600, maxHp:600, atk:80, rateMs:1400},
  'e-king': {side:'enemy', hp:1200,maxHp:1200,atk:100,rateMs:1800,isKing:true},
};

// ══════════════════════════
//  STATE
// ══════════════════════════
let elixir=5,enemyElixir=5;
let selectedCard=null,hand=[0,1,2,3],nextCard=0;
let troops=[],projectiles=[],towers={};
let playerCrowns=0,enemyCrowns=0,gameTime=180;
let gameOver=false,gameStarted=false;
let animFrame,lastTick=0,troopId=0,projId=0,intervals=[];
const playedCardIds = new Set(); // tracks cards used this game

// ── Load user card levels from localStorage ──
const _ccCards = JSON.parse(localStorage.getItem('cc_cards') || '[]');
const _userCardMap = {};
_ccCards.forEach(r => { _userCardMap[r.card_id] = r; });
function _cardLevel(cardId) {
  const copies = _userCardMap[cardId]?.copies || 0;
  if (copies >= 36) return 5;
  if (copies >= 16) return 4;
  if (copies >= 6)  return 3;
  if (copies >= 2)  return 2;
  return 1;
}
function _lvMult(cardId) { return 1 + (_cardLevel(cardId) - 1) * 0.15; }

// ── Build player deck from saved deck in localStorage ──
function buildPlayerDeck() {
  const deckIds = _ccCards.filter(r => r.in_deck).map(r => r.card_id);
  const indices = deckIds.map(id => CARDS.findIndex(c => c.id === id)).filter(i => i >= 0);
  if (indices.length === 4) return indices;
  // fallback: first 4 player cards
  return [0, 1, 2, 3];
}

// playerDeck is set fresh each game in resetState()
let playerDeck = [0, 1, 2, 3];
let pCycleIdx = 0; // next index into playerDeck to cycle in

// ══════════════════════════
//  INIT
// ══════════════════════════
function startGame(){
  document.getElementById('overlay').classList.add('hidden');
  intervals.forEach(clearInterval);intervals=[];
  resetState();gameStarted=true;lastTick=performance.now();
  requestAnimationFrame(loop);
  intervals.push(setInterval(tickPlayerElixir,2600));
  intervals.push(setInterval(tickEnemyElixir,2400));
  if (!MULTIPLAYER) intervals.push(setInterval(enemyAI,3200));
  intervals.push(setInterval(tickTimer,1000));
}
function resetState(){
  playerDeck = buildPlayerDeck();
  pCycleIdx = 0;
  elixir=5;enemyElixir=5;selectedCard=null;
  hand=[...playerDeck]; // start with all 4 deck cards in hand
  nextCard=playerDeck[pCycleIdx];
  troops=[];projectiles=[];playerCrowns=0;enemyCrowns=0;gameTime=180;gameOver=false;
  Object.keys(TOWER_DEF).forEach(k=>towers[k]={...TOWER_DEF[k],alive:true,lastShot:0});
  document.querySelectorAll('.troop,.projectile,.dmg-text,.aoe-ring,.heal-burst').forEach(el=>el.remove());
  ['p-left','p-right','p-king','e-left','e-right','e-king'].forEach(k=>{
    const el=document.getElementById(`tower-${k}`);if(el)el.style.opacity='1';
  });
  renderHand();renderNextCard();updatePlayerElixirUI();updateEnemyElixirUI();
  updateCrowns();updateTowerHPs();
  const t=document.getElementById('timer');t.textContent='3:00';t.classList.remove('urgent','double-elixir');
}

// ══════════════════════════
//  LOOP
// ══════════════════════════
function loop(ts){
  if(gameOver)return;
  const dt=Math.min((ts-lastTick)/1000,0.1);lastTick=ts;
  moveTroops(dt);moveProjectiles(dt);towerShoot(ts);checkWin();
  animFrame=requestAnimationFrame(loop);
}

// ══════════════════════════
//  SPAWN
// ══════════════════════════
function spawnTroop(cardIdx,x,y,side,isMini){
  const card=CARDS[cardIdx];
  const arena=document.getElementById('arena');
  const el=document.createElement('div');
  el.className=`troop ${side}`;
  el.setAttribute('data-id',card.id);
  el.innerHTML=buildTroopHTML(card,troopId,isMini);
  el.style.cssText=`left:${x-23}px;top:${y-55}px`;
  arena.appendChild(el);

  // Apply level multiplier for player cards
  const mult = side==='player' ? _lvMult(card.id) : 1;
  const scaledHp  = Math.round(card.hp  * mult);
  const scaledAtk = Math.round(card.atk * mult);

  const t={
    id:troopId++,el,side,card:{...card,atk:scaledAtk},
    hp:scaledHp,maxHp:scaledHp,x,y,
    lastAtk:0,target:null,alive:true,
    frozen:false,frozenUntil:0,
    slowed:false,slowedUntil:0,
    shielded:false,shieldHp:0,
    cursed:false,cursedUntil:0,
    invisible:false,invisibleUntil:0,
    tauntedTo:null,isMoving:false,
  };
  troops.push(t);

  if(!isMini){
    const a=card.ability;
    if(a==='moroni')     setTimeout(()=>ability_moroni(t),200);
    else if(a==='nauvoo')setTimeout(()=>ability_nauvooAOE(t),100);
    else if(a==='prophet')setTimeout(()=>ability_prophet(t),200);
    else if(a==='ctrKid'){
      for(let i=1;i<=2;i++){
        const ox=i===1?-44:44;
        setTimeout(()=>spawnTroop(cardIdx,Math.max(23,Math.min(arenaW()-23,x+ox)),Math.max(55,Math.min(arenaH()-10,y)),side,true),i*90);
      }
    }
    else if(a==='beehive')  setTimeout(()=>ability_beehive(t),300);
    else if(a==='deceiver'){ t.invisible=true;t.invisibleUntil=performance.now()+2200;t.el.style.opacity='0.2';showToast('🐍 Deceiver goes invisible!');}
    else if(a==='antiChrist')setTimeout(()=>ability_antiChristAOE(t),100);
    else if(a==='nehor')    setTimeout(()=>ability_nehorTaunt(t),200);
  }
  return t;
}
function arenaW(){return document.getElementById('arena').offsetWidth;}
function arenaH(){return document.getElementById('arena').offsetHeight;}

// ══════════════════════════
//  ABILITIES
// ══════════════════════════
function ability_moroni(t){
  showAOERing(t.x,t.y,115,'rgba(255,255,180,0.8)');showHealBurst(t.x,t.y,105);
  showToast('👼 Angel heals all allies!');
  for(const tr of troops){
    if(!tr.alive||tr.side!=='player')continue;
    const h=Math.min(80,tr.maxHp-tr.hp);
    if(h>0){tr.hp+=h;updateTroopHpBar(tr);showDmgText(tr.x,tr.y,'+'+h,'heal');}
  }
}
function ability_nauvooAOE(t){
  showAOERing(t.x,t.y,90,'rgba(255,165,50,0.85)');showToast('🏔️ Nauvoo Guard charges!');
  for(const tr of troops){if(!tr.alive||tr.side===t.side)continue;if(dist(t,tr)<90)dealDamage(tr,120,t.side==='player');}
}
function ability_prophet(t){
  showAOERing(t.x,t.y,125,'rgba(100,180,255,0.75)');showToast('🧓 Prophet shields all allies!');
  for(const tr of troops){
    if(!tr.alive||tr.side!=='player')continue;
    tr.shielded=true;tr.shieldHp=150;addShieldOrb(tr);
  }
}
function ability_beehive(t){
  showToast('🐝 Bee swarm!');
  const en=troops.filter(tr=>tr.alive&&tr.side!==t.side);
  const etk=Object.keys(towers).filter(k=>towers[k].alive&&towers[k].side!==t.side);
  for(let i=0;i<5;i++){
    setTimeout(()=>{
      let tgt=null;
      if(en.length)tgt=en[Math.floor(Math.random()*en.length)];
      else if(etk.length){const k=etk[Math.floor(Math.random()*etk.length)];const c=getTowerCenter(k);tgt={x:c.x,y:c.y,towerKey:k,alive:true};}
      if(tgt)fireBee(t,tgt);
    },i*120);
  }
}
function fireBee(from,to){
  const arena=document.getElementById('arena');
  const el=document.createElement('div');
  el.className='projectile';el.textContent='🐝';
  el.style.cssText=`width:15px;height:15px;font-size:11px;display:flex;align-items:center;justify-content:center;left:${from.x}px;top:${from.y}px;border-radius:50%;background:rgba(255,215,0,0.3);`;
  arena.appendChild(el);
  projectiles.push({id:projId++,el,x:from.x,y:from.y,side:from.side,atk:35,target:to,spd:165,alive:true,type:'bee'});
}
function ability_antiChristAOE(t){
  showAOERing(t.x,t.y,82,'rgba(200,50,50,0.9)');showToast('😈 Anti-Christ AOE!');
  for(const tr of troops){if(!tr.alive||tr.side===t.side)continue;if(dist(t,tr)<82)dealDamage(tr,100,t.side==='player');}
}
function ability_nehorTaunt(t){
  showAOERing(t.x,t.y,135,'rgba(255,215,0,0.65)');showToast('💰 Nehor taunts your army!');
  for(const tr of troops){if(!tr.alive||tr.side===t.side)continue;tr.tauntedTo=t;}
  setTimeout(()=>{for(const tr of troops){if(tr.tauntedTo===t)tr.tauntedTo=null;}},3500);
}
function addShieldOrb(tr){
  const old=tr.el.querySelector('.shield-orb');if(old)old.remove();
  const s=document.createElement('div');s.className='shield-orb';
  s.style.cssText=`width:58px;height:70px;top:-4px;left:-6px;`;
  tr.el.appendChild(s);
}

// ══════════════════════════
//  RIVER / BRIDGES
// ══════════════════════════
const BRIDGE_HALF_W = 36;          // half-width of each bridge in px
const BRIDGE_L_PCT  = 0.13;        // left  bridge center (% of arena width)
const BRIDGE_R_PCT  = 0.87;        // right bridge center
const RIVER_HALF    = 11;          // half the river height in px

function _bridgeCenters(aw){ return [aw*BRIDGE_L_PCT, aw*BRIDGE_R_PCT]; }
function _inBridge(x, aw){ return _bridgeCenters(aw).some(bx=>Math.abs(x-bx)<BRIDGE_HALF_W); }
function _nearestBridge(x, aw){ const [lb,rb]=_bridgeCenters(aw); return Math.abs(x-lb)<Math.abs(x-rb)?lb:rb; }

function applyRiverConstraint(t, nx, ny, spd, dt, aw, ah){
  const riverY   = ah * 0.5;
  const isPlayer = t.side === 'player';
  const edge     = isPlayer ? riverY - RIVER_HALF : riverY + RIVER_HALF;
  // Only trigger when crossing from own half to enemy half
  const crossing = isPlayer ? (t.y >= edge && ny < edge) : (t.y <= edge && ny > edge);
  if(!crossing) return {x:nx, y:ny};
  if(_inBridge(nx, aw)) return {x:nx, y:ny}; // bridge — allowed through
  // Not in a bridge: pin at river edge, redirect to nearest bridge
  const bx   = _nearestBridge(t.x, aw);
  const bdx  = bx - t.x;
  const step = Math.min(Math.abs(bdx), spd * dt * 1.5);
  return { x: t.x + Math.sign(bdx)*step, y: edge };
}

// ══════════════════════════
//  MOVE TROOPS
// ══════════════════════════
function moveTroops(dt){
  const now=performance.now();
  const aw=arenaW(),ah=arenaH();

  for(const t of troops){
    if(!t.alive)continue;
    if(t.frozen&&now>t.frozenUntil){
      t.frozen=false;
      const fz=t.el.querySelector('.freeze-overlay');if(fz)fz.remove();
    }
    if(t.slowed&&now>t.slowedUntil)t.slowed=false;
    if(t.cursed&&now>t.cursedUntil)t.cursed=false;
    if(t.invisible&&now>t.invisibleUntil){t.invisible=false;t.el.style.opacity='1';}
    if(t.frozen)continue;

    if(t.tauntedTo&&t.tauntedTo.alive)t.target=t.tauntedTo;
    else if(t.card.ability==='gadianton')t.target=findTowerTarget(t);
    else t.target=findTarget(t);

    let moving=false;
    if(t.target){
      const dx=t.target.x-t.x,dy=t.target.y-t.y;
      const d=Math.sqrt(dx*dx+dy*dy);
      const atkRange=t.card.isRange?84:44;
      if(d<=atkRange){
        const cd=1000/t.card.spd;
        if(now-t.lastAtk>cd){
          t.lastAtk=now;
          triggerAtkAnim(t);
          if(t.card.isRange)fireProjectile(t,t.target);
          else dealDamage(t.target,effectiveAtk(t),t.side==='player');
        }
      } else {
        const spd=(t.slowed?0.5:1)*56*t.card.spd;
        const nx=t.x+(dx/d)*spd*dt, ny=t.y+(dy/d)*spd*dt;
        const c=applyRiverConstraint(t,nx,ny,spd,dt,aw,ah);
        t.x=Math.max(23,Math.min(aw-23,c.x));
        t.y=Math.max(55,Math.min(ah-10,c.y));
        moving=true;
      }
    } else {
      const spd=(t.slowed?0.5:1)*44*t.card.spd;
      const ny=t.y+(t.side==='player'?-spd:spd)*dt;
      const c=applyRiverConstraint(t,t.x,ny,spd,dt,aw,ah);
      t.x=Math.max(23,Math.min(aw-23,c.x));
      t.y=Math.max(55,Math.min(ah-10,c.y));
      moving=true;
    }

    if(moving!==t.isMoving){
      t.isMoving=moving;
      t.el.classList.toggle('moving',moving);
    }

    const depthScale=0.7+0.6*(t.y/ah);
    t.el.style.cssText=`left:${t.x-23}px;top:${t.y-55}px;transform:scale(${depthScale.toFixed(2)});transform-origin:bottom center;z-index:${Math.round(t.y+10)};`;
  }

  const dead=troops.filter(tr=>!tr.alive);
  troops=troops.filter(tr=>tr.alive);
  for(const t of dead){onTroopDeath(t);t.el.remove();}
}

function triggerAtkAnim(t){
  t.el.classList.remove('attacking');
  void t.el.offsetWidth;
  t.el.classList.add('attacking');
  setTimeout(()=>t.el.classList.remove('attacking'),250);
}

function effectiveAtk(t){
  if(t.side==='player'){
    for(const k of troops){if(k.alive&&k.side==='enemy'&&k.card.ability==='korihor'&&dist(t,k)<115)return Math.round(t.card.atk*0.7);}
  }
  return t.card.atk;
}

// ══════════════════════════
//  DEATH ABILITIES
// ══════════════════════════
function onTroopDeath(t){
  const a=t.card.ability;
  if(a==='missionary'){
    let cl=null,cd=999;
    for(const tr of troops){if(!tr.alive||tr.side==='player')continue;const d=dist(t,tr);if(d<cd){cd=d;cl=tr;}}
    if(cl){cl.side='player';cl.el.classList.remove('enemy');cl.el.classList.add('player');showAOERing(cl.x,cl.y,42,'rgba(100,255,100,0.85)');showToast('🧑‍⚕️ Missionary converted!');}
  } else if(a==='apostate'){
    let cl=null,cd=999;
    for(const tr of troops){if(!tr.alive||tr.side==='enemy')continue;const d=dist(t,tr);if(d<cd){cd=d;cl=tr;}}
    if(cl){cl.cursed=true;cl.cursedUntil=performance.now()+4000;showToast('😤 Apostate cursed your troop!');showDmgText(cl.x,cl.y,'CURSED','ability');}
  } else if(a==='laman'){
    const miniCard={id:'miniLaman',name:'Mini Laman',emoji:'😬',cost:0,hp:55,maxHp:55,atk:35,spd:1.6,isRange:false,ability:'',abilityTxt:''};
    for(let i=0;i<2;i++){
      const mx=Math.max(23,Math.min(arenaW()-23,t.x+(i===0?-24:24)));
      const my=Math.max(55,Math.min(arenaH()-10,t.y));
      const arena=document.getElementById('arena');
      const el=document.createElement('div');
      el.className='troop enemy';
      el.setAttribute('data-id','miniLaman');
      el.innerHTML=buildTroopHTML(miniCard,troopId,true);
      el.style.cssText=`left:${mx-23}px;top:${my-55}px`;
      arena.appendChild(el);
      troops.push({
        id:troopId++,el,side:'enemy',card:{...miniCard},
        hp:55,maxHp:55,x:mx,y:my,lastAtk:0,target:null,alive:true,
        frozen:false,frozenUntil:0,slowed:false,slowedUntil:0,
        shielded:false,shieldHp:0,cursed:false,cursedUntil:0,
        invisible:false,invisibleUntil:0,tauntedTo:null,isMoving:false,
      });
    }
    showToast('😠 Laman splits!');
  }
}

// ══════════════════════════
//  TARGETING
// ══════════════════════════
function getTowerCenter(k){
  const el=document.getElementById(`tower-${k}`);
  const ar=document.getElementById('arena').getBoundingClientRect();
  const tr=el.getBoundingClientRect();
  return{x:tr.left-ar.left+tr.width/2,y:tr.top-ar.top+tr.height/2,towerKey:k};
}
function findTowerTarget(troop){
  const sides=troop.side==='player'?['e-left','e-right']:['p-left','p-right'];
  const king=troop.side==='player'?'e-king':'p-king';
  const sidesAlive=sides.filter(k=>towers[k]?.alive);
  // King is accessible once at least one side tower is destroyed
  const kingAccessible=sidesAlive.length<2&&towers[king]?.alive;
  const candidates=[...sidesAlive,...(kingAccessible?[king]:[])];
  let closest=null,closestDist=Infinity;
  for(const k of candidates){
    const c=getTowerCenter(k);
    const d=dist(troop,c);
    if(d<closestDist){closestDist=d;closest=c;}
  }
  return closest;
}
function findTarget(troop){
  let cl=null,cd=122;
  for(const t of troops){
    if(!t.alive||t.side===troop.side||t.invisible)continue;
    const d=dist(troop,t);if(d<cd){cd=d;cl=t;}
  }
  if(cl)return cl;
  return findTowerTarget(troop);
}
function dist(a,b){return Math.sqrt((a.x-b.x)**2+(a.y-b.y)**2);}

// ══════════════════════════
//  PROJECTILES
// ══════════════════════════
function getProjClass(t){
  const a=t.card.ability;
  if(a==='moroni')return'proj-holy';
  if(a==='scriptures')return'proj-scripture';
  if(a==='jello')return'proj-jello';
  if(a==='temptation')return'proj-tempt';
  if(a==='deceiver'||a==='gadianton')return'proj-snake';
  return t.side==='player'?'proj-normal':'proj-enemy';
}
function fireProjectile(from,to){
  const arena=document.getElementById('arena');
  const el=document.createElement('div');
  el.className=`projectile ${getProjClass(from)}`;
  el.style.cssText=`left:${from.x}px;top:${from.y}px`;
  arena.appendChild(el);
  projectiles.push({id:projId++,el,x:from.x,y:from.y,side:from.side,atk:from.card.atk,target:to,spd:195,alive:true,type:from.card.ability||'normal'});
}
function moveProjectiles(dt){
  for(const p of projectiles){
    if(!p.alive){p.el.remove();continue;}
    const tx=p.target?.x??0,ty=p.target?.y??0;
    const dx=tx-p.x,dy=ty-p.y,d=Math.sqrt(dx*dx+dy*dy);
    if(d<14){onProjectileHit(p);p.alive=false;p.el.remove();}
    else{p.x+=(dx/d)*p.spd*dt;p.y+=(dy/d)*p.spd*dt;p.el.style.left=p.x+'px';p.el.style.top=p.y+'px';}
  }
  projectiles=projectiles.filter(p=>p.alive);
}
function onProjectileHit(p){
  const ip=p.side==='player';
  if(p.target?.towerKey){dealDamageTower(p.target.towerKey,p.atk,ip);return;}
  if(!p.target?.alive)return;
  if(p.type==='scriptures'){
    dealDamage(p.target,p.atk,ip);
    p.target.frozen=true;p.target.frozenUntil=performance.now()+2100;
    const fz=document.createElement('div');fz.className='freeze-overlay';p.target.el.appendChild(fz);
    showDmgText(p.target.x,p.target.y,'FROZEN','ability');showToast('📖 Frozen!');
  } else if(p.type==='jello'){
    showAOERing(p.target.x,p.target.y,72,'rgba(255,130,210,0.75)');
    for(const t of troops){if(!t.alive||t.side===p.side)continue;if(dist(p.target,t)<72)dealDamage(t,p.atk,ip);}
    showDmgText(p.target.x,p.target.y,'SPLASH!','ability');
  } else if(p.type==='temptation'){
    dealDamage(p.target,p.atk,ip);
    p.target.slowed=true;p.target.slowedUntil=performance.now()+2500;
    showDmgText(p.target.x,p.target.y,'SLOWED','ability');
  } else{dealDamage(p.target,p.atk,ip);}
}

// ══════════════════════════
//  DAMAGE
// ══════════════════════════
function dealDamage(troop,dmg,isPlayerAtk){
  if(!troop.alive)return;
  if(troop.shielded&&troop.shieldHp>0){
    const ab=Math.min(troop.shieldHp,dmg);troop.shieldHp-=ab;dmg-=ab;
    if(troop.shieldHp<=0){troop.shielded=false;const s=troop.el.querySelector('.shield-orb');if(s)s.remove();}
    showDmgText(troop.x,troop.y,'🛡️'+ab,'ability');
    if(dmg<=0)return;
  }
  troop.hp=Math.max(0,troop.hp-dmg);updateTroopHpBar(troop);
  showDmgText(troop.x,troop.y,dmg,'dmg');
  if(troop.hp<=0)troop.alive=false;
}
function _hpColor(pct){return pct>0.5?'#2ecc71':pct>0.25?'#f39c12':'#e74c3c';}
function updateTroopHpBar(t){
  const el=document.getElementById(`thp-${t.id}`);if(!el)return;
  const pct=t.hp/t.maxHp;
  el.style.width=(pct*100)+'%';
  el.style.background=_hpColor(pct);
}
function dealDamageTower(key,dmg,isPlayerAtk){
  const t=towers[key];if(!t?.alive)return;
  t.hp=Math.max(0,t.hp-dmg);updateTowerHPs();
  const el=document.getElementById(`tower-${key}`);
  if(el){el.classList.add('flash');setTimeout(()=>el.classList.remove('flash'),300);}
  const c=getTowerCenter(key);showDmgText(c.x,c.y,dmg,'dmg');
  if(t.hp<=0){
    t.alive=false;if(el)el.style.opacity='0.2';
    isPlayerAtk?(playerCrowns+=t.isKing?3:1):(enemyCrowns+=t.isKing?3:1);updateCrowns();
  }
}

// ══════════════════════════
//  TOWER SHOOT
// ══════════════════════════
function towerShoot(ts){
  for(const[key,tower]of Object.entries(towers)){
    if(!tower.alive||ts-tower.lastShot<tower.rateMs)continue;
    const center=getTowerCenter(key);
    let cl=null,cd=142;
    for(const t of troops){
      if(!t.alive||t.side===tower.side||t.invisible)continue;
      const d=dist(center,t);if(d<cd){cd=d;cl=t;}
    }
    if(cl){
      tower.lastShot=ts;
      const arena=document.getElementById('arena');
      const el=document.createElement('div');
      el.className=`projectile ${tower.side==='player'?'proj-normal':'proj-enemy'}`;
      el.style.cssText=`left:${center.x}px;top:${center.y}px`;
      arena.appendChild(el);
      projectiles.push({id:projId++,el,x:center.x,y:center.y,side:tower.side,atk:tower.atk,target:cl,spd:228,alive:true,type:'tower'});
    }
  }
}

// ══════════════════════════
//  ENEMY AI
// ══════════════════════════
function enemyAI(){
  if(gameOver||!gameStarted)return;
  const aff=ENEMY_POOL.filter(i=>CARDS[i].cost<=enemyElixir);if(!aff.length)return;
  const pick=aff[Math.floor(Math.random()*aff.length)];
  enemyElixir=Math.max(0,enemyElixir-CARDS[pick].cost);updateEnemyElixirUI();
  const x=30+Math.random()*(arenaW()-60);
  const y=55+Math.random()*(arenaH()*0.42);
  spawnTroop(pick,x,y,'enemy');
}

// ══════════════════════════
//  ELIXIR
// ══════════════════════════
function tickPlayerElixir(){
  if(gameOver||!gameStarted)return;
  if(elixir<10){elixir++;updatePlayerElixirUI();}
  if(gameTime<=60&&elixir<10){elixir++;updatePlayerElixirUI();} // double elixir
}
function tickEnemyElixir(){
  if(gameOver||!gameStarted)return;
  if(enemyElixir<10){enemyElixir++;updateEnemyElixirUI();}
  if(gameTime<=60&&enemyElixir<10){enemyElixir++;updateEnemyElixirUI();} // double elixir
}
function updatePlayerElixirUI(){
  const dbl=gameTime<=60;
  document.getElementById('elixir-label').textContent=(dbl?'⚡':'🙏')+' '+elixir;
  for(let i=0;i<10;i++){
    const pip=document.getElementById(`ep${i}`);
    pip.classList.toggle('filled',i<elixir);
    pip.classList.toggle('double',dbl&&i<elixir);
  }
  renderHand();
}
function updateEnemyElixirUI(){
  document.getElementById('enemy-elixir-label').textContent='😈 '+enemyElixir;
  for(let i=0;i<10;i++)document.getElementById(`eep${i}`).classList.toggle('filled',i<enemyElixir);
}

// ══════════════════════════
//  CARDS UI
// ══════════════════════════
function _cardSvg(card, w, h) {
  if (typeof CHAR_SVGS !== 'undefined' && CHAR_SVGS[card.id]) {
    return CHAR_SVGS[card.id].replace('<svg ', `<svg width="${w}" height="${h}" `);
  }
  return `<span style="font-size:${Math.floor(h*0.5)}px;line-height:1">${card.emoji}</span>`;
}
function renderHand(){
  hand.forEach((ci,slot)=>{
    const card=CARDS[ci],el=document.getElementById(`card-${slot}`);if(!el)return;
    const emojiEl=el.querySelector('.card-emoji');
    emojiEl.innerHTML=_cardSvg(card,42,54);
    el.querySelector('.card-name').textContent=card.name;
    el.querySelector('.card-cost').textContent=card.cost;
    el.classList.toggle('cant-afford',card.cost>elixir);
    el.classList.toggle('selected',selectedCard===slot);
  });
}
function renderNextCard(){
  const card=CARDS[nextCard];
  const el=document.getElementById('next-emoji');
  el.innerHTML=_cardSvg(card,32,42);
}
function selectCard(slot){
  if(CARDS[hand[slot]].cost>elixir)return;
  selectedCard=(selectedCard===slot)?null:slot;
  document.getElementById('drop-hint').classList.toggle('active',selectedCard!==null);
  renderHand();
}
function cycleCard(slot){
  hand[slot]=nextCard;
  pCycleIdx=(pCycleIdx+1)%playerDeck.length;
  nextCard=playerDeck[pCycleIdx];
  renderHand();renderNextCard();
}

// ══════════════════════════
//  DEPLOY — drag & drop
// ══════════════════════════
let dragSlot = null;       // card slot being dragged
let dragGhost = null;      // floating ghost element
let dragMoved = false;     // did the touch actually move (vs a tap)?

function _deployAt(slot, clientX, clientY) {
  const arena = document.getElementById('arena');
  const rect = arena.getBoundingClientRect();
  const x = clientX - rect.left;
  const y = clientY - rect.top;
  if (y < arena.offsetHeight / 2) return false; // must be player half
  const ci = hand[slot];
  if (CARDS[ci].cost > elixir) return false;
  elixir -= CARDS[ci].cost; updatePlayerElixirUI();
  spawnTroop(ci, x, y, 'player');
  playedCardIds.add(CARDS[ci].id);
  if (MULTIPLAYER && mpWs && mpWs.readyState === 1) {
    mpWs.send(JSON.stringify({ type:'play', cardId: CARDS[ci].id,
      pct_x: x / arena.offsetWidth, pct_y: y / arena.offsetHeight }));
  }
  cycleCard(slot);
  return true;
}

function _startDrag(slot, clientX, clientY) {
  if (!gameStarted || gameOver) return;
  if (CARDS[hand[slot]].cost > elixir) return;
  dragSlot = slot; dragMoved = false;
  // build ghost
  dragGhost = document.createElement('div');
  dragGhost.className = 'drag-ghost';
  dragGhost.innerHTML = _cardSvg(CARDS[hand[slot]], 52, 68);
  document.getElementById('game-wrapper').appendChild(dragGhost);
  _moveDrag(clientX, clientY);
  document.getElementById('drop-hint').classList.add('active');
}

function _moveDrag(clientX, clientY) {
  if (!dragGhost) return;
  dragMoved = true;
  dragGhost.style.left = (clientX - 32) + 'px';
  dragGhost.style.top  = (clientY - 72) + 'px';
  // tint based on valid zone
  const arena = document.getElementById('arena');
  const rect = arena.getBoundingClientRect();
  const inPlayerHalf = clientY > rect.top + arena.offsetHeight / 2 && clientY < rect.bottom;
  dragGhost.classList.toggle('drag-valid', inPlayerHalf);
  dragGhost.classList.toggle('drag-invalid', !inPlayerHalf);
}

function _endDrag(clientX, clientY) {
  if (dragSlot === null) return;
  document.getElementById('drop-hint').classList.remove('active');
  if (dragGhost) { dragGhost.remove(); dragGhost = null; }
  if (dragMoved) {
    const deployed = _deployAt(dragSlot, clientX, clientY);
    if (!deployed) { /* invalid drop — card stays in hand */ }
  } else {
    // treat as a tap — use old select logic
    selectCard(dragSlot);
  }
  dragSlot = null;
  selectedCard = null;
  renderHand();
}

document.addEventListener('DOMContentLoaded', () => {
  // Touch drag on cards
  document.getElementById('card-hand').addEventListener('touchstart', e => {
    const card = e.target.closest('.card');
    if (!card) return;
    const slot = parseInt(card.id.split('-')[1]);
    if (isNaN(slot)) return;
    e.preventDefault();
    _startDrag(slot, e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: false });

  document.addEventListener('touchmove', e => {
    if (dragSlot === null) return;
    e.preventDefault();
    _moveDrag(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: false });

  document.addEventListener('touchend', e => {
    if (dragSlot === null) return;
    const t = e.changedTouches[0];
    _endDrag(t.clientX, t.clientY);
  });

  // Mouse drag fallback (desktop)
  document.getElementById('card-hand').addEventListener('mousedown', e => {
    const card = e.target.closest('.card');
    if (!card) return;
    const slot = parseInt(card.id.split('-')[1]);
    if (isNaN(slot)) return;
    _startDrag(slot, e.clientX, e.clientY);
  });

  document.addEventListener('mousemove', e => {
    if (dragSlot === null) return;
    _moveDrag(e.clientX, e.clientY);
  });

  document.addEventListener('mouseup', e => {
    if (dragSlot === null) return;
    _endDrag(e.clientX, e.clientY);
  });

  // Keep old arena-click for tap flow (when drag wasn't used)
  document.getElementById('arena').addEventListener('click', function(e) {
    if (selectedCard === null || !gameStarted || gameOver) return;
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left, y = e.clientY - rect.top;
    if (y < this.offsetHeight / 2) {
      selectedCard = null;
      document.getElementById('drop-hint').classList.remove('active');
      renderHand(); return;
    }
    if (!_deployAt(selectedCard, e.clientX, e.clientY)) return;
    selectedCard = null;
    document.getElementById('drop-hint').classList.remove('active');
    renderHand();
  });
});

// ══════════════════════════
//  VFX
// ══════════════════════════
function showAOERing(x,y,r,color){
  const arena=document.getElementById('arena');
  const el=document.createElement('div');el.className='aoe-ring';
  el.style.cssText=`left:${x}px;top:${y}px;width:${r*2}px;height:${r*2}px;border-color:${color};`;
  arena.appendChild(el);setTimeout(()=>el.remove(),560);
}
function showHealBurst(x,y,r){
  const arena=document.getElementById('arena');
  const el=document.createElement('div');el.className='heal-burst';
  el.style.cssText=`left:${x}px;top:${y}px;width:${r*2}px;height:${r*2}px;`;
  arena.appendChild(el);setTimeout(()=>el.remove(),660);
}
let toastTimer=null;
function showToast(msg){
  const el=document.getElementById('ability-toast');el.textContent=msg;el.classList.add('show');
  clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),1900);
}
function showDmgText(x,y,val,type){
  const arena=document.getElementById('arena');
  const el=document.createElement('div');el.className=`dmg-text ${type}`;
  el.textContent=type==='heal'?'+'+val:type==='ability'?val:'-'+val;
  el.style.cssText=`left:${x-18}px;top:${y-24}px`;
  arena.appendChild(el);setTimeout(()=>el.remove(),1060);
}

// ══════════════════════════
//  TIMER
// ══════════════════════════
function tickTimer(){
  if(gameOver||!gameStarted)return;gameTime--;
  const m=Math.floor(gameTime/60),s=gameTime%60;
  const el=document.getElementById('timer');el.textContent=`${m}:${s.toString().padStart(2,'0')}`;
  if(gameTime===60){
    el.classList.add('double-elixir');
    showToast('⚡ Double Elixir! ⚡');
  }
  if(gameTime<=30)el.classList.add('urgent');
  if(gameTime<=0)endGame();
}

// ══════════════════════════
//  CROWNS / HP
// ══════════════════════════
function updateCrowns(){
  for(let i=0;i<3;i++){
    document.getElementById(`pc${i}`).classList.toggle('earned',i<playerCrowns);
    document.getElementById(`ec${i}`).classList.toggle('earned',i<enemyCrowns);
  }
}
function updateTowerHPs(){
  const defs=[['p-left','php-left','php-left-txt',600],['p-right','php-right','php-right-txt',600],['p-king','php-king','php-king-txt',1200],['e-left','ehp-left','ehp-left-txt',600],['e-right','ehp-right','ehp-right-txt',600],['e-king','ehp-king','ehp-king-txt',1200]];
  for(const[key,barId,txtId,max]of defs){
    const t=towers[key];if(!t)continue;
    const pct=t.hp/max;
    const bar=document.getElementById(barId),txt=document.getElementById(txtId);
    if(bar){bar.style.width=(pct*100)+'%';bar.style.background=_hpColor(pct);}
    if(txt)txt.textContent=Math.max(0,t.hp);
  }
}

// ══════════════════════════
//  WIN
// ══════════════════════════
function exitGame(){
  if(gameStarted&&!gameOver){
    if(!confirm('Leave the battle? The adversary will claim victory!'))return;
  }
  cancelAnimationFrame(animFrame);intervals.forEach(clearInterval);intervals=[];
  window.location.href='index.html';
}
function checkWin(){
  if(playerCrowns>=3){endGame(true,'Righteousness triumphs!');return;}
  if(enemyCrowns>=3){endGame(false,'');return;}
  if(!towers['e-king']?.alive){endGame(true,'The adversary is defeated!');return;}
  if(!towers['p-king']?.alive){endGame(false,'');return;}
}
function endGame(win,reason){
  if(gameOver)return;gameOver=true;gameStarted=false;
  if (MULTIPLAYER && mpWs && mpWs.readyState === 1) {
    mpWs.send(JSON.stringify({ type:'game_over', crowns: playerCrowns, opp_crowns: enemyCrowns }));
  }
  // Award chest for solo wins
  const token = localStorage.getItem('cc_token');
  const _won = (win !== undefined) ? win : playerCrowns > enemyCrowns;
  if (token && _won && !MULTIPLAYER) {
    fetch('/api/chest/win', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + token },
    }).catch(()=>{});
  }
  cancelAnimationFrame(animFrame);intervals.forEach(clearInterval);intervals=[];
  const w=(win!==undefined)?win:(playerCrowns>enemyCrowns);
  const titles=w?['🏆 Hallelujah!','⛪ Zion Stands!','👼 Righteousness Wins!']:['💀 Thou Art Fallen','😈 The Adversary Wins','📖 Study Harder'];
  const msg=w
    ?`${reason||'Well done!'}\nYou earned ${playerCrowns} crown${playerCrowns!==1?'s':''}.\nChoose the right. ✓`
    :`The adversary took ${enemyCrowns} crown${enemyCrowns!==1?'s':''}.\nEven Nephi had hard days. Try again!`;
  document.getElementById('overlay-title').textContent=titles[Math.floor(Math.random()*titles.length)];
  document.getElementById('overlay-msg').textContent=msg;
  document.querySelector('#overlay button').textContent=w?'Fight Again!':'Repent & Retry';
  document.getElementById('overlay').classList.remove('hidden');
}
