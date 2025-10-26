'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { SplashScreen } from '@/components/common/SplashScreen';
import { ROUTES } from '@/constants';

interface AuthRouteProps {
  children: ReactNode;
  loadingMessage?: string;
}

/**
 * Auth route wrapper component
 * Redirects authenticated users to home page
 * Shows splash screen while checking authentication state
 * Wraps children in centered layout for auth pages
 */
export function AuthRoute({
  children,
  loadingMessage = 'Memeriksa sesi...',
}: AuthRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect to home if authenticated after loading completes
    if (!isLoading && isAuthenticated) {
      router.push(ROUTES.HOME);
    }
  }, [isLoading, isAuthenticated, router]);

  // Show splash screen while checking auth state
  if (isLoading) {
    return <SplashScreen message={loadingMessage} />;
  }

  // Don't render children if authenticated (will redirect)
  if (isAuthenticated) {
    return <SplashScreen message={loadingMessage} />;
  }

  // Render children with centered layout if not authenticated
  return (
    <div className="bg-background">
      <div className="flex items-center justify-center px-6 py-12 md:min-h-[calc(100vh-80px)]">
        <div className="w-full max-w-lg">{children}</div>
      </div>
    </div>
  );
}
