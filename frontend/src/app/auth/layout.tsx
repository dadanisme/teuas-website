'use client';

import { ReactNode } from 'react';

import { useAuth } from '@/hooks/useAuth';
import { redirect } from 'next/navigation';
import { ROUTES } from '@/constants';

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const { isAuthenticated, isLoading } = useAuth();

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
    return redirect(ROUTES.HOME);
  }

  if (!isAuthenticated) {
    return (
      <div className="bg-background">
        <div className="flex items-center justify-center px-6 py-12 md:min-h-[calc(100vh-80px)]">
          <div className="w-full max-w-lg">{children}</div>
        </div>
      </div>
    );
  }

  return null;
}
