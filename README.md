# Portfolio Website

モダンなデザインとアニメーションを特徴とするパーソナルポートフォリオサイト

## 🚀 特徴

- **モダンデザイン**: ガラスモーフィズム効果とミニマルなモノクロームデザイン
- **レスポンシブ**: モバイルファーストの完全レスポンシブデザイン
- **ダークモード**: スムーズなトランジション付きダーク/ライトモード切り替え
- **アニメーション**: Framer Motionによる高品質なアニメーション
- **シングルページ**: スムーズスクロールナビゲーション
- **リアルタイムブログ**: note.com RSSフィードからの自動記事取得
- **実プロジェクト**: SwiftUIで開発された実際のiOSアプリケーション

## 🛠️ 技術スタック

- **Next.js 14** - React フレームワーク（App Router）
- **TypeScript** - 型安全な開発
- **Tailwind CSS** - ユーティリティファーストCSS
- **Framer Motion** - アニメーションライブラリ
- **Lucide React** - アイコンライブラリ

## 📱 プロジェクト

### BranchDo（正式版）
AIがタスクを細分化するアプリケーション
- **技術**: SwiftUI, AI, Core ML, CloudKit

### Lala（開発中）
画像・テキストから問題を自動生成するアプリケーション
- **技術**: SwiftUI, Vision, Natural Language, Core ML

### Mojisu（正式版）
シンプルな文字カウントアプリ
- **技術**: SwiftUI, Foundation, UserDefaults

## 📝 ブログ

[note.com](https://note.com/tamo2918) でAI技術、ガジェット、最新テクノロジーについて発信中

## 🎨 デザイン特徴

- **カラーパレット**: モノクロームベースに選択的なアクセントカラー
- **アニメーション**: フェードイン、スライドアップ、ホバーエフェクト
- **グラスモーフィズム**: 背景ぼかしとグラデーション
- **フローティング要素**: 動的パーティクルと幾何学図形

## 🚀 開発・デプロイ

### ローカル開発

```bash
# 依存関係のインストール
npm install

# 開発サーバー起動
npm run dev

# ビルド
npm run build

# 本番サーバー起動
npm start
```

### Vercelデプロイ

#### 🔗 ワンクリックデプロイ

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/tamo2918/my-portfolio)

#### 📋 手動デプロイ手順

1. **Vercelアカウント作成/ログイン**
   ```
   https://vercel.com
   ```

2. **GitHubとの連携**
   - Vercelダッシュボードで「New Project」をクリック
   - GitHubアカウントを連携
   - `tamo2918/my-portfolio` リポジトリを選択

3. **プロジェクト設定**
   ```
   Framework Preset: Next.js
   Root Directory: ./
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install
   ```

4. **デプロイ実行**
   - 「Deploy」ボタンをクリック
   - 自動ビルド・デプロイが開始
   - 完了後、URLが生成される

#### 🔧 Vercel CLI でのデプロイ

```bash
# Vercel CLI インストール
npm i -g vercel

# ログイン
vercel login

# プロジェクトディレクトリでデプロイ
vercel

# 本番デプロイ
vercel --prod
```

#### 🌐 カスタムドメイン設定

1. Vercelダッシュボードでプロジェクトを選択
2. 「Settings」→「Domains」
3. カスタムドメインを追加
4. DNS設定を行う

## 📞 コンタクト

- **Email**: contact@example.com
- **GitHub**: [https://github.com/tamo2918](https://github.com/tamo2918)
- **Note**: [https://note.com/tamo2918](https://note.com/tamo2918)

## 📄 ライセンス

MIT License

---

新しい体験をコードで形にする、高校生クリエイター
デザインとテクノロジーの境界で、未来を創造します。
