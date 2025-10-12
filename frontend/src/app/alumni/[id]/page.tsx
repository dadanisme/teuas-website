import { Metadata } from 'next';
import { AlumniProfilePage } from '@/components/features/alumni/AlumniProfilePage';
import { AlumniService } from '@/services/alumni.service';
import { createClient } from '@/utils/supabase/server';
import { APP_CONFIG } from '@/constants';

interface AlumniProfilePageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: AlumniProfilePageProps): Promise<Metadata> {
  const { id } = await params;

  // Fetch alumni profile for metadata generation
  const supabaseClient = await createClient();
  const alumniService = new AlumniService(supabaseClient);
  const alumniResponse = await alumniService.getAlumniProfile(id);

  if (alumniResponse.error || !alumniResponse.data) {
    return {
      title: `Alumni Profile | ${APP_CONFIG.name}`,
      description: `View alumni profile in the TEUAS Alumni Directory. Connect with fellow alumni and expand your professional network.`,
      openGraph: {
        title: `Alumni Profile | ${APP_CONFIG.name}`,
        description: `View alumni profile in the TEUAS Alumni Directory.`,
        type: 'profile',
      },
    };
  }

  const alumni = alumniResponse.data;
  const title = `${alumni.full_name} | ${APP_CONFIG.name}`;
  const description = alumni.bio
    ? `${alumni.bio.substring(0, 160)}...`
    : `View ${alumni.full_name}'s profile in the TEUAS Alumni Directory. Connect with fellow alumni and expand your professional network.`;

  return {
    title,
    description,
    openGraph: {
      title: alumni.full_name,
      description,
      type: 'profile',
      images: alumni.photo_url ? [alumni.photo_url] : undefined,
    },
    twitter: {
      card: 'summary',
      title,
      description,
      images: alumni.photo_url ? [alumni.photo_url] : undefined,
    },
  };
}

export default async function AlumniProfilePageServer({
  params,
}: AlumniProfilePageProps) {
  const { id } = await params;

  return <AlumniProfilePage id={id} />;
}
