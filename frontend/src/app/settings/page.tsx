import { Metadata } from 'next';
import { UnderConstructionPage } from '@/components/common/UnderConstructionPage';
import { ROUTES } from '@/constants';

export const metadata: Metadata = {
  title: 'Pengaturan - TEUAS UPI',
  description:
    'Kelola pengaturan akun dan preferensi Anda di platform IKA TEUAS UPI',
};

export default function SettingsPage() {
  const breadcrumbs = [
    { label: 'Beranda', href: ROUTES.HOME },
    { label: 'Pengaturan', current: true },
  ];

  return (
    <UnderConstructionPage
      title="Pengaturan"
      breadcrumbs={breadcrumbs}
      estimatedCompletion="Maret 2026"
    />
  );
}
