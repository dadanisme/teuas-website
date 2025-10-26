'use client';

import { ReactNode } from 'react';
import { AuthRoute } from '@/components/layout/AuthRoute';

interface AuthLayoutProps {
  children: ReactNode;
}

/**
 * Layout for authentication pages (login, register)
 * Redirects authenticated users to home page
 */
export default function AuthLayout({ children }: AuthLayoutProps) {
  return <AuthRoute>{children}</AuthRoute>;
}
