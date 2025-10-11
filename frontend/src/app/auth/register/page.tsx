import Link from 'next/link';
import { APP_CONFIG } from '@/constants';
import { ROUTES } from '@/constants';
import RegisterForm from '@/components/features/auth/RegisterForm';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';

export default function RegisterPage() {
  return (
    <>
      {/* Title */}
      <div className="mb-8 text-center">
        <h2 className="text-foreground mb-2 text-3xl font-bold">
          Join Our Community
        </h2>
        <p className="text-muted-foreground">
          Create your {APP_CONFIG.name} account and connect with fellow alumni
        </p>
      </div>

      {/* Register Form Card - Client Component */}
      <ErrorBoundary>
        <RegisterForm />
      </ErrorBoundary>

      {/* Login Link */}
      <div className="mt-6 text-center">
        <p className="text-muted-foreground">
          Already have an account?{' '}
          <Link
            href={ROUTES.LOGIN}
            className="text-accent-foreground hover:text-accent-foreground/80 font-medium transition-colors"
          >
            Sign in here
          </Link>
        </p>
      </div>
    </>
  );
}
