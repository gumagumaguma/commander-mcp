#!/bin/bash

set -e  # エラー時に即座に終了

echo "Starting database initialization..."

# データディレクトリの作成
mkdir -p /data

# データベースの作成
sqlite3 /data/commands.db << 'EOF'
CREATE TABLE IF NOT EXISTS commands (
  uuid TEXT PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  definition TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO commands (uuid, name, definition) VALUES (
  '550e8400-e29b-41d4-a716-446655440000',
  'hello_world',
  '## このコマンドで達成すること
出力で定義したそれぞれの言語でのhello worldを出力すること。

## 出力
- 英語
- フランス語
- ドイツ語
- イタリア語
- スペイン語
- ポルトガル語
- ロシア語
- 中国語（普通話）
- 日本語
- 韓国語（朝鮮語）
- ヒンディー語
- アラビア語
- アフリカーンス語
- ズールー語
- トルコ語'
);
EOF

echo "Database initialized successfully!"
