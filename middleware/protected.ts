export default defineNuxtRouteMiddleware(function protectedMiddleware() {
  const user = useUser();
  if (!user.value) return navigateTo('/login');
});
