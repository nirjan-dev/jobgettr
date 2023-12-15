import { Config } from 'drizzle-kit';

export default {
  schema: './server/utils/db/schema.ts',
  out: './drizzle',
  driver: 'turso',
  dbCredentials: {
    // connectionString: process.env.DB_URL,

    url: 'file:./local.db',
  },
} satisfies Config;
