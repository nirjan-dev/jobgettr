import type { User } from 'lucia';

export function useUser() {
  return useState<User | null>('user', function getInitialUserValue() {
    return null;
  });
}

export function useAuthenticatedUser() {
  const user = useUser();

  return computed(function getAuthenticatedUserValue() {
    const userValue = unref(user);
    if (!userValue) {
      throw createError(
        'useAuthenticatedUser: can only be used in protected pages',
      );
    }
  });
}
