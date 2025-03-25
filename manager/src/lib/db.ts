import sqlite3 from 'sqlite3';
import { open, Database as SqliteDatabase } from 'sqlite';
import { Database } from 'sqlite3';

let db: SqliteDatabase<Database> | null = null;

export async function getDB() {
  if (!db) {
    db = await open({
      filename: '/data/commands.db',
      driver: sqlite3.Database
    });
  }
  return db;
}

export async function closeDB() {
  if (db) {
    await db.close();
    db = null;
  }
}
