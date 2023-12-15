import { H3Event } from 'h3';
import { githubAuth } from '~/server/utils/auth';
export default defineEventHandler(async function githubLoginHandler(
  event: H3Event,
) {
  const [url, state] = await githubAuth.getAuthorizationUrl();

  setCookie(event, 'github_oauth_state', state, {
    httpOnly: true,
    secure: !process.dev,
    path: '/',
    maxAge: 60 * 60,
  });
  return sendRedirect(event, url.toString());
});
