import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';

export const libSqlClient = createClient({
  url: process.env.DB_URL ?? '',
  authToken: process.env.DB_AUTH_TOKEN,
});

export const db = drizzle(libSqlClient);
