# MCP Server (SSE実装版)

Model Context Protocol (MCP) サーバーの SSE (Server-Sent Events) を使った実装です。このサーバーは「am  ask 教えて」のようなコマンドを処理し、SQLiteデータベースからコマンド定義を取得して結果を返す機能を提供します。

## 機能

- am コマンドの処理（例：`am  ask 教えて`）
- コマンド一覧の表示
- BMI計算ツール
- 天気情報取得ツール（モック実装）
- SSEを使ったリアルタイム通信
- 複数クライアント接続のサポート

## 必要条件

- Node.js 20.0.0以上
- npm または yarn
- Docker と Docker Compose（Dockerでの実行時）

## インストール

```bash
# リポジトリをクローン
git clone <repository-url>
cd commander

# 依存関係のインストール
npm install
```

## 使い方

### ローカルでの実行

```bash
# ビルド（初回または変更時）
npm run build

# サーバー起動
npm start
```

または開発モードで起動：

```bash
npm run dev
```

### Dockerでの実行

プロジェクトのルートディレクトリで以下のコマンドを実行します：

```bash
# Dockerコンテナのビルドと起動
docker-compose up -d

# ログの確認
docker-compose logs -f commander
```

サーバーの停止：

```bash
docker-compose down
```

サーバーは以下のエンドポイントで利用可能になります：
- SSE接続: `http://localhost:3001/sse`
- メッセージ送信: `http://localhost:3001/messages`

### データベースについて

このサーバーは`manager`プロジェクトと共通のデータベース（`commands.db`）を使用します。コマンド定義はこのデータベースから読み込まれます。データベースの初期化や修正は`manager`プロジェクト側で行うため、mcp-server側では読み込みのみを行います。

### Cursorエディタでの使用

1. Cursorの設定で、MCPサーバーのURLを以下のように指定します：
   ```
   http://localhost:3001/sse
   ```

2. Cursor内で以下のようなコマンドを入力して使用します：
   - `am  ask 教えて` - askコマンドを実行
   - `am  list` - 利用可能なコマンド一覧を表示
   - `am  help ask` - askコマンドのヘルプを表示
   - `am  weather 東京` - 東京の天気情報を取得

## 開発

### ツールの追加

新しいツールを追加する場合は、`src/server.ts`の`setupServer`関数内に以下のような形式で追加します：

```typescript
server.tool(
  "tool-name",
  {
    param1: z.string(),
    param2: z.number()
  },
  async ({ param1, param2 }) => {
    // ツールの処理ロジック
    return {
      content: [{ type: "text", text: "結果" }]
    };
  }
);
```

## ライセンス

MIT

## 謝辞

このプロジェクトは[Model Context Protocol](https://github.com/anthropics/model-context-protocol)のSDKを使用しています。
