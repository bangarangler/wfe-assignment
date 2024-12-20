import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { Database } from "sqlite";
import fs from "fs";
import path from "path";

const migrations: string[] = [
  "CREATE TABLE provider (id int, name varchar(255), portal_url varchar(255), PRIMARY KEY (id));",
  'INSERT INTO provider (id, name, portal_url) VALUES (1, "Strayer University", "https://portal.strayer.edu");',
  'INSERT INTO provider (id, name, portal_url) VALUES (2, "Capella University", "https://portal.capella.edu");',
  'INSERT INTO provider (id, name, portal_url) VALUES (3, "Torrens University Australia", NULL);',
];

export const runDBMigrations = async (db: Database): Promise<Boolean> => {
  for (const stmt of migrations) {
    await db.run(stmt);
  }

  return true;
};

export let db: Database<sqlite3.Database, sqlite3.Statement>;

(async () => {
  const runMigrations = !fs.existsSync("./db/assessment.db");

  // open the database
  db = await open({
    filename: "./db/assessment.db",
    driver: sqlite3.Database,
  });

  if (runMigrations) {
    await runDBMigrations(db);
  }
})();
