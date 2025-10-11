import Link from 'next/link';
import { APP_CONFIG } from '@/constants';
import { ROUTES } from '@/constants';
import LoginForm from '@/components/features/auth/LoginForm';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';

export default function LoginPage() {
  return (
    <div className="bg-background">
      <div className="flex items-center justify-center px-6 py-12 md:min-h-[calc(100vh-80px)]">
        <div className="w-full max-w-md">
          {/* Title */}
          <div className="mb-8 text-center">
            <h2 className="text-foreground mb-2 text-3xl font-bold">
              Welcome Back
            </h2>
            <p className="text-muted-foreground">
              Sign in to your {APP_CONFIG.name} account
            </p>
          </div>

          {/* Login Form Card - Client Component */}
          <ErrorBoundary>
            <LoginForm />
          </ErrorBoundary>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              Don't have an account?{' '}
              <Link
                href={ROUTES.REGISTER}
                className="text-accent-foreground hover:text-accent-foreground/80 font-medium transition-colors"
              >
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
