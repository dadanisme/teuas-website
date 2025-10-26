import { useMutation } from '@tanstack/react-query';
import { authService } from '@/services/auth.service';
import type { SignInData, SignUpData } from '@/schemas/auth.schema';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants';

/**
 * Custom React Query mutation hook for signing in
 * Provides local loading state and error handling
 */
export function useSignInMutation() {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: SignInData) => authService.signIn(data),
    onSuccess: (response) => {
      if (response.error) {
        throw new Error(response.error);
      }
      // Auth state will be updated by the auth listener in AuthContext
      // Redirect to home page on successful sign in
      router.push(ROUTES.HOME);
    },
  });
}

/**
 * Custom React Query mutation hook for signing out
 * Provides local loading state and error handling
 */
export function useSignOutMutation() {
  const router = useRouter();

  return useMutation({
    mutationFn: () => authService.signOut(),
    onSuccess: (response) => {
      if (response.error) {
        throw new Error(response.error);
      }
      // Auth state will be updated by the auth listener in AuthContext
      // Redirect to home page on successful sign out
      router.push(ROUTES.HOME);
    },
  });
}

/**
 * Custom React Query mutation hook for signing up
 * Provides local loading state and error handling
 */
export function useSignUpMutation() {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: SignUpData) => authService.signUp(data),
    onSuccess: (response) => {
      if (response.error) {
        throw new Error(response.error);
      }
      // Auth state will be updated by the auth listener in AuthContext
      // Redirect to login page or home based on email confirmation settings
      router.push(ROUTES.LOGIN);
    },
  });
}
