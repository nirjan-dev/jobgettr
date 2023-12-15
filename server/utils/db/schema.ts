import { sqliteTable, text, blob } from 'drizzle-orm/sqlite-core';

export const user = sqliteTable('user', {
  id: text('id').primaryKey(),
  // other user attributes
  first_name: text('name'),
  email: text('email').notNull(),
});

export const session = sqliteTable('user_session', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(getUserID),
  activeExpires: blob('active_expires', {
    mode: 'bigint',
  }).notNull(),
  idleExpires: blob('idle_expires', {
    mode: 'bigint',
  }).notNull(),
});

export const key = sqliteTable('user_key', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(getUserID),
  hashedPassword: text('hashed_password'),
});

function getUserID() {
  return user.id;
}
