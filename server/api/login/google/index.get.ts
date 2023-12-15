import { H3Event } from 'h3';

export default defineEventHandler(async function googleLoginHandler(
  event: H3Event,
) {
  const [url, state] = await googleAuth.getAuthorizationUrl();

  setCookie(event, 'google_oauth_state', state, {
    httpOnly: true,
    secure: !process.dev,
    path: '/',
    maxAge: 60 * 60,
  });

  return sendRedirect(event, url.toString());
});
