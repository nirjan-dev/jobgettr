import { H3Event } from 'h3';
import { auth } from '~/server/utils/auth';
export default defineEventHandler(async function eventHandler(event: H3Event) {
  const body = await readBody(event);

  // validate the body
  const { email, password } = body;

  if (!email || !password) {
    throw createError({
      message: 'email and password are required',
      statusCode: 400,
    });
  }

  try {
    const key = await auth.useKey('email', email, password);
    const session = await auth.createSession({
      userId: key.userId,
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
