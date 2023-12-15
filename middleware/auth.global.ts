export default defineNuxtRouteMiddleware(async function authMiddleware() {
  const user = useUser();
  const { data, error } = await useFetch('/api/user');
  if (error.value) throw createError('Failed to fetch user');
  user.value = data.value?.user ?? null;
});
