import { H3Event } from 'h3';
import { OAuthRequestError } from '@lucia-auth/oauth';
import { githubAuth } from '~/server/utils/auth';

// eslint-disable-next-line complexity
export default defineEventHandler(async function githubCallbackHandler(
  event: H3Event,
) {
  const storedState = getCookie(event, 'github_oauth_state');
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
    const { getExistingUser, githubUser, createUser } =
      await githubAuth.validateCallback(code);

    const getUser = async function () {
      const existingUser = await getExistingUser();
      if (existingUser) {
        return existingUser;
      }

      return await createUser({
        attributes: {
          username: githubUser.login,
          email: githubUser.email ?? '',
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
