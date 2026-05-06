# MIA Portfolio

Creative Artist based in Shimane, Japan — Web Design, Photo & Videography.

MIAのポートフォリオサイトのソースコードです。
ミニマルで洗練されたモノクロームのデザインと、軽量でスムーズなアニメーション、そして直感的なUIを意識して制作されています。初心者にも分かりやすいように、コード内には詳細な解説コメントが含まれています。

## 概要 (Overview)
- **URL**: [https://mia-0203.com/](https://mia-0203.com/)
- **Author**: mia
- **Role**: Creative Artist (Web Design, Photo, Video)
- **Location**: Shimane, Japan

## 特徴 (Features)
- **Minimalist Design**: 白と黒を基調とした洗練されたモノクロームデザイン
- **Responsive Layout**: PC・タブレット・スマートフォンに完全対応したレスポンシブ設計
- **Smooth Animations**: Intersection Observerなどを活用した軽量なスクロールアニメーション
- **Custom UI Elements**: カスタムカーソルやローディング画面など、リッチなユーザー体験の提供
- **Beginner Friendly**: HTML/CSS/JavaScript各ファイルに、初心者向けの詳しい解説コメントや目次を配置

## 使用技術 (Tech Stack)
- HTML5
- CSS3 (Vanilla CSS, BEMライクなクラス命名規則)
- JavaScript (Vanilla JS, 依存ライブラリなし)

## ディレクトリ構成 (Directory Structure)
```text
mia-0203/
├── index.html       # メインのHTMLファイル
├── top.css          # メインのスタイルシート
├── js/
│   ├── top.js       # メインのJavaScript（開発用・解説コメント入り）
│   └── top.min.js   # 圧縮済みのJavaScript（本番読み込み用）
├── img/             # 画像ファイルディレクトリ（WebP, ICO等）
├── video/           # 動画ファイルディレクトリ（ヒーローセクション用）
└── README.md        # このファイル
```

## ローカルでの確認方法 (How to Run Locally)
特別なビルドツールや環境構築は不要です。以下のいずれかの方法でプレビューできます。

1. **VSCodeを使用する場合**: 拡張機能「Live Server」をインストールし、`index.html` を右クリックして「Open with Live Server」を選択します。
2. **コマンドラインを使用する場合**: （例：Python環境がある場合）
   ```bash
   python -m http.server 8000
   ```
   ブラウザで `http://localhost:8000` にアクセスしてください。

## ライセンス (License)
Copyright &copy; 2026 MIA. All Rights Reserved.