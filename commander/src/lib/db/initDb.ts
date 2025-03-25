import fs from 'fs';
import path from 'path';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { fileURLToPath } from 'url';

const fileName = fileURLToPath(import.meta.url);
const dirName = path.dirname(fileName);
const rootDir = path.resolve(dirName, '../../..');

const dbPath = process.env.DB_PATH || path.join(rootDir, 'commands.db');
const schemaPath = path.join(rootDir, 'schema.sql');

async function initDb() {
  if (!fs.existsSync(schemaPath)) {
    console.error('スキーマファイルが見つかりません。');
    process.exit(1);
  }

  const schema = fs.readFileSync(schemaPath, 'utf8');

  // データベースに接続
  const db = await open({
    filename: dbPath,
    driver: sqlite3.Database
  });

  try {
    // スキーマを実行
    await db.exec(schema);
  } catch (err) {
    console.error('データベースの初期化中にエラーが発生しました:', err);
  } finally {
    await db.close();
  }
}

initDb();
