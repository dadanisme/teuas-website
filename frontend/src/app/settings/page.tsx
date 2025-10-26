'use client';

import { UnderConstructionPage } from '@/components/common/UnderConstructionPage';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { ROUTES } from '@/constants';

export default function SettingsPage() {
  return (
    <ProtectedRoute loadingMessage="Memuat pengaturan...">
      <SettingsPageContent />
    </ProtectedRoute>
  );
}

function SettingsPageContent() {
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
