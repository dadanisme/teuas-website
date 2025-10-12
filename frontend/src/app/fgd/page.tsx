import { UnderConstructionPage } from '@/components/common/UnderConstructionPage';
import { ROUTES } from '@/constants';

export default function FGDPage() {
  const breadcrumbItems = [
    { label: 'Beranda', href: ROUTES.HOME },
    { label: 'FGD', href: ROUTES.FGD.ROOT, current: true },
  ];

  return (
    <UnderConstructionPage
      title="FGD"
      breadcrumbs={breadcrumbItems}
      estimatedCompletion="Maret 2026"
    />
  );
}

// import { Metadata } from 'next';
// import { PageHeader } from '@/components/common/PageHeader';
// import { Separator } from '@/components/ui/separator';
// import { APP_CONFIG } from '@/constants';

// export const metadata: Metadata = {
//   title: `FGD | ${APP_CONFIG.name}`,
//   description: `Focus Group Discussion dan kegiatan diskusi terfokus dari komunitas ${APP_CONFIG.fullName}.`,
//   openGraph: {
//     title: `FGD | ${APP_CONFIG.name}`,
//     description: `Focus Group Discussion dan kegiatan diskusi terfokus dari komunitas ${APP_CONFIG.fullName}.`,
//     type: 'website',
//   },
// };

// export default function FGDPage() {
//   const breadcrumbs = [
//     { label: 'Beranda', href: '/' },
//     { label: 'FGD', current: true },
//   ];

//   return (
//     <>
//       <PageHeader
//         title="Focus Group Discussion"
//         subtitle="Diskusi terfokus untuk pengembangan komunitas dan inovasi"
//         breadcrumbs={breadcrumbs}
//       />
//       <Separator />
//       {/* FGD Content would go here */}
//     </>
//   );
// }
