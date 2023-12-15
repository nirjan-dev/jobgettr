export default defineNuxtRouteMiddleware(function redirectLoggedInMiddleware() {
  const user = useUser();
  if (user.value) return navigateTo('/apply');
});
