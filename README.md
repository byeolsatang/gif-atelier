# GIF工房（gif-atelier）

スマホのブラウザだけで、動画からGIFと透過ステッカーを作るPWAです。
公開URL: https://gif-atelier.vercel.app

## できること

- 動画の読み込み（カメラロールから選択）とトリム
- 切り抜き（比率：自由・元のまま・1:1・4:5・9:16・16:9）
- ステッカーの形抜き（角丸・丸・ハート・星）と白／黒のふち
- 文字入れ（位置・大きさ・色）
- 出力サイズのピクセル指定、fps、速度、逆再生・往復、ループ
- フィルター（モノクロ・セピア・ビビッド・フィルム）
- 画質：ディザリング（なめらか）／くっきり・軽い、色数
- 書き出し：GIF（透過対応）、今の1コマを透過PNG
- 保存：共有シートから写真に保存

動画は端末の中だけで処理され、サーバーには送られません。

## ファイル構成

| ファイル | 役割 |
|---|---|
| `index.html` | アプリ本体（HTML・CSS・JSを1ファイルに収録） |
| `head.html` | ビルド時に `<head>` へ差し込む PWA・OGP 用のタグ |
| `icon.svg` / `og.svg` | アプリアイコンとOGP画像の元データ |
| `manifest.webmanifest` | PWA マニフェスト |
| `sw.js` | Service Worker（オフライン起動用キャッシュ） |
| `build.mjs` | ビルドスクリプト |

## ビルド

```sh
npm install
npm run build   # dist/ に公開用ファイルを出力
```

`build.mjs` は次を行います。

1. `icon.svg` から各サイズのアイコン（192・512・maskable・apple-touch-icon・favicon）を、`og.svg` から `og.png` を生成（resvg、フォントは Dela Gothic One と Noto Sans JP を npm から使用）
2. `index.html` の `<meta name="theme-color">` を `head.html` の内容に置き換え、Service Worker の登録コードを追加
3. `manifest.webmanifest`・`sw.js` をコピー

`index.html` を更新するときは、`<meta name="theme-color" content="#13141c">` の行を残してください（`head.html` の差し込み位置です）。

## デプロイ

Vercel（プロジェクト名 `gif-atelier`）。設定は Build Command `node build.mjs`、Output Directory `dist`。

## 使用ライブラリ

- [gifenc](https://github.com/mattdesl/gifenc) 1.0.3（MIT）— jsDelivr から読み込み
- [@resvg/resvg-js](https://github.com/yisibl/resvg-js)（ビルド時のみ）
- フォント：Dela Gothic One、Noto Sans JP、IBM Plex Mono（SIL Open Font License）
