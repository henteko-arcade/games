// かんたんなパスワード画面
//  - <head> の中で <script src="../lib/gate.js" data-game="..." data-title="..." data-hash="..."></script> のように読みこむ
//  - パスワードそのものは書かず、SHA-256 のハッシュだけを持っておく
//  - 一度正しく入れたら、その端末では覚えておく
//  - ゲームの本体は window.gateReady が終わるまで始まらない
//  ※ ソースコードを読める人にはすり抜けられる「のれん」くらいの守りです
(function () {
  var s = document.currentScript;
  var game = s.dataset.game, title = s.dataset.title || 'ゲーム', hash = s.dataset.hash;
  var KEY = 'gate-' + game;
  var resolve;
  window.gateReady = new Promise(function (r) { resolve = r; });

  var ok = false;
  try { ok = localStorage.getItem(KEY) === hash; } catch (e) {}
  if (ok) { resolve(); return; }

  async function sha256(text) {
    var buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
    return Array.from(new Uint8Array(buf)).map(function (b) { return b.toString(16).padStart(2, '0'); }).join('');
  }

  var css = '#gate{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;padding:24px;' +
    'background:radial-gradient(circle at 20% 0%,#2b2f66,#151833 60%,#0e1024);font-family:-apple-system,BlinkMacSystemFont,"Hiragino Sans","Noto Sans JP",sans-serif;color:#fff;touch-action:manipulation}' +
    '#gate .box{width:100%;max-width:320px;text-align:center}' +
    '#gate .ic{font-size:54px}' +
    '#gate h1{font-size:24px;margin:8px 0 4px}' +
    '#gate p{font-size:14px;opacity:.8;margin:0 0 18px}' +
    '#gate input{width:100%;box-sizing:border-box;padding:14px 16px;border-radius:14px;border:2px solid rgba(255,255,255,.25);background:rgba(255,255,255,.1);color:#fff;font-size:18px;text-align:center;outline:none;-webkit-user-select:text;user-select:text}' +
    '#gate input:focus{border-color:#ffcf3f}' +
    '#gate button{margin-top:12px;width:100%;padding:14px;border-radius:14px;border:none;background:#ffcf3f;color:#4a2d00;font-size:18px;font-weight:900}' +
    '#gate .err{color:#ff8a8a;font-weight:800;font-size:14px;height:20px;margin-top:10px}' +
    '#gate a{display:inline-block;margin-top:14px;color:#fff;opacity:.7;font-size:14px}' +
    '#gate.shake .box{animation:gshake .35s}@keyframes gshake{25%{transform:translateX(-8px)}75%{transform:translateX(8px)}}';

  function show() {
    var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
    var g = document.createElement('div'); g.id = 'gate';
    g.innerHTML = '<form class="box"><div class="ic">🔑</div><h1></h1><p>パスワードを入れてね</p>' +
      '<input type="password" autocomplete="current-password" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="パスワード">' +
      '<button type="submit">あそぶ</button><div class="err"></div><a href="../">← ゲーム一覧にもどる</a></form>';
    g.querySelector('h1').textContent = title;
    document.body.appendChild(g);
    var input = g.querySelector('input'), err = g.querySelector('.err');
    g.querySelector('form').addEventListener('submit', async function (e) {
      e.preventDefault();
      var v = input.value.trim().toLowerCase();
      if (!v) return;
      var h = await sha256(v);
      if (h === hash) {
        try { localStorage.setItem(KEY, hash); } catch (er) {}
        g.remove();
        resolve();
      } else {
        err.textContent = 'パスワードがちがうよ';
        g.classList.remove('shake'); void g.offsetWidth; g.classList.add('shake');
        input.select();
      }
    });
    setTimeout(function () { input.focus(); }, 100);
  }
  if (document.body) show(); else document.addEventListener('DOMContentLoaded', show);
})();
