import { lucia } from 'lucia';
import { libsql } from '@lucia-auth/adapter-sqlite';
import { h3 } from 'lucia/middleware';
import { github, google } from '@lucia-auth/oauth/providers';
import { libSqlClient } from '~/server/utils/db';
export const auth = lucia({
  adapter: libsql(libSqlClient, {
    user: 'user',
    key: 'user_key',
    session: 'user_session',
  }),
  env: 'DEV',
  middleware: h3(),
  getUserAttributes: function (databaseUser) {
    return {
      name: databaseUser.username,
      email: databaseUser.email,
    };
  },
});

const runtimeConfig = useRuntimeConfig();

export const githubAuth = github(auth, {
  clientId: runtimeConfig.githubClientId,
  clientSecret: runtimeConfig.githubClientSecret,
});

export const googleAuth = google(auth, {
  clientId: runtimeConfig.googleClientId,
  clientSecret: runtimeConfig.googleClientSecret,
  redirectUri: `${runtimeConfig.public.URL}/api/login/google/callback`,
  scope: [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
    'openid',
  ],
});

export type Auth = typeof auth;
