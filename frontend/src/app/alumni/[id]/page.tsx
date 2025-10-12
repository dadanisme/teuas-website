import { Metadata } from 'next';
import { AlumniProfilePage } from '@/components/features/alumni/AlumniProfilePage';

interface AlumniProfilePageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: AlumniProfilePageProps): Promise<Metadata> {
  const { id: _id } = await params;

  return {
    title: `Alumni Profile | IKA TEUAS UPI`,
    description: `View alumni profile in the TEUAS Alumni Directory. Connect with fellow alumni and expand your professional network.`,
    openGraph: {
      title: `Alumni Profile | IKA TEUAS UPI`,
      description: `View alumni profile in the TEUAS Alumni Directory.`,
      type: 'profile',
    },
  };
}

export default async function AlumniProfilePageServer({
  params,
}: AlumniProfilePageProps) {
  const { id } = await params;

  return <AlumniProfilePage id={id} />;
}
