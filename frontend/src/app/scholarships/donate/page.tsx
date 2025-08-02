import { PageHeader } from '@/components/common/PageHeader';
import { Separator } from '@/components/ui/separator';
import type { Metadata } from 'next';
import { DonationStats } from '@/components/features/scholarships/donate/DonationStats';
import { DonationCTA } from '@/components/features/scholarships/donate/DonationCTA';
import { APP_CONFIG } from '@/lib/constants';
export const metadata: Metadata = {
  title: `Donasi | ${APP_CONFIG.name}`,
  description: `Dari Kita, Oleh Kita, Untuk Kemajuan Teknik Elektro UPI.`,
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
      <DonationStats />
      <Separator />
      <DonationCTA />
    </>
  );
}
