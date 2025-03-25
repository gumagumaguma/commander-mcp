-- robo_commandsテーブルを作成（uuid, created_at, updated_atフィールドを追加）
CREATE TABLE IF NOT EXISTS commands (
  uuid TEXT PRIMARY KEY,
  name TEXT UNIQUE,
  definition TEXT,
  created_at TEXT,
  updated_at TEXT
);

-- 既存のデータがあれば削除
DELETE FROM commands;

-- サンプルデータの挿入（JSONとして定義情報を格納）
INSERT INTO commands (uuid, name, definition, created_at, updated_at)
VALUES
  (
    'ask-001',
    'ask',
    '{"description":"ユーザーからの問い合わせを受け取り、適切に回答する。必要に応じて、追加で必要な情報をユーザーに確認する。","input_params":"問い合わせ内容","output":"問い合わせに対する回答、次のアクションの提案","execution_state":"問い合わせに対する回答が提供された状態"}',
    datetime('now'),
    datetime('now')
  ),
  (
    'list-001',
    'list',
    '{"description":"利用可能なコマンド一覧を表示する。","input_params":"なし","output":"利用可能なコマンド一覧","execution_state":"コマンド一覧が表示された状態"}',
    datetime('now'),
    datetime('now')
  ),
  (
    'help-001',
    'help',
    '{"description":"特定のコマンドの使い方や詳細情報を表示する。","input_params":"コマンド名","output":"コマンドの詳細情報","execution_state":"コマンドのヘルプ情報が表示された状態"}',
    datetime('now'),
    datetime('now')
  ),
  (
    'weather-001',
    'weather',
    '{"description":"指定した都市の天気情報を取得する。","input_params":"都市名","output":"天気情報（気温、湿度、天気状態など）","execution_state":"天気情報が表示された状態"}',
    datetime('now'),
    datetime('now')
  );
