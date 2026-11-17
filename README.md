# games
ゲーム置き場「ヘンテコアーケード」

🎮 https://henteko-arcade.github.io/games/

iPhoneのSafariで開いて「共有 → ホーム画面に追加」すると、アプリみたいに遊べます。

## ゲーム
- [つみあげタワー](https://henteko-arcade.github.io/games/stack/) — タップでブロックを積み上げる
- [ふっとばしバトル](https://henteko-arcade.github.io/games/brawl/) — CPUを場外へふっとばす対戦アクション
- [わくわくマート](https://henteko-arcade.github.io/games/mart/) — 3Dでお店をそだてる経営ゲーム
- [ぬすめ！ヘンテコ](https://henteko-arcade.github.io/games/heist/) — ヘンテコを集めて、ぬすんで、守る3Dゲーム

各ゲームはパスワードで遊べます（`lib/gate.js`。ハッシュで照合する簡易的なもの）。検索エンジンには出ないようにしています。

3D表示には [three.js](https://threejs.org/)（MITライセンス、`lib/` に同梱）を使っています。

## ゲームの追加のしかた
1. `ゲーム名/index.html` を作る（左上に `../` へ戻るボタンを置く）
2. トップの `index.html` にある `GAMES` に1行足す
