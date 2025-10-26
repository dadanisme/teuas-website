'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { SplashScreen } from '@/components/common/SplashScreen';
import { ROUTES } from '@/constants';

interface ProtectedRouteProps {
  children: ReactNode;
  loadingMessage?: string;
}

/**
 * Protected route wrapper component
 * Redirects unauthenticated users to login page
 * Shows splash screen while checking authentication state
 */
export function ProtectedRoute({
  children,
  loadingMessage = 'Memverifikasi autentikasi...',
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect to login if not authenticated after loading completes
    if (!isLoading && !isAuthenticated) {
      router.push(ROUTES.LOGIN);
    }
  }, [isLoading, isAuthenticated, router]);

  // Show splash screen while checking auth state
  if (isLoading) {
    return <SplashScreen message={loadingMessage} />;
  }

  // Don't render children if not authenticated (will redirect)
  if (!isAuthenticated) {
    return <SplashScreen message={loadingMessage} />;
  }

  // Render children if authenticated
  return <>{children}</>;
}
