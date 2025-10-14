import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { ROUTES, APP_CONFIG } from '@/constants';
import { ProfileForm } from '@/components/features/profile/ProfileForm';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';

export const metadata: Metadata = {
  title: `Edit Profil | ${APP_CONFIG.name}`,
  description: `Edit dan perbarui profil Anda di ${APP_CONFIG.fullName}`,
  robots: 'noindex, nofollow', // Private page
};

export default async function ProfilePage() {
  // Check authentication on server side
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  // Redirect to login if not authenticated
  if (error || !user) {
    redirect(ROUTES.LOGIN);
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-foreground mb-2 text-3xl font-bold">
            Edit Profil
          </h1>
          <p className="text-muted-foreground">
            Perbarui informasi profil Anda untuk tetap terhubung dengan
            komunitas alumni
          </p>
        </div>

        {/* Profile Form */}
        <ErrorBoundary>
          <ProfileForm userId={user.id} />
        </ErrorBoundary>
      </div>
    </div>
  );
}
