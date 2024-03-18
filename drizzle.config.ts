import { defineConfig } from "drizzle-kit";

export default defineConfig({
    schema: "./src/lib/db/schema.ts",
    driver: "libsql",
    dbCredentials: {
        url: ":memory:",
    },
    verbose: false,
    strict: true,
    out: "./src-tauri/migrations",
});