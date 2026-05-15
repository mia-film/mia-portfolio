(() => {
'use strict';

// ====================================================================
// i18n
// ====================================================================
const I18N = {
  Welcome:           {en:"Welcome",                                     ja:"ようこそ"},
  WelcomeSub:        {en:"MiaOS — White Hacking Security Desktop",      ja:"MiaOS — ホワイトハッキング・セキュリティ・デスクトップ"},
  BootSub:           {en:"Studio MIA — A White Hacking Security Desktop", ja:"ホワイトハッキングのためのOS"},
  BootSkip:          {en:"press space or enter to skip",                ja:"Space / Enter でスキップ"},
  SpotlightHint:     {en:"Search apps... (e.g. hash, encoder)",         ja:"アプリを検索... (例: hash, encoder)"},
  SpotlightNoMatch:  {en:"no match",                                    ja:"一致するアプリがありません"},
  FileMenu:          {en:"File",   ja:"ファイル"},
  HelpMenu:          {en:"Help",   ja:"ヘルプ"},
  OpenSpotlight:     {en:"Open Spotlight",            ja:"検索を開く"},
  CloseAllWindows:   {en:"Close All Windows",         ja:"すべてのウィンドウを閉じる"},
  NewWindow:         {en:"New Window",                ja:"新しいウィンドウ"},
  Print:             {en:"Print...",                  ja:"印刷..."},
  Language:          {en:"言語 / Language",           ja:"Language / 言語"},
  EthicsTitle:       {en:"Code of Conduct",           ja:"行動規範"},
  EthicsSub:         {en:"white hacking = using your skill to NOT break things",
                      ja:"ホワイトハッキング = スキルを「壊さない」ために使うこと"},
  NotifTitle:        {en:"MIA OS — Welcome",          ja:"MIA OS — ようこそ"},
  NotifBody:         {en:"Press Cmd/Ctrl+K to open Spotlight. See ETHICS.md before scanning.",
                      ja:"Cmd/Ctrl+K で検索を開けます。スキャン前に行動規範をご確認ください。"}
};
let LANG = 'en';
const t = (k) => I18N[k] ? I18N[k][LANG] : k;
const tx = (en, ja) => (LANG === 'ja' ? ja : en);

// ====================================================================
// App registry
// ====================================================================
const APPS = [
  { id:'welcome',  title:'Welcome',         titleJa:'ようこそ',     icon:'@',  w:780, h:520, pin:true,  cat:'system' },
  { id:'terminal', title:'Terminal',        titleJa:'端末',         icon:'>_', w:820, h:520, pin:true,  cat:'system' },
  { id:'browser',  title:'Browser',         titleJa:'ブラウザ',     icon:'@@', w:980, h:680, pin:true,  cat:'system' },
  { id:'notes',    title:'Notes',           titleJa:'ノート',       icon:'N',  w:880, h:600, pin:true,  cat:'productivity' },
  { id:'calc',     title:'Calculator',      titleJa:'電卓',         icon:'=',  w:380, h:500, pin:true,  cat:'productivity' },
  { id:'hash',     title:'Hash Tool',       titleJa:'ハッシュ',     icon:'#',  w:760, h:540, pin:true,  cat:'security' },
  { id:'encoder',  title:'Encoder',         titleJa:'エンコーダ',   icon:'{}', w:780, h:540, pin:true,  cat:'security' },
  { id:'netinfo',  title:'Net Info',        titleJa:'ネット情報',   icon:'()', w:780, h:540, pin:true,  cat:'network' },
  { id:'portscan', title:'Port Scanner',    titleJa:'ポート調査',   icon:'::', w:800, h:580, pin:true,  cat:'network' },
  { id:'settings', title:'Settings',        titleJa:'設定',         icon:'⚙',  w:780, h:560, pin:true,  cat:'system' },
  { id:'portref',  title:'Port Reference',  titleJa:'ポート一覧',   icon:'?',  w:760, h:560, pin:false, cat:'network' },
  { id:'logs',     title:'Log Viewer',      titleJa:'ログ閲覧',     icon:'/',  w:820, h:580, pin:false, cat:'security' },
  { id:'ethics',   title:'Code of Conduct', titleJa:'行動規範',     icon:'!',  w:760, h:560, pin:false, cat:'system' },
  { id:'jwt',      title:'JWT Inspector',   titleJa:'JWT 解析',     icon:'JT', w:820, h:600, pin:false, cat:'security' },
  { id:'cidr',     title:'CIDR Calc',       titleJa:'サブネット計算', icon:'IP', w:780, h:560, pin:false, cat:'network' },
  { id:'passwd',   title:'Password Meter',  titleJa:'パスワード強度', icon:'**', w:780, h:580, pin:false, cat:'security' },
  { id:'hmac',     title:'HMAC Tool',       titleJa:'HMAC',         icon:'~',  w:780, h:560, pin:false, cat:'security' },
  { id:'regex',    title:'Regex Tester',    titleJa:'正規表現',     icon:'.*', w:800, h:580, pin:false, cat:'productivity' },
  { id:'diff',     title:'Diff Viewer',     titleJa:'差分',         icon:'+-', w:840, h:600, pin:false, cat:'productivity' },
  { id:'uuid',     title:'UUID / Random',   titleJa:'UUID・乱数',   icon:'U4', w:760, h:580, pin:false, cat:'security' },
  { id:'headers',  title:'Header Inspector',titleJa:'ヘッダ監査',   icon:'HD', w:820, h:620, pin:false, cat:'security' },
  { id:'cookies',  title:'Cookie Inspector',titleJa:'Cookie 監査',  icon:'CK', w:820, h:600, pin:false, cat:'security' },
  { id:'dns',      title:'DNS Lookup',      titleJa:'DNS 解決',     icon:'DN', w:820, h:600, pin:false, cat:'network' },
  { id:'rdap',     title:'RDAP / Whois',    titleJa:'RDAP / Whois', icon:'WH', w:820, h:600, pin:false, cat:'network' },
  { id:'codepoint',title:'Codepoint',       titleJa:'文字コード',   icon:'CP', w:820, h:600, pin:false, cat:'productivity' },
  { id:'taskmgr',  title:'Task Manager',    titleJa:'タスク',       icon:'TM', w:780, h:520, pin:false, cat:'system' },
];
// Extras kept from the original mia-os-react: Finder + Trash. Not part of Cmd+1-9.
const EXTRAS = [
  { id:'finder',   title:'Finder',          titleJa:'ファインダ',   icon:'F',  w:780, h:560, pin:true, cat:'system' },
  { id:'trash',    title:'Trash',           titleJa:'ゴミ箱',       icon:'',   w:0,   h:0,  pin:true, cat:'system' },
];
const APP_BY_ID = Object.fromEntries([...APPS, ...EXTRAS].map(a => [a.id, a]));

// ====================================================================
// Utilities
// ====================================================================
const $ = (sel, root=document) => root.querySelector(sel);
const el = (tag, attrs={}, ...children) => {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'class') e.className = v;
    else if (k === 'style' && typeof v === 'object') Object.assign(e.style, v);
    else if (k.startsWith('on') && typeof v === 'function') e.addEventListener(k.slice(2).toLowerCase(), v);
    else if (v === true) e.setAttribute(k, '');
    else if (v === false || v == null) {}
    else e.setAttribute(k, v);
  }
  for (const c of children) {
    if (c == null || c === false) continue;
    e.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
  }
  return e;
};
const escapeHtml = (s) => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

// ====================================================================
// Hashing — MD5 (RFC 1321) + WebCrypto for SHA-1/256
// ====================================================================
function md5(input) {
  // Compact MD5 implementation (string in, hex out, UTF-8 encoded)
  const bytes = new TextEncoder().encode(input);
  const len = bytes.length;
  const wordCount = (((len + 8) >>> 6) + 1) << 4;
  const x = new Uint32Array(wordCount);
  for (let i = 0; i < len; i++) x[i >> 2] |= bytes[i] << ((i & 3) << 3);
  x[len >> 2] |= 0x80 << ((len & 3) << 3);
  x[wordCount - 2] = len << 3;
  let a = 0x67452301, b = 0xefcdab89, c = 0x98badcfe, d = 0x10325476;
  const S = [7,12,17,22, 5,9,14,20, 4,11,16,23, 6,10,15,21];
  const K = new Uint32Array(64);
  for (let i = 0; i < 64; i++) K[i] = Math.floor(Math.abs(Math.sin(i + 1)) * 4294967296);
  const rol = (n, s) => (n << s) | (n >>> (32 - s));
  for (let i = 0; i < x.length; i += 16) {
    let A = a, B = b, C = c, D = d;
    for (let j = 0; j < 64; j++) {
      let F, g;
      if (j < 16)      { F = (B & C) | (~B & D); g = j; }
      else if (j < 32) { F = (D & B) | (~D & C); g = (5*j + 1) & 15; }
      else if (j < 48) { F = B ^ C ^ D;          g = (3*j + 5) & 15; }
      else             { F = C ^ (B | ~D);       g = (7*j) & 15; }
      const tmp = D; D = C; C = B;
      B = (B + rol((A + F + K[j] + x[i + g]) | 0, S[(j>>4)*4 + (j&3)])) | 0;
      A = tmp;
    }
    a = (a + A) | 0; b = (b + B) | 0; c = (c + C) | 0; d = (d + D) | 0;
  }
  const toHex = (n) => Array.from({length:4}, (_,k) => ((n >>> (k*8)) & 0xff).toString(16).padStart(2,'0')).join('');
  return toHex(a) + toHex(b) + toHex(c) + toHex(d);
}
async function sha(algo, input) {
  const buf = new TextEncoder().encode(input);
  const hash = await crypto.subtle.digest(algo, buf);
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2,'0')).join('');
}

// ====================================================================
// Encoding
// ====================================================================
function encUtf8(s) { return new TextEncoder().encode(s); }
function decUtf8(b) { return new TextDecoder('utf-8',{fatal:true}).decode(b); }
function b64encode(s) {
  const bytes = encUtf8(s);
  let bin = '';
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin);
}
function b64decode(s) {
  // strip whitespace, validate
  const cleaned = s.replace(/\s+/g, '');
  if (!/^[A-Za-z0-9+/]*={0,2}$/.test(cleaned)) throw new Error('invalid base64');
  const bin = atob(cleaned);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return decUtf8(bytes);
}
function hexEncode(s) {
  return Array.from(encUtf8(s)).map(b => b.toString(16).padStart(2,'0')).join('');
}
function hexDecode(s) {
  const cleaned = s.replace(/[\s:]+/g, '');
  if (cleaned.length === 0 || cleaned.length % 2 !== 0 || /[^0-9a-fA-F]/.test(cleaned)) throw new Error('invalid hex');
  const bytes = new Uint8Array(cleaned.length / 2);
  for (let i = 0; i < bytes.length; i++) bytes[i] = parseInt(cleaned.substr(i*2, 2), 16);
  return decUtf8(bytes);
}
function urlEncode(s) {
  return encodeURIComponent(s);
}
function urlDecode(s) {
  return decodeURIComponent(s.replace(/\+/g, ' '));
}
function rot13(s) {
  return s.replace(/[a-zA-Z]/g, c => {
    const a = c <= 'Z' ? 65 : 97;
    return String.fromCharCode((c.charCodeAt(0) - a + 13) % 26 + a);
  });
}

// ====================================================================
// State + Window manager
// ====================================================================
const state = {
  bootDone: false,
  windows: [],          // { id, x, y, w, h, z, el, instance, workspace, maximized, prev:{x,y,w,h} }
  focusedId: null,
  topZ: 100,
  staggerX: 100,
  staggerY: 90,
  spotlightOpen: false,
  spotlightQuery: '',
  spotlightActive: 0,
  notifShown: false,
  langMenuOpen: false,
  workspace: 0,
  workspaceCount: 3,
  locked: false,
  launcherOpen: false,
  launcherQuery: '',
  notifCenterOpen: false,
  notifs: [],           // { title, body, ts, id }
  dnd: false,
  settings: {
    motion: true,
    sound: false,
    cursor: true,
    wallpaper: 'mist',  // mist | grid | topo | slate
  },
};
// Load persisted settings
try {
  const raw = localStorage.getItem('miaos.settings');
  if (raw) Object.assign(state.settings, JSON.parse(raw));
} catch(_) {}
function saveSettings() {
  try { localStorage.setItem('miaos.settings', JSON.stringify(state.settings)); } catch(_) {}
}
function applySettings() {
  document.documentElement.classList.toggle('miaos-reduce-motion', !state.settings.motion);
  const wp = document.querySelector('.wallpaper');
  if (wp) {
    wp.classList.remove('var-mist','var-grid','var-topo','var-slate');
    wp.classList.add('var-' + state.settings.wallpaper);
  }
  if (state.settings.cursor) {
    initCustomCursor();
  } else {
    document.documentElement.classList.remove('miaos-cursor-on');
    document.querySelectorAll('.miaos-cursor-dot, .miaos-cursor-ring').forEach(n => n.remove());
    _cursorInited = false;
  }
}

function nextStagger() {
  const x = state.staggerX, y = state.staggerY;
  state.staggerX += 30; state.staggerY += 24;
  if (state.staggerX > 360) state.staggerX = 100;
  if (state.staggerY > 240) state.staggerY = 90;
  return { x, y };
}

function focusWindow(id) {
  state.focusedId = id;
  const w = state.windows.find(w => w.id === id);
  if (!w) return;
  state.topZ += 1;
  w.z = state.topZ;
  w.el.style.zIndex = w.z;
  for (const ww of state.windows) ww.el.classList.toggle('is-focused', ww.id === id);
}

function openWindow(id) {
  const meta = APP_BY_ID[id];
  if (!meta) return;
  const existing = state.windows.find(w => w.id === id && w.workspace === state.workspace);
  if (existing) {
    if (existing.minimized) restoreFromMin(existing);
    focusWindow(id);
    return;
  }
  // open in current workspace
  const { x, y } = nextStagger();
  const win = createWindowEl(meta, x, y);
  win.workspace = state.workspace;
  document.querySelector('.windows').appendChild(win.el);
  state.windows.push(win);
  focusWindow(id);
  updateDockIndicators();
  applyWorkspaceVisibility();
}
function restoreFromMin(w) {
  w.minimized = false;
  w.el.classList.remove('is-min');
  w.el.style.pointerEvents = '';
}
function minimizeWindow(id) {
  const w = state.windows.find(x => x.id === id);
  if (!w || w.minimized) return;
  w.minimized = true;
  w.el.classList.add('is-min');
  if (state.focusedId === id) {
    const next = [...state.windows].reverse().find(x => !x.minimized && x.workspace === state.workspace && x.id !== id);
    state.focusedId = next ? next.id : null;
  }
}
function maximizeWindow(id) {
  const w = state.windows.find(x => x.id === id);
  if (!w) return;
  if (w.maximized) {
    w.maximized = false;
    w.el.classList.remove('is-maximized');
    if (w.prev) {
      Object.assign(w.el.style, { left: w.prev.x+'px', top: w.prev.y+'px', width: w.prev.w+'px', height: w.prev.h+'px' });
    }
  } else {
    w.prev = { x: parseInt(w.el.style.left)||0, y: parseInt(w.el.style.top)||0, w: w.el.offsetWidth, h: w.el.offsetHeight };
    w.maximized = true;
    w.el.classList.add('is-maximized');
    const wrap = document.querySelector('.windows').getBoundingClientRect();
    Object.assign(w.el.style, { left:'0px', top:'0px', width: wrap.width+'px', height: wrap.height+'px' });
  }
}
function applyWorkspaceVisibility() {
  for (const w of state.windows) {
    w.el.style.display = (w.workspace === state.workspace) ? '' : 'none';
  }
  // update pager
  document.querySelectorAll('.menubar__wpager .dot').forEach((d, i) => d.classList.toggle('is-active', i === state.workspace));
  updateDockIndicators();
}
function switchWorkspace(idx) {
  idx = Math.max(0, Math.min(state.workspaceCount - 1, idx));
  if (idx === state.workspace) return;
  state.workspace = idx;
  applyWorkspaceVisibility();
}

function onDockClick(id) {
  if (id === 'trash') {
    // Close every open window — animate by routing through closeWindow
    [...state.windows].forEach(w => closeWindow(w.id));
    return;
  }
  openWindow(id);
}

function closeWindow(id) {
  const i = state.windows.findIndex(w => w.id === id);
  if (i < 0) return;
  const w = state.windows[i];
  w.el.classList.add('is-closing');
  setTimeout(() => {
    w.instance && w.instance.dispose && w.instance.dispose();
    w.el.remove();
    state.windows.splice(state.windows.indexOf(w), 1);
    if (state.focusedId === id) {
      const here = state.windows.filter(x => x.workspace === state.workspace && !x.minimized);
      state.focusedId = here.length ? here[here.length-1].id : null;
    }
    updateDockIndicators();
  }, 220);
}

function closeAllWindows() {
  for (const w of [...state.windows]) closeWindow(w.id);
}

function updateDockIndicators() {
  document.querySelectorAll('.dock-app').forEach(a => {
    const id = a.dataset.id;
    a.classList.toggle('is-open', state.windows.some(w => w.id === id));
  });
}
function cycleFocus(dir) {
  const here = state.windows.filter(w => w.workspace === state.workspace && !w.minimized);
  if (here.length < 1) return;
  here.sort((a,b) => a.z - b.z);
  let idx = here.findIndex(w => w.id === state.focusedId);
  idx = (idx + dir + here.length) % here.length;
  focusWindow(here[idx].id);
}

function createWindowEl(meta, x, y) {
  const winEl = el('div', { class:'window', style:{ left:x+'px', top:y+'px', width:meta.w+'px', height:meta.h+'px' }});
  const closeIco = '<svg viewBox="0 0 8 8" fill="none" stroke="rgba(0,0,0,0.6)" stroke-width="1"><line x1="2" y1="2" x2="6" y2="6"/><line x1="6" y1="2" x2="2" y2="6"/></svg>';
  const minIco   = '<svg viewBox="0 0 8 8" fill="none" stroke="rgba(0,0,0,0.6)" stroke-width="1"><line x1="2" y1="4" x2="6" y2="4"/></svg>';
  const maxIco   = '<svg viewBox="0 0 8 8" fill="none" stroke="rgba(0,0,0,0.6)" stroke-width="1"><polyline points="2 5 2 2 5 2"/><polyline points="3 6 6 6 6 3"/></svg>';
  winEl.innerHTML = `
    <div class="window__chrome">
      <div class="tlights">
        <span class="tl" data-act="close" title="Close">${closeIco}</span>
        <span class="tl" data-act="min"   title="Minimize">${minIco}</span>
        <span class="tl" data-act="max"   title="Maximize">${maxIco}</span>
      </div>
      <div class="window__title">${escapeHtml(meta.title)}<span class="ja">${escapeHtml(meta.titleJa)}</span></div>
      <div class="window__chrome-spacer"></div>
    </div>
    <div class="window__body"></div>
    <div class="window__resize" title="resize"></div>
  `;
  const body = winEl.querySelector('.window__body');
  const chrome = winEl.querySelector('.window__chrome');
  const resizer = winEl.querySelector('.window__resize');
  // traffic-light buttons
  winEl.querySelector('.tl[data-act=close]').addEventListener('click', (e) => { e.stopPropagation(); closeWindow(meta.id); });
  winEl.querySelector('.tl[data-act=min]').addEventListener('click',   (e) => { e.stopPropagation(); minimizeWindow(meta.id); });
  winEl.querySelector('.tl[data-act=max]').addEventListener('click',   (e) => { e.stopPropagation(); maximizeWindow(meta.id); });
  // focus on click
  winEl.addEventListener('mousedown', () => focusWindow(meta.id));
  // right-click context menu on chrome
  chrome.addEventListener('contextmenu', (e) => { e.preventDefault(); openContextMenu(e.clientX, e.clientY, buildWindowContextMenu(meta.id)); });
  // double-click chrome → toggle maximize
  chrome.addEventListener('dblclick', (e) => { if (e.target.closest('.tl')) return; maximizeWindow(meta.id); });
  // drag with snap preview
  let drag = null;
  chrome.addEventListener('mousedown', (e) => {
    if (e.target.closest('.tl')) return;
    const w = state.windows.find(w => w.id === meta.id);
    if (w && w.maximized) {
      // un-maximize on drag so the user can re-position freely
      maximizeWindow(meta.id);
    }
    chrome.classList.add('is-dragging');
    const rect = winEl.getBoundingClientRect();
    drag = { dx: e.clientX - rect.left, dy: e.clientY - rect.top, snap: null };
    e.preventDefault();
  });
  window.addEventListener('mousemove', (e) => {
    if (!drag) return;
    const wrap = document.querySelector('.windows').getBoundingClientRect();
    let nx = e.clientX - wrap.left - drag.dx;
    let ny = e.clientY - wrap.top - drag.dy;
    nx = Math.max(-40, Math.min(wrap.width - 80, nx));
    ny = Math.max(0, Math.min(wrap.height - 30, ny));
    winEl.style.left = nx + 'px';
    winEl.style.top = ny + 'px';
    // snap preview
    const ex = e.clientX, ey = e.clientY;
    const wrapEl = wrap;
    let snap = null;
    if (ey - wrapEl.top < 6) snap = 'max';
    else if (ex - wrapEl.left < 6) snap = 'left';
    else if (wrapEl.right - ex < 6) snap = 'right';
    drag.snap = snap;
    showSnapPreview(snap, wrapEl);
  });
  window.addEventListener('mouseup', (e) => {
    if (!drag) return;
    chrome.classList.remove('is-dragging');
    if (drag.snap) {
      const w = state.windows.find(w => w.id === meta.id);
      if (w) snapWindow(w, drag.snap);
    }
    drag = null;
    showSnapPreview(null);
  });
  // resize
  let res = null;
  resizer.addEventListener('mousedown', (e) => {
    e.stopPropagation();
    const rect = winEl.getBoundingClientRect();
    res = { sx: e.clientX, sy: e.clientY, sw: rect.width, sh: rect.height };
    e.preventDefault();
  });
  window.addEventListener('mousemove', (e) => {
    if (!res) return;
    const nw = Math.max(360, res.sw + (e.clientX - res.sx));
    const nh = Math.max(240, res.sh + (e.clientY - res.sy));
    winEl.style.width = nw + 'px';
    winEl.style.height = nh + 'px';
  });
  window.addEventListener('mouseup', () => { res = null; });

  const winRec = { id: meta.id, el: winEl, z: 0, instance: null, workspace: state.workspace, maximized: false, minimized: false, prev: null };
  // Mount the app
  const mounter = APP_MOUNTERS[meta.id];
  winRec.instance = mounter ? mounter(body) : null;
  return winRec;
}

// Snap preview overlay
function showSnapPreview(side, wrapRect) {
  let p = document.querySelector('.snap-preview');
  if (!side) { if (p) p.classList.remove('is-show'); return; }
  if (!p) {
    p = el('div', { class:'snap-preview' });
    document.body.appendChild(p);
  }
  const w = wrapRect || document.querySelector('.windows').getBoundingClientRect();
  let s = { left: w.left, top: w.top, width: w.width, height: w.height };
  if (side === 'left')  s = { left: w.left,             top: w.top, width: w.width/2, height: w.height };
  if (side === 'right') s = { left: w.left + w.width/2, top: w.top, width: w.width/2, height: w.height };
  if (side === 'max')   s = { left: w.left,             top: w.top, width: w.width,   height: w.height };
  Object.assign(p.style, { left: s.left+'px', top: s.top+'px', width: s.width+'px', height: s.height+'px' });
  p.classList.add('is-show');
}
function snapWindow(w, side) {
  const wrap = document.querySelector('.windows').getBoundingClientRect();
  w.el.classList.add('is-snapping');
  let s = null;
  if (side === 'left')  s = { left: 0,           top: 0, width: wrap.width/2, height: wrap.height };
  if (side === 'right') s = { left: wrap.width/2,top: 0, width: wrap.width/2, height: wrap.height };
  if (side === 'max') { maximizeWindow(w.id); setTimeout(() => w.el.classList.remove('is-snapping'), 220); return; }
  if (s) {
    Object.assign(w.el.style, { left: s.left+'px', top: s.top+'px', width: s.width+'px', height: s.height+'px' });
    setTimeout(() => w.el.classList.remove('is-snapping'), 220);
  }
}

// ====================================================================
// Boot screen
// ====================================================================
function startBoot() {
  const boot = el('div', { class:'boot' });
  boot.innerHTML = `
    <div class="boot__inner">
      <div class="boot__title">MIA<span class="boot__cursor"></span></div>
      <div class="boot__bar"><div class="boot__bar-fill"></div></div>
      <div class="boot__meta"><span class="boot__pct">0%</span><span>OS '26</span></div>
      <div class="boot__sub" data-en="Studio MIA — A White Hacking Security Desktop">Studio MIA — A White Hacking Security Desktop</div>
      <div class="boot__sub-ja">ホワイトハッキングのためのOS</div>
      <div class="boot__loading">preparing window manager...</div>
    </div>
    <div class="boot__skip">press space or enter to skip</div>
  `;
  document.body.appendChild(boot);
  const fill = boot.querySelector('.boot__bar-fill');
  const pct = boot.querySelector('.boot__pct');
  const loading = boot.querySelector('.boot__loading');
  const messages = [
    [0.00,'preparing window manager...'],
    [0.35,'loading theme...'],
    [0.70,'warming up SHA-256 self-test...'],
    [1.05,'registering apps...'],
    [1.40,'checking ethics policy (see ETHICS.md)...'],
    [1.75,'polishing the wallpaper...'],
    [2.10,'ready -> launching desktop'],
  ];
  const total = 2.6;
  const start = performance.now();
  let done = false;
  function finish() {
    if (done) return; done = true;
    boot.classList.add('is-done');
    setTimeout(() => boot.remove(), 500);
    state.bootDone = true;
    onBootComplete();
  }
  function tick() {
    if (done) return;
    const t = (performance.now() - start) / 1000;
    const p = Math.min(1, t / total);
    fill.style.width = (p * 100) + '%';
    pct.textContent = Math.round(p * 100) + '%';
    let msg = messages[0][1];
    for (const [tt, m] of messages) if (t >= tt) msg = m;
    if (loading.textContent !== msg) loading.textContent = msg;
    if (p >= 1) finish(); else requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
  const skip = (e) => {
    if (e.type === 'click' || e.code === 'Space' || e.code === 'Enter' || e.code === 'Escape') {
      finish();
      window.removeEventListener('keydown', skip);
      boot.removeEventListener('click', skip);
    }
  };
  window.addEventListener('keydown', skip);
  boot.addEventListener('click', skip);
}

function onBootComplete() {
  buildShell();
  applySettings();
  setTimeout(() => openWindow('welcome'), 200);
  setTimeout(showWelcomeNotif, 900);
}

// ====================================================================
// Custom cursor — dual-layer dot + easing ring
// ====================================================================
let _cursorInited = false;
function initCustomCursor() {
  // Skip on touch / coarse pointer devices
  if (window.matchMedia && window.matchMedia('(pointer:coarse)').matches) return;
  if (_cursorInited) return;
  _cursorInited = true;
  // Remove any stale cursor elements (e.g. from a hot-reloaded prior init)
  document.querySelectorAll('.miaos-cursor-dot, .miaos-cursor-ring').forEach(n => n.remove());
  const html = document.documentElement;
  html.classList.add('miaos-cursor-on');
  const dot = el('div', { class:'miaos-cursor-dot is-hidden' });
  const ring = el('div', { class:'miaos-cursor-ring is-hidden' });
  document.body.appendChild(dot);
  document.body.appendChild(ring);

  let mx = -100, my = -100;     // raw mouse
  let dx = -100, dy = -100;     // dot (lerps fast)
  let rx = -100, ry = -100;     // ring (lerps slow for trailing feel)
  let inside = false;

  const HOVER_SEL = 'a, button, [role="button"], .dock-app, .menubar__item, .menubar__brand, .spot__row, .finder__cell, .br-shortcut, .br-result__title, .br-result__act, .br-search__ext, .window__btn, .tl, .ps-modal-back, label, select, [data-menu], [data-app], [data-go], [data-act]';
  const TEXT_SEL = 'input:not([type="checkbox"]):not([type="radio"]):not([type="button"]):not([type="submit"]), textarea, [contenteditable]';

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    if (!inside) { inside = true; dot.classList.remove('is-hidden'); ring.classList.remove('is-hidden'); }
    const target = e.target;
    const isText = target && target.closest && target.closest(TEXT_SEL);
    const isHover = !isText && target && target.closest && target.closest(HOVER_SEL);
    ring.classList.toggle('is-hover', !!isHover);
    dot.classList.toggle('is-hover', !!isHover);
    ring.classList.toggle('is-text', !!isText);
    dot.classList.toggle('is-text', !!isText);
  }, { passive: true });

  document.addEventListener('mouseleave', () => { inside = false; dot.classList.add('is-hidden'); ring.classList.add('is-hidden'); });
  document.addEventListener('mouseenter', () => { inside = true; dot.classList.remove('is-hidden'); ring.classList.remove('is-hidden'); });
  document.addEventListener('mousedown', () => { ring.classList.add('is-press'); dot.classList.add('is-press'); }, { passive: true });
  document.addEventListener('mouseup',   () => { ring.classList.remove('is-press'); dot.classList.remove('is-press'); }, { passive: true });
  window.addEventListener('blur', () => { dot.classList.add('is-hidden'); ring.classList.add('is-hidden'); });
  window.addEventListener('focus', () => { if (inside) { dot.classList.remove('is-hidden'); ring.classList.remove('is-hidden'); }});

  function tick() {
    // Dot snaps to the mouse with no visible lag; ring eases for a graceful trailing feel
    dx = mx; dy = my;
    rx += (mx - rx) * 0.22;
    ry += (my - ry) * 0.22;
    dot.style.transform = `translate3d(${dx}px,${dy}px,0) translate(-50%,-50%)`;
    ring.style.transform = `translate3d(${rx}px,${ry}px,0) translate(-50%,-50%)`;
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

// ====================================================================
// Shell (menubar, dock, windows root)
// ====================================================================
function buildShell() {
  const root = $('#root');
  root.innerHTML = '';

  // Menubar
  const mb = el('div', { class:'menubar' });
  const pagerDots = Array.from({length:state.workspaceCount}, (_,i) => `<span class="dot${i===state.workspace?' is-active':''}" data-w="${i}"></span>`).join('');
  const wifiSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.55a11 11 0 0 1 14 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><circle cx="12" cy="20" r=".8"/></svg>';
  const battSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="18" height="10" rx="2"/><line x1="22" y1="11" x2="22" y2="13"/><rect x="4" y="9.5" width="11" height="5" fill="currentColor" stroke="none"/></svg>';
  const dndSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>';
  mb.innerHTML = `
    <div class="menubar__group">
      <div class="menubar__brand"><span class="menubar__brand-mark" aria-hidden="true"><svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="mia-mark-bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2a2a32"/><stop offset="1" stop-color="#0c0c10"/></linearGradient></defs><rect x="0.5" y="0.5" width="15" height="15" rx="3.6" fill="url(#mia-mark-bg)" stroke="rgba(255,255,255,0.12)"/><rect x="3" y="4" width="10" height="6.6" rx="1" fill="none" stroke="#ffffff" stroke-width="1.1"/><line x1="6.4" y1="13" x2="9.6" y2="13" stroke="#ffffff" stroke-width="1.1" stroke-linecap="round"/><line x1="8" y1="10.6" x2="8" y2="13" stroke="#ffffff" stroke-width="1.1"/></svg></span>STUDIO MIA</div>
      <div class="menubar__wpager" title="${escapeHtml(tx('Workspaces (Cmd+Ctrl+←/→)','ワークスペース'))}">${pagerDots}</div>
      <div class="menubar__item" data-menu="file">${t('FileMenu')}</div>
      <div class="menubar__item" data-menu="window">${tx('Window','ウィンドウ')}</div>
      <div class="menubar__item" data-menu="help">${t('HelpMenu')}</div>
      <div class="menubar__item" data-menu="lang">${t('Language')}</div>
    </div>
    <div class="menubar__spacer"></div>
    <div class="menubar__status">
      <button class="menubar__icon" data-mb="dnd"   title="${escapeHtml(tx('Do Not Disturb','通知を停止'))}">${dndSvg}</button>
      <button class="menubar__icon" data-mb="wifi"  title="Wi-Fi">${wifiSvg}</button>
      <button class="menubar__icon" data-mb="batt"  title="Battery">${battSvg}</button>
    </div>
    <div class="menubar__time" title="${escapeHtml(tx('Notification Center','通知センター'))}"></div>
  `;
  root.appendChild(mb);

  // workspace pager
  mb.querySelectorAll('.menubar__wpager .dot').forEach(d => {
    d.addEventListener('click', e => { e.stopPropagation(); switchWorkspace(parseInt(d.dataset.w, 10)); });
  });
  // dnd toggle
  const dndBtn = mb.querySelector('[data-mb=dnd]');
  const setDndUi = () => dndBtn.classList.toggle('is-on', state.dnd);
  setDndUi();
  dndBtn.addEventListener('click', e => { e.stopPropagation(); state.dnd = !state.dnd; setDndUi(); });
  // wifi / battery — visual only, info popover
  mb.querySelector('[data-mb=wifi]').addEventListener('click', e => {
    e.stopPropagation();
    pushNotification(tx('Network','ネットワーク'), tx('Wi-Fi connected (read-only indicator).','Wi-Fi 接続中（表示専用）。'));
  });
  mb.querySelector('[data-mb=batt]').addEventListener('click', e => {
    e.stopPropagation();
    pushNotification(tx('Battery','バッテリー'), tx('AC power — sandbox build does not read real battery.','AC 電源 — サンドボックスは実バッテリーを参照しません。'));
  });

  // dropdowns wired on click
  let openMenu = null;
  const closeMenu = () => { if (openMenu) { openMenu.remove(); openMenu = null; mb.querySelectorAll('.menubar__item').forEach(i => i.classList.remove('is-open')); }};
  mb.querySelectorAll('.menubar__item[data-menu]').forEach(item => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = item.dataset.menu;
      if (openMenu && openMenu.dataset.id === id) { closeMenu(); return; }
      closeMenu();
      const dd = buildDropdown(id, item.getBoundingClientRect());
      dd.dataset.id = id;
      mb.appendChild(dd);
      item.classList.add('is-open');
      openMenu = dd;
    });
  });
  document.addEventListener('click', () => closeMenu());

  // clock → notification center
  const clockEl = mb.querySelector('.menubar__time');
  const updateClock = () => {
    const d = new Date();
    const dow = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][d.getDay()];
    const mon = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][d.getMonth()];
    const dd = String(d.getDate()).padStart(2,'0');
    const hh = String(d.getHours()).padStart(2,'0');
    const mm = String(d.getMinutes()).padStart(2,'0');
    clockEl.textContent = `${dow} ${dd} ${mon}   ${hh}:${mm}`;
  };
  updateClock();
  setInterval(updateClock, 30000);
  clockEl.addEventListener('click', (e) => { e.stopPropagation(); toggleNotifCenter(); });

  // Windows root
  const winsRoot = el('div', { class:'windows' });
  root.appendChild(winsRoot);

  // Dock — 9 mia-os apps + separator + Finder + Trash (preserved from original mia-os-react)
  const dockWrap = el('div', { class:'dock-wrap' });
  const dock = el('div', { class:'dock' });
  const addTile = (a, content) => {
    const tile = el('button', { class:'dock-app', 'data-id': a.id, 'aria-label': a.title, onclick: () => onDockClick(a.id) });
    tile.innerHTML = `${content || `<span>${escapeHtml(a.icon)}</span>`}<span class="dock-app__indicator"></span><span class="dock-app__tooltip">${escapeHtml(a.title)}<span class="ja">${escapeHtml(a.titleJa)}</span></span>`;
    dock.appendChild(tile);
  };
  // Welcome (leftmost) uses a computer/monitor SVG instead of the '@' character
  const computerSvg = `<svg viewBox="0 0 32 32" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="5.5" width="25" height="16" rx="2"/><line x1="11" y1="27" x2="21" y2="27"/><line x1="16" y1="21.5" x2="16" y2="27"/><line x1="9" y1="27" x2="23" y2="27"/></svg>`;
  // Browser uses a globe/compass SVG (Chrome-inspired but original — no Chrome trade dress)
  const browserSvg = `<svg viewBox="0 0 32 32" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="16" cy="16" r="11"/><line x1="5" y1="16" x2="27" y2="16"/><path d="M16 5a17 17 0 0 1 5 11 17 17 0 0 1-5 11"/><path d="M16 5a17 17 0 0 0-5 11 17 17 0 0 0 5 11"/></svg>`;
  const customIcon = (id) => id === 'welcome' ? computerSvg : (id === 'browser' ? browserSvg : null);
  for (const a of APPS.filter(a => a.pin)) addTile(a, customIcon(a.id));
  dock.appendChild(el('span', { class:'dock__sep' }));
  // Launchpad tile — opens full app grid
  const lpadSvg = `<svg viewBox="0 0 32 32" width="24" height="24" fill="currentColor"><rect x="6" y="6" width="6" height="6" rx="1.6"/><rect x="13" y="6" width="6" height="6" rx="1.6"/><rect x="20" y="6" width="6" height="6" rx="1.6"/><rect x="6" y="13" width="6" height="6" rx="1.6"/><rect x="13" y="13" width="6" height="6" rx="1.6"/><rect x="20" y="13" width="6" height="6" rx="1.6"/><rect x="6" y="20" width="6" height="6" rx="1.6"/><rect x="13" y="20" width="6" height="6" rx="1.6"/><rect x="20" y="20" width="6" height="6" rx="1.6"/></svg>`;
  const lpadTile = el('button', { class:'dock-app', 'data-id':'launchpad', 'aria-label':'Launchpad', onclick: openLauncher });
  lpadTile.innerHTML = `${lpadSvg}<span class="dock-app__indicator"></span><span class="dock-app__tooltip">Launchpad<span class="ja">アプリ一覧</span></span>`;
  dock.appendChild(lpadTile);
  dock.appendChild(el('span', { class:'dock__sep' }));
  addTile(EXTRAS[0]);  // Finder
  // Trash uses an SVG icon
  const trashSvg = `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>`;
  addTile(EXTRAS[1], trashSvg);
  dockWrap.appendChild(dock);
  root.appendChild(dockWrap);

  // Spotlight backdrop
  const spotBack = el('div', { class:'spot-back', onclick: (e) => { if (e.target === spotBack) closeSpotlight(); }});
  const spot = el('div', { class:'spot' });
  spot.innerHTML = `
    <input class="spot__input" type="text" placeholder="${escapeHtml(t('SpotlightHint'))}" spellcheck="false" autocomplete="off">
    <div class="spot__results"></div>
  `;
  spotBack.appendChild(spot);
  root.appendChild(spotBack);

  const spotInput = spot.querySelector('.spot__input');
  const spotResults = spot.querySelector('.spot__results');
  spotInput.addEventListener('input', () => { state.spotlightQuery = spotInput.value; state.spotlightActive = 0; renderSpotlightResults(); });
  spotInput.addEventListener('keydown', (e) => {
    const matches = filterApps(state.spotlightQuery);
    if (e.key === 'Escape') { e.preventDefault(); closeSpotlight(); }
    else if (e.key === 'Enter') {
      e.preventDefault();
      if (matches.length) { openWindow(matches[state.spotlightActive].id); closeSpotlight(); }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      state.spotlightActive = Math.min(matches.length - 1, state.spotlightActive + 1);
      renderSpotlightResults();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      state.spotlightActive = Math.max(0, state.spotlightActive - 1);
      renderSpotlightResults();
    }
  });

  // Notification slot (toast)
  const notif = el('div', { class:'notif' });
  notif.innerHTML = `<div class="notif__title"><span class="notif__title-text"></span><span class="notif__time">now</span></div><div class="notif__body"></div>`;
  root.appendChild(notif);

  // Notification Center
  buildNotifCenter(root);
  // App Launcher
  buildLauncher(root);

  wireGlobalListeners();
  applyWorkspaceVisibility();
}

// Document-level listeners registered exactly once (buildShell may run repeatedly)
let _globalWired = false;
function wireGlobalListeners() {
  if (_globalWired) return;
  _globalWired = true;
  // Desktop right-click context menu (.windows is pointer-events:none, so listen on document)
  document.addEventListener('contextmenu', (e) => {
    if (e.target.closest('.window') || e.target.closest('.menubar') || e.target.closest('.dock')
        || e.target.closest('.ctx') || e.target.closest('.spot') || e.target.closest('.launcher')
        || e.target.closest('.notif-center') || e.target.closest('input') || e.target.closest('textarea')) return;
    e.preventDefault();
    openContextMenu(e.clientX, e.clientY, buildDesktopContextMenu());
  });
  // dismiss context menu / notif center on any click outside them
  document.addEventListener('mousedown', (e) => {
    if (!e.target.closest('.ctx')) closeContextMenu();
    if (!e.target.closest('.notif-center') && !e.target.closest('.menubar__time')) closeNotifCenter();
  });
}

// ====================================================================
// Notification Center
// ====================================================================
function buildNotifCenter(root) {
  const nc = el('div', { class:'notif-center' });
  nc.innerHTML = `
    <div class="notif-center__head">
      <h3>${escapeHtml(tx('Notifications','通知'))}<span class="ja">${escapeHtml(tx('','センター'))}</span></h3>
      <span class="notif-center__clear">${escapeHtml(tx('Clear all','すべて消去'))}</span>
    </div>
    <div class="notif-center__list"></div>
    <div class="notif-center__toggle">
      <span>${escapeHtml(tx('Do Not Disturb','通知を停止'))}</span>
      <span class="sw${state.dnd?' on':''}"></span>
    </div>
  `;
  root.appendChild(nc);
  nc.querySelector('.notif-center__clear').addEventListener('click', () => { state.notifs = []; renderNotifCenter(); });
  nc.querySelector('.sw').addEventListener('click', () => {
    state.dnd = !state.dnd;
    nc.querySelector('.sw').classList.toggle('on', state.dnd);
    document.querySelector('[data-mb=dnd]')?.classList.toggle('is-on', state.dnd);
  });
  renderNotifCenter();
}
function renderNotifCenter() {
  const list = document.querySelector('.notif-center__list');
  if (!list) return;
  if (!state.notifs.length) {
    list.innerHTML = `<div class="notif-center__empty">${escapeHtml(tx('No notifications','通知はありません'))}</div>`;
    return;
  }
  list.innerHTML = state.notifs.map(n => `
    <div class="notif-center__item">
      <div class="t">${escapeHtml(n.title)}<span class="ts">${escapeHtml(n.ts)}</span></div>
      <div class="b">${escapeHtml(n.body)}</div>
    </div>`).join('');
}
function toggleNotifCenter() {
  state.notifCenterOpen ? closeNotifCenter() : openNotifCenter();
}
function openNotifCenter() {
  const nc = document.querySelector('.notif-center');
  if (!nc) return;
  nc.classList.add('is-open');
  state.notifCenterOpen = true;
}
function closeNotifCenter() {
  const nc = document.querySelector('.notif-center');
  if (!nc) return;
  nc.classList.remove('is-open');
  state.notifCenterOpen = false;
}
function pushNotification(title, body) {
  const d = new Date();
  const ts = `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
  state.notifs.unshift({ title, body, ts, id: Date.now() });
  if (state.notifs.length > 50) state.notifs.pop();
  renderNotifCenter();
  if (state.dnd) return;
  // toast
  const n = document.querySelector('.notif');
  if (!n) return;
  n.querySelector('.notif__title-text').textContent = title;
  n.querySelector('.notif__time').textContent = ts;
  n.querySelector('.notif__body').textContent = body;
  n.classList.add('is-open');
  clearTimeout(n._t);
  n._t = setTimeout(() => n.classList.remove('is-open'), 4200);
}

// ====================================================================
// App Launcher (Launchpad)
// ====================================================================
function buildLauncher(root) {
  const lc = el('div', { class:'launcher' });
  lc.innerHTML = `
    <input class="launcher__search" type="text" placeholder="${escapeHtml(tx('Search applications…','アプリケーションを検索…'))}" spellcheck="false" autocomplete="off">
    <div class="launcher__grid"></div>
    <div class="launcher__hint">${escapeHtml(tx('Esc to close · Enter to launch','Esc で閉じる · Enter で起動'))}</div>
  `;
  root.appendChild(lc);
  const search = lc.querySelector('.launcher__search');
  lc.addEventListener('mousedown', (e) => { if (e.target === lc) closeLauncher(); });
  search.addEventListener('input', () => { state.launcherQuery = search.value; renderLauncher(); });
  search.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { e.preventDefault(); closeLauncher(); }
    else if (e.key === 'Enter') {
      const m = filterApps(state.launcherQuery);
      if (m.length) { openWindow(m[0].id); closeLauncher(); }
    }
  });
  renderLauncher();
}
function renderLauncher() {
  const grid = document.querySelector('.launcher__grid');
  if (!grid) return;
  const apps = filterApps(state.launcherQuery);
  grid.innerHTML = apps.map(a => `
    <div class="launcher__cell" data-id="${a.id}">
      <div class="ico">${escapeHtml(a.icon)}</div>
      <div class="name">${escapeHtml(a.title)}</div>
      <div class="ja">${escapeHtml(a.titleJa)}</div>
    </div>`).join('') || `<div style="grid-column:1/-1;text-align:center;color:rgba(255,255,255,0.6);padding:40px">${escapeHtml(t('SpotlightNoMatch'))}</div>`;
  grid.querySelectorAll('.launcher__cell').forEach(c => {
    c.addEventListener('click', () => { openWindow(c.dataset.id); closeLauncher(); });
  });
}
function openLauncher() {
  const lc = document.querySelector('.launcher');
  if (!lc) return;
  state.launcherQuery = '';
  const s = lc.querySelector('.launcher__search');
  s.value = '';
  renderLauncher();
  lc.classList.add('is-open');
  state.launcherOpen = true;
  setTimeout(() => s.focus(), 80);
}
function closeLauncher() {
  const lc = document.querySelector('.launcher');
  if (!lc) return;
  lc.classList.remove('is-open');
  state.launcherOpen = false;
}

// ====================================================================
// Context menu
// ====================================================================
function closeContextMenu() {
  document.querySelectorAll('.ctx').forEach(n => n.remove());
}
function openContextMenu(x, y, rows) {
  closeContextMenu();
  const menu = el('div', { class:'ctx' });
  menu.innerHTML = rows.map(r => {
    if (r === 'hr') return '<hr>';
    return `<div class="row${r.dim?' dim':''}" data-act="${escapeHtml(r.act||'')}">${escapeHtml(r.label)}${r.kbd?`<span class="kbd">${escapeHtml(r.kbd)}</span>`:''}</div>`;
  }).join('');
  document.body.appendChild(menu);
  // keep on screen
  const mw = menu.offsetWidth, mh = menu.offsetHeight;
  menu.style.left = Math.min(x, window.innerWidth - mw - 8) + 'px';
  menu.style.top = Math.min(y, window.innerHeight - mh - 8) + 'px';
  menu.addEventListener('click', (e) => {
    const row = e.target.closest('.row[data-act]'); if (!row || !row.dataset.act) return;
    const r = rows.find(rr => rr !== 'hr' && rr.act === row.dataset.act);
    closeContextMenu();
    if (r && r.fn) r.fn();
  });
}
function buildDesktopContextMenu() {
  return [
    { act:'launcher', label:tx('Open Launchpad','アプリ一覧を開く'), kbd:'⌘⇧A', fn:openLauncher },
    { act:'spot',     label:tx('Spotlight Search','検索'),           kbd:'⌘K',  fn:openSpotlight },
    'hr',
    { act:'wp',       label:tx('Change Wallpaper…','壁紙を変更…'),    fn:() => openWindow('settings') },
    { act:'tidy',     label:tx('Tidy Windows','ウィンドウを整列'),    fn:tidyWindows },
    'hr',
    { act:'closeall', label:tx('Close All Windows','すべて閉じる'),   kbd:'⌘W', fn:closeAllWindows },
    { act:'lock',     label:tx('Lock Screen','画面をロック'),         kbd:'⌃⌘L', fn:lockScreen },
  ];
}
function buildWindowContextMenu(id) {
  const w = state.windows.find(x => x.id === id);
  return [
    { act:'min',  label:tx('Minimize','最小化'),            fn:() => minimizeWindow(id) },
    { act:'max',  label:(w&&w.maximized)?tx('Restore','元に戻す'):tx('Maximize','最大化'), fn:() => maximizeWindow(id) },
    'hr',
    { act:'sl',   label:tx('Snap Left','左に整列'),         fn:() => w&&snapWindow(w,'left') },
    { act:'sr',   label:tx('Snap Right','右に整列'),        fn:() => w&&snapWindow(w,'right') },
    'hr',
    { act:'mv1',  label:tx('Move to Workspace 1','WS1 へ移動'), fn:() => moveWindowToWorkspace(id,0) },
    { act:'mv2',  label:tx('Move to Workspace 2','WS2 へ移動'), fn:() => moveWindowToWorkspace(id,1) },
    { act:'mv3',  label:tx('Move to Workspace 3','WS3 へ移動'), fn:() => moveWindowToWorkspace(id,2) },
    'hr',
    { act:'close',label:tx('Close','閉じる'),               kbd:'⌘W', fn:() => closeWindow(id) },
  ];
}
function moveWindowToWorkspace(id, ws) {
  const w = state.windows.find(x => x.id === id);
  if (!w) return;
  w.workspace = ws;
  applyWorkspaceVisibility();
}
function tidyWindows() {
  const here = state.windows.filter(w => w.workspace === state.workspace && !w.minimized);
  let sx = 80, sy = 70;
  here.forEach((w, i) => {
    if (w.maximized) maximizeWindow(w.id);
    w.el.classList.add('is-snapping');
    w.el.style.left = (sx + i*34) + 'px';
    w.el.style.top  = (sy + i*30) + 'px';
    focusWindow(w.id);
    setTimeout(() => w.el.classList.remove('is-snapping'), 220);
  });
}

// ====================================================================
// Lock screen
// ====================================================================
function lockScreen() {
  if (state.locked) return;
  state.locked = true;
  const lock = el('div', { class:'lock' });
  const fmt = () => {
    const d = new Date();
    return {
      time: `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`,
      date: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][d.getDay()] + ', '
          + ['January','February','March','April','May','June','July','August','September','October','November','December'][d.getMonth()]
          + ' ' + d.getDate(),
    };
  };
  const f = fmt();
  lock.innerHTML = `
    <div class="lock__brand">mia</div>
    <div class="lock__time">${f.time}</div>
    <div class="lock__date">${escapeHtml(f.date)}</div>
    <div class="lock__hint">${escapeHtml(tx('enter passcode to unlock','パスコードを入力して解除'))}</div>
    <input class="lock__input" type="password" placeholder="••••" spellcheck="false" autocomplete="off">
    <div class="lock__err"></div>
  `;
  document.body.appendChild(lock);
  const input = lock.querySelector('.lock__input');
  const err = lock.querySelector('.lock__err');
  const timeEl = lock.querySelector('.lock__time');
  const clk = setInterval(() => { timeEl.textContent = fmt().time; }, 10000);
  const unlock = () => {
    clearInterval(clk);
    lock.classList.add('is-out');
    setTimeout(() => lock.remove(), 280);
    state.locked = false;
  };
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      // demo passcode: "mia" or "0000" — also empty passes for convenience
      if (input.value === 'mia' || input.value === '0000' || input.value === '') unlock();
      else { err.textContent = tx('incorrect passcode','パスコードが違います'); input.value = ''; }
    }
  });
  setTimeout(() => input.focus(), 100);
}

function buildDropdown(id, anchorRect) {
  const dd = el('div', { class:'menubar__dropdown', style:{ left: (anchorRect.left - 14) + 'px' }});
  if (id === 'file') {
    dd.innerHTML = `
      <div class="row" data-act="new">${t('NewWindow')}<span class="kbd">⌘1</span></div>
      <div class="row" data-act="launcher">${tx('Open Launchpad','アプリ一覧')}<span class="kbd">⌘⇧A</span></div>
      <div class="row" data-act="spot">${t('OpenSpotlight')}<span class="kbd">⌘K</span></div>
      <hr>
      <div class="row" data-act="lock">${tx('Lock Screen','画面をロック')}<span class="kbd">⌃⌘L</span></div>
      <div class="row dim" data-act="print">${t('Print')}</div>
      <hr>
      <div class="row" data-act="closeall">${t('CloseAllWindows')}<span class="kbd">⌘W</span></div>
    `;
    dd.addEventListener('click', (e) => {
      const row = e.target.closest('.row[data-act]'); if (!row) return;
      const a = row.dataset.act;
      if (a === 'new') openWindow('welcome');
      else if (a === 'launcher') openLauncher();
      else if (a === 'spot') openSpotlight();
      else if (a === 'lock') lockScreen();
      else if (a === 'closeall') closeAllWindows();
    });
  } else if (id === 'window') {
    const here = state.windows.filter(w => w.workspace === state.workspace);
    const list = here.length
      ? here.map(w => `<div class="row" data-act="focus:${w.id}">${escapeHtml(APP_BY_ID[w.id].title)}${w.minimized?` <span class="kbd">${escapeHtml(tx('min','最小'))}</span>`:''}</div>`).join('')
      : `<div class="row dim">${escapeHtml(tx('No open windows','開いているウィンドウなし'))}</div>`;
    dd.innerHTML = `
      <div class="row" data-act="tidy">${tx('Tidy Windows','ウィンドウを整列')}</div>
      <div class="row" data-act="tasks">${tx('Task Manager','タスクマネージャ')}</div>
      <hr>
      <div class="row dim" style="font-size:11px">${escapeHtml(tx('Workspace ','ワークスペース ') + (state.workspace+1))}</div>
      ${list}
    `;
    dd.addEventListener('click', (e) => {
      const row = e.target.closest('.row[data-act]'); if (!row) return;
      const a = row.dataset.act;
      if (a === 'tidy') tidyWindows();
      else if (a === 'tasks') openWindow('taskmgr');
      else if (a.startsWith('focus:')) {
        const wid = a.slice(6);
        const w = state.windows.find(x => x.id === wid);
        if (w && w.minimized) restoreFromMin(w);
        focusWindow(wid);
      }
    });
  } else if (id === 'help') {
    dd.innerHTML = `
      <div class="row" data-act="welcome">${t('Welcome')}</div>
      <div class="row" data-act="ethics">${t('EthicsTitle')}</div>
    `;
    dd.addEventListener('click', (e) => {
      const row = e.target.closest('.row[data-act]'); if (!row) return;
      openWindow(row.dataset.act);
    });
  } else if (id === 'lang') {
    dd.innerHTML = `
      <div class="row" data-act="en"><span><span class="check">${LANG==='en'?'✓':''}</span>English</span></div>
      <div class="row" data-act="ja"><span><span class="check">${LANG==='ja'?'✓':''}</span>日本語</span></div>
    `;
    dd.addEventListener('click', (e) => {
      const row = e.target.closest('.row[data-act]'); if (!row) return;
      LANG = row.dataset.act;
      try { localStorage.setItem('miaos.lang', LANG); } catch(_) {}
      // Re-render shell + reopen all windows fresh to refresh labels
      const openIds = state.windows.map(w => w.id);
      closeAllWindows();
      buildShell();
      setTimeout(() => { openIds.forEach(id => openWindow(id)); }, 250);
    });
  }
  return dd;
}

// ====================================================================
// Spotlight
// ====================================================================
function openSpotlight() {
  const back = $('.spot-back'); back.classList.add('is-open');
  const input = $('.spot__input'); input.value = ''; state.spotlightQuery = ''; state.spotlightActive = 0;
  renderSpotlightResults();
  setTimeout(() => input.focus(), 50);
  state.spotlightOpen = true;
}
function closeSpotlight() {
  $('.spot-back').classList.remove('is-open');
  state.spotlightOpen = false;
}
function filterApps(q) {
  q = q.trim().toLowerCase();
  if (!q) return APPS;
  return APPS.filter(a => a.title.toLowerCase().includes(q) || a.titleJa.includes(q) || a.id.includes(q));
}
function renderSpotlightResults() {
  const wrap = $('.spot__results');
  wrap.innerHTML = '';
  const matches = filterApps(state.spotlightQuery);
  if (!matches.length) {
    wrap.appendChild(el('div', { class:'spot__empty' }, t('SpotlightNoMatch')));
    return;
  }
  matches.forEach((a, i) => {
    const idx = APPS.findIndex(x => x.id === a.id);
    const row = el('div', { class:'spot__row' + (i === state.spotlightActive ? ' is-active' : ''), onclick: () => { openWindow(a.id); closeSpotlight(); }});
    row.innerHTML = `<span class="ico">${escapeHtml(a.icon)}</span><span><span class="name">${escapeHtml(a.title)}</span><span class="ja">${escapeHtml(a.titleJa)}</span></span><span class="kbd">⌘${idx+1}</span>`;
    wrap.appendChild(row);
  });
}

// ====================================================================
// Notification
// ====================================================================
function showWelcomeNotif() {
  if (state.notifShown) return;
  state.notifShown = true;
  pushNotification(t('NotifTitle'), I18N.NotifBody[LANG]);
}

// ====================================================================
// Keyboard shortcuts
// ====================================================================
window.addEventListener('keydown', (e) => {
  if (!state.bootDone) return;
  if (state.locked) return;
  const meta = e.metaKey || e.ctrlKey;
  const ctrl = e.ctrlKey, metaOnly = e.metaKey;
  // Escape closes overlays
  if (e.key === 'Escape') {
    if (state.launcherOpen) { e.preventDefault(); closeLauncher(); return; }
    if (state.spotlightOpen) { e.preventDefault(); closeSpotlight(); return; }
    if (state.notifCenterOpen) { e.preventDefault(); closeNotifCenter(); return; }
    closeContextMenu();
  }
  // Lock screen — Ctrl+Cmd+L (or Ctrl+Alt+L on win)
  if (ctrl && (metaOnly || e.altKey) && e.key.toLowerCase() === 'l') { e.preventDefault(); lockScreen(); return; }
  // Launchpad — Cmd/Ctrl+Shift+A
  if (meta && e.shiftKey && e.key.toLowerCase() === 'a') { e.preventDefault(); state.launcherOpen ? closeLauncher() : openLauncher(); return; }
  // Workspace switch — Cmd/Ctrl + Ctrl + Arrow, or Cmd/Ctrl+Shift+1-3
  if (meta && ctrl && e.key === 'ArrowRight') { e.preventDefault(); switchWorkspace(state.workspace + 1); return; }
  if (meta && ctrl && e.key === 'ArrowLeft')  { e.preventDefault(); switchWorkspace(state.workspace - 1); return; }
  // Spotlight
  if (meta && !e.shiftKey && e.key.toLowerCase() === 'k') { e.preventDefault(); state.spotlightOpen ? closeSpotlight() : openSpotlight(); return; }
  // Close focused window
  if (meta && !e.shiftKey && e.key.toLowerCase() === 'w') { e.preventDefault(); if (state.focusedId) closeWindow(state.focusedId); return; }
  // Minimize / Maximize focused window
  if (meta && e.key.toLowerCase() === 'm') { e.preventDefault(); if (state.focusedId) minimizeWindow(state.focusedId); return; }
  if (ctrl && e.key === 'ArrowUp' && state.focusedId) { e.preventDefault(); maximizeWindow(state.focusedId); return; }
  // Cycle windows — Cmd/Ctrl+`
  if (meta && e.key === '`') { e.preventDefault(); cycleFocus(e.shiftKey ? -1 : 1); return; }
  // Launch pinned dock app by index — Cmd/Ctrl+1-9 (pinned set)
  if (meta && !e.shiftKey && /^[1-9]$/.test(e.key)) {
    e.preventDefault();
    const pinned = APPS.filter(a => a.pin);
    const idx = parseInt(e.key, 10) - 1;
    if (pinned[idx]) openWindow(pinned[idx].id);
  }
});

// ====================================================================
// APPS: Welcome
// ====================================================================
function mountWelcome(root) {
  const en = LANG === 'en';
  const body = en
    ? `Welcome to MiaOS.\nA minimal desktop environment originally written in C and C++ on SDL2 + Dear ImGui, here re-implemented as vanilla JavaScript inside an iframe.\nIt bundles a set of white hacking tools — hashing, encoding, network info, a localhost-only port scanner — for learning and defensive work.\nIt is not a real kernel; it is a desktop shell.`
    : `ようこそ MiaOS へ。\n本来は C / C++ + SDL2 + Dear ImGui で構築されたデスクトップ環境を、ここではバニラ JavaScript として iframe 内に再実装しています。\nホワイトハッキング用の小さな調査ツール群（ハッシュ、エンコーダ、ネットワーク情報、ループバック専用ポートスキャナ）を搭載。\n本物のカーネルではなく「デスクトップ・シェル」として動作します。`;
  const toolsHead = tx('Analysis tools', '搭載ツール');
  const toolsBody = en
    ? `Hash (MD5/SHA-1/SHA-256), Encoder (Base64/Hex/URL/ROT13), Net Info (mock), Port Scanner (loopback mock), Port Reference, Log Viewer.\nAdded: JWT Inspector with HS256/384/512 verification, CIDR / subnet calculator, Password Strength Meter (entropy), HMAC tool with constant-time compare, Regex Tester, and a Chrome-style Browser with DuckDuckGo search.\nAll analysis tools run locally; only the Browser issues normal user-driven HTTP(S) requests.`
    : `ハッシュ計算 (MD5 / SHA-1 / SHA-256)・エンコーダ (Base64 / Hex / URL / ROT13)・ネット情報（模擬）・ポートスキャナ（ループバック模擬）・ポート早見表・ログビューア。\n追加: JWT インスペクタ（HS256/384/512 署名検証）・CIDR / サブネット計算機・パスワード強度計（エントロピー算出）・HMAC ツール（定数時間比較）・正規表現テスター・Chrome 風ブラウザ（DuckDuckGo 検索付き）。\n解析系ツールはタブ内で完結。ブラウザのみ、通常のユーザー操作による HTTP(S) リクエストを発生させます。`;
  const safetyHead = tx('Safety & legality', '安全と法令順守');
  const safetyBody = en
    ? `Analysis tools execute no OS commands, send no traffic, and store nothing beyond your language preference.\nThe Browser app loads pages only when you type a URL or run a search — exactly like any normal browser. Many sites refuse iframe embedding (X-Frame-Options / CSP); MiaOS respects those refusals.\nNo attack-sending, credential-cracking, or auto-propagating features are included.`
    : `解析系ツールは OS コマンド実行・通信を行わず、保存するのは言語設定のみです。\nブラウザアプリは、ユーザーが URL 入力または検索した時にのみページを読み込みます。これは通常のブラウザと同じ動作です。多くのサイトは iframe 表示を拒否 (X-Frame-Options / CSP) しますが、MiaOS はその意思を尊重します。\n攻撃送信・認証突破・自動拡散機能は一切搭載していません。不正アクセス禁止法・刑法 168 条の 2 等に抵触する機能は実装されていません。`;
  const rulesHead = tx('First, read the rules', 'まず行動規範を確認してください');
  const rulesBody = en
    ? `Open the "Code of Conduct" app from the dock or with Cmd/Ctrl+9.\nMiaOS is for defenders, learners, and authorized researchers.\nIt must not be used to attack systems you do not own.`
    : `ドックまたは Cmd/Ctrl+9 で「行動規範」アプリを開いてください。\nMiaOS は防御者・学習者・許可されたリサーチャーのためのものです。\n所有していないシステムへの攻撃に使用してはいけません。`;
  const keysHead = tx('Quick keys', '主なキー操作');
  const keys = [
    ['Cmd/Ctrl + K',   'Spotlight (search apps)',           '検索（アプリを探す）'],
    ['Cmd/Ctrl + 1-9', 'Launch a dock app directly',        'ドックアプリを直接起動'],
    ['Cmd/Ctrl + W',   'Close the focused window',          'フォーカス中のウィンドウを閉じる'],
    ['Esc',            'Close Spotlight',                   '検索を閉じる'],
  ];

  root.innerHTML = `
    <div class="app-header">
      <h1>MiaOS</h1>
      <div class="app-sub">${escapeHtml(t('WelcomeSub'))}</div>
    </div>
    <div class="hr"></div>
    <p style="white-space:pre-line;line-height:1.7;color:var(--t-2);font-size:13px">${escapeHtml(body)}</p>
    <p style="margin-top:14px;color:var(--t-1);font-weight:500">${escapeHtml(toolsHead)}</p>
    <p style="white-space:pre-line;line-height:1.7;color:var(--t-2);font-size:12.5px;margin-top:4px">${escapeHtml(toolsBody)}</p>
    <p style="margin-top:14px;color:var(--accent);font-weight:500">${escapeHtml(rulesHead)}</p>
    <p style="white-space:pre-line;line-height:1.7;color:var(--t-2);font-size:12.5px;margin-top:4px">${escapeHtml(rulesBody)}</p>
    <p style="margin-top:14px;color:var(--t-1);font-weight:500">${escapeHtml(safetyHead)}</p>
    <p style="white-space:pre-line;line-height:1.7;color:var(--t-2);font-size:12.5px;margin-top:4px">${escapeHtml(safetyBody)}</p>
    <p style="margin-top:14px;color:var(--t-1);font-weight:500">${escapeHtml(keysHead)}</p>
    <table class="welcome-keys">
      ${keys.map(([k,a,j]) => `<tr><td>${escapeHtml(k)}</td><td>${en ? escapeHtml(a) + `<span class="ja">${escapeHtml(j)}</span>` : escapeHtml(j)}</td></tr>`).join('')}
    </table>
  `;
}

// ====================================================================
// APPS: Terminal
// ====================================================================
function mountTerminal(root) {
  root.innerHTML = `<div class="term"><div class="term__scroll"></div><div class="term__input-row"><span class="term__prompt">mia@miaos $</span><input class="term__input" type="text" autocomplete="off" spellcheck="false"></div></div>`;
  const scroll = root.querySelector('.term__scroll');
  const input = root.querySelector('.term__input');
  const history = []; let histIdx = -1;

  const print = (text, cls = '') => {
    const line = el('div', { class: 'term__line' + (cls ? ' ' + cls : '') }, text);
    scroll.appendChild(line);
    scroll.scrollTop = scroll.scrollHeight;
  };
  const printRaw = (html) => {
    const line = el('div', { class:'term__line' });
    line.innerHTML = html;
    scroll.appendChild(line);
    scroll.scrollTop = scroll.scrollHeight;
  };

  // boot lines
  print(`MiaOS terminal v0.1  -  type 'help' for command list`, 'muted');
  print(`white hacking sandbox shell / ホワイトハッキング用サンドボックス`, 'muted');
  print(' ');

  const commands = {
    help: () => {
      print(`Available commands / 利用可能なコマンド:`);
      print(`  help              this message / このヘルプ`);
      print(`  whoami            print current user`);
      print(`  uname             kernel / system info`);
      print(`  date              current local time`);
      print(`  ls [/path]        list a fake filesystem`);
      print(`  echo <text>       print text`);
      print(`  hash <text>       MD5 / SHA-1 / SHA-256 of <text>`);
      print(`  b64 <text>        base64-encode <text>`);
      print(`  clear             clear the scrollback`);
      print(' ');
      print(`This is a sandboxed shell - it cannot run real system commands.`, 'muted');
    },
    whoami: () => print('mia'),
    uname:  () => print('MiaOS (sandbox)  shell  v0.1'),
    date:   () => {
      const d = new Date();
      const off = -d.getTimezoneOffset();
      const sign = off >= 0 ? '+' : '-';
      const oh = String(Math.abs(Math.floor(off / 60))).padStart(2, '0');
      const om = String(Math.abs(off % 60)).padStart(2, '0');
      const ts = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')} ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}:${String(d.getSeconds()).padStart(2,'0')} ${sign}${oh}${om}`;
      print(ts);
    },
    ls: (args) => {
      const p = (args[0] || '/').replace(/\/+$/, '') || '/';
      const map = {
        '/':           'bin/   etc/   home/   usr/   var/   tmp/',
        '/home':       'mia/',
        '/home/mia':   'notes.txt   tools/   reports/',
        '/bin':        'ls   cat   echo   hash   b64   uname   whoami',
      };
      const out = map[p];
      if (out) printRaw(`<span class="accent">${escapeHtml(out)}</span>`);
      else printRaw(`<span class="danger">ls: cannot access '${escapeHtml(args[0]||'/')}': No such file or directory</span>`);
    },
    dir: (args) => commands.ls(args),
    echo: (args) => print(args.join(' ')),
    hash: async (args) => {
      if (!args.length) { printRaw('<span class="warn">usage: hash &lt;text&gt;</span>'); return; }
      const text = args.join(' ');
      const m = md5(text);
      const s1 = await sha('SHA-1', text);
      const s2 = await sha('SHA-256', text);
      print(`MD5    : ${m}`);
      print(`SHA-1  : ${s1}`);
      print(`SHA-256: ${s2}`);
    },
    sum: (args) => commands.hash(args),
    b64: (args) => {
      if (!args.length) { printRaw('<span class="warn">usage: b64 &lt;text&gt;</span>'); return; }
      print(b64encode(args.join(' ')));
    },
    base64: (args) => commands.b64(args),
    clear: () => { scroll.innerHTML = ''; },
    cls:   () => commands.clear(),
    exit:  () => printRaw('<span class="muted">(use the window close button or Cmd/Ctrl+W to close)</span>'),
    quit:  () => commands.exit(),
  };

  async function run(line) {
    if (!line.trim()) { printRaw(`<span class="term__prompt-line">mia@miaos $</span>`); return; }
    history.push(line); if (history.length > 200) history.shift(); histIdx = -1;
    printRaw(`<span class="term__prompt-line">mia@miaos $ ${escapeHtml(line)}</span>`);
    const parts = line.trim().split(/\s+/);
    const cmd = parts[0]; const args = parts.slice(1);
    if (commands[cmd]) await commands[cmd](args);
    else printRaw(`<span class="danger">${escapeHtml(cmd)}: command not found - try 'help'</span>`);
  }
  input.addEventListener('keydown', async (e) => {
    if (e.key === 'Enter') { e.preventDefault(); const v = input.value; input.value = ''; await run(v); input.focus(); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); if (history.length) { histIdx = histIdx < 0 ? history.length - 1 : Math.max(0, histIdx - 1); input.value = history[histIdx]; }}
    else if (e.key === 'ArrowDown') { e.preventDefault(); if (histIdx >= 0) { histIdx++; if (histIdx >= history.length) { histIdx = -1; input.value = ''; } else input.value = history[histIdx]; }}
  });
  setTimeout(() => input.focus(), 100);
  return { dispose: () => {} };
}

// ====================================================================
// APPS: Hash Tool
// ====================================================================
function mountHash(root) {
  root.innerHTML = `
    <div class="app-header">
      <h1>${escapeHtml(tx('Hash Tool','ハッシュ計算'))}</h1>
      <div class="app-sub">MD5 / SHA-1 / SHA-256</div>
    </div>
    <div class="hr"></div>
    <span class="label">${escapeHtml(tx('Input / 入力','入力 / Input'))}</span>
    <textarea class="textarea" id="h-in" rows="5" spellcheck="false"></textarea>
    <div class="muted" id="h-bytes" style="font-size:11px;margin-top:4px"></div>
    <div class="hr"></div>
    <div class="hash-out"><span class="lbl warn">MD5</span><input id="h-md5" readonly></div>
    <div class="hash-out"><span class="lbl warn">SHA-1</span><input id="h-sha1" readonly></div>
    <div class="hash-out"><span class="lbl acc">SHA-256</span><input id="h-sha256" readonly></div>
    <p class="muted" style="font-size:11px;margin-top:10px;line-height:1.6">${tx(
      'MD5 and SHA-1 are highlighted because they are no longer collision-resistant. Use them only for non-security checksums (e.g. matching a vendor-provided value). For new work prefer SHA-256.',
      'MD5 / SHA-1 は衝突耐性が破られているため、新規用途では SHA-256 を推奨。')}</p>
    <div class="hr"></div>
    <span class="label">${escapeHtml(tx('Compare two hex digests','ハッシュ照合'))}</span>
    <div style="display:flex;gap:8px;align-items:center;margin:6px 0 10px">
      <select class="input" id="h-algo" style="width:auto">
        <option value="MD5">MD5 (32)</option>
        <option value="SHA-1">SHA-1 (40)</option>
        <option value="SHA-256" selected>SHA-256 (64)</option>
      </select>
    </div>
    <div class="ps-grid" style="grid-template-columns:140px 1fr;margin:8px 0">
      <span class="label" style="margin:0">${escapeHtml(tx('expected / 期待値','expected / 期待値'))}</span>
      <input class="input" id="h-exp" spellcheck="false" style="font-family:var(--font-mono);font-size:11px">
      <span class="label" style="margin:0">${escapeHtml(tx('actual / 実測値','actual / 実測値'))}</span>
      <input class="input" id="h-act" spellcheck="false" style="font-family:var(--font-mono);font-size:11px">
    </div>
    <div id="h-status"></div>
  `;
  const inp = root.querySelector('#h-in');
  const bytes = root.querySelector('#h-bytes');
  const md5In = root.querySelector('#h-md5');
  const sha1In = root.querySelector('#h-sha1');
  const sha256In = root.querySelector('#h-sha256');
  const algo = root.querySelector('#h-algo');
  const exp = root.querySelector('#h-exp');
  const act = root.querySelector('#h-act');
  const status = root.querySelector('#h-status');

  async function compute() {
    const text = inp.value;
    bytes.textContent = `${new TextEncoder().encode(text).length} byte(s)`;
    md5In.value = md5(text);
    sha1In.value = await sha('SHA-1', text);
    sha256In.value = await sha('SHA-256', text);
  }
  function compare() {
    const algoLen = { 'MD5':32, 'SHA-1':40, 'SHA-256':64 }[algo.value];
    const e = exp.value.trim().toLowerCase().replace(/\s+/g,'');
    const a = act.value.trim().toLowerCase().replace(/\s+/g,'');
    if (!e || !a) { status.innerHTML = ''; return; }
    if (e.length !== algoLen || a.length !== algoLen) {
      status.innerHTML = `<span class="cmp-status" style="background:rgba(20,20,30,0.06);color:var(--t-2);font-style:italic">length mismatch (expected ${algoLen} hex chars)</span>`;
      return;
    }
    if (e === a) status.innerHTML = `<span class="cmp-status" style="background:rgba(20,20,30,0.08);color:#15151a;font-weight:600">MATCH  /  一致</span>`;
    else         status.innerHTML = `<span class="cmp-status" style="background:#15151a;color:#fff;font-weight:600">DIFFER /  不一致</span>`;
  }
  inp.addEventListener('input', compute);
  exp.addEventListener('input', compare); act.addEventListener('input', compare); algo.addEventListener('change', compare);
  compute();
  return { dispose: () => {} };
}

// ====================================================================
// APPS: Encoder
// ====================================================================
function mountEncoder(root) {
  root.innerHTML = `
    <div class="app-header">
      <h1>${escapeHtml(tx('Encoder','エンコーダ'))}</h1>
      <div class="app-sub">Base64 / Hex / URL / ROT13</div>
    </div>
    <div class="hr"></div>
    <span class="label">${escapeHtml(tx('Mode / 方式','方式 / Mode'))}</span>
    <div class="enc-modes">
      <label><input type="radio" name="m" value="b64" checked>Base64</label>
      <label><input type="radio" name="m" value="hex">Hex</label>
      <label><input type="radio" name="m" value="url">URL</label>
      <label><input type="radio" name="m" value="rot13">ROT13</label>
    </div>
    <span class="label">${escapeHtml(tx('Input / 入力','入力 / Input'))}</span>
    <textarea class="textarea" id="e-in" rows="5" spellcheck="false"></textarea>
    <div class="btn-row">
      <button class="btn btn--accent" id="e-enc">${escapeHtml(tx('Encode →','符号化 →'))}</button>
      <button class="btn" id="e-dec">${escapeHtml(tx('← Decode','← 復号'))}</button>
      <button class="btn btn--ghost" id="e-clear">${escapeHtml(tx('Clear','クリア'))}</button>
      <button class="btn btn--ghost" id="e-swap">${escapeHtml(tx('Swap','入替'))}</button>
    </div>
    <span class="label">${escapeHtml(tx('Output / 出力','出力 / Output'))}</span>
    <textarea class="textarea" id="e-out" rows="6" readonly spellcheck="false"></textarea>
    <div id="e-status" style="margin-top:8px;font-family:var(--font-mono);font-size:11px"></div>
  `;
  const $in = root.querySelector('#e-in'), $out = root.querySelector('#e-out'), $st = root.querySelector('#e-status');
  const mode = () => root.querySelector('input[name=m]:checked').value;
  function setStatus(text, cls) { $st.className = ''; $st.innerHTML = text ? `<span class="${cls||''}">${escapeHtml(text)}</span>` : ''; }
  function doEncode() {
    const text = $in.value;
    try {
      const m = mode();
      let out = '';
      if (m === 'b64') out = b64encode(text);
      else if (m === 'hex') out = hexEncode(text);
      else if (m === 'url') out = urlEncode(text);
      else out = rot13(text);
      $out.value = out;
      setStatus(`encoded ${new TextEncoder().encode(text).length} -> ${out.length} bytes`, 'success');
    } catch (e) { $out.value = ''; setStatus('encode failed', 'danger'); }
  }
  function doDecode() {
    const text = $in.value;
    try {
      const m = mode();
      let out = '';
      if (m === 'b64') out = b64decode(text);
      else if (m === 'hex') out = hexDecode(text);
      else if (m === 'url') out = urlDecode(text);
      else out = rot13(text);
      $out.value = out;
      setStatus(`decoded ${text.length} -> ${new TextEncoder().encode(out).length} bytes`, 'success');
    } catch (e) { $out.value = ''; setStatus('decode failed - input is not valid for this codec', 'danger'); }
  }
  root.querySelector('#e-enc').addEventListener('click', doEncode);
  root.querySelector('#e-dec').addEventListener('click', doDecode);
  root.querySelector('#e-clear').addEventListener('click', () => { $in.value = ''; $out.value = ''; setStatus(''); });
  root.querySelector('#e-swap').addEventListener('click', () => { const t = $in.value; $in.value = $out.value; $out.value = t; setStatus(''); });
  return { dispose: () => {} };
}

// ====================================================================
// APPS: Net Info
// ====================================================================
const NET_MOCK = [
  ['lo0','IPv4','127.0.0.1',                                'UP RUNNING LOOPBACK MULTICAST'],
  ['lo0','IPv6','::1',                                      'UP RUNNING LOOPBACK MULTICAST'],
  ['lo0','IPv6','fe80::1%lo0',                              'UP RUNNING LOOPBACK MULTICAST'],
  ['en0','MAC', 'a4:83:e7:9f:4d:21',                        'UP BROADCAST RUNNING MULTICAST'],
  ['en0','IPv4','192.168.10.42',                            'UP BROADCAST RUNNING MULTICAST'],
  ['en0','IPv6','fe80::18b1:c4ff:fe2a:9d12%en0',            'UP BROADCAST RUNNING MULTICAST'],
  ['en0','IPv6','2400:4150:9220:6800:1c8a:f0e2:84b1:c4d3',  'UP BROADCAST RUNNING MULTICAST'],
  ['utun0','IPv6','fe80::3c2a:8db4:e97f:1024%utun0',        'UP RUNNING P2P MULTICAST'],
  ['awdl0','MAC', '22:8a:51:c4:7f:9e',                      'UP BROADCAST RUNNING MULTICAST'],
  ['bridge0','MAC','1e:83:e7:9f:4d:00',                     'UP BROADCAST RUNNING MULTICAST'],
];
function mountNetInfo(root) {
  root.innerHTML = `
    <div class="app-header">
      <h1>${escapeHtml(tx('Net Info','ネット情報'))}</h1>
      <div class="app-sub">${escapeHtml(tx('read-only interface listing','読み取り専用インターフェイス一覧'))}</div>
    </div>
    <div class="hr"></div>
    <div style="margin:6px 0"><span class="label" style="display:inline;margin:0">${escapeHtml(tx('Hostname / ホスト名','ホスト名 / Hostname'))}</span> <span class="accent" style="font-family:var(--font-mono);font-size:12px">mia-mbp.local</span></div>
    <div class="btn-row">
      <button class="btn btn--ghost" id="n-refresh">${escapeHtml(tx('Refresh','更新'))}</button>
      <span class="muted" style="align-self:center;font-size:11px">(${NET_MOCK.length} entries)</span>
    </div>
    <div style="border:1px solid var(--hair);border-radius:8px;overflow:hidden">
      <table class="net-table" id="n-tbl">
        <thead><tr><th>${escapeHtml(tx('Interface','インターフェイス'))}</th><th>${escapeHtml(tx('Family','種類'))}</th><th>${escapeHtml(tx('Address','アドレス'))}</th><th>${escapeHtml(tx('Flags','フラグ'))}</th></tr></thead>
        <tbody></tbody>
      </table>
    </div>
    <p class="muted" style="font-size:11px;margin-top:10px;line-height:1.6">${tx(
      'This view is strictly informational. MiaOS will never modify your routing table, DNS settings, or interface state. (In this web build the list is illustrative and does not reflect your machine.)',
      '本画面は読み取り専用。ルーティングや DNS を変更することはありません。（Web 版ではこの一覧はサンプル表示で、実機の状態とは異なります。）')}</p>
  `;
  const tbody = root.querySelector('tbody');
  function render() {
    tbody.innerHTML = NET_MOCK.map(([i,f,a,fl]) =>
      `<tr><td>${escapeHtml(i)}</td><td><span class="net-fam ${f.toLowerCase()}">${escapeHtml(f)}</span></td><td>${escapeHtml(a)}</td><td class="net-flags">${escapeHtml(fl)}</td></tr>`
    ).join('');
  }
  render();
  root.querySelector('#n-refresh').addEventListener('click', render);
  return { dispose: () => {} };
}

// ====================================================================
// APPS: Port Scanner
// ====================================================================
function mountPortScanner(root) {
  let state2 = { phase:'idle', target:'127.0.0.1', from:1, to:1024, timeout:250, auth:false, prog:0, total:0, results:[], status:'', cancel:false };
  function isLoopback(t) { return t === '127.0.0.1' || t === 'localhost' || t === '::1'; }
  function render() {
    const non = !isLoopback(state2.target);
    root.innerHTML = `
      <div class="app-header">
        <h1>${escapeHtml(tx('Port Scanner','ポート調査'))}</h1>
        <div class="app-sub">TCP connect, white hacking only</div>
      </div>
      <div class="hr"></div>
      <div class="banner" style="border-color:rgba(20,20,30,0.18);background:rgba(20,20,30,0.05);color:var(--t-1);font-weight:500">
        ${tx('Scan only systems you own or have explicit written permission to test. Unauthorized scanning may violate computer-misuse laws in your jurisdiction.',
             '自分が所有・許可を得たホストのみをスキャンしてください。無許可のポートスキャンは不正アクセス禁止法に抵触する可能性があります。')}
      </div>
      <div class="ps-grid">
        <span class="label" style="margin:0">${escapeHtml(tx('target / ターゲット','ターゲット'))}</span><input class="input" id="ps-target" value="${escapeHtml(state2.target)}" ${state2.phase==='scanning'?'disabled':''}>
        <span class="label" style="margin:0">${escapeHtml(tx('from port','from'))}</span><input class="input" id="ps-from" type="number" value="${state2.from}" ${state2.phase==='scanning'?'disabled':''}>
        <span class="label" style="margin:0">${escapeHtml(tx('to port','to'))}</span><input class="input" id="ps-to" type="number" value="${state2.to}" ${state2.phase==='scanning'?'disabled':''}>
        <span class="label" style="margin:0">${escapeHtml(tx('timeout (ms)','timeout (ms)'))}</span><input class="input" id="ps-tmo" type="number" value="${state2.timeout}" ${state2.phase==='scanning'?'disabled':''}>
      </div>
      ${non ? `<div class="banner warn">${tx('Non-loopback target detected. Confirm authorization before scanning.','ループバック以外の対象が指定されています。許可があることを確認してください。')}</div>
      <label style="display:inline-flex;gap:6px;align-items:center;font-size:12px"><input type="checkbox" id="ps-auth" ${state2.auth?'checked':''}> ${tx('I have explicit authorization to scan this host','許可を得ています')}</label>` : ''}
      <div class="btn-row">
        <button class="btn btn--accent" id="ps-start" ${state2.phase==='scanning'?'disabled':''}>${escapeHtml(tx('Start scan','開始'))}</button>
        <button class="btn btn--ghost" id="ps-cancel" ${state2.phase!=='scanning'?'disabled':''}>${escapeHtml(tx('Cancel','中止'))}</button>
      </div>
      ${state2.phase==='scanning' ? `<div class="ps-progress"><div class="ps-progress__fill" style="width:${state2.total?(state2.prog/state2.total*100):0}%"></div><span class="ps-progress__label">${state2.prog} / ${state2.total}</span></div>` : ''}
      <div class="hr"></div>
      <span class="label">${escapeHtml(tx('Results / 結果','結果'))}</span>
      <div class="muted" style="font-size:11px;margin-bottom:6px">${escapeHtml(state2.status||' ')}</div>
      <table class="kv-table"><thead><tr><th style="width:80px">Port</th><th>State</th></tr></thead>
        <tbody>${state2.results.map(p => `<tr><td class="mono">${p}</td><td><span class="success">open</span></td></tr>`).join('') || `<tr><td colspan="2" class="muted" style="font-size:11px">${escapeHtml(tx('(no results yet)','(結果はまだありません)'))}</td></tr>`}</tbody>
      </table>
      ${state2.phase==='confirming' ? buildConfirmModal() : ''}
    `;
    bind();
  }
  function buildConfirmModal() {
    return `
      <div class="ps-modal-back">
        <div class="ps-modal">
          <h3>${tx('Scan a non-loopback host?','ループバック以外のホストをスキャンしますか？')}</h3>
          <div class="ja">${tx('','')}</div>
          <div class="muted" style="font-family:var(--font-mono);font-size:12px">target : ${escapeHtml(state2.target)}<br>range  : ${state2.from} - ${state2.to}</div>
          <div class="body">${tx(
            'Confirming acknowledges that you are authorized to test this host. MiaOS records no logs, but your network traffic will be observable to the target operators.',
            'これを確認することは、対象ホストへのテストを許可されていることを意味します。MiaOS はログを記録しませんが、ネットワーク通信は対象側で観測可能です。')}</div>
          <div class="btn-row">
            <button class="btn btn--accent" id="ps-confirm">${escapeHtml(tx('Confirm and start','実行'))}</button>
            <button class="btn btn--ghost" id="ps-cancel-modal">${escapeHtml(tx('Cancel','取消'))}</button>
          </div>
        </div>
      </div>`;
  }
  function bind() {
    const get = (id) => root.querySelector(id);
    if (get('#ps-target')) get('#ps-target').addEventListener('change', e => { state2.target = e.target.value.trim() || '127.0.0.1'; render(); });
    if (get('#ps-from')) get('#ps-from').addEventListener('change', e => state2.from = parseInt(e.target.value)||1);
    if (get('#ps-to')) get('#ps-to').addEventListener('change', e => state2.to = parseInt(e.target.value)||1024);
    if (get('#ps-tmo')) get('#ps-tmo').addEventListener('change', e => state2.timeout = parseInt(e.target.value)||250);
    if (get('#ps-auth')) get('#ps-auth').addEventListener('change', e => state2.auth = e.target.checked);
    if (get('#ps-start')) get('#ps-start').addEventListener('click', onStart);
    if (get('#ps-cancel')) get('#ps-cancel').addEventListener('click', () => { state2.cancel = true; });
    if (get('#ps-confirm')) get('#ps-confirm').addEventListener('click', () => { state2.phase = 'idle'; runScan(); });
    if (get('#ps-cancel-modal')) get('#ps-cancel-modal').addEventListener('click', () => { state2.phase = 'idle'; render(); });
  }
  function onStart() {
    // clamp
    state2.from = Math.max(1, state2.from);
    state2.to = Math.min(65535, state2.to);
    if (state2.to < state2.from) [state2.from, state2.to] = [state2.to, state2.from];
    if (state2.to - state2.from + 1 > 4096) state2.to = state2.from + 4095;
    state2.timeout = Math.min(5000, Math.max(50, state2.timeout));
    if (!isLoopback(state2.target) && !state2.auth) { state2.phase = 'confirming'; render(); return; }
    runScan();
  }
  async function runScan() {
    if (!isLoopback(state2.target)) { state2.status = `could not resolve host: ${state2.target}`; state2.results = []; state2.phase = 'idle'; render(); return; }
    state2.phase = 'scanning'; state2.cancel = false; state2.results = []; state2.status = '';
    const ALL_OPEN = [22, 80, 443, 631, 3000, 5173, 8080, 27017];
    const total = state2.to - state2.from + 1;
    state2.total = total; state2.prog = 0; render();
    const startT = performance.now();
    for (let p = state2.from; p <= state2.to; p++) {
      if (state2.cancel) { state2.status = 'cancelled'; state2.phase = 'idle'; render(); return; }
      if (ALL_OPEN.includes(p)) state2.results.push(p);
      state2.prog = p - state2.from + 1;
      // throttle
      const targetTime = startT + 1500 * (state2.prog / total);
      const now = performance.now();
      if (now < targetTime) await new Promise(r => setTimeout(r, Math.min(50, targetTime - now)));
      if (state2.prog % 32 === 0 || state2.prog === total) render();
    }
    state2.status = 'scan complete'; state2.phase = 'idle'; render();
  }
  render();
  return { dispose: () => { state2.cancel = true; } };
}

// ====================================================================
// APPS: Port Reference
// ====================================================================
const PORTS = [
  [20,'TCP','ftp-data','FTP file transfer (data channel)'],
  [21,'TCP','ftp','FTP control'],
  [22,'TCP','ssh','Secure shell - prefer keys, disable passwords'],
  [23,'TCP','telnet','Cleartext - obsolete, treat as red flag'],
  [25,'TCP','smtp','Mail submission (server-to-server)'],
  [53,'UDP','dns','Name resolution'],
  [53,'TCP','dns','Zone transfers / large responses'],
  [67,'UDP','dhcp-server',''],
  [68,'UDP','dhcp-client',''],
  [69,'UDP','tftp','Often used by network device firmware'],
  [80,'TCP','http','Cleartext web - check for redirect to https'],
  [110,'TCP','pop3','Mail retrieval (legacy)'],
  [111,'TCP','rpcbind','Sun RPC portmapper'],
  [123,'UDP','ntp','Time sync - frequent amplification target'],
  [135,'TCP','msrpc','Windows RPC endpoint mapper'],
  [137,'UDP','netbios-ns','Windows name service'],
  [139,'TCP','netbios-ssn','SMB (legacy)'],
  [143,'TCP','imap','Mail retrieval'],
  [161,'UDP','snmp',"Watch for default community 'public'"],
  [389,'TCP','ldap','Directory service'],
  [443,'TCP','https','TLS - check cert / cipher hygiene'],
  [445,'TCP','smb','File sharing - notorious vulnerability surface'],
  [465,'TCP','smtps',''],
  [500,'UDP','isakmp','IPsec IKE'],
  [514,'UDP','syslog',''],
  [587,'TCP','submission','Authenticated SMTP submission'],
  [636,'TCP','ldaps','LDAP over TLS'],
  [873,'TCP','rsync',''],
  [993,'TCP','imaps',''],
  [995,'TCP','pop3s',''],
  [1433,'TCP','mssql',''],
  [1521,'TCP','oracle',''],
  [2049,'TCP','nfs',''],
  [3306,'TCP','mysql',''],
  [3389,'TCP','rdp','Remote desktop - prefer VPN-front'],
  [5432,'TCP','postgres',''],
  [5900,'TCP','vnc',''],
  [6379,'TCP','redis','Often unauth in default config - misconfig RCE risk'],
];
function mountPortRef(root) {
  root.innerHTML = `
    <div class="app-header">
      <h1>${escapeHtml(tx('Port Reference','ポート一覧'))}</h1>
      <div class="app-sub">${escapeHtml(tx('Common TCP/UDP service ports. Search by number or name.','よく使われるTCP/UDPポート。番号または名前で検索できます。'))}</div>
    </div>
    <div class="pr-search"><input class="input" id="pr-q" placeholder="${escapeHtml(tx('filter (e.g. ssh, 443, mysql)','検索 (例: ssh, 443, mysql)'))}" spellcheck="false"></div>
    <div class="pr-wrap">
      <table class="pr-table">
        <thead><tr><th>${escapeHtml(tx('Port','ポート'))}</th><th>${escapeHtml(tx('Proto','プロトコル'))}</th><th>${escapeHtml(tx('Name','名前'))}</th><th>${escapeHtml(tx('Note','備考'))}</th></tr></thead>
        <tbody></tbody>
      </table>
    </div>
  `;
  const tbody = root.querySelector('tbody');
  function render(q='') {
    q = q.trim().toLowerCase();
    const rows = q ? PORTS.filter(([p,pr,n,note]) => String(p).includes(q) || n.toLowerCase().includes(q) || note.toLowerCase().includes(q) || pr.toLowerCase().includes(q)) : PORTS;
    tbody.innerHTML = rows.map(([p,pr,n,note]) =>
      `<tr><td class="num">${p}</td><td class="proto">${pr}</td><td class="svc">${escapeHtml(n)}</td><td class="note">${escapeHtml(note)}</td></tr>`
    ).join('') || `<tr><td colspan="4" class="muted" style="text-align:center;padding:14px">no match</td></tr>`;
  }
  render();
  root.querySelector('#pr-q').addEventListener('input', e => render(e.target.value));
  return { dispose: () => {} };
}

// ====================================================================
// APPS: Log Viewer
// ====================================================================
const SAMPLE_LOG = `2026-05-07 09:00:01 INFO   miaos.boot  starting MiaOS shell v0.1
2026-05-07 09:00:01 INFO   miaos.boot  registered 9 apps
2026-05-07 09:00:02 INFO   miaos.wm    opened window id=welcome size=780x520
2026-05-07 09:01:14 DEBUG  miaos.spotlight  toggled, query=""
2026-05-07 09:01:18 INFO   miaos.spotlight  launch id=hash via shortcut
2026-05-07 09:02:03 INFO   miaos.hash  computed sha256 (12 bytes)
2026-05-07 09:02:33 WARN   miaos.hash  md5 used; consider sha-256 for new work
2026-05-07 09:04:11 INFO   miaos.encoder  mode=base64 op=encode in=42 out=56
2026-05-07 09:05:00 INFO   miaos.netinfo  refreshed 8 interface entries
2026-05-07 09:05:47 INFO   miaos.portscan  scan started host=127.0.0.1 range=1-1024
2026-05-07 09:05:48 INFO   miaos.portscan  open tcp/22 (ssh)
2026-05-07 09:05:48 INFO   miaos.portscan  open tcp/80 (http)
2026-05-07 09:05:49 INFO   miaos.portscan  open tcp/443 (https)
2026-05-07 09:05:51 INFO   miaos.portscan  scan complete in 4.12s
2026-05-07 09:07:00 ERROR  miaos.logs   could not open: /var/log/auth.log (EACCES)
2026-05-07 09:07:14 INFO   miaos.logs   loaded 1842 lines, 184231 bytes
2026-05-07 09:09:22 DEBUG  miaos.wm    focus changed terminal -> hash
2026-05-07 09:11:00 INFO   miaos.terminal  exec: hash hello
2026-05-07 09:11:00 INFO   miaos.terminal  out: 5d41402abc4b2a76b9719d911017c592
2026-05-07 09:14:08 WARN   miaos.portscan  non-loopback target rejected: 192.168.1.5
2026-05-07 09:14:42 INFO   miaos.ethics  user opened code-of-conduct app
2026-05-07 09:18:01 DEBUG  miaos.theme  applied glass tokens
2026-05-07 09:21:30 INFO   miaos.terminal  cleared scrollback
2026-05-07 09:24:55 INFO   miaos.wm    closed window id=portref
2026-05-07 09:30:00 INFO   miaos.boot  shutdown requested`;
function mountLogViewer(root) {
  let lines = []; let status = '';
  root.innerHTML = `
    <div class="app-header">
      <h1>${escapeHtml(tx('Log Viewer','ログ閲覧'))}</h1>
      <div class="app-sub">${escapeHtml(tx('read-only file viewer with grep','読み取り専用 / grep 風フィルタ'))}</div>
    </div>
    <div class="hr"></div>
    <div class="log-tools">
      <button class="btn btn--accent" id="lg-sample">${escapeHtml(tx('Load sample','サンプル読込'))}</button>
      <input type="file" id="lg-file" accept=".log,.txt,text/*" style="display:none">
      <button class="btn" id="lg-pick">${escapeHtml(tx('Choose file...','ファイル選択...'))}</button>
      <button class="btn btn--ghost" id="lg-clear">${escapeHtml(tx('Clear','消去'))}</button>
    </div>
    <div class="log-tools" style="margin-top:0">
      <input class="input" id="lg-q" style="flex:1" placeholder="${escapeHtml(tx('filter / 絞り込み','絞り込み / filter'))}" spellcheck="false">
      <label><input type="checkbox" id="lg-ic" checked> ${escapeHtml(tx('ignore case','大文字小文字無視'))}</label>
    </div>
    <div class="log-status-line" id="lg-status"></div>
    <div class="log-pane" id="lg-pane"></div>
  `;
  const pane = root.querySelector('#lg-pane');
  const $q = root.querySelector('#lg-q'); const $ic = root.querySelector('#lg-ic');
  const $st = root.querySelector('#lg-status');
  function render() {
    const q = $q.value;
    const ic = $ic.checked;
    let visible = lines;
    if (q) {
      const qq = ic ? q.toLowerCase() : q;
      visible = lines.filter(l => (ic ? l.toLowerCase() : l).includes(qq));
    }
    pane.innerHTML = visible.map((l, i) =>
      `<div class="log-line"><span class="log-num">${String(lines.indexOf(l) + 1).padStart(4,' ')}</span><span class="log-content">${escapeHtml(l)}</span></div>`
    ).join('') || `<div class="muted">(empty)</div>`;
    if (q) $st.textContent = `matched ${visible.length} / ${lines.length} lines`;
    else $st.textContent = status || ' ';
  }
  function load(text) {
    lines = text.split(/\r?\n/);
    if (lines.length > 200000) { lines = lines.slice(0, 200000); status = `loaded 200000 lines (truncated)`; }
    else status = `loaded ${lines.length} lines, ${new TextEncoder().encode(text).length} bytes`;
    render();
  }
  root.querySelector('#lg-sample').addEventListener('click', () => load(SAMPLE_LOG));
  root.querySelector('#lg-pick').addEventListener('click', () => root.querySelector('#lg-file').click());
  root.querySelector('#lg-file').addEventListener('change', async (e) => {
    const f = e.target.files[0]; if (!f) return;
    const text = await f.text(); load(text);
  });
  root.querySelector('#lg-clear').addEventListener('click', () => { lines = []; status = ''; render(); });
  $q.addEventListener('input', render); $ic.addEventListener('change', render);
  render();
  return { dispose: () => {} };
}

// ====================================================================
// APPS: Ethics
// ====================================================================
const ETHICS = [
  ['1. Do not scan or probe without explicit, documented permission.',
   '1. 文書による明示的な許可がない対象をスキャンしない。'],
  ['2. Practice on intentionally vulnerable, isolated environments (DVWA, OWASP Juice Shop, HackTheBox, your own VMs).',
   '2. 練習は意図的に脆弱な隔離環境で行う (DVWA / Juice Shop / HTB / 自宅 VM 等)。'],
  ['3. Disclose findings responsibly to the vendor first; never publish weaponized exploit details for unpatched systems.',
   '3. 脆弱性は責任ある開示を行い、未パッチの段階で武器化された詳細を公開しない。'],
  ['4. Stay inside your authorized scope. Out-of-scope curiosity is a career-ending risk and may be a crime.',
   '4. 契約・依頼で許された範囲を超えない。範囲外への興味は重大なリスク。'],
  ['5. Know your local law. In Japan, the Unauthorized Computer Access Law and Penal Code Article 168 may apply.',
   '5. 自国の法律 (日本では不正アクセス禁止法、刑法 168 条等) を必ず確認する。'],
  ['6. Keep records: timestamped commands, output, decisions. Defenders must be reproducible.',
   '6. 操作・時刻・出力を記録する。防御側の仕事は再現性が命。'],
  ['7. Refuse to misuse this software. Password cracking, intrusion, malware delivery, phishing - all forbidden.',
   '7. 本ソフトをパスワードクラック、無断侵入、マルウェア配布等に使わない。'],
];
function mountEthics(root) {
  const en = LANG === 'en';
  root.innerHTML = `
    <div class="app-header">
      <h1>${escapeHtml(t('EthicsTitle'))}</h1>
      <div class="app-sub">${escapeHtml(t('EthicsSub'))}</div>
    </div>
    <div class="hr"></div>
    <ol class="ethics-list">
      ${ETHICS.map(([e,j]) => `<li>${escapeHtml(en ? e.replace(/^\d+\.\s*/,'') : j.replace(/^\d+\.\s*/,''))}${en ? `<span class="ja">${escapeHtml(j.replace(/^\d+\.\s*/,''))}</span>` : ''}</li>`).join('')}
    </ol>
    <div class="ethics-quote">"With great power comes great responsibility."</div>
  `;
  return { dispose: () => {} };
}

// ====================================================================
// APPS: JWT Inspector (decode-only, defensive)
// ====================================================================
function mountJwt(root) {
  const SAMPLE = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik1pYSIsImlhdCI6MTcxNTAwMDAwMCwiZXhwIjoyMDAwMDAwMDAwfQ.JpQNRZeS8Fhw0i8oZqPzC2dMxgkTZ0bL5OoChFcJg9Q';
  root.innerHTML = `
    <div class="app-header">
      <h1>${escapeHtml(tx('JWT Inspector','JWT 解析'))}</h1>
      <div class="app-sub">${escapeHtml(tx('decode-only — never paste production tokens you do not own','復号のみ — 自分の所有しないトークンを貼らないこと'))}</div>
    </div>
    <div class="hr"></div>
    <div class="banner" style="border-color:rgba(20,20,30,0.18);background:rgba(20,20,30,0.05);color:var(--t-1);font-weight:500">
      ${tx('Inspecting tokens you do not own can leak credentials. Use sample tokens or your own dev tokens only.',
           '所有していないトークンの解析は資格情報の漏洩につながります。検証用または自分のトークンのみ使用してください。')}
    </div>
    <span class="label">${escapeHtml(tx('Token (header.payload.signature)','トークン (header.payload.signature)'))}</span>
    <textarea class="textarea" id="jw-in" rows="4" spellcheck="false" placeholder="eyJhbGciOi...">${SAMPLE}</textarea>
    <div class="btn-row">
      <button class="btn btn--accent" id="jw-decode">${escapeHtml(tx('Decode','解析'))}</button>
      <button class="btn btn--ghost" id="jw-clear">${escapeHtml(tx('Clear','消去'))}</button>
    </div>
    <div class="hr"></div>
    <div class="ps-grid" style="grid-template-columns:90px 1fr">
      <span class="label" style="margin:0">Header</span><textarea class="textarea" id="jw-h" rows="4" readonly spellcheck="false" style="font-family:var(--font-mono);font-size:11px"></textarea>
      <span class="label" style="margin:0">Payload</span><textarea class="textarea" id="jw-p" rows="6" readonly spellcheck="false" style="font-family:var(--font-mono);font-size:11px"></textarea>
      <span class="label" style="margin:0">Signature</span><input class="input" id="jw-s" readonly spellcheck="false" style="font-family:var(--font-mono);font-size:11px">
    </div>
    <div id="jw-meta" class="muted" style="font-size:11px;margin-top:8px;line-height:1.6"></div>
    <div class="hr"></div>
    <span class="label">${escapeHtml(tx('Verify HMAC signature (HS256/HS384/HS512)','HMAC 署名検証 (HS256/HS384/HS512)'))}</span>
    <div class="ps-grid" style="grid-template-columns:90px 1fr">
      <span class="label" style="margin:0">${escapeHtml(tx('secret','秘密鍵'))}</span><input class="input" id="jw-key" spellcheck="false" placeholder="${escapeHtml(tx('your-256-bit-secret','秘密鍵 (UTF-8)'))}">
    </div>
    <div class="btn-row"><button class="btn" id="jw-verify">${escapeHtml(tx('Verify','検証'))}</button></div>
    <div id="jw-vstatus" style="margin-top:8px"></div>
  `;
  const $in = root.querySelector('#jw-in');
  const $h = root.querySelector('#jw-h'), $p = root.querySelector('#jw-p'), $s = root.querySelector('#jw-s'), $m = root.querySelector('#jw-meta');
  const $key = root.querySelector('#jw-key'), $vs = root.querySelector('#jw-vstatus');
  function b64urlDecode(seg) {
    const pad = seg.length % 4 === 0 ? '' : '='.repeat(4 - (seg.length % 4));
    return b64decode(seg.replace(/-/g,'+').replace(/_/g,'/') + pad);
  }
  function pretty(s) { try { return JSON.stringify(JSON.parse(s), null, 2); } catch { return s; } }
  function decode() {
    const tok = $in.value.trim();
    const parts = tok.split('.');
    if (parts.length !== 3) { $h.value = ''; $p.value = ''; $s.value = ''; $m.textContent = tx('not a JWT (expected 3 dot-separated parts)','JWT 形式ではありません (3 セクション必要)'); return null; }
    try {
      const h = b64urlDecode(parts[0]); const p = b64urlDecode(parts[1]);
      $h.value = pretty(h); $p.value = pretty(p); $s.value = parts[2];
      let warns = [];
      try {
        const hj = JSON.parse(h);
        if (hj.alg === 'none') warns.push(tx('alg=none — this token is unsigned and trivially forgeable','alg=none — 署名なしトークンです'));
        if (hj.alg && /^HS/.test(hj.alg)) warns.push(tx('HS* uses a shared secret; rotate if leaked','HS* は共有秘密鍵を使用'));
      } catch {}
      try {
        const pj = JSON.parse(p);
        if (pj.exp) {
          const exp = new Date(pj.exp * 1000);
          warns.push('exp: ' + exp.toISOString() + (Date.now() > pj.exp*1000 ? ' ' + tx('(expired)','(期限切れ)') : ''));
        }
        if (pj.iat) warns.push('iat: ' + new Date(pj.iat * 1000).toISOString());
      } catch {}
      $m.innerHTML = warns.map(escapeHtml).join('<br>') || ' ';
      return parts;
    } catch (e) {
      $m.textContent = tx('decode failed: ','解析失敗: ') + e.message; return null;
    }
  }
  async function verify() {
    const parts = decode(); if (!parts) return;
    let alg;
    try { alg = JSON.parse(b64urlDecode(parts[0])).alg; } catch { $vs.innerHTML = `<span class="cmp-status" style="background:#15151a;color:#fff">cannot read alg</span>`; return; }
    const map = { HS256:'SHA-256', HS384:'SHA-384', HS512:'SHA-512' };
    if (!map[alg]) { $vs.innerHTML = `<span class="cmp-status" style="background:rgba(20,20,30,0.06);color:var(--t-2);font-style:italic">${escapeHtml(tx('unsupported alg: ','非対応 alg: ') + alg)}</span>`; return; }
    const key = await crypto.subtle.importKey('raw', new TextEncoder().encode($key.value), { name:'HMAC', hash: map[alg] }, false, ['sign']);
    const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(parts[0] + '.' + parts[1]));
    const computed = btoa(String.fromCharCode(...new Uint8Array(sig))).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
    if (computed === parts[2]) $vs.innerHTML = `<span class="cmp-status" style="background:rgba(20,20,30,0.08);color:#15151a;font-weight:600">${escapeHtml(tx('SIGNATURE VALID  /  署名一致','署名一致'))}</span>`;
    else $vs.innerHTML = `<span class="cmp-status" style="background:#15151a;color:#fff;font-weight:600">${escapeHtml(tx('SIGNATURE INVALID  /  署名不一致','署名不一致'))}</span>`;
  }
  root.querySelector('#jw-decode').addEventListener('click', decode);
  root.querySelector('#jw-clear').addEventListener('click', () => { $in.value=''; $h.value=''; $p.value=''; $s.value=''; $m.textContent=''; $vs.innerHTML=''; });
  root.querySelector('#jw-verify').addEventListener('click', verify);
  decode();
  return { dispose: () => {} };
}

// ====================================================================
// APPS: CIDR / Subnet Calculator (IPv4)
// ====================================================================
function mountCidr(root) {
  root.innerHTML = `
    <div class="app-header">
      <h1>${escapeHtml(tx('CIDR Calculator','サブネット計算'))}</h1>
      <div class="app-sub">${escapeHtml(tx('IPv4 network / broadcast / host range','IPv4 ネットワーク・ブロードキャスト・ホスト範囲'))}</div>
    </div>
    <div class="hr"></div>
    <div class="ps-grid" style="grid-template-columns:140px 1fr">
      <span class="label" style="margin:0">CIDR</span><input class="input" id="cd-in" spellcheck="false" placeholder="192.168.1.0/24" value="192.168.1.0/24" style="font-family:var(--font-mono);font-size:12px">
    </div>
    <div class="btn-row"><button class="btn btn--accent" id="cd-calc">${escapeHtml(tx('Calculate','計算'))}</button></div>
    <div class="hr"></div>
    <table class="kv-table" id="cd-out"><tbody></tbody></table>
    <p class="muted" style="font-size:11px;margin-top:10px;line-height:1.6">${tx(
      'Use this for documenting your own networks or pre-flighting a planned change. Do not probe arbitrary ranges you computed here without authorization.',
      '自社ネットワークの設計・記録用です。算出した範囲を許可なくスキャンすると不正アクセス禁止法に抵触する可能性があります。')}</p>
  `;
  const $in = root.querySelector('#cd-in'), $out = root.querySelector('#cd-out tbody');
  function ipToInt(s) {
    const p = s.split('.').map(Number);
    if (p.length !== 4 || p.some(n => !Number.isInteger(n) || n < 0 || n > 255)) throw new Error('invalid IP');
    return ((p[0]<<24) | (p[1]<<16) | (p[2]<<8) | p[3]) >>> 0;
  }
  function intToIp(n) { return [(n>>>24)&255,(n>>>16)&255,(n>>>8)&255,n&255].join('.'); }
  function calc() {
    $out.innerHTML = '';
    const v = $in.value.trim(); const m = v.match(/^([\d.]+)(?:\/(\d+))?$/);
    if (!m) { $out.innerHTML = `<tr><td class="muted">${escapeHtml(tx('invalid format','形式不正'))}</td></tr>`; return; }
    let ip, prefix;
    try { ip = ipToInt(m[1]); } catch { $out.innerHTML = `<tr><td class="muted">${escapeHtml(tx('invalid IP','IP 不正'))}</td></tr>`; return; }
    prefix = m[2] !== undefined ? parseInt(m[2], 10) : 32;
    if (prefix < 0 || prefix > 32) { $out.innerHTML = `<tr><td class="muted">${escapeHtml(tx('prefix must be 0-32','プレフィックスは 0-32'))}</td></tr>`; return; }
    const mask = prefix === 0 ? 0 : (0xFFFFFFFF << (32 - prefix)) >>> 0;
    const wildcard = (~mask) >>> 0;
    const network = (ip & mask) >>> 0;
    const broadcast = (network | wildcard) >>> 0;
    const total = prefix === 32 ? 1 : (prefix === 31 ? 2 : Math.pow(2, 32 - prefix));
    const usable = prefix >= 31 ? total : Math.max(0, total - 2);
    const firstHost = prefix >= 31 ? network : (network + 1) >>> 0;
    const lastHost = prefix >= 31 ? broadcast : (broadcast - 1) >>> 0;
    let cls = 'A'; const oct = (ip >>> 24) & 255;
    if (oct >= 128 && oct < 192) cls = 'B';
    else if (oct >= 192 && oct < 224) cls = 'C';
    else if (oct >= 224 && oct < 240) cls = 'D (multicast)';
    else if (oct >= 240) cls = 'E (reserved)';
    const isPrivate = (oct === 10) || (oct === 172 && ((ip>>>16)&255) >= 16 && ((ip>>>16)&255) <= 31) || (oct === 192 && ((ip>>>16)&255) === 168) || (oct === 127);
    const rows = [
      ['Network',         intToIp(network) + '/' + prefix],
      ['Netmask',         intToIp(mask)],
      ['Wildcard',        intToIp(wildcard)],
      ['Broadcast',       intToIp(broadcast)],
      ['First host',      intToIp(firstHost)],
      ['Last host',       intToIp(lastHost)],
      ['Total addresses', String(total)],
      ['Usable hosts',    String(usable)],
      ['Class',           cls],
      [tx('Private (RFC1918/loopback)','プライベート (RFC1918/ループバック)'), isPrivate ? 'yes' : 'no'],
    ];
    $out.innerHTML = rows.map(([k,v]) => `<tr><td style="width:200px">${escapeHtml(k)}</td><td class="mono">${escapeHtml(v)}</td></tr>`).join('');
  }
  root.querySelector('#cd-calc').addEventListener('click', calc);
  $in.addEventListener('keydown', e => { if (e.key === 'Enter') calc(); });
  calc();
  return { dispose: () => {} };
}

// ====================================================================
// APPS: Password Strength Meter (defensive — no cracking)
// ====================================================================
function mountPasswd(root) {
  root.innerHTML = `
    <div class="app-header">
      <h1>${escapeHtml(tx('Password Strength Meter','パスワード強度計'))}</h1>
      <div class="app-sub">${escapeHtml(tx('estimates entropy locally — nothing leaves this tab','このタブ内のみで計算 — 外部送信なし'))}</div>
    </div>
    <div class="hr"></div>
    <span class="label">${escapeHtml(tx('Password / パスワード','パスワード / Password'))}</span>
    <input class="input" id="pw-in" type="password" spellcheck="false" autocomplete="new-password" style="font-family:var(--font-mono);font-size:13px">
    <label style="display:inline-flex;gap:6px;align-items:center;font-size:12px;margin-top:6px"><input type="checkbox" id="pw-show"> ${escapeHtml(tx('Show password','表示する'))}</label>
    <div class="hr"></div>
    <div class="ps-progress"><div class="ps-progress__fill" id="pw-bar" style="width:0%"></div><span class="ps-progress__label" id="pw-label">—</span></div>
    <table class="kv-table" id="pw-out" style="margin-top:10px"><tbody></tbody></table>
    <div class="hr"></div>
    <span class="label">${escapeHtml(tx('Suggestions','推奨'))}</span>
    <ul id="pw-tips" style="margin:6px 0 0 18px;padding:0;font-size:12px;line-height:1.7"></ul>
    <p class="muted" style="font-size:11px;margin-top:14px;line-height:1.6">${tx(
      'Entropy here is a rough upper bound assuming a uniformly random password drawn from the observed character classes. Real passwords (dictionary words, dates, leetspeak) are weaker than entropy alone suggests. Always pair with MFA.',
      'ここでのエントロピー値は「観測された文字種から一様ランダムに選ばれた」と仮定した上限値です。辞書語・日付・leet などはこれより弱くなります。MFA との併用を推奨。')}</p>
  `;
  const $in = root.querySelector('#pw-in'), $show = root.querySelector('#pw-show');
  const $bar = root.querySelector('#pw-bar'), $lab = root.querySelector('#pw-label');
  const $out = root.querySelector('#pw-out tbody'), $tips = root.querySelector('#pw-tips');
  const COMMON = new Set(['password','123456','12345678','qwerty','abc123','letmein','admin','welcome','monkey','iloveyou','111111','dragon','master','passw0rd','p@ssw0rd','password1','login','sunshine']);
  function classes(p) {
    let n = 0;
    if (/[a-z]/.test(p)) n += 26;
    if (/[A-Z]/.test(p)) n += 26;
    if (/[0-9]/.test(p)) n += 10;
    if (/[^A-Za-z0-9]/.test(p)) n += 33;
    return n;
  }
  function update() {
    const p = $in.value;
    if (!p) { $bar.style.width = '0%'; $lab.textContent = '—'; $out.innerHTML = ''; $tips.innerHTML = ''; return; }
    const cs = classes(p);
    const entropy = cs > 0 ? Math.log2(cs) * p.length : 0;
    let label, color;
    if (entropy < 28) { label = tx('Very weak','非常に弱い'); color = '#15151a'; }
    else if (entropy < 36) { label = tx('Weak','弱い'); color = '#15151a'; }
    else if (entropy < 60) { label = tx('Reasonable','まあまあ'); color = '#15151a'; }
    else if (entropy < 80) { label = tx('Strong','強い'); color = '#15151a'; }
    else { label = tx('Very strong','非常に強い'); color = '#15151a'; }
    const pct = Math.min(100, Math.round(entropy / 100 * 100));
    $bar.style.width = pct + '%'; $bar.style.background = color;
    $lab.textContent = `${label} — ${entropy.toFixed(1)} bits`;
    const repeats = (p.match(/(.)\1{2,}/g) || []).length;
    const seq = /(?:0123|1234|2345|3456|4567|5678|6789|abcd|bcde|cdef|qwer|asdf|zxcv)/i.test(p);
    const isCommon = COMMON.has(p.toLowerCase());
    const yearLike = /(?:19|20)\d{2}/.test(p);
    const rows = [
      [tx('Length','長さ'), p.length + ' ' + tx('chars','字')],
      [tx('Charset size','文字種サイズ'), cs + ''],
      [tx('Entropy','エントロピー'), entropy.toFixed(1) + ' bits'],
      [tx('Lowercase','小文字'), /[a-z]/.test(p) ? '✓' : '—'],
      [tx('Uppercase','大文字'), /[A-Z]/.test(p) ? '✓' : '—'],
      [tx('Digits','数字'), /[0-9]/.test(p) ? '✓' : '—'],
      [tx('Symbols','記号'), /[^A-Za-z0-9]/.test(p) ? '✓' : '—'],
    ];
    $out.innerHTML = rows.map(([k,v]) => `<tr><td style="width:200px">${escapeHtml(k)}</td><td class="mono">${escapeHtml(v)}</td></tr>`).join('');
    const tips = [];
    if (p.length < 12) tips.push(tx('Use at least 12 characters (16+ for high-value accounts).','12 文字以上 (重要アカウントは 16 文字以上) を推奨。'));
    if (cs < 60) tips.push(tx('Mix lowercase, uppercase, digits, and symbols.','大小文字・数字・記号を混在させる。'));
    if (repeats) tips.push(tx('Avoid repeated characters (aaaa, 1111).','同じ文字の連続を避ける。'));
    if (seq) tips.push(tx('Avoid keyboard sequences (qwerty, 1234).','キーボード列・連番を避ける。'));
    if (yearLike) tips.push(tx('Avoid year-like numbers (1990, 2024).','西暦のような数字を避ける。'));
    if (isCommon) tips.push(tx('This is on common-password lists. Choose another.','一般的な漏洩済みパスワードです。別のものを使用。'));
    if (!tips.length) tips.push(tx('Looks reasonable. Pair with MFA and a password manager.','問題ありません。MFA とパスワードマネージャ併用を推奨。'));
    $tips.innerHTML = tips.map(t => `<li>${escapeHtml(t)}</li>`).join('');
  }
  $in.addEventListener('input', update);
  $show.addEventListener('change', () => { $in.type = $show.checked ? 'text' : 'password'; });
  update();
  return { dispose: () => {} };
}

// ====================================================================
// APPS: HMAC Tool (webhook signature verification)
// ====================================================================
function mountHmac(root) {
  root.innerHTML = `
    <div class="app-header">
      <h1>HMAC</h1>
      <div class="app-sub">${escapeHtml(tx('verify webhook signatures / API integrity','Webhook 署名検証・API 完全性確認'))}</div>
    </div>
    <div class="hr"></div>
    <div class="enc-modes">
      <label><input type="radio" name="hm-a" value="SHA-1">HMAC-SHA-1</label>
      <label><input type="radio" name="hm-a" value="SHA-256" checked>HMAC-SHA-256</label>
      <label><input type="radio" name="hm-a" value="SHA-384">HMAC-SHA-384</label>
      <label><input type="radio" name="hm-a" value="SHA-512">HMAC-SHA-512</label>
    </div>
    <span class="label">${escapeHtml(tx('Key (UTF-8) / 鍵','鍵 (UTF-8) / Key'))}</span>
    <input class="input" id="hm-key" spellcheck="false" style="font-family:var(--font-mono);font-size:12px">
    <span class="label">${escapeHtml(tx('Message / メッセージ','メッセージ / Message'))}</span>
    <textarea class="textarea" id="hm-msg" rows="5" spellcheck="false"></textarea>
    <div class="btn-row">
      <button class="btn btn--accent" id="hm-go">${escapeHtml(tx('Compute','計算'))}</button>
      <button class="btn btn--ghost" id="hm-clear">${escapeHtml(tx('Clear','消去'))}</button>
    </div>
    <span class="label">${escapeHtml(tx('Digest (hex) / 出力 (16進)','出力 (16進) / Digest'))}</span>
    <input class="input" id="hm-out" readonly spellcheck="false" style="font-family:var(--font-mono);font-size:11px">
    <div class="hr"></div>
    <span class="label">${escapeHtml(tx('Compare with expected (constant-time)','期待値と比較 (定数時間)'))}</span>
    <input class="input" id="hm-exp" spellcheck="false" style="font-family:var(--font-mono);font-size:11px" placeholder="${escapeHtml(tx('hex digest','期待 hex'))}">
    <div id="hm-status" style="margin-top:8px"></div>
    <p class="muted" style="font-size:11px;margin-top:14px;line-height:1.6">${tx(
      'Use HMAC to verify webhooks (Stripe, GitHub, Slack) or sign API requests. Always compare digests with a constant-time function on the server side to avoid timing attacks.',
      'Webhook (Stripe / GitHub / Slack) や API 署名の検証に使用。サーバー側ではタイミング攻撃を避けるため必ず定数時間比較を使用してください。')}</p>
  `;
  const algoRadio = () => root.querySelector('input[name="hm-a"]:checked').value;
  const $key = root.querySelector('#hm-key'), $msg = root.querySelector('#hm-msg');
  const $out = root.querySelector('#hm-out'), $exp = root.querySelector('#hm-exp'), $st = root.querySelector('#hm-status');
  async function compute() {
    if (!$key.value) { $out.value = ''; $st.innerHTML = `<span class="cmp-status" style="background:rgba(20,20,30,0.06);color:var(--t-2);font-style:italic">${escapeHtml(tx('key required','鍵が必要'))}</span>`; return; }
    const algo = algoRadio();
    const k = await crypto.subtle.importKey('raw', new TextEncoder().encode($key.value), { name:'HMAC', hash: algo }, false, ['sign']);
    const sig = await crypto.subtle.sign('HMAC', k, new TextEncoder().encode($msg.value));
    $out.value = Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2,'0')).join('');
    compare();
  }
  function ctEq(a, b) {
    if (a.length !== b.length) return false;
    let r = 0; for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
    return r === 0;
  }
  function compare() {
    const a = $out.value.trim().toLowerCase(); const e = $exp.value.trim().toLowerCase().replace(/\s+/g,'');
    if (!a || !e) { $st.innerHTML = ''; return; }
    if (ctEq(a, e)) $st.innerHTML = `<span class="cmp-status" style="background:rgba(20,20,30,0.08);color:#15151a;font-weight:600">${escapeHtml(tx('MATCH  /  一致','一致'))}</span>`;
    else $st.innerHTML = `<span class="cmp-status" style="background:#15151a;color:#fff;font-weight:600">${escapeHtml(tx('DIFFER /  不一致','不一致'))}</span>`;
  }
  root.querySelector('#hm-go').addEventListener('click', compute);
  root.querySelector('#hm-clear').addEventListener('click', () => { $key.value=''; $msg.value=''; $out.value=''; $exp.value=''; $st.innerHTML=''; });
  $exp.addEventListener('input', compare);
  return { dispose: () => {} };
}

// ====================================================================
// APPS: Regex Tester
// ====================================================================
function mountRegex(root) {
  root.innerHTML = `
    <div class="app-header">
      <h1>${escapeHtml(tx('Regex Tester','正規表現テスター'))}</h1>
      <div class="app-sub">${escapeHtml(tx('JavaScript regex — match, capture, replace','JavaScript 正規表現 — 一致・キャプチャ・置換'))}</div>
    </div>
    <div class="hr"></div>
    <div class="ps-grid" style="grid-template-columns:60px 1fr">
      <span class="label" style="margin:0">/regex/</span><input class="input" id="rx-p" spellcheck="false" style="font-family:var(--font-mono);font-size:12px" value="\\b[A-Z][a-z]+\\b">
      <span class="label" style="margin:0">flags</span><input class="input" id="rx-f" spellcheck="false" style="font-family:var(--font-mono);font-size:12px;width:120px" value="g">
    </div>
    <span class="label">${escapeHtml(tx('Test string / テスト対象','テスト文字列 / Test string'))}</span>
    <textarea class="textarea" id="rx-t" rows="6" spellcheck="false">Mia builds Studio MIA. The MiaOS desktop is for white-hat security work.</textarea>
    <div class="hr"></div>
    <div id="rx-status" class="muted" style="font-size:11px;margin-bottom:6px"></div>
    <div class="log-pane" id="rx-pane" style="max-height:160px"></div>
    <div class="hr"></div>
    <span class="label">${escapeHtml(tx('Replace with','置換文字列'))}</span>
    <input class="input" id="rx-r" spellcheck="false" style="font-family:var(--font-mono);font-size:12px" value="[$&]">
    <span class="label">${escapeHtml(tx('Replacement output','置換結果'))}</span>
    <textarea class="textarea" id="rx-ro" rows="4" readonly spellcheck="false"></textarea>
  `;
  const $p = root.querySelector('#rx-p'), $f = root.querySelector('#rx-f'), $t = root.querySelector('#rx-t');
  const $r = root.querySelector('#rx-r'), $ro = root.querySelector('#rx-ro');
  const $st = root.querySelector('#rx-status'), $pane = root.querySelector('#rx-pane');
  function run() {
    const pat = $p.value, fl = $f.value;
    let re;
    try { re = new RegExp(pat, fl); }
    catch (e) { $st.innerHTML = `<span class="danger">${escapeHtml('regex error: ' + e.message)}</span>`; $pane.innerHTML = ''; $ro.value = ''; return; }
    const text = $t.value;
    const matches = [];
    if (fl.includes('g')) { let m; const re2 = new RegExp(pat, fl); while ((m = re2.exec(text)) !== null) { matches.push(m); if (m.index === re2.lastIndex) re2.lastIndex++; } }
    else { const m = text.match(re); if (m) matches.push(m); }
    $st.textContent = matches.length + ' ' + tx('match(es)','件一致');
    $pane.innerHTML = matches.length
      ? matches.map((m,i) => `<div class="log-line"><span class="log-num">${String(i+1).padStart(3,' ')}</span><span class="log-content">${escapeHtml(m[0])}${m.length > 1 ? '  ' + tx('groups','グループ') + ': [' + m.slice(1).map(g => g === undefined ? '∅' : JSON.stringify(g)).join(', ') + ']' : ''}</span></div>`).join('')
      : `<div class="muted">${escapeHtml(tx('(no matches)','(一致なし)'))}</div>`;
    try { $ro.value = text.replace(re, $r.value); } catch { $ro.value = ''; }
  }
  [$p, $f, $t, $r].forEach(e => e.addEventListener('input', run));
  run();
  return { dispose: () => {} };
}

// ====================================================================
// APPS: Browser (Chrome-like, user-driven navigation only)
// ====================================================================
const BR_NEWTAB = 'miaos://newtab';
const BR_SHORTCUTS = [
  { name:'Wikipedia',    ico:'W',  url:'https://en.wikipedia.org/wiki/Main_Page' },
  { name:'MDN',          ico:'M',  url:'https://developer.mozilla.org/' },
  { name:'GitHub',       ico:'GH', url:'https://github.com/' },
  { name:'Hacker News',  ico:'Y',  url:'https://news.ycombinator.com/' },
  { name:'arXiv',        ico:'aX', url:'https://arxiv.org/' },
  { name:'OWASP',        ico:'OW', url:'https://owasp.org/' },
];
function mountBrowser(root) {
  let history = [BR_NEWTAB];
  let pos = 0;
  let blocked = false;
  let lastLoadAt = 0;

  function isUrlLike(s) {
    s = s.trim();
    if (!s) return false;
    if (/^https?:\/\//i.test(s)) return true;
    if (/^miaos:\/\//i.test(s)) return true;
    return /^[a-z0-9-]+(\.[a-z0-9-]+)+(\/.*)?$/i.test(s);
  }
  function normalize(s) {
    s = s.trim();
    if (!s) return BR_NEWTAB;
    if (s === 'about:blank' || s === 'about:newtab' || s === 'home') return BR_NEWTAB;
    if (/^https?:\/\//i.test(s) || /^miaos:\/\//i.test(s)) return s;
    if (isUrlLike(s)) return 'https://' + s;
    return 'miaos://search?q=' + encodeURIComponent(s);
  }
  function searchQueryOf(url) {
    if (!url.startsWith('miaos://search?q=')) return null;
    try { return decodeURIComponent(url.slice('miaos://search?q='.length)); } catch { return null; }
  }
  function displayUrl(url) {
    const q = searchQueryOf(url);
    return q !== null ? q : url;
  }
  function current() { return history[pos]; }
  function pushNav(url) {
    url = normalize(url);
    if (history[pos] === url) { render(); return; }
    history = history.slice(0, pos + 1);
    history.push(url);
    pos = history.length - 1;
    blocked = false;
    render();
  }
  function back() { if (pos > 0) { pos--; blocked = false; render(); }}
  function forward() { if (pos < history.length - 1) { pos++; blocked = false; render(); }}
  function reload() { blocked = false; render(true); }
  function home() { pushNav(BR_NEWTAB); }

  function render(forceReload) {
    const url = current();
    const isNewtab = url === BR_NEWTAB;
    const searchQ = searchQueryOf(url);
    const isSearch = searchQ !== null;
    const safeOrigin = (() => { try { return new URL(url).host; } catch { return ''; }})();
    const isHttps = url.startsWith('https://');
    const titleForTab = isNewtab
      ? tx('New Tab','新しいタブ')
      : isSearch
        ? tx('Search: ','検索: ') + searchQ
        : (safeOrigin || url);

    root.innerHTML = `
      <div class="br-root">
        <div class="br-tabs">
          <div class="br-tab"><span class="br-tab__fav">${isNewtab ? '◎' : (isHttps ? '🔒' : '🌐')}</span><span class="br-tab__title">${escapeHtml(titleForTab)}</span></div>
        </div>
        <div class="br-toolbar">
          <button class="br-btn" id="br-back" ${pos<=0?'disabled':''} title="${escapeHtml(tx('Back','戻る'))}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg></button>
          <button class="br-btn" id="br-fwd" ${pos>=history.length-1?'disabled':''} title="${escapeHtml(tx('Forward','進む'))}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg></button>
          <button class="br-btn" id="br-rl" title="${escapeHtml(tx('Reload','再読込'))}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg></button>
          <button class="br-btn" id="br-home" title="${escapeHtml(tx('Home','ホーム'))}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></button>
          <div class="br-omni">
            <span class="br-omni__icon">${isNewtab || isSearch
              ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>'
              : (isHttps
                ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>'
                : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>')}</span>
            <input id="br-url" type="text" spellcheck="false" placeholder="${escapeHtml(tx('Search or type a URL','検索または URL を入力'))}" value="${isNewtab ? '' : escapeHtml(displayUrl(url))}">
            <span class="br-omni__lock">${isNewtab ? '' : (isSearch ? tx('SEARCH','検索') : (isHttps ? 'HTTPS' : 'HTTP'))}</span>
          </div>
          <button class="br-btn" id="br-ext" title="${escapeHtml(tx('Open in real browser tab','実ブラウザで開く'))}" ${isNewtab?'disabled':''}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg></button>
        </div>
        <div class="br-frame-wrap" id="br-frame-wrap"></div>
      </div>
    `;
    const wrap = root.querySelector('#br-frame-wrap');
    if (isNewtab) {
      wrap.innerHTML = `
        <div class="br-newtab">
          <div class="br-newtab__logo">mia<span class="dot"></span>browse</div>
          <form class="br-newtab__search" id="br-newtab-form">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input id="br-q" type="text" autocomplete="off" spellcheck="false" placeholder="${escapeHtml(tx('Search the web or paste a URL','Web を検索または URL を貼付'))}">
          </form>
          <div class="br-newtab__hint">${escapeHtml(tx('Press Enter to search Wikipedia + open quick links to DuckDuckGo / Google / Bing in a real tab. Many sites block iframe embedding (X-Frame-Options / CSP); use the popout button to open them externally.','Enter で Wikipedia を検索 + DuckDuckGo / Google / Bing への外部検索リンクを表示します。多くのサイトは iframe 内表示を拒否 (X-Frame-Options / CSP) するため、その際は右上の外部リンクボタンで実ブラウザを使用してください。'))}</div>
          <div class="br-newtab__shortcuts">
            ${BR_SHORTCUTS.map(s => `<button type="button" class="br-shortcut" data-url="${escapeHtml(s.url)}"><span class="br-shortcut__ico">${escapeHtml(s.ico)}</span><span class="br-shortcut__name">${escapeHtml(s.name)}</span></button>`).join('')}
          </div>
        </div>
      `;
      const ntForm = wrap.querySelector('#br-newtab-form');
      const ntQ = wrap.querySelector('#br-q');
      ntForm.addEventListener('submit', e => { e.preventDefault(); pushNav(ntQ.value); });
      wrap.querySelectorAll('.br-shortcut').forEach(b => b.addEventListener('click', () => pushNav(b.dataset.url)));
      setTimeout(() => ntQ && ntQ.focus(), 30);
    } else if (isSearch) {
      renderSearch(wrap, searchQ);
    } else {
      lastLoadAt = Date.now();
      wrap.innerHTML = `<iframe class="br-frame" id="br-iframe" src="${escapeHtml(url)}" referrerpolicy="no-referrer" sandbox="allow-scripts allow-forms allow-same-origin allow-popups allow-popups-to-escape-sandbox" loading="lazy"></iframe>`;
      const iframe = wrap.querySelector('#br-iframe');
      let loaded = false;
      iframe.addEventListener('load', () => { loaded = true; });
      // Many cross-origin sites set X-Frame-Options or CSP frame-ancestors that
      // prevent the iframe from rendering. We can't directly inspect the cross-
      // origin document, so we offer a manual fallback after a grace period.
      setTimeout(() => {
        if (!loaded && wrap.querySelector('#br-iframe')) {
          showBlocked(wrap, url);
        }
      }, 4500);
    }

    // toolbar bindings
    const omni = root.querySelector('#br-url');
    omni.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); pushNav(omni.value); }});
    omni.addEventListener('focus', () => omni.select());
    root.querySelector('#br-back').addEventListener('click', back);
    root.querySelector('#br-fwd').addEventListener('click', forward);
    root.querySelector('#br-rl').addEventListener('click', reload);
    root.querySelector('#br-home').addEventListener('click', home);
    const ext = root.querySelector('#br-ext');
    if (ext && !isNewtab) ext.addEventListener('click', () => { try { window.open(url, '_blank', 'noopener,noreferrer'); } catch {} });
  }

  async function renderSearch(wrap, q) {
    const enc = encodeURIComponent(q);
    const externals = [
      { id:'ddg',    name:'DuckDuckGo', url:'https://duckduckgo.com/?q=' + enc },
      { id:'google', name:'Google',     url:'https://www.google.com/search?q=' + enc },
      { id:'bing',   name:'Bing',       url:'https://www.bing.com/search?q=' + enc },
      { id:'wp',     name:'Wikipedia',  url:`https://${LANG === 'ja' ? 'ja' : 'en'}.wikipedia.org/w/index.php?search=` + enc },
    ];
    const popoutSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>';
    wrap.innerHTML = `
      <div class="br-search">
        <div class="br-search__head">
          <div class="br-search__title">${escapeHtml(tx('Results for','検索クエリ'))} <strong>${escapeHtml(q)}</strong></div>
          <div class="br-search__exts">
            <span>${escapeHtml(tx('Open in real browser:','実ブラウザで検索:'))}</span>
            ${externals.map(e => `<button class="br-search__ext" data-url="${escapeHtml(e.url)}">${escapeHtml(e.name)}${popoutSvg}</button>`).join('')}
          </div>
        </div>
        <div class="br-search__results" id="br-search-results">
          <div class="br-search__loading">${escapeHtml(tx('Searching Wikipedia...','Wikipedia 検索中...'))}</div>
        </div>
      </div>
    `;
    wrap.querySelectorAll('.br-search__ext').forEach(b => b.addEventListener('click', () => {
      try { window.open(b.dataset.url, '_blank', 'noopener,noreferrer'); } catch {}
    }));
    const list = wrap.querySelector('#br-search-results');
    const lang = LANG === 'ja' ? 'ja' : 'en';
    try {
      const res = await fetch(`https://${lang}.wikipedia.org/w/api.php?action=opensearch&search=${enc}&limit=10&namespace=0&format=json&origin=*`);
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const data = await res.json();
      const titles = data[1] || [], descs = data[2] || [], urls = data[3] || [];
      if (!titles.length) {
        list.innerHTML = `<div class="br-search__loading">${escapeHtml(tx('No Wikipedia results. Try the external buttons above.','Wikipedia 結果なし。上の外部検索をご利用ください。'))}</div>`;
        return;
      }
      list.innerHTML = titles.map((t, i) => {
        const u = urls[i] || '';
        const d = descs[i] || '';
        return `
          <div class="br-result">
            <div class="br-result__src">Wikipedia</div>
            <a class="br-result__title" data-url="${escapeHtml(u)}" href="#">${escapeHtml(t)}</a>
            <div class="br-result__url">${escapeHtml(u)}</div>
            ${d ? `<div class="br-result__desc">${escapeHtml(d)}</div>` : ''}
            <div class="br-result__actions">
              <button class="br-result__act" data-act="open" data-url="${escapeHtml(u)}">${escapeHtml(tx('Open here','ここで開く'))}</button>
              <button class="br-result__act" data-act="ext" data-url="${escapeHtml(u)}">${escapeHtml(tx('Open in real tab','実ブラウザで開く'))}</button>
            </div>
          </div>`;
      }).join('');
      list.querySelectorAll('.br-result__title').forEach(a => a.addEventListener('click', e => { e.preventDefault(); pushNav(a.dataset.url); }));
      list.querySelectorAll('.br-result__act').forEach(b => b.addEventListener('click', () => {
        if (b.dataset.act === 'open') pushNav(b.dataset.url);
        else { try { window.open(b.dataset.url, '_blank', 'noopener,noreferrer'); } catch {} }
      }));
    } catch (e) {
      list.innerHTML = `<div class="br-search__loading" style="color:#7a1f1f">${escapeHtml(tx('Wikipedia search failed: ','Wikipedia 検索失敗: ') + e.message)}<br>${escapeHtml(tx('Use the external buttons above to search elsewhere.','上の外部検索ボタンをご利用ください。'))}</div>`;
    }
  }

  function showBlocked(wrap, url) {
    const safeUrl = escapeHtml(url);
    const banner = el('div', { class:'br-blocked' });
    banner.innerHTML = `
      <h3>${escapeHtml(tx('This site refused to embed','このサイトは iframe 表示を拒否しています'))}</h3>
      <p>${escapeHtml(tx('The page sent X-Frame-Options or a Content-Security-Policy that prevents in-frame display. This is a security choice by the site owner; MiaOS respects it.','サイト側が X-Frame-Options または CSP で埋め込み表示を禁止しています。MiaOS はその意思を尊重します。'))}</p>
      <p style="font-family:var(--font-mono);font-size:11px;color:var(--t-3);word-break:break-all">${safeUrl}</p>
      <div class="btn-row">
        <button class="btn btn--accent" id="br-blocked-open">${escapeHtml(tx('Open in real browser tab','実ブラウザで開く'))}</button>
        <button class="btn btn--ghost" id="br-blocked-back">${escapeHtml(tx('Back','戻る'))}</button>
      </div>
    `;
    wrap.appendChild(banner);
    banner.querySelector('#br-blocked-open').addEventListener('click', () => { try { window.open(url, '_blank', 'noopener,noreferrer'); } catch {} });
    banner.querySelector('#br-blocked-back').addEventListener('click', back);
  }

  render();
  return { dispose: () => {} };
}

// ====================================================================
// APPS: Finder (preserved from original mia-os-react)
// ====================================================================
const FS = {
  '/':         { type:'dir', children:['bin','etc','home','usr','var','tmp'] },
  '/bin':      { type:'dir', children:['ls','cat','echo','hash','b64','uname','whoami'] },
  '/home':     { type:'dir', children:['mia'] },
  '/home/mia': { type:'dir', children:['notes.txt','tools','reports'] },
  '/etc':      { type:'dir', children:['hosts','services','passwd'] },
  '/usr':      { type:'dir', children:['bin','share','local'] },
  '/var':      { type:'dir', children:['log'] },
  '/tmp':      { type:'dir', children:[] },
};
const SIDEBAR = [
  ['Recents',      '最近の項目',    'recents'],
  ['Applications', 'アプリケーション', 'apps'],
  ['Home',         'ホーム',        '/home/mia'],
  ['/',            '/',             '/'],
];
function mountFinder(root) {
  let active = '/home/mia';
  function render() {
    root.innerHTML = `
      <div class="finder">
        <aside class="finder__side">
          <h4>${escapeHtml(tx('Favorites','よく使う項目'))}</h4>
          ${SIDEBAR.map(([en,ja,p]) => `<div class="item${p===active?' is-active':''}" data-p="${escapeHtml(p)}">${escapeHtml(LANG==='ja'?ja:en)}</div>`).join('')}
        </aside>
        <main class="finder__main">
          <div class="finder__head">
            <h3>${escapeHtml(headerLabel(active))}</h3>
            <div class="finder__crumb">${escapeHtml(active)}</div>
          </div>
          <div class="finder__grid">${gridContent(active)}</div>
        </main>
      </div>
    `;
    root.querySelectorAll('.finder__side .item').forEach(it => it.addEventListener('click', () => { active = it.dataset.p; render(); }));
    root.querySelectorAll('.finder__cell[data-go]').forEach(c => c.addEventListener('click', () => { active = c.dataset.go; render(); }));
    root.querySelectorAll('.finder__cell[data-app]').forEach(c => c.addEventListener('click', () => openWindow(c.dataset.app)));
  }
  function headerLabel(p) {
    if (p === 'recents') return tx('Recents','最近の項目');
    if (p === 'apps')    return tx('Applications','アプリケーション');
    if (p === '/home/mia') return tx('Home','ホーム');
    return p;
  }
  function gridContent(p) {
    if (p === 'apps') {
      return APPS.map(a => `<div class="finder__cell" data-app="${a.id}"><div class="ico app">${escapeHtml(a.icon)}</div><div class="name">${escapeHtml(a.title)}</div></div>`).join('');
    }
    if (p === 'recents') {
      const recent = ['welcome','terminal','hash','ethics'];
      return recent.map(id => { const a = APP_BY_ID[id]; return `<div class="finder__cell" data-app="${a.id}"><div class="ico app">${escapeHtml(a.icon)}</div><div class="name">${escapeHtml(a.title)}</div></div>`; }).join('');
    }
    const node = FS[p];
    if (!node || node.type !== 'dir') return `<div class="muted" style="font-size:11px">${escapeHtml(tx('(empty)','(空)'))}</div>`;
    if (!node.children.length) return `<div class="muted" style="font-size:11px">${escapeHtml(tx('(empty)','(空)'))}</div>`;
    return node.children.map(name => {
      const childPath = (p === '/' ? '' : p) + '/' + name;
      const isDir = FS[childPath] && FS[childPath].type === 'dir';
      return `<div class="finder__cell" ${isDir?`data-go="${escapeHtml(childPath)}"`:''}><div class="ico ${isDir?'folder':'file'}">${escapeHtml(isDir ? '▸' : '·')}</div><div class="name">${escapeHtml(name)}</div></div>`;
    }).join('');
  }
  render();
  return { dispose: () => {} };
}

// ====================================================================
// APPS: Settings
// ====================================================================
function mountSettings(root) {
  let tab = 'general';
  const TABS = [
    ['general', tx('General','一般'),  '⚙'],
    ['display', tx('Display','表示'),  '◳'],
    ['sound',   tx('Sound','サウンド'), '♪'],
    ['about',   tx('About','情報'),    'ⓘ'],
  ];
  function render() {
    root.innerHTML = `
      <div class="settings">
        <aside class="settings__side">
          <h4>${escapeHtml(tx('Preferences','環境設定'))}</h4>
          ${TABS.map(([id,label,ic]) => `<div class="settings__tab${id===tab?' is-active':''}" data-tab="${id}"><span style="font-family:var(--font-mono);width:16px;text-align:center">${ic}</span>${escapeHtml(label)}</div>`).join('')}
        </aside>
        <main class="settings__main">${paneHtml()}</main>
      </div>`;
    root.querySelectorAll('.settings__tab').forEach(el2 => el2.addEventListener('click', () => { tab = el2.dataset.tab; render(); }));
    bindPane();
  }
  function paneHtml() {
    if (tab === 'general') {
      return `<div class="settings__pane">
        <h2>${escapeHtml(tx('General','一般'))}</h2>
        <div class="sub">language · region</div>
        <div class="settings__row">
          <div class="label-grp"><div class="ttl">${escapeHtml(tx('Language','言語'))}</div><div class="desc">${escapeHtml(tx('Interface language for MiaOS.','MiaOS の表示言語。'))}</div></div>
          <div class="settings__seg" data-seg="lang">
            <button data-v="en" class="${LANG==='en'?'is-active':''}">English</button>
            <button data-v="ja" class="${LANG==='ja'?'is-active':''}">日本語</button>
          </div>
        </div>
        <div class="settings__row">
          <div class="label-grp"><div class="ttl">${escapeHtml(tx('Workspaces','ワークスペース'))}</div><div class="desc">${escapeHtml(tx('Virtual desktops available from the menu-bar pager.','メニューバーのページャから切り替え可能な仮想デスクトップ数。'))}</div></div>
          <div class="mono muted">${state.workspaceCount}</div>
        </div>
      </div>`;
    }
    if (tab === 'display') {
      const wps = [['mist',tx('Mist','ミスト')],['grid',tx('Grid','グリッド')],['topo',tx('Topo','等高線')],['slate',tx('Slate','スレート')]];
      return `<div class="settings__pane">
        <h2>${escapeHtml(tx('Display','表示'))}</h2>
        <div class="sub">wallpaper · motion · cursor</div>
        <div class="settings__row">
          <div class="label-grp"><div class="ttl">${escapeHtml(tx('Wallpaper','壁紙'))}</div><div class="desc">${escapeHtml(tx('All wallpapers stay in the monochrome palette.','壁紙はすべてモノクロ基調です。'))}</div></div>
        </div>
        <div style="display:flex;gap:10px;flex-wrap:wrap;margin:4px 0 6px">
          ${wps.map(([v,l]) => `<div class="wallpaper-swatch${state.settings.wallpaper===v?' is-active':''}" data-wp="${v}"><div class="wallpaper wallpaper--swatch var-${v}" style="position:absolute;inset:0"></div><span class="lbl">${escapeHtml(l)}</span></div>`).join('')}
        </div>
        <div class="settings__row">
          <div class="label-grp"><div class="ttl">${escapeHtml(tx('Animations','アニメーション'))}</div><div class="desc">${escapeHtml(tx('Window, dock and transition effects.','ウィンドウ・ドック・遷移エフェクト。'))}</div></div>
          <div class="settings__sw${state.settings.motion?' on':''}" data-sw="motion"></div>
        </div>
        <div class="settings__row">
          <div class="label-grp"><div class="ttl">${escapeHtml(tx('Custom cursor','カスタムカーソル'))}</div><div class="desc">${escapeHtml(tx('Dual-layer dot + easing ring pointer.','二層ドット+リングのポインタ。'))}</div></div>
          <div class="settings__sw${state.settings.cursor?' on':''}" data-sw="cursor"></div>
        </div>
      </div>`;
    }
    if (tab === 'sound') {
      return `<div class="settings__pane">
        <h2>${escapeHtml(tx('Sound','サウンド'))}</h2>
        <div class="sub">interface feedback</div>
        <div class="settings__row">
          <div class="label-grp"><div class="ttl">${escapeHtml(tx('UI sounds','UI 効果音'))}</div><div class="desc">${escapeHtml(tx('Subtle clicks via the Web Audio API — no files loaded.','Web Audio API による控えめなクリック音。ファイル読み込みなし。'))}</div></div>
          <div class="settings__sw${state.settings.sound?' on':''}" data-sw="sound"></div>
        </div>
        <div class="btn-row"><button class="btn btn--ghost" id="snd-test">${escapeHtml(tx('Play test tone','テスト音を再生'))}</button></div>
      </div>`;
    }
    return `<div class="settings__pane">
      <h2>${escapeHtml(tx('About MiaOS','MiaOS について'))}</h2>
      <div class="sub">studio mia — white hacking desktop</div>
      <table class="kv-table"><tbody>
        <tr><td style="width:180px">${escapeHtml(tx('Edition','エディション'))}</td><td class="mono">MiaOS '26 — Web Build</td></tr>
        <tr><td>${escapeHtml(tx('Shell','シェル'))}</td><td class="mono">vanilla JS · single-file</td></tr>
        <tr><td>${escapeHtml(tx('Applications','アプリ数'))}</td><td class="mono">${APPS.length}</td></tr>
        <tr><td>${escapeHtml(tx('Inspiration','参考'))}</td><td class="mono">OS.js · Puter</td></tr>
        <tr><td>${escapeHtml(tx('Palette','配色'))}</td><td class="mono">monochrome</td></tr>
      </tbody></table>
      <p class="muted" style="font-size:11px;margin-top:14px;line-height:1.6">${escapeHtml(tx(
        'A desktop-style learning environment for defensive security work. Analysis tools run locally; network tools (DNS, RDAP) issue normal user-driven requests only.',
        '防御的セキュリティ学習のためのデスクトップ風環境。解析ツールはローカル動作、ネットワークツール (DNS / RDAP) はユーザー操作による通常リクエストのみ行います。'))}</p>
    </div>`;
  }
  function relaunchShell() {
    const openIds = state.windows.filter(w => w.workspace === state.workspace).map(w => w.id);
    closeAllWindows();
    buildShell();
    applySettings();
    setTimeout(() => { openIds.forEach(id => openWindow(id)); }, 260);
  }
  function bindPane() {
    const seg = root.querySelector('[data-seg=lang]');
    if (seg) seg.querySelectorAll('button').forEach(b => b.addEventListener('click', () => {
      LANG = b.dataset.v;
      try { localStorage.setItem('miaos.lang', LANG); } catch(_) {}
      relaunchShell();
    }));
    root.querySelectorAll('.wallpaper-swatch').forEach(s => s.addEventListener('click', () => {
      state.settings.wallpaper = s.dataset.wp; saveSettings(); applySettings(); render();
    }));
    root.querySelectorAll('.settings__sw').forEach(sw => sw.addEventListener('click', () => {
      const key = sw.dataset.sw;
      state.settings[key] = !state.settings[key];
      saveSettings(); applySettings();
      sw.classList.toggle('on', state.settings[key]);
    }));
    const test = root.querySelector('#snd-test');
    if (test) test.addEventListener('click', () => beep());
  }
  render();
  return { dispose: () => {} };
}
// tiny Web Audio click — only when sound enabled
let _audioCtx = null;
function beep(freq = 660, dur = 0.06) {
  if (!state.settings.sound) return;
  try {
    _audioCtx = _audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    const o = _audioCtx.createOscillator(), g = _audioCtx.createGain();
    o.frequency.value = freq; o.type = 'sine';
    g.gain.setValueAtTime(0.0001, _audioCtx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.18, _audioCtx.currentTime + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, _audioCtx.currentTime + dur);
    o.connect(g); g.connect(_audioCtx.destination);
    o.start(); o.stop(_audioCtx.currentTime + dur);
  } catch(_) {}
}

// ====================================================================
// APPS: Calculator
// ====================================================================
function mountCalc(root) {
  let cur = '0', acc = null, op = null, fresh = true, hist = '';
  const KEYS = [
    ['(', 'fn'],[')', 'fn'],['√','fn'],['^','fn'],['C','fn'],
    ['7',''],['8',''],['9',''],['÷','op'],['%','fn'],
    ['4',''],['5',''],['6',''],['×','op'],['π','fn'],
    ['1',''],['2',''],['3',''],['−','op'],['e','fn'],
    ['0','wide'],['.',''],['⌫','fn'],['+','op'],
    ['=','eq wide'],['±','fn'],['1/x','fn'],['x²','fn'],
  ];
  function render() {
    root.innerHTML = `
      <div class="calc">
        <div class="calc__display">
          <div class="calc__hist">${escapeHtml(hist || ' ')}</div>
          <div class="calc__main">${escapeHtml(cur)}</div>
        </div>
        <div class="calc__grid">
          ${KEYS.map(([k,c]) => `<button class="calc__btn ${c}" data-k="${escapeHtml(k)}">${escapeHtml(k)}</button>`).join('')}
        </div>
      </div>`;
    root.querySelectorAll('.calc__btn').forEach(b => b.addEventListener('click', () => { press(b.dataset.k); beep(); }));
  }
  function evalOp(a, b, o) {
    if (o === '+') return a + b;
    if (o === '−') return a - b;
    if (o === '×') return a * b;
    if (o === '÷') return b === 0 ? NaN : a / b;
    if (o === '^') return Math.pow(a, b);
    return b;
  }
  function fmt(n) {
    if (!isFinite(n)) return 'Error';
    if (Number.isInteger(n)) return String(n);
    return String(parseFloat(n.toPrecision(12)));
  }
  function press(k) {
    if (k === 'C') { cur = '0'; acc = null; op = null; fresh = true; hist = ''; return render(); }
    if (k === '⌫') { cur = cur.length > 1 ? cur.slice(0,-1) : '0'; return render(); }
    if (/[0-9]/.test(k)) { cur = (fresh || cur === '0') ? k : cur + k; fresh = false; return render(); }
    if (k === '.') { if (!cur.includes('.')) cur += '.'; fresh = false; return render(); }
    if (k === '±') { cur = cur.startsWith('-') ? cur.slice(1) : (cur === '0' ? cur : '-' + cur); return render(); }
    if (k === 'π') { cur = fmt(Math.PI); fresh = true; return render(); }
    if (k === 'e') { cur = fmt(Math.E); fresh = true; return render(); }
    if (k === '√') { cur = fmt(Math.sqrt(parseFloat(cur))); fresh = true; return render(); }
    if (k === 'x²') { cur = fmt(Math.pow(parseFloat(cur),2)); fresh = true; return render(); }
    if (k === '1/x') { cur = fmt(1/parseFloat(cur)); fresh = true; return render(); }
    if (k === '%') { cur = fmt(parseFloat(cur)/100); fresh = true; return render(); }
    if (k === '(' || k === ')') { return; } // visual only — kept minimal
    if (['+','−','×','÷','^'].includes(k)) {
      if (op !== null && !fresh) { acc = evalOp(acc, parseFloat(cur), op); cur = fmt(acc); }
      else acc = parseFloat(cur);
      op = k; fresh = true; hist = fmt(acc) + ' ' + k; return render();
    }
    if (k === '=') {
      if (op !== null) { const r = evalOp(acc, parseFloat(cur), op); hist = fmt(acc) + ' ' + op + ' ' + cur + ' ='; cur = fmt(r); acc = r; op = null; fresh = true; }
      return render();
    }
  }
  const keyHandler = (e) => {
    if (!root.isConnected || state.focusedId !== 'calc') return;
    if (e.target.matches('input,textarea')) return;
    const map = { '/':'÷', '*':'×', '-':'−', 'Enter':'=', '=':'=', 'Backspace':'⌫', 'Escape':'C', '%':'%' };
    let k = e.key;
    if (/[0-9.]/.test(k)) { press(k); }
    else if (k === '+') press('+');
    else if (map[k]) { press(map[k]); }
    else return;
    e.preventDefault();
  };
  window.addEventListener('keydown', keyHandler);
  render();
  return { dispose: () => window.removeEventListener('keydown', keyHandler) };
}

// ====================================================================
// APPS: Notes (Markdown editor + live preview, localStorage-backed)
// ====================================================================
function mdRender(src) {
  // minimal, safe markdown — escape first, then apply inline + block rules
  const esc = escapeHtml(src);
  const lines = esc.split(/\n/);
  let out = '', inCode = false, inList = null;
  const inline = (s) => s
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*])\*([^*]+)\*/g, '$1<em>$2</em>')
    .replace(/\[([^\]]+)\]\((https?:[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  const closeList = () => { if (inList) { out += `</${inList}>`; inList = null; } };
  for (let ln of lines) {
    if (/^```/.test(ln)) {
      if (inCode) { out += '</pre>'; inCode = false; }
      else { closeList(); out += '<pre>'; inCode = true; }
      continue;
    }
    if (inCode) { out += ln + '\n'; continue; }
    if (/^#{1,3}\s/.test(ln)) { closeList(); const lvl = ln.match(/^#+/)[0].length; out += `<h${lvl}>${inline(ln.replace(/^#+\s/,''))}</h${lvl}>`; continue; }
    if (/^\s*[-*]\s/.test(ln)) { if (inList !== 'ul') { closeList(); out += '<ul>'; inList = 'ul'; } out += `<li>${inline(ln.replace(/^\s*[-*]\s/,''))}</li>`; continue; }
    if (/^\s*\d+\.\s/.test(ln)) { if (inList !== 'ol') { closeList(); out += '<ol>'; inList = 'ol'; } out += `<li>${inline(ln.replace(/^\s*\d+\.\s/,''))}</li>`; continue; }
    if (/^&gt;\s?/.test(ln)) { closeList(); out += `<blockquote>${inline(ln.replace(/^&gt;\s?/,''))}</blockquote>`; continue; }
    if (/^(-{3,}|\*{3,})$/.test(ln.trim())) { closeList(); out += '<hr>'; continue; }
    if (ln.trim() === '') { closeList(); continue; }
    closeList();
    out += `<p>${inline(ln)}</p>`;
  }
  if (inCode) out += '</pre>';
  closeList();
  return out;
}
function mountNotes(root) {
  let notes = [];
  let activeId = null;
  try { notes = JSON.parse(localStorage.getItem('miaos.notes') || '[]'); } catch(_) { notes = []; }
  if (!notes.length) {
    notes = [{ id: Date.now(), title: tx('Welcome note','はじめてのノート'),
      body: tx('# Notes\n\nA local **Markdown** notebook.\n\n- Saved to `localStorage`\n- Live preview on the right\n- Nothing leaves this tab\n\n> White hacking starts with good documentation.',
               '# ノート\n\nローカルの **Markdown** ノートです。\n\n- `localStorage` に保存\n- 右側にライブプレビュー\n- このタブの外には出ません\n\n> ホワイトハッキングは良い記録から。'),
      updated: Date.now() }];
  }
  activeId = notes[0] ? notes[0].id : null;
  const save = () => { try { localStorage.setItem('miaos.notes', JSON.stringify(notes)); } catch(_) {} };
  function render() {
    const a = notes.find(n => n.id === activeId);
    root.innerHTML = `
      <div class="notes">
        <aside class="notes__side">
          <div class="notes__toolbar">
            <button class="btn btn--accent" id="nt-new" style="flex:1">${escapeHtml(tx('New','新規'))}</button>
            <button class="btn btn--ghost" id="nt-del">${escapeHtml(tx('Delete','削除'))}</button>
          </div>
          <div class="notes__list">
            ${notes.map(n => `<div class="notes__item${n.id===activeId?' is-active':''}" data-id="${n.id}">
              <div class="ttl">${escapeHtml(n.title || tx('Untitled','無題'))}</div>
              <div class="meta">${new Date(n.updated).toLocaleString()}</div>
            </div>`).join('') || `<div class="muted" style="padding:14px;font-size:11px">${escapeHtml(tx('No notes','ノートなし'))}</div>`}
          </div>
        </aside>
        <main class="notes__main">
          ${a ? `
            <input class="notes__title-in" id="nt-title" value="${escapeHtml(a.title)}" placeholder="${escapeHtml(tx('Title','タイトル'))}">
            <div class="notes__edit-row">
              <div class="notes__edit"><textarea id="nt-body" spellcheck="false" placeholder="${escapeHtml(tx('Write Markdown…','Markdown を入力…'))}">${escapeHtml(a.body)}</textarea></div>
              <div class="notes__preview" id="nt-prev"></div>
            </div>
          ` : `<div class="notes__empty">${escapeHtml(tx('Select or create a note','ノートを選択または作成'))}</div>`}
        </main>
      </div>`;
    root.querySelectorAll('.notes__item').forEach(it => it.addEventListener('click', () => { activeId = parseInt(it.dataset.id,10); render(); }));
    root.querySelector('#nt-new').addEventListener('click', () => {
      const n = { id: Date.now(), title: tx('Untitled','無題'), body: '', updated: Date.now() };
      notes.unshift(n); activeId = n.id; save(); render();
    });
    root.querySelector('#nt-del').addEventListener('click', () => {
      if (activeId == null) return;
      notes = notes.filter(n => n.id !== activeId);
      activeId = notes[0] ? notes[0].id : null;
      save(); render();
    });
    if (a) {
      const title = root.querySelector('#nt-title');
      const body = root.querySelector('#nt-body');
      const prev = root.querySelector('#nt-prev');
      const refresh = () => { prev.innerHTML = mdRender(body.value); };
      refresh();
      let timer = null;
      const persist = () => {
        a.title = title.value; a.body = body.value; a.updated = Date.now();
        clearTimeout(timer); timer = setTimeout(save, 400);
      };
      title.addEventListener('input', persist);
      body.addEventListener('input', () => { persist(); refresh(); });
    }
  }
  render();
  return { dispose: () => {} };
}

// ====================================================================
// APPS: Diff Viewer (line-level LCS diff)
// ====================================================================
function lcsDiff(aLines, bLines) {
  const n = aLines.length, m = bLines.length;
  const dp = Array.from({length:n+1}, () => new Uint32Array(m+1));
  for (let i = n-1; i >= 0; i--)
    for (let j = m-1; j >= 0; j--)
      dp[i][j] = aLines[i] === bLines[j] ? dp[i+1][j+1] + 1 : Math.max(dp[i+1][j], dp[i][j+1]);
  const out = [];
  let i = 0, j = 0;
  while (i < n && j < m) {
    if (aLines[i] === bLines[j]) { out.push({ t:'eq', l:aLines[i], a:i+1, b:j+1 }); i++; j++; }
    else if (dp[i+1][j] >= dp[i][j+1]) { out.push({ t:'del', l:aLines[i], a:i+1 }); i++; }
    else { out.push({ t:'add', l:bLines[j], b:j+1 }); j++; }
  }
  while (i < n) out.push({ t:'del', l:aLines[i], a:++i });
  while (j < m) out.push({ t:'add', l:bLines[j], b:++j });
  return out;
}
function mountDiff(root) {
  root.innerHTML = `
    <div class="app-header">
      <h1>${escapeHtml(tx('Diff Viewer','差分ビューア'))}</h1>
      <div class="app-sub">${escapeHtml(tx('line-level comparison of two texts','2 つのテキストの行単位比較'))}</div>
    </div>
    <div class="hr"></div>
    <div class="diff">
      <div class="diff__inputs">
        <div><span class="label">${escapeHtml(tx('Original / A','元 / A'))}</span><textarea class="textarea" id="df-a" spellcheck="false"></textarea></div>
        <div><span class="label">${escapeHtml(tx('Changed / B','変更後 / B'))}</span><textarea class="textarea" id="df-b" spellcheck="false"></textarea></div>
      </div>
      <div class="btn-row">
        <button class="btn btn--accent" id="df-go">${escapeHtml(tx('Compare','比較'))}</button>
        <button class="btn btn--ghost" id="df-swap">${escapeHtml(tx('Swap','入替'))}</button>
        <button class="btn btn--ghost" id="df-clear">${escapeHtml(tx('Clear','消去'))}</button>
        <span class="muted" id="df-stat" style="align-self:center;font-size:11px;font-family:var(--font-mono)"></span>
      </div>
      <div class="diff__out" id="df-out"></div>
    </div>
  `;
  const $a = root.querySelector('#df-a'), $b = root.querySelector('#df-b');
  const $out = root.querySelector('#df-out'), $stat = root.querySelector('#df-stat');
  function run() {
    const rows = lcsDiff($a.value.split(/\r?\n/), $b.value.split(/\r?\n/));
    let add = 0, del = 0;
    $out.innerHTML = rows.map(r => {
      if (r.t === 'add') add++; if (r.t === 'del') del++;
      const sign = r.t === 'add' ? '+' : r.t === 'del' ? '−' : ' ';
      const num = r.t === 'add' ? r.b : r.t === 'del' ? r.a : r.a;
      return `<div class="diff__line ${r.t === 'eq' ? '' : r.t}"><span class="num">${num||''}</span><span class="sign">${sign}</span><span class="txt">${escapeHtml(r.l) || ' '}</span></div>`;
    }).join('') || `<div class="muted" style="padding:14px">${escapeHtml(tx('(identical / empty)','(同一 / 空)'))}</div>`;
    $stat.textContent = `+${add}  −${del}  ${tx('lines','行')}`;
  }
  root.querySelector('#df-go').addEventListener('click', run);
  root.querySelector('#df-swap').addEventListener('click', () => { const t2 = $a.value; $a.value = $b.value; $b.value = t2; run(); });
  root.querySelector('#df-clear').addEventListener('click', () => { $a.value = ''; $b.value = ''; $out.innerHTML = ''; $stat.textContent = ''; });
  return { dispose: () => {} };
}

// ====================================================================
// APPS: UUID / Random generator (crypto-backed)
// ====================================================================
function mountUuid(root) {
  let tab = 'uuid';
  const WORDS = ['amber','basalt','cipher','dawn','ember','fjord','glyph','harbor','ivory','jade','kelp','lumen','marble','nimbus','onyx','prism','quartz','raven','slate','tundra','umbra','vellum','willow','xenon','yarrow','zephyr','anchor','beacon','cobalt','drift'];
  function randBytes(n) { const a = new Uint8Array(n); crypto.getRandomValues(a); return a; }
  function uuidv4() {
    const b = randBytes(16);
    b[6] = (b[6] & 0x0f) | 0x40;
    b[8] = (b[8] & 0x3f) | 0x80;
    const h = [...b].map(x => x.toString(16).padStart(2,'0'));
    return `${h.slice(0,4).join('')}-${h.slice(4,6).join('')}-${h.slice(6,8).join('')}-${h.slice(8,10).join('')}-${h.slice(10,16).join('')}`;
  }
  function render() {
    root.innerHTML = `
      <div class="app-header">
        <h1>${escapeHtml(tx('UUID / Random','UUID・乱数'))}</h1>
        <div class="app-sub">${escapeHtml(tx('CSPRNG via crypto.getRandomValues — local only','crypto.getRandomValues による CSPRNG — ローカル動作'))}</div>
      </div>
      <div class="hr"></div>
      <div class="rnd-tabs">
        <button data-t="uuid"   class="${tab==='uuid'?'is-active':''}">UUID v4</button>
        <button data-t="bytes"  class="${tab==='bytes'?'is-active':''}">${escapeHtml(tx('Random bytes','ランダムバイト'))}</button>
        <button data-t="pass"   class="${tab==='pass'?'is-active':''}">${escapeHtml(tx('Passphrase','パスフレーズ'))}</button>
        <button data-t="num"    class="${tab==='num'?'is-active':''}">${escapeHtml(tx('Numbers','数値'))}</button>
      </div>
      <div id="rnd-body"></div>
    `;
    root.querySelectorAll('.rnd-tabs button').forEach(b => b.addEventListener('click', () => { tab = b.dataset.t; render(); }));
    renderBody();
  }
  function renderBody() {
    const body = root.querySelector('#rnd-body');
    if (tab === 'uuid') {
      body.innerHTML = `
        <div class="ps-grid" style="grid-template-columns:140px 1fr">
          <span class="label" style="margin:0">${escapeHtml(tx('Count','個数'))}</span><input class="input" id="u-count" type="number" value="5" min="1" max="200">
        </div>
        <div class="btn-row"><button class="btn btn--accent" id="u-go">${escapeHtml(tx('Generate','生成'))}</button><button class="btn btn--ghost" id="u-copy">${escapeHtml(tx('Copy','コピー'))}</button></div>
        <div class="rnd-out" id="u-out"></div>`;
      const out = body.querySelector('#u-out');
      const gen = () => { const n = Math.max(1, Math.min(200, parseInt(body.querySelector('#u-count').value)||5)); out.textContent = Array.from({length:n}, uuidv4).join('\n'); };
      body.querySelector('#u-go').addEventListener('click', gen);
      body.querySelector('#u-copy').addEventListener('click', () => copyText(out.textContent));
      gen();
    } else if (tab === 'bytes') {
      body.innerHTML = `
        <div class="ps-grid" style="grid-template-columns:140px 1fr">
          <span class="label" style="margin:0">${escapeHtml(tx('Byte length','バイト長'))}</span><input class="input" id="b-len" type="number" value="32" min="1" max="1024">
          <span class="label" style="margin:0">${escapeHtml(tx('Format','形式'))}</span>
          <div class="enc-modes"><label><input type="radio" name="b-f" value="hex" checked>Hex</label><label><input type="radio" name="b-f" value="b64">Base64</label><label><input type="radio" name="b-f" value="dec">Decimal</label></div>
        </div>
        <div class="btn-row"><button class="btn btn--accent" id="b-go">${escapeHtml(tx('Generate','生成'))}</button><button class="btn btn--ghost" id="b-copy">${escapeHtml(tx('Copy','コピー'))}</button></div>
        <div class="rnd-out" id="b-out"></div>`;
      const out = body.querySelector('#b-out');
      const gen = () => {
        const n = Math.max(1, Math.min(1024, parseInt(body.querySelector('#b-len').value)||32));
        const fmt = body.querySelector('input[name=b-f]:checked').value;
        const a = randBytes(n);
        if (fmt === 'hex') out.textContent = [...a].map(x => x.toString(16).padStart(2,'0')).join('');
        else if (fmt === 'dec') out.textContent = [...a].join(' ');
        else { let bin = ''; a.forEach(x => bin += String.fromCharCode(x)); out.textContent = btoa(bin); }
      };
      body.querySelector('#b-go').addEventListener('click', gen);
      body.querySelector('#b-copy').addEventListener('click', () => copyText(out.textContent));
      gen();
    } else if (tab === 'pass') {
      body.innerHTML = `
        <div class="ps-grid" style="grid-template-columns:140px 1fr">
          <span class="label" style="margin:0">${escapeHtml(tx('Word count','単語数'))}</span><input class="input" id="p-words" type="number" value="5" min="2" max="12">
          <span class="label" style="margin:0">${escapeHtml(tx('Separator','区切り'))}</span><input class="input" id="p-sep" value="-" maxlength="3">
        </div>
        <label style="display:inline-flex;gap:6px;align-items:center;font-size:12px;margin:6px 0"><input type="checkbox" id="p-num" checked> ${escapeHtml(tx('append random number','末尾に乱数を付加'))}</label>
        <div class="btn-row"><button class="btn btn--accent" id="p-go">${escapeHtml(tx('Generate','生成'))}</button><button class="btn btn--ghost" id="p-copy">${escapeHtml(tx('Copy','コピー'))}</button></div>
        <div class="rnd-out" id="p-out"></div>
        <p class="muted" style="font-size:11px;margin-top:10px;line-height:1.6">${escapeHtml(tx('Diceware-style passphrases are easy to type and remember. Entropy ≈ 4.9 bits/word from this 30-word demo list; use a larger list (7776 words) for real use.','Diceware 風のパスフレーズは入力・記憶が容易です。このデモは 30 語のため約 4.9 bit/語。実用には大きな単語リスト (7776 語) を使用してください。'))}</p>`;
      const out = body.querySelector('#p-out');
      const gen = () => {
        const wc = Math.max(2, Math.min(12, parseInt(body.querySelector('#p-words').value)||5));
        const sep = body.querySelector('#p-sep').value || '-';
        const idx = randBytes(wc);
        let parts = [...idx].map(x => WORDS[x % WORDS.length]);
        if (body.querySelector('#p-num').checked) parts.push(String(randBytes(1)[0] % 100).padStart(2,'0'));
        out.textContent = parts.join(sep);
      };
      body.querySelector('#p-go').addEventListener('click', gen);
      body.querySelector('#p-copy').addEventListener('click', () => copyText(out.textContent));
      gen();
    } else {
      body.innerHTML = `
        <div class="ps-grid" style="grid-template-columns:140px 1fr">
          <span class="label" style="margin:0">${escapeHtml(tx('Minimum','最小'))}</span><input class="input" id="n-min" type="number" value="1">
          <span class="label" style="margin:0">${escapeHtml(tx('Maximum','最大'))}</span><input class="input" id="n-max" type="number" value="100">
          <span class="label" style="margin:0">${escapeHtml(tx('Count','個数'))}</span><input class="input" id="n-count" type="number" value="10" min="1" max="500">
        </div>
        <div class="btn-row"><button class="btn btn--accent" id="n-go">${escapeHtml(tx('Generate','生成'))}</button><button class="btn btn--ghost" id="n-copy">${escapeHtml(tx('Copy','コピー'))}</button></div>
        <div class="rnd-out" id="n-out"></div>`;
      const out = body.querySelector('#n-out');
      const gen = () => {
        let lo = parseInt(body.querySelector('#n-min').value)||0;
        let hi = parseInt(body.querySelector('#n-max').value)||100;
        if (hi < lo) [lo,hi] = [hi,lo];
        // clamp to a uint32-safe span so rejection sampling always terminates
        lo = Math.max(-2147483648, Math.min(2147483647, lo));
        hi = Math.max(lo, Math.min(lo + 0xffffffff, hi));
        const count = Math.max(1, Math.min(500, parseInt(body.querySelector('#n-count').value)||10));
        const span = hi - lo + 1;
        const res = [];
        // rejection sampling for unbiased range
        const limit = Math.floor(0x100000000 / span) * span;
        const buf = new Uint32Array(count * 2);
        crypto.getRandomValues(buf);
        let bi = 0;
        while (res.length < count) {
          if (bi >= buf.length) crypto.getRandomValues(buf), bi = 0;
          const v = buf[bi++];
          if (v < limit) res.push(lo + (v % span));
        }
        out.textContent = res.join('  ');
      };
      body.querySelector('#n-go').addEventListener('click', gen);
      body.querySelector('#n-copy').addEventListener('click', () => copyText(out.textContent));
      gen();
    }
  }
  render();
  return { dispose: () => {} };
}
function copyText(s) {
  try { navigator.clipboard.writeText(s); pushNotification(tx('Copied','コピー完了'), s.length > 60 ? s.slice(0,60)+'…' : s); }
  catch(_) { pushNotification(tx('Copy failed','コピー失敗'), tx('Clipboard unavailable in this context.','このコンテキストではクリップボードを使用できません。')); }
}

// ====================================================================
// APPS: Header Inspector — HTTP response security-header audit
// ====================================================================
const SAMPLE_HEADERS = `HTTP/2 200
content-type: text/html; charset=utf-8
strict-transport-security: max-age=63072000; includeSubDomains; preload
content-security-policy: default-src 'self'; script-src 'self'
x-content-type-options: nosniff
x-frame-options: DENY
referrer-policy: strict-origin-when-cross-origin
cache-control: no-store
server: nginx`;
function mountHeaders(root) {
  root.innerHTML = `
    <div class="app-header">
      <h1>${escapeHtml(tx('Header Inspector','ヘッダ監査'))}</h1>
      <div class="app-sub">${escapeHtml(tx('audit HTTP response security headers — paste, do not fetch','HTTP レスポンスのセキュリティヘッダ監査 — 貼り付け式'))}</div>
    </div>
    <div class="hr"></div>
    <div class="banner">${escapeHtml(tx('Paste raw response headers (e.g. from DevTools → Network → Headers, or curl -I). MiaOS analyses text only and sends nothing.','レスポンスヘッダを貼り付けてください (DevTools の Network → Headers や curl -I など)。MiaOS はテキスト解析のみで送信は行いません。'))}</div>
    <textarea class="textarea" id="hd-in" rows="7" spellcheck="false">${escapeHtml(SAMPLE_HEADERS)}</textarea>
    <div class="btn-row">
      <button class="btn btn--accent" id="hd-go">${escapeHtml(tx('Audit','監査'))}</button>
      <button class="btn btn--ghost" id="hd-clear">${escapeHtml(tx('Clear','消去'))}</button>
    </div>
    <div id="hd-out"></div>
  `;
  const $in = root.querySelector('#hd-in'), $out = root.querySelector('#hd-out');
  // checks: header → {grade fn}
  const CHECKS = [
    { key:'strict-transport-security', name:'Strict-Transport-Security', tip:tx('Forces HTTPS. Want max-age ≥ 15552000 and includeSubDomains.','HTTPS を強制。max-age ≥ 15552000 と includeSubDomains 推奨。'),
      grade:v => { if (!v) return ['miss', tx('not set — connections can be downgraded','未設定 — 接続のダウングレードが可能')];
        const m = /max-age=(\d+)/.exec(v); const age = m ? +m[1] : 0;
        if (age < 15552000) return ['warn', tx('max-age too short','max-age が短い')];
        return ['ok', tx('strong','良好')]; } },
    { key:'content-security-policy', name:'Content-Security-Policy', tip:tx('Mitigates XSS / injection. Avoid unsafe-inline / unsafe-eval.','XSS / インジェクション対策。unsafe-inline / unsafe-eval は避ける。'),
      grade:v => { if (!v) return ['miss', tx('not set — no injection mitigation','未設定 — インジェクション対策なし')];
        if (/unsafe-inline|unsafe-eval/.test(v)) return ['warn', tx("present but uses 'unsafe-*'","設定済みだが unsafe-* を使用")];
        return ['ok', tx('present','設定済み')]; } },
    { key:'x-content-type-options', name:'X-Content-Type-Options', tip:tx('Should be "nosniff" to stop MIME confusion.','MIME 推測を防ぐため "nosniff" にする。'),
      grade:v => !v ? ['miss', tx('not set','未設定')] : (/nosniff/i.test(v) ? ['ok','nosniff'] : ['warn', tx('unexpected value','想定外の値')]) },
    { key:'x-frame-options', name:'X-Frame-Options', tip:tx('DENY / SAMEORIGIN blocks clickjacking (or use CSP frame-ancestors).','DENY / SAMEORIGIN でクリックジャッキング対策 (CSP frame-ancestors でも可)。'),
      grade:v => !v ? ['warn', tx('not set — rely on CSP frame-ancestors','未設定 — CSP frame-ancestors に依存')] : ['ok', v.toUpperCase()] },
    { key:'referrer-policy', name:'Referrer-Policy', tip:tx('Limits referrer leakage. strict-origin-when-cross-origin is a good default.','リファラ漏洩を制限。strict-origin-when-cross-origin が無難。'),
      grade:v => !v ? ['warn', tx('not set — browser default applies','未設定 — ブラウザ既定が適用')] : ['ok', v] },
    { key:'permissions-policy', name:'Permissions-Policy', tip:tx('Restricts powerful features (camera, geolocation…).','カメラ・位置情報などの強力な機能を制限。'),
      grade:v => !v ? ['info', tx('not set — optional but recommended','未設定 — 任意だが推奨')] : ['ok', tx('present','設定済み')] },
  ];
  function parse(text) {
    const h = {};
    text.split(/\r?\n/).forEach(line => {
      const m = /^([A-Za-z0-9-]+):\s?(.*)$/.exec(line.trim());
      if (m) h[m[1].toLowerCase()] = m[2];
    });
    return h;
  }
  function audit() {
    const h = parse($in.value);
    let score = 0, max = 0;
    const rows = CHECKS.map(c => {
      const v = h[c.key];
      const [g, msg] = c.grade(v);
      max += 2;
      score += g === 'ok' ? 2 : (g === 'warn' || g === 'info') ? 1 : 0;
      return `<div class="audit-row">
        <div class="h">${escapeHtml(c.name)}<div style="font-weight:400;color:var(--t-3);font-size:10px;margin-top:3px;font-family:var(--font-ui)">${escapeHtml(c.tip)}</div></div>
        <div class="v">${escapeHtml(v || '—')}<div style="color:var(--t-3);margin-top:2px">${escapeHtml(msg)}</div></div>
        <div class="b"><span class="badge ${g}">${g==='ok'?'OK':g==='warn'?'WEAK':g==='info'?'INFO':'MISS'}</span></div>
      </div>`;
    }).join('');
    const pct = max ? score / max : 0;
    let letter = 'F', desc = tx('Significant gaps — harden before exposure.','重大な不足 — 公開前に強化を。');
    if (pct >= 0.92) { letter = 'A'; desc = tx('Strong security-header posture.','セキュリティヘッダは良好。'); }
    else if (pct >= 0.75) { letter = 'B'; desc = tx('Good, with minor improvements available.','良好、わずかに改善余地あり。'); }
    else if (pct >= 0.55) { letter = 'C'; desc = tx('Several headers need attention.','複数のヘッダに注意が必要。'); }
    else if (pct >= 0.35) { letter = 'D'; desc = tx('Many protections missing.','多くの保護が欠落。'); }
    $out.innerHTML = `
      <div class="audit-grade">
        <div class="letter">${letter}</div>
        <div class="desc"><strong>${escapeHtml(tx('Header score','ヘッダスコア'))} — ${Math.round(pct*100)}%</strong>${escapeHtml(desc)}</div>
      </div>
      <div style="border:1px solid var(--hair);border-radius:8px;overflow:hidden">${rows}</div>
      <p class="muted" style="font-size:11px;margin-top:10px;line-height:1.6">${escapeHtml(tx('This is a heuristic checklist, not a full assessment. Header presence does not prove correct configuration.','これは経験則によるチェックリストであり完全な評価ではありません。ヘッダの有無は正しい設定を保証しません。'))}</p>`;
  }
  root.querySelector('#hd-go').addEventListener('click', audit);
  root.querySelector('#hd-clear').addEventListener('click', () => { $in.value = ''; $out.innerHTML = ''; });
  audit();
  return { dispose: () => {} };
}

// ====================================================================
// APPS: Cookie Inspector — Set-Cookie attribute audit
// ====================================================================
function mountCookies(root) {
  const SAMPLE = `Set-Cookie: session=ab12cd34; Path=/; HttpOnly; Secure; SameSite=Lax
Set-Cookie: theme=dark; Path=/; Max-Age=31536000
Set-Cookie: __Host-csrf=xyz789; Path=/; Secure; HttpOnly; SameSite=Strict`;
  root.innerHTML = `
    <div class="app-header">
      <h1>${escapeHtml(tx('Cookie Inspector','Cookie 監査'))}</h1>
      <div class="app-sub">${escapeHtml(tx('flag missing Secure / HttpOnly / SameSite attributes','Secure / HttpOnly / SameSite 属性の欠落を検出'))}</div>
    </div>
    <div class="hr"></div>
    <div class="banner">${escapeHtml(tx('Paste one or more Set-Cookie headers. Use your own dev cookies — never production session cookies you do not own.','Set-Cookie ヘッダを貼り付けてください。検証用の自分の Cookie のみを使用し、所有しない本番セッション Cookie は扱わないこと。'))}</div>
    <textarea class="textarea" id="ck-in" rows="6" spellcheck="false">${escapeHtml(SAMPLE)}</textarea>
    <div class="btn-row">
      <button class="btn btn--accent" id="ck-go">${escapeHtml(tx('Inspect','解析'))}</button>
      <button class="btn btn--ghost" id="ck-clear">${escapeHtml(tx('Clear','消去'))}</button>
    </div>
    <div id="ck-out"></div>
  `;
  const $in = root.querySelector('#ck-in'), $out = root.querySelector('#ck-out');
  function parseCookie(line) {
    const parts = line.replace(/^set-cookie:\s*/i, '').split(';').map(s => s.trim()).filter(Boolean);
    if (!parts.length) return null;
    const [name, ...valRest] = parts[0].split('=');
    const c = { name: name.trim(), value: valRest.join('='), attrs: {} };
    parts.slice(1).forEach(p => {
      const [k, ...v] = p.split('=');
      c.attrs[k.trim().toLowerCase()] = v.length ? v.join('=').trim() : true;
    });
    return c;
  }
  function inspect() {
    const lines = $in.value.split(/\r?\n/).map(l => l.trim()).filter(l => /\S/.test(l));
    if (!lines.length) { $out.innerHTML = `<p class="muted" style="margin-top:10px">${escapeHtml(tx('(no cookies)','(Cookie なし)'))}</p>`; return; }
    $out.innerHTML = lines.map(line => {
      const c = parseCookie(line);
      if (!c) return '';
      const a = c.attrs;
      const findings = [];
      const isHost = c.name.startsWith('__Host-');
      const isSecPfx = c.name.startsWith('__Secure-');
      if (!a.secure) findings.push(['warn', tx('Secure missing — cookie can travel over HTTP','Secure 欠落 — HTTP で送信される可能性')]);
      else findings.push(['ok','Secure']);
      if (!a.httponly) findings.push(['warn', tx('HttpOnly missing — readable by JavaScript (XSS theft risk)','HttpOnly 欠落 — JS から読取可能 (XSS 窃取リスク)')]);
      else findings.push(['ok','HttpOnly']);
      if (!a.samesite) findings.push(['warn', tx('SameSite missing — CSRF exposure (defaults to Lax in modern browsers)','SameSite 欠落 — CSRF リスク (近年の既定は Lax)')]);
      else findings.push(['ok','SameSite=' + a.samesite]);
      if (isHost) {
        if (a.domain) findings.push(['warn', tx('__Host- prefix forbids Domain attribute','__Host- 接頭辞は Domain 属性を禁止')]);
        if (a.path !== '/') findings.push(['warn', tx('__Host- prefix requires Path=/','__Host- 接頭辞は Path=/ が必須')]);
        if (!a.secure) findings.push(['warn', tx('__Host- prefix requires Secure','__Host- 接頭辞は Secure が必須')]);
      }
      if ((isHost || isSecPfx)) findings.push(['info', tx('uses a security prefix — good practice','セキュリティ接頭辞を使用 — 良い習慣')]);
      const sameVal = (a.samesite||'').toLowerCase();
      if (sameVal === 'none' && !a.secure) findings.push(['warn', tx('SameSite=None requires Secure','SameSite=None は Secure 必須')]);
      const bad = findings.filter(f => f[0] === 'warn').length;
      const badge = bad === 0 ? '<span class="badge ok">SAFE</span>' : `<span class="badge warn">${bad} ${tx('ISSUE','問題')}</span>`;
      return `
        <div style="border:1px solid var(--hair);border-radius:9px;margin-top:10px;overflow:hidden">
          <div style="padding:9px 12px;background:rgba(245,245,248,0.7);display:flex;justify-content:space-between;align-items:center">
            <span style="font-family:var(--font-mono);font-size:12px;font-weight:600">${escapeHtml(c.name)}</span>${badge}
          </div>
          <div style="padding:6px 0">
            ${findings.map(([g,msg]) => `<div class="audit-row"><div class="h" style="flex:0 0 26px"><span class="badge ${g}" style="padding:2px 5px">${g==='ok'?'✓':g==='info'?'i':'!'}</span></div><div class="v" style="font-family:var(--font-ui)">${escapeHtml(msg)}</div></div>`).join('')}
            <div class="audit-row"><div class="h" style="flex:0 0 26px"></div><div class="v" style="color:var(--t-3)">attrs: ${escapeHtml(Object.keys(c.attrs).join(', ') || '—')}</div></div>
          </div>
        </div>`;
    }).join('');
  }
  root.querySelector('#ck-go').addEventListener('click', inspect);
  root.querySelector('#ck-clear').addEventListener('click', () => { $in.value = ''; $out.innerHTML = ''; });
  inspect();
  return { dispose: () => {} };
}

// ====================================================================
// APPS: DNS Lookup (DNS-over-HTTPS via Cloudflare)
// ====================================================================
function mountDns(root) {
  const TYPES = ['A','AAAA','CNAME','MX','TXT','NS','SOA','CAA'];
  const RR = { 1:'A', 2:'NS', 5:'CNAME', 6:'SOA', 15:'MX', 16:'TXT', 28:'AAAA', 257:'CAA' };
  root.innerHTML = `
    <div class="app-header">
      <h1>${escapeHtml(tx('DNS Lookup','DNS 解決'))}</h1>
      <div class="app-sub">${escapeHtml(tx('DNS-over-HTTPS via Cloudflare 1.1.1.1','Cloudflare 1.1.1.1 経由の DNS-over-HTTPS'))}</div>
    </div>
    <div class="hr"></div>
    <div class="banner">${escapeHtml(tx('Resolves public DNS records over an encrypted HTTPS request to cloudflare-dns.com. This is a normal, read-only lookup — the same thing any browser does.','cloudflare-dns.com への暗号化 HTTPS リクエストで公開 DNS レコードを解決します。ブラウザが行うのと同じ通常の読み取り専用クエリです。'))}</div>
    <div class="ps-grid" style="grid-template-columns:1fr 120px">
      <input class="input" id="dn-host" spellcheck="false" placeholder="example.com" value="example.com" style="font-family:var(--font-mono)">
      <select class="input" id="dn-type">${TYPES.map(t2 => `<option ${t2==='A'?'selected':''}>${t2}</option>`).join('')}</select>
    </div>
    <div class="btn-row">
      <button class="btn btn--accent" id="dn-go">${escapeHtml(tx('Resolve','解決'))}</button>
      <span class="muted" id="dn-stat" style="align-self:center;font-size:11px;font-family:var(--font-mono)"></span>
    </div>
    <div id="dn-out"></div>
  `;
  const $host = root.querySelector('#dn-host'), $type = root.querySelector('#dn-type');
  const $out = root.querySelector('#dn-out'), $stat = root.querySelector('#dn-stat');
  async function resolve() {
    const host = $host.value.trim().replace(/^https?:\/\//,'').replace(/\/.*$/,'');
    if (!host) return;
    const type = $type.value;
    $stat.textContent = tx('resolving…','解決中…'); $out.innerHTML = '';
    const t0 = performance.now();
    try {
      const res = await fetch(`https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(host)}&type=${type}`, { headers:{ accept:'application/dns-json' }});
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const data = await res.json();
      const ms = Math.round(performance.now() - t0);
      const RCODE = { 0:'NOERROR', 1:'FORMERR', 2:'SERVFAIL', 3:'NXDOMAIN', 5:'REFUSED' };
      $stat.textContent = `${RCODE[data.Status]||('RCODE '+data.Status)} · ${ms}ms`;
      const ans = data.Answer || [];
      if (!ans.length) {
        $out.innerHTML = `<p class="muted" style="margin-top:10px">${escapeHtml(tx('No records of this type.','このタイプのレコードはありません。'))}</p>`;
        return;
      }
      $out.innerHTML = `
        <table class="kv-table" style="margin-top:6px"><thead><tr>
          <th style="width:46%">${escapeHtml(tx('Name','名前'))}</th><th style="width:70px">Type</th><th style="width:60px">TTL</th><th>${escapeHtml(tx('Data','データ'))}</th>
        </tr></thead><tbody>
        ${ans.map(a => `<tr><td class="mono">${escapeHtml(a.name)}</td><td class="mono">${escapeHtml(RR[a.type]||String(a.type))}</td><td class="mono">${a.TTL}</td><td class="mono" style="word-break:break-all">${escapeHtml(a.data)}</td></tr>`).join('')}
        </tbody></table>`;
    } catch (e) {
      $stat.textContent = tx('failed','失敗');
      $out.innerHTML = `<div class="banner danger" style="margin-top:10px">${escapeHtml(tx('Lookup failed: ','解決失敗: ') + e.message)}</div>`;
    }
  }
  root.querySelector('#dn-go').addEventListener('click', resolve);
  $host.addEventListener('keydown', e => { if (e.key === 'Enter') resolve(); });
  return { dispose: () => {} };
}

// ====================================================================
// APPS: RDAP / Whois (registration data via rdap.org)
// ====================================================================
function mountRdap(root) {
  root.innerHTML = `
    <div class="app-header">
      <h1>${escapeHtml(tx('RDAP / Whois','RDAP / Whois'))}</h1>
      <div class="app-sub">${escapeHtml(tx('domain registration data via the RDAP protocol','RDAP プロトコルによるドメイン登録情報'))}</div>
    </div>
    <div class="hr"></div>
    <div class="banner">${escapeHtml(tx('Looks up public registration data (registrar, dates, status, name servers) for a domain via rdap.org. RDAP is the modern, structured successor to Whois.','rdap.org 経由でドメインの公開登録情報 (レジストラ・日付・ステータス・ネームサーバ) を取得します。RDAP は Whois の後継となる構造化プロトコルです。'))}</div>
    <div class="ps-grid" style="grid-template-columns:1fr 120px">
      <input class="input" id="rd-host" spellcheck="false" placeholder="example.com" value="example.com" style="font-family:var(--font-mono)">
      <button class="btn btn--accent" id="rd-go">${escapeHtml(tx('Look up','照会'))}</button>
    </div>
    <div class="muted" id="rd-stat" style="font-size:11px;font-family:var(--font-mono);margin:4px 0"></div>
    <div id="rd-out"></div>
  `;
  const $host = root.querySelector('#rd-host'), $out = root.querySelector('#rd-out'), $stat = root.querySelector('#rd-stat');
  async function lookup() {
    const host = $host.value.trim().replace(/^https?:\/\//,'').replace(/\/.*$/,'').toLowerCase();
    if (!host) return;
    $stat.textContent = tx('querying rdap.org…','rdap.org に照会中…'); $out.innerHTML = '';
    try {
      const res = await fetch(`https://rdap.org/domain/${encodeURIComponent(host)}`);
      if (!res.ok) throw new Error('HTTP ' + res.status + (res.status === 404 ? ' — ' + tx('domain not found','ドメインが見つかりません') : ''));
      const d = await res.json();
      $stat.textContent = tx('done','完了');
      const events = {};
      (d.events || []).forEach(e => { events[e.eventAction] = e.eventDate; });
      const ns = (d.nameservers || []).map(n => n.ldhName).filter(Boolean);
      const status = (d.status || []);
      const fmtDate = (s) => s ? new Date(s).toLocaleString() : '—';
      const rows = [
        [tx('Domain','ドメイン'), d.ldhName || host],
        [tx('Handle','ハンドル'), d.handle || '—'],
        [tx('Registered','登録日'), fmtDate(events.registration)],
        [tx('Last changed','最終更新'), fmtDate(events['last changed'] || events['last update of RDAP database'])],
        [tx('Expires','有効期限'), fmtDate(events.expiration)],
        [tx('Status','ステータス'), status.join(', ') || '—'],
      ];
      $out.innerHTML = `
        <table class="kv-table" style="margin-top:6px"><tbody>
          ${rows.map(([k,v]) => `<tr><td style="width:180px">${escapeHtml(k)}</td><td class="mono" style="word-break:break-all">${escapeHtml(String(v))}</td></tr>`).join('')}
        </tbody></table>
        ${ns.length ? `<span class="label" style="margin-top:12px">${escapeHtml(tx('Name servers','ネームサーバ'))}</span><div class="code">${ns.map(escapeHtml).join('\n')}</div>` : ''}
        <p class="muted" style="font-size:11px;margin-top:10px;line-height:1.6">${escapeHtml(tx('Registrant contact details are usually redacted for privacy (GDPR / ICANN policy).','登録者の連絡先はプライバシー保護のため通常は秘匿されます (GDPR / ICANN ポリシー)。'))}</p>`;
    } catch (e) {
      $stat.textContent = tx('failed','失敗');
      $out.innerHTML = `<div class="banner danger" style="margin-top:10px">${escapeHtml(tx('Lookup failed: ','照会失敗: ') + e.message)}</div>`;
    }
  }
  root.querySelector('#rd-go').addEventListener('click', lookup);
  $host.addEventListener('keydown', e => { if (e.key === 'Enter') lookup(); });
  return { dispose: () => {} };
}

// ====================================================================
// APPS: Codepoint Inspector — per-character Unicode breakdown
// ====================================================================
function mountCodepoint(root) {
  root.innerHTML = `
    <div class="app-header">
      <h1>${escapeHtml(tx('Codepoint Inspector','文字コード解析'))}</h1>
      <div class="app-sub">${escapeHtml(tx('per-character Unicode / UTF-8 breakdown','文字単位の Unicode / UTF-8 内訳'))}</div>
    </div>
    <div class="hr"></div>
    <span class="label">${escapeHtml(tx('Input / 入力','入力 / Input'))}</span>
    <textarea class="textarea" id="cp-in" rows="3" spellcheck="false">Mia OS — 美杏 ☺</textarea>
    <div class="muted" id="cp-stat" style="font-size:11px;font-family:var(--font-mono);margin:6px 0"></div>
    <div class="pr-wrap" style="height:auto;max-height:340px">
      <table class="cp-table">
        <thead><tr><th>${escapeHtml(tx('Char','文字'))}</th><th>${escapeHtml(tx('Codepoint','コードポイント'))}</th><th>${escapeHtml(tx('Decimal','10進'))}</th><th>UTF-8</th><th>${escapeHtml(tx('Notes','備考'))}</th></tr></thead>
        <tbody id="cp-body"></tbody>
      </table>
    </div>
  `;
  const $in = root.querySelector('#cp-in'), $body = root.querySelector('#cp-body'), $stat = root.querySelector('#cp-stat');
  function charNote(cp) {
    if (cp <= 0x1f || (cp >= 0x7f && cp <= 0x9f)) return tx('control character','制御文字');
    if (cp === 0x20) return tx('space','スペース');
    if (cp >= 0x30 && cp <= 0x39) return tx('digit','数字');
    if ((cp >= 0x41 && cp <= 0x5a) || (cp >= 0x61 && cp <= 0x7a)) return tx('basic latin letter','基本ラテン文字');
    if (cp >= 0x3040 && cp <= 0x309f) return tx('hiragana','ひらがな');
    if (cp >= 0x30a0 && cp <= 0x30ff) return tx('katakana','カタカナ');
    if (cp >= 0x4e00 && cp <= 0x9fff) return tx('CJK unified ideograph','CJK 統合漢字');
    if (cp >= 0x1f300 && cp <= 0x1faff) return tx('emoji / pictograph','絵文字 / 記号');
    if (cp >= 0x2000 && cp <= 0x206f) return tx('general punctuation','一般句読点');
    if (cp > 0xffff) return tx('astral plane (surrogate pair)','追加面 (サロゲートペア)');
    return tx('symbol / other','記号 / その他');
  }
  function render() {
    const text = $in.value;
    const chars = [...text];
    $stat.textContent = `${chars.length} ${tx('codepoints','コードポイント')} · ${new TextEncoder().encode(text).length} ${tx('UTF-8 bytes','UTF-8 バイト')} · ${text.length} ${tx('UTF-16 units','UTF-16 単位')}`;
    $body.innerHTML = chars.map(ch => {
      const cp = ch.codePointAt(0);
      const utf8 = [...new TextEncoder().encode(ch)].map(b => b.toString(16).padStart(2,'0').toUpperCase()).join(' ');
      const display = (cp <= 0x20 || (cp >= 0x7f && cp <= 0xa0)) ? '·' : ch;
      return `<tr>
        <td class="gly">${escapeHtml(display)}</td>
        <td class="hex">U+${cp.toString(16).toUpperCase().padStart(4,'0')}</td>
        <td class="dec">${cp}</td>
        <td class="utf">${utf8}</td>
        <td class="name">${escapeHtml(charNote(cp))}</td>
      </tr>`;
    }).join('') || `<tr><td colspan="5" class="muted" style="text-align:center;padding:14px">${escapeHtml(tx('(empty)','(空)'))}</td></tr>`;
  }
  $in.addEventListener('input', render);
  render();
  return { dispose: () => {} };
}

// ====================================================================
// APPS: Task Manager
// ====================================================================
function mountTaskmgr(root) {
  let timer = null;
  // deterministic pseudo-memory per app id so the figures stay stable
  function memOf(id) {
    let h = 0; for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) | 0;
    return 14 + (Math.abs(h) % 120);
  }
  function render() {
    const here = state.windows;
    const totalMem = here.reduce((s,w) => s + memOf(w.id), 48);
    root.innerHTML = `
      <div class="app-header">
        <h1>${escapeHtml(tx('Task Manager','タスクマネージャ'))}</h1>
        <div class="app-sub">${escapeHtml(tx('open windows across all workspaces','全ワークスペースの稼働ウィンドウ'))}</div>
      </div>
      <div class="hr"></div>
      <div style="display:flex;gap:18px;margin-bottom:10px">
        <div style="flex:1"><span class="label">${escapeHtml(tx('Windows','ウィンドウ数'))}</span><div style="font-size:22px;font-weight:300">${here.length}</div></div>
        <div style="flex:1"><span class="label">${escapeHtml(tx('Memory (sim.)','メモリ (擬似)'))}</span><div style="font-size:22px;font-weight:300">${totalMem} MB</div><div class="bar"><span style="width:${Math.min(100, totalMem/12)}%"></span></div></div>
        <div style="flex:1"><span class="label">${escapeHtml(tx('Workspace','ワークスペース'))}</span><div style="font-size:22px;font-weight:300">${state.workspace+1} / ${state.workspaceCount}</div></div>
      </div>
      <div class="taskmgr" style="border:1px solid var(--hair);border-radius:8px;overflow:hidden">
        <table>
          <thead><tr><th>${escapeHtml(tx('Application','アプリ'))}</th><th style="width:60px">WS</th><th style="width:80px">${escapeHtml(tx('State','状態'))}</th><th style="width:90px">${escapeHtml(tx('Memory','メモリ'))}</th><th style="width:70px"></th></tr></thead>
          <tbody>
            ${here.length ? here.map(w => {
              const meta = APP_BY_ID[w.id];
              const st = w.minimized ? tx('minimized','最小化') : w.maximized ? tx('maximized','最大化') : (state.focusedId===w.id ? tx('focused','フォーカス') : tx('running','稼働'));
              return `<tr>
                <td><span style="font-family:var(--font-mono);font-size:11px;background:rgba(20,20,30,0.06);padding:2px 6px;border-radius:4px;margin-right:8px">${escapeHtml(meta.icon)}</span>${escapeHtml(meta.title)}</td>
                <td><span class="pill">${w.workspace+1}</span></td>
                <td style="color:var(--t-2)">${escapeHtml(st)}</td>
                <td class="mono" style="font-size:11px">${memOf(w.id)} MB</td>
                <td><button class="end-btn" data-id="${w.id}">${escapeHtml(tx('End','終了'))}</button></td>
              </tr>`;
            }).join('') : `<tr><td colspan="5" class="muted" style="text-align:center;padding:18px;font-size:12px">${escapeHtml(tx('No running windows','稼働中のウィンドウなし'))}</td></tr>`}
          </tbody>
        </table>
      </div>
      <p class="muted" style="font-size:11px;margin-top:10px;line-height:1.6">${escapeHtml(tx('Memory figures are simulated for this single-page build. "End" closes the window through the normal animated close path.','メモリ値はこの単一ページ版での擬似値です。「終了」は通常のアニメーション付きクローズ処理を呼び出します。'))}</p>
    `;
    root.querySelectorAll('.end-btn').forEach(b => b.addEventListener('click', () => { closeWindow(b.dataset.id); setTimeout(render, 260); }));
  }
  render();
  timer = setInterval(render, 2000);
  return { dispose: () => clearInterval(timer) };
}

// ====================================================================
// App mounters
// ====================================================================
const APP_MOUNTERS = {
  welcome:  mountWelcome,
  terminal: mountTerminal,
  hash:     mountHash,
  encoder:  mountEncoder,
  netinfo:  mountNetInfo,
  portscan: mountPortScanner,
  portref:  mountPortRef,
  logs:     mountLogViewer,
  ethics:   mountEthics,
  jwt:      mountJwt,
  cidr:     mountCidr,
  passwd:   mountPasswd,
  hmac:     mountHmac,
  regex:    mountRegex,
  browser:  mountBrowser,
  finder:   mountFinder,
  settings: mountSettings,
  notes:    mountNotes,
  calc:     mountCalc,
  diff:     mountDiff,
  uuid:     mountUuid,
  headers:  mountHeaders,
  cookies:  mountCookies,
  dns:      mountDns,
  rdap:     mountRdap,
  codepoint:mountCodepoint,
  taskmgr:  mountTaskmgr,
};

// ====================================================================
// Init
// ====================================================================
try { const saved = localStorage.getItem('miaos.lang'); if (saved === 'en' || saved === 'ja') LANG = saved; } catch(_) {}
startBoot();

})();
