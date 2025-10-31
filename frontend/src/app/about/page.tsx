import { UnderConstructionPage } from '@/components/common/UnderConstructionPage';
import { ROUTES } from '@/constants';

export default function AboutPage() {
  const breadcrumbItems = [
    { label: 'Beranda', href: ROUTES.HOME },
    { label: 'Tentang TEUAS', current: true },
  ];

  return (
    <UnderConstructionPage
      title="Tentang TEUAS"
      breadcrumbs={breadcrumbItems}
      estimatedCompletion="Maret 2026"
    />
  );
}

/* TEMPORARILY DISABLED - UNDER CONSTRUCTION
import { MissionVision } from '@/components/features/about/MissionVision';
import { LeadershipTeam } from '@/components/features/about/LeadershipTeam';
import { OrganizationOverview } from '@/components/features/about/OrganizationOverview';
import { HistoryTimeline } from '@/components/features/about/HistoryTimeline';
import { ProgramOverview } from '@/components/features/about/ProgramOverview';
import { CallToAction } from '@/components/features/about/CallToAction';
import { PageHeader } from '@/components/common/PageHeader';

export const metadata = {
  title: 'Tentang TEUAS',
  description:
    'Pelajari tentang IKA TEUAS UPI, sejarah kami, misi, dan program Teknik Elektro UPI.',
};

export default function AboutPage() {
  const breadcrumbs = [
    { label: 'Beranda', href: '/' },
    { label: 'Tentang TEUAS', current: true },
  ];

  return (
    <>
      <PageHeader
        title="Tentang IKA TEUAS UPI"
        subtitle="Menghubungkan generasi keunggulan teknik elektro sejak 1963"
        breadcrumbs={breadcrumbs}
      />

      <OrganizationOverview />
      <MissionVision />
      <LeadershipTeam className="bg-muted/30" />
      <HistoryTimeline />
      <ProgramOverview />
      <CallToAction />
    </>
  );
}
*/
