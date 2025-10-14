'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/constants';

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  // Redirect authenticated users to home page
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push(ROUTES.HOME);
    }
  }, [isAuthenticated, isLoading, router]);

  // Show loading or redirect while checking auth state
  if (isLoading) {
    return (
      <div className="bg-background">
        <div className="flex items-center justify-center px-6 py-12 md:min-h-[calc(100vh-80px)]">
          <div className="w-full max-w-md">
            <div className="flex items-center justify-center">
              <div className="border-primary h-8 w-8 animate-spin rounded-full border-b-2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Don't render children if user is authenticated (will redirect)
  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="bg-background">
      <div className="flex items-center justify-center px-6 py-12 md:min-h-[calc(100vh-80px)]">
        <div className="w-full max-w-lg">{children}</div>
      </div>
    </div>
  );
}
