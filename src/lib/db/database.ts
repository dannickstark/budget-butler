import { drizzle } from "drizzle-orm/sqlite-proxy";
import Database from '@tauri-apps/plugin-sql';
import * as schema from "./schema";

/**
 * Represents the result of a SELECT query.
 */
export type SelectQueryResult = {
  [key: string]: any;
};

/**
 * Loads the sqlite database via the Tauri Proxy.
 */
export async function getSqlite(){
  const sqlite = await Database.load("sqlite:sqlite.db");
  return sqlite
}

/**
 * The drizzle database instance.
 */
export const db = drizzle<typeof schema>(
  async (sql, params, method) => {
    const sqlite = await getSqlite()
    
    let rows: any = [];
    let results = [];

    console.log("🚀 ~ method :", method);

    // If the query is a SELECT, use the select method
    if (isSelectQuery(sql)) {
      rows = await sqlite.select(sql, params).catch((e) => {
        console.error("SQL Error:", e);
        return { rows: [] };
      });
      console.log("🚀 ~ Raw response from proxy:", rows);
    } else {
      // Otherwise, use the execute method
      rows = await sqlite.execute(sql, params).catch((e) => {
        console.error("SQL Error:", e);
        return { rows: [] };
      });
      return { rows: [] };
    }

    // If the method is "all", return all rows
    results = method === "all" ? rows : rows[0];
    // Return the results
    return {
      rows: results,
    };
  },
  // Pass the schema to the drizzle instance
  { schema: schema, logger: true }
);

/**
 * Checks if the given SQL query is a SELECT query.
 * @param sql The SQL query to check.
 * @returns True if the query is a SELECT query, false otherwise.
 */
function isSelectQuery(sql: string): boolean {
  const selectRegex = /^\s*SELECT\b/i;
  return selectRegex.test(sql);
}
