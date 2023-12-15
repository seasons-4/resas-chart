# resas-chart

RESAS API(地域経済分析システム)を利用したグラフ描画アプリケーション
デプロイ先：https://resas-chart-seasons-4.vercel.app/

## 技術スタック

### 主要package構成

- Next.js(14系, **static export**)
- highcharts
- swr
  (詳細はpackage.jsonを参照)

### 主要開発用package構成

- Typescript
- sass
- typed-scss-modules
- eslint
- prettier
- stylelint
- husky
- storybook(@storybook/jest)
- jest(ts-jest)
- commitlint
  (詳細はpackage.jsonを参照)

## 環境構築

- node: 20.2.0
- npm: 9.6.6
  (voltaを利用している場合は、package.jsonに記載のバージョンを利用可能)

(RESAS APIの利用登録が完了しており、APIキーが発行されている必要があります)

1. $ `cp .env.example .env`
   コマンド実行後、`.env`ファイルにRESAS APIのAPIキーおよびAPI URLを記載（URLは公開されているものを利用しています）
2. $ `npm install`
3. $ `npm run dev`

### テスト

- Jest $ `npm run test`
- インタラクションテスト $ `npm run test-storybook`
  (Storybookを起動した状態で実行する必要があります。また初回のみplaywrightが必要な旨のメッセージが表示される場合があります。)

## その他概要

<details>
<summary>ディレクトリ構成</summary>
[参考](https://github.com/alan2207/bulletproof-react/blob/master/docs/project-structure.md)

```
root/
  │─.github
    │─ github actionsのjob
    │─ PRテンプレート
  │─.husky
    │─ huskyの設定ファイル
  │─.storybook
    │─ storybookのグローバル設定
  │─.vscode
    │─ vscodeでの開発時の設定および拡張機能の推奨設定
  │─public
    │─ 静的ファイル
  │─src/
    │─app/
      │─ error.tsx
      │─ globals.scss
      │─ layout.tsx
      │─ page.tsx
    │─components/
      │─ 共通コンポーネント
    │─features
      │─ 各機能dir/
        │─api/
        │─components/
        │─constants/
        │─hooks/
        │─types/
        ...
        │─index.ts(ここからexportされたもの以外は外部から参照できないeslintの設定)
    │─lib
      │─ ライブラリの拡張開発
    │─styles
      │─ mixin, variableなどの共通スタイル
    │─types
      │─ グローバルな型やアプリケーションで共通な型の定義
  │─next.config.js, .evn, package.json などの設定ファイル
```

</details>

- 都道府県および表示するグラフの種類を選択することで、条件に合ったグラフを表示(グラフデータはRESAS APIから取得)
- 選択中の条件は全てURLパラメータに反映される(URL共有時に条件に沿ったグラフを表示可能)
- 取得したデータはSWRを利用してキャッシュし、キャッシュされたデータに関してはAPIへのリクエストを行わないことで、APIの負荷を軽減
- 都道府県一覧情報(/prefecturesエンドポイント)はbuild時にのみ取得(サーバーコンポーネントであるpage.tsxで取得)
- レスポンシブ対応（~768px, ~1024px, ~1300px）
- featuresディレクトリとeslintの設定を利用して、co-locationを意識したディレクトリ構成とした
