import { Metadata } from 'next';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { NewsPageContent } from '@/components/features/news/NewsPageContent';
import { ROUTES, APP_CONFIG } from '@/constants';
import { MOCK_NEWS_ARTICLES, MOCK_NEWS_CATEGORIES } from '@/constants/content';
import Link from 'next/link';

export const metadata: Metadata = {
  title: `Berita | ${APP_CONFIG.name}`,
  description: `Berita terkini seputar ${APP_CONFIG.fullName}, prestasi alumni, perkembangan teknologi, dan informasi penting lainnya.`,
  openGraph: {
    title: `Berita | ${APP_CONFIG.name}`,
    description: `Berita terkini seputar ${APP_CONFIG.fullName}, prestasi alumni, perkembangan teknologi, dan informasi penting lainnya.`,
    type: 'website',
  },
};

export default function NewsPage() {
  // In real implementation, these would come from API calls
  const newsArticles = MOCK_NEWS_ARTICLES;
  const categories = MOCK_NEWS_CATEGORIES;

  const breadcrumbItems = [
    { label: 'Beranda', href: ROUTES.HOME },
    { label: 'Berita', href: ROUTES.NEWS.ROOT },
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
      <NewsPageContent newsArticles={newsArticles} categories={categories} />
    </div>
  );
}
