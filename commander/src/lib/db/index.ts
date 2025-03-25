import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';
import { Command } from '../../lib/types/index.js';

const fileName = fileURLToPath(import.meta.url);
const dirName = path.dirname(fileName);
const rootDir = path.resolve(dirName, '../../..');

const dbPath = process.env.DB_PATH || path.join(rootDir, 'commands.db');

export async function getDb() {
  return open({
    filename: dbPath,
    driver: sqlite3.Database
  });
}

export async function getCommandByName(commandName: string): Promise<Command | undefined> {
  const db = await getDb();
  try {
    const command = await db.get<Command>(
      "SELECT * FROM commands WHERE name = ?",
      commandName
    );
    return command;
  } catch (error) {
    console.error('コマンド検索エラー:', error);
    throw error;
  } finally {
    await db.close();
  }
}

export async function getAllCommands(): Promise<Command[]> {
  const db = await getDb();
  try {
    const commands = await db.all<Command[]>("SELECT * FROM commands");
    return commands;
  } catch (error) {
    console.error('コマンド一覧取得エラー:', error);
    throw error;
  } finally {
    await db.close();
  }
}
