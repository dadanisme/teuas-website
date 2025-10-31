import { HeroSection } from '@/components/common/HeroSection';
import { LatestNews } from '@/components/features/news/LatestNews';
import { FeaturedAlumni } from '@/components/features/alumni/FeaturedAlumni';
import { Separator } from '@/components/ui/separator';
import { AboutSection } from '@/components/features/home/AboutSection';
import { OurFocus } from '@/components/features/home/OurFocus';
import { APP_CONFIG } from '@/constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Beranda | ${APP_CONFIG.name}`,
  description: `${APP_CONFIG.shortDescription}. Bergabunglah dengan komunitas lulusan ${APP_CONFIG.fullName} dan terhubung dengan sesama profesional teknik elektro.`,
  openGraph: {
    title: `${APP_CONFIG.name} - Jaringan Alumni`,
    description: `${APP_CONFIG.shortDescription}. Bergabunglah dengan komunitas lulusan ${APP_CONFIG.fullName} dan terhubung dengan sesama profesional teknik elektro.`,
    url: APP_CONFIG.url,
    type: 'website',
    images: [
      {
        url: '/assets/og.png',
        width: 1200,
        height: 630,
        alt: `${APP_CONFIG.fullName} - Terhubung dengan Alumni`,
        type: 'image/png',
      },
    ],
  },
  twitter: {
    title: `${APP_CONFIG.name} - Jaringan Alumni`,
    description: `${APP_CONFIG.shortDescription}. Bergabunglah dengan komunitas lulusan ${APP_CONFIG.fullName}.`,
    images: ['/assets/og.png'],
  },
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <Separator />
      <OurFocus />
      <Separator />
      <FeaturedAlumni />
      <Separator />
      <LatestNews />
    </>
  );
}
