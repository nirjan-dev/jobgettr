export default defineEventHandler(async function getUser(event) {
  const authRequest = auth.handleRequest(event);
  const session = await authRequest.validate();

  return {
    user: session?.user ?? null,
  };
});
