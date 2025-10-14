'use client';

import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/queries/useProfile';
import { ProfileHeader } from '@/components/features/profile/ProfileHeader';
import { ProfileAbout } from '@/components/features/profile/ProfileAbout';
import { ProfileExperience } from '@/components/features/profile/ProfileExperience';
import { ProfileEducation } from '@/components/features/profile/ProfileEducation';
import { ProfileSkills } from '@/components/features/profile/ProfileSkills';
import { ProfileCertifications } from '@/components/features/profile/ProfileCertifications';
import { ProfileSocials } from '@/components/features/profile/ProfileSocials';
import { ProfileStats } from '@/components/features/profile/ProfileStats';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert } from '@/components/ui/alert';

export default function ProfilePage() {
  const { user, isLoading: authLoading } = useAuth();
  const {
    data: profileResponse,
    isLoading,
    isError,
    error,
  } = useProfile(user?.id || '');

  // Show loading state
  if (authLoading || isLoading) {
    return (
      <div className="mx-auto space-y-6">
        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-20 w-20 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
        </Card>
        {Array.from({ length: 5 }).map((_, i) => (
          <Card key={i} className="p-6">
            <Skeleton className="mb-4 h-6 w-32" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </Card>
        ))}
      </div>
    );
  }

  // Show error state
  if (isError || !user) {
    return (
      <div className="mx-auto max-w-4xl">
        <Alert
          variant="error"
          title="Gagal Memuat Profil"
          description={
            error instanceof Error
              ? error.message
              : 'Gagal memuat profil. Silakan coba lagi.'
          }
          showIcon
        />
      </div>
    );
  }

  const profile = profileResponse?.data || null;

  return (
    <div className="mx-auto space-y-6">
      {/* Profile Header */}
      <ProfileHeader profile={profile} />

      {/* Profile Stats */}
      <ProfileStats profile={profile} />

      {/* Profile About */}
      <ProfileAbout profile={profile} />

      {/* Profile Experience */}
      <ProfileExperience profile={profile} />

      {/* Profile Education */}
      <ProfileEducation profile={profile} />

      {/* Profile Skills */}
      <ProfileSkills profile={profile} />

      {/* Profile Certifications */}
      <ProfileCertifications profile={profile} />

      {/* Profile Socials */}
      <ProfileSocials profile={profile} />
    </div>
  );
}
