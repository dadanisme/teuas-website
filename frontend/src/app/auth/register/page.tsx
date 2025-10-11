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
          Bergabung dengan Komunitas Kami
        </h2>
        <p className="text-muted-foreground">
          Buat akun {APP_CONFIG.name} Anda dan terhubung dengan sesama alumni
        </p>
      </div>

      {/* Register Form Card - Client Component */}
      <ErrorBoundary>
        <RegisterForm />
      </ErrorBoundary>

      {/* Login Link */}
      <div className="mt-6 text-center">
        <p className="text-muted-foreground">
          Sudah punya akun?{' '}
          <Link
            href={ROUTES.LOGIN}
            className="text-accent-foreground hover:text-accent-foreground/80 font-medium transition-colors"
          >
            Masuk di sini
          </Link>
        </p>
      </div>
    </>
  );
}
