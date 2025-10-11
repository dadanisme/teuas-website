import { PageHeader } from '@/components/common/PageHeader';
import { DonorsForm } from '@/components/features/scholarships/donors/DonorsForm';
import { Separator } from '@/components/ui/separator';
import type { Metadata } from 'next';
import { APP_CONFIG } from '@/constants';
export const metadata: Metadata = {
  title: `Donasi | ${APP_CONFIG.name}`,
  description: 'Dari Kita, Oleh Kita, Untuk Kemajuan Teknik Elektro UPI.',
};

export default function DonationsDirectoryPage() {
  const breadcrumbs = [
    { label: 'Beranda', href: '/' },
    { label: 'Beasiswa', href: '/scholarships' },
    { label: 'Donasi', current: true },
  ];

  return (
    <>
      <PageHeader
        title="Direktori Donasi"
        subtitle="Buka Jalan Bagi Mereka, Seperti Jalan Kita Dulu Dibukakan."
        breadcrumbs={breadcrumbs}
      />
      <Separator />
      <DonorsForm />
    </>
  );
}
