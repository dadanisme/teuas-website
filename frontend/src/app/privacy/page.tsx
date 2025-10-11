import { Metadata } from 'next';
import { Shield } from 'lucide-react';
import { ROUTES, APP_CONFIG } from '@/constants';
import { BreadcrumbItem } from '@/constants/legal';
import { LegalPageLayout } from '@/components/layout/LegalPageLayout';
import { FileLogSection } from '@/components/features/privacy/sections/FileLogSection';
import { InformationCollectionSection } from '@/components/features/privacy/sections/InformationCollectionSection';
import { ContactSection } from '@/components/ui/legal/ContactSection';
import { IntroductionSection } from '@/components/features/privacy/IntroductionSection';
import { UsageSection } from '@/components/features/privacy/UsageSection';
import { DataProtectionSection } from '@/components/features/privacy/DataProtectionSection';
import { DataSharingSection } from '@/components/features/privacy/DataSharingSection';
import { UserRightsSection } from '@/components/features/privacy/UserRightsSection';
import { privacySections } from '@/components/features/privacy/data/section';

export const metadata: Metadata = {
  title: `Kebijakan Privasi | ${APP_CONFIG.name}`,
  description: `Kebijakan privasi ${APP_CONFIG.fullName} mengenai pengumpulan, penggunaan, dan perlindungan data pribadi pengunjung.`,
  openGraph: {
    title: `Kebijakan Privasi | ${APP_CONFIG.name}`,
    description: `Kebijakan privasi ${APP_CONFIG.fullName} mengenai pengumpulan, penggunaan, dan perlindungan data pribadi pengunjung.`,
    type: 'website',
  },
};

export default function PrivacyPolicyPage() {
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Beranda', href: ROUTES.HOME },
    { label: 'Kebijakan Privasi', href: ROUTES.PRIVACY },
  ];

  const headerProps = {
    title: 'Kebijakan Privasi',
    subtitle: 'IKA TEUAS',
    icon: Shield,
    gradientColors: 'from-blue-600 via-indigo-600 to-purple-600',
  };

  return (
    <LegalPageLayout
      breadcrumbItems={breadcrumbItems}
      sections={privacySections}
      headerProps={headerProps}
      backgroundGradient="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900"
      hoverColor="text-blue-600"
    >
      <IntroductionSection />
      <FileLogSection />
      <InformationCollectionSection />
      <UsageSection />
      <DataProtectionSection />
      <DataSharingSection />
      <UserRightsSection />
      <ContactSection pageType="privacy" />
    </LegalPageLayout>
  );
}
