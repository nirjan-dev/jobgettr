import { H3Event } from 'h3';
import { auth } from '~/server/utils/auth';
export default defineEventHandler(async function eventHandler(event: H3Event) {
  const body = await readBody(event);

  // validate the body
  const { email, password, name } = body;

  if (!email || !password || !name) {
    throw createError({
      message: 'email, password and name are required',
      statusCode: 400,
    });
  }

  console.log({ body });

  try {
    const user = await auth.createUser({
      key: {
        providerId: 'email',
        providerUserId: email,
        password,
      },
      attributes: {
        name,
        email,
      },
    });

    const session = await auth.createSession({
      userId: user.userId,
      attributes: {},
    });
    const authRequest = auth.handleRequest(event);
    authRequest.setSession(session);
  } catch (error) {
    console.log({ error });
    throw createError({
      message: 'An unkown error occurred while creating your account',
      statusCode: 500,
    });
  }

  setResponseStatus(event, 201);

  return body;
});
