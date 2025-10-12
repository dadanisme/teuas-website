import { UnderConstructionPage } from '@/components/common/UnderConstructionPage';
import { ROUTES } from '@/constants';

export default function ScholarshipsDirectoryPage() {
  const breadcrumbs = [
    { label: 'Beranda', href: ROUTES.HOME },
    { label: 'Beasiswa', current: true },
  ];

  return (
    <UnderConstructionPage
      title="Beasiswa"
      breadcrumbs={breadcrumbs}
      estimatedCompletion="Maret 2026"
    />
  );
}

/* TEMPORARILY DISABLED - UNDER CONSTRUCTION
import { PageHeader } from '@/components/common/PageHeader';
import { AlumniCTA } from '@/components/features/alumni/AlumniCTA';
import { Separator } from '@/components/ui/separator';
import type { Metadata } from 'next';
import { APP_CONFIG } from '@/constants';
import {
  MOCK_SCHOLARSHIP_CATEGORIES,
  MOCK_SCHOLARSHIPS,
} from '@/constants/content';
import { ScholarshipsPageContent } from '@/components/features/scholarships/ScholarshipsPageContent';

export const metadata: Metadata = {
  title: `Beasiswa | ${APP_CONFIG.name}`,
  description:
    'Temukan beasiswa yang tersedia untuk mahasiswa Teknik Elektro UPI. Dapatkan informasi lengkap tentang persyaratan, cara pendaftaran, dan manfaat dari berbagai program beasiswa.',
};

export default function ScholarshipsDirectoryPage() {
  const events = MOCK_SCHOLARSHIPS;
  const categories = MOCK_SCHOLARSHIP_CATEGORIES;
  const upcomingEvents = events.filter((event) => event.status === 'upcoming');

  const breadcrumbs = [
    { label: 'Beranda', href: '/' },
    { label: 'Beasiswa', current: true },
  ];

  return (
    <>
      <PageHeader
        title="Direktori Beasiswa"
        subtitle="Temukan beasiswa yang tersedia untuk mahasiswa Teknik Elektro UPI."
        breadcrumbs={breadcrumbs}
      />

      <Separator />
      <ScholarshipsPageContent
        events={upcomingEvents}
        categories={categories}
      />
      <AlumniCTA />
    </>
  );
}
*/
