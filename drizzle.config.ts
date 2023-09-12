import type { Config } from "drizzle-kit";

export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    /**
     * using node to run migrations
     */
    connectionString: process.env.DATABASE_URL!,
  },
} satisfies Config;
