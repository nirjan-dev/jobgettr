/* eslint-disable max-lines-per-function */
import { H3Event } from 'h3';
import { OAuthRequestError } from '@lucia-auth/oauth';
import { eq } from 'drizzle-orm';
import { user as DBUser } from '~/server/utils/db/schema';

// eslint-disable-next-line complexity
export default defineEventHandler(async function googleCallbackHandler(
  event: H3Event,
) {
  const storedState = getCookie(event, 'google_oauth_state');
  const query = getQuery(event);
  const state = query.state?.toString();
  const code = query.code?.toString();

  if (!storedState || !state || storedState !== state || !code) {
    throw sendError(
      event,
      createError({
        statusCode: 400,
      }),
    );
  }

  try {
    const { getExistingUser, googleUser, createUser, createKey } =
      await googleAuth.validateCallback(code);

    // eslint-disable-next-line complexity
    const getUser = async function () {
      const existingUser = await getExistingUser();
      if (existingUser) {
        return existingUser;
      }

      if (googleUser.email_verified && googleUser.email) {
        const existingDatabaseUsersWithEmail = await db
          .select()
          .from(DBUser)
          .where(eq(DBUser.email, googleUser.email));

        if (existingDatabaseUsersWithEmail.length) {
          const dbUserWithEmail = existingDatabaseUsersWithEmail[0];

          const user = auth.transformDatabaseUser(dbUserWithEmail);
          await createKey(user.userId);
          return user;
        }
      }

      return await createUser({
        attributes: {
          username: googleUser.name.replace(' ', '_').toLowerCase(),
          email: googleUser.email ?? '',
        },
      });
    };

    const user = await getUser();
    const session = await auth.createSession({
      userId: user.userId,
      attributes: {},
    });
    const authRequest = auth.handleRequest(event);
    authRequest.setSession(session);
    return sendRedirect(event, '/apply');
  } catch (error) {
    if (error instanceof OAuthRequestError) {
      return sendError(
        event,
        createError({
          statusCode: 400,
        }),
      );
    }

    return sendError(
      event,
      createError({
        statusCode: 500,
      }),
    );
  }
});
