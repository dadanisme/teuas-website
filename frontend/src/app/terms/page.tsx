import { Metadata } from 'next';
import { Gavel } from 'lucide-react';
import { ROUTES, APP_CONFIG } from '@/constants';
import { LegalPageLayout } from '@/components/layout/LegalPageLayout';
import { Introduction } from '@/components/features/terms/sections/Introduction';
import { AcceptanceSection } from '@/components/features/terms/sections/AcceptanceSection';
import { ServiceDescriptionSection } from '@/components/features/terms/sections/ServiceDescriptionSection';
import { UserResponsibilitiesSection } from '@/components/features/terms/sections/UserResponsibilitiesSection';
import { ProhibitedUsesSection } from '@/components/features/terms/sections/ProhibitedUsesSection';
import { IntellectualPropertySection } from '@/components/features/terms/sections/IntellectualPropertySection';
import { LimitationLiabilitySection } from '@/components/features/terms/sections/LimitationLiabilitySection';
import { ModificationsSection } from '@/components/features/terms/sections/ModificationsSection';
import { GoverningLawSection } from '@/components/features/terms/sections/GoverningLawSection';
import { termsSections } from '@/components/features/terms/data/sections';
import { BreadcrumbItem } from '@/constants/legal';
import { ContactSection } from '@/components/ui/legal/ContactSection';

export const metadata: Metadata = {
  title: `Syarat dan Ketentuan | ${APP_CONFIG.name}`,
  description: `Syarat dan ketentuan penggunaan layanan ${APP_CONFIG.fullName}. Harap dibaca dengan seksama sebelum menggunakan layanan kami.`,
  openGraph: {
    title: `Syarat dan Ketentuan | ${APP_CONFIG.name}`,
    description: `Syarat dan ketentuan penggunaan layanan ${APP_CONFIG.fullName}. Harap dibaca dengan seksama sebelum menggunakan layanan kami.`,
    type: 'website',
  },
};

export default function TermsOfServicePage() {
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Beranda', href: ROUTES.HOME },
    { label: 'Syarat dan Ketentuan', href: ROUTES.TERMS },
  ];

  const headerProps = {
    title: 'Syarat dan Ketentuan',
    subtitle: 'IKA TEUAS',
    icon: Gavel,
    gradientColors: 'from-emerald-600 via-teal-600 to-cyan-600',
  };

  return (
    <LegalPageLayout
      breadcrumbItems={breadcrumbItems}
      sections={termsSections}
      headerProps={headerProps}
      backgroundGradient="bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900"
      hoverColor="text-emerald-600"
    >
      <Introduction />
      <AcceptanceSection />
      <ServiceDescriptionSection />
      <UserResponsibilitiesSection />
      <ProhibitedUsesSection />
      <IntellectualPropertySection />
      <LimitationLiabilitySection />
      <ModificationsSection />
      <GoverningLawSection />
      <ContactSection pageType="terms" />
    </LegalPageLayout>
  );
}
