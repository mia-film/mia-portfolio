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
├── index.html          # メインのHTMLファイル
├── top.css             # メインのスタイルシート
├── mia-os-react.html   # Mia OSポートフォリオ用のHTMLファイル
├── mia-os-react.css    # Mia OSポートフォリオ用のスタイルシート
├── js/
│   ├── top.js          # メインのJavaScript（開発用・解説コメント入り）
│   └── mia-os-react.js # mia osのJavaScript
├── img/                # 画像ファイルディレクトリ（WebP, ICO等）
├── video/              # 動画ファイルディレクトリ（ヒーローセクション用）
├── models/             # 機械学習モデルのディレクトリ
├── deep learning/      # ディープラーニング関連のスクリプト
└── README.md           # このファイル
```

## 開発ワークフロー（GitHubへのアップロード手順）

プロジェクトの変更を GitHub へ反映させるための基本的な手順です。
```
### 1. 準備（初回のみ）
まだ Git の初期設定が済んでいない場合は、自分の情報を登録します。
cmd
git config --global user.name "Your Name"
git config --global user.email "your_email@example.com"


### 2. 開発ワークフロー（基本コマンド）

日々の修正や更新を GitHub へ反映させる際の手順です。

## 1. 変更の追加と記録
修正が終わったら、コマンドプロンプトで以下の順に実行します。
```cmd
# 1. すべての変更をステージング
git add .

# 2. 変更内容をメッセージと共に記録（コミット）
git commit -m "ここに修正内容を記入（例：MediaPipeのトラッキングUI修正）"

# 3. GitHubへアップロード
git push origin main
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