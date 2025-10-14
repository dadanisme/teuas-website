import Link from 'next/link';
import { APP_CONFIG } from '@/constants';
import { ROUTES } from '@/constants';
import LoginForm from '@/components/features/auth/LoginForm';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';

export default function LoginPage() {
  return (
    <>
      {/* Title */}
      <div className="mb-8 text-center">
        <h2 className="text-foreground mb-2 text-3xl font-bold">
          Selamat Datang Kembali
        </h2>
        <p className="text-muted-foreground">
          Masuk ke akun {APP_CONFIG.name} Anda
        </p>
      </div>

      {/* Login Form Card - Client Component */}
      <ErrorBoundary>
        <LoginForm />
      </ErrorBoundary>

      {/* Register Link */}
      <div className="mt-6 text-center">
        <p className="text-muted-foreground">
          Belum punya akun?{' '}
          <Link
            href={ROUTES.REGISTER}
            className="text-accent-foreground hover:text-accent-foreground/80 font-medium transition-colors"
          >
            Daftar di sini
          </Link>
        </p>
      </div>
    </>
  );
}
