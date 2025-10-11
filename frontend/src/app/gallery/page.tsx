import { Metadata } from 'next';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { MediaPageContent } from '@/components/features/media/MediaPageContent';
import { ROUTES, APP_CONFIG } from '@/constants';
import { MOCK_MEDIA_ALBUMS } from '@/constants/content';
import Link from 'next/link';

export const metadata: Metadata = {
  title: `Galeri | ${APP_CONFIG.name}`,
  description: `Jelajahi koleksi foto dan video kegiatan ${APP_CONFIG.fullName}, dokumentasi acara, dan momen berkesan lainnya.`,
  openGraph: {
    title: `Galeri | ${APP_CONFIG.name}`,
    description: `Jelajahi koleksi foto dan video kegiatan ${APP_CONFIG.fullName}, dokumentasi acara, dan momen berkesan lainnya.`,
    type: 'website',
  },
};

export default function GalleryPage() {
  const breadcrumbItems = [
    { label: 'Beranda', href: ROUTES.HOME },
    { label: 'Galeri', href: ROUTES.GALLERY.ROOT },
  ];

  return (
    <div className="bg-background min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-muted/30 border-b">
        <div className="container mx-auto px-4 py-4">
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbItems.map((item, index) => (
                <div key={index} className="flex items-center">
                  <BreadcrumbItem>
                    {index < breadcrumbItems.length - 1 ? (
                      <BreadcrumbLink asChild>
                        <Link href={item.href}>{item.label}</Link>
                      </BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage>{item.label}</BreadcrumbPage>
                    )}
                  </BreadcrumbItem>
                  {index < breadcrumbItems.length - 1 && (
                    <BreadcrumbSeparator />
                  )}
                </div>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Content */}
      <MediaPageContent albums={MOCK_MEDIA_ALBUMS} />
    </div>
  );
}
