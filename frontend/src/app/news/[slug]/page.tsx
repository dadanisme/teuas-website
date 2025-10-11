import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Calendar, User, Eye, Share2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { ROUTES, APP_CONFIG } from '@/constants';
import { MOCK_NEWS_ARTICLES } from '@/constants/content';

interface NewsDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: NewsDetailPageProps): Promise<Metadata> {
  // In real implementation, this would fetch from API
  const { slug } = await params;
  const article = MOCK_NEWS_ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    return {
      title: 'Berita Tidak Ditemukan',
    };
  }

  return {
    title: `${article.title} | ${APP_CONFIG.name}`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      images: article.featuredImage ? [article.featuredImage] : undefined,
      publishedTime: article.publishedAt,
      authors: article.author?.fullName ? [article.author.fullName] : undefined,
    },
  };
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  // In real implementation, this would fetch from API
  const { slug } = await params;
  const article = MOCK_NEWS_ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const breadcrumbItems = [
    { label: 'Beranda', href: ROUTES.HOME },
    { label: 'Berita', href: ROUTES.NEWS.ROOT },
    { label: article.title, href: `${ROUTES.NEWS.ROOT}/${article.slug}` },
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
                      <BreadcrumbPage className="line-clamp-1">
                        {item.label}
                      </BreadcrumbPage>
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

      {/* Back Button */}
      <div className="container mx-auto px-4 py-4">
        <Button variant="ghost" asChild className="mb-4">
          <Link href={ROUTES.NEWS.ROOT}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali ke Berita
          </Link>
        </Button>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-12">
        {/* Article Content */}

        <article className="space-y-6">
          {/* Header */}
          <div className="space-y-4">
            <Badge variant="outline" className="w-fit">
              {article.category.name}
            </Badge>

            <h1 className="text-foreground text-3xl leading-tight font-bold lg:text-4xl">
              {article.title}
            </h1>

            <p className="text-muted-foreground text-lg">{article.excerpt}</p>

            {/* Meta Info */}
            <div className="text-muted-foreground flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>{article.author?.fullName || 'Admin'}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>
                  {article.publishedAt
                    ? new Date(article.publishedAt).toLocaleDateString(
                        'id-ID',
                        {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        }
                      )
                    : 'Draft'}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                <span>{article.viewCount.toLocaleString()} views</span>
              </div>
            </div>

            {/* Share Button */}
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Share2 className="mr-2 h-4 w-4" />
                Bagikan
              </Button>
            </div>
          </div>

          <Separator />

          {/* Featured Image */}
          {article.featuredImage && (
            <div className="relative h-64 overflow-hidden rounded-lg md:h-[600px]">
              <Image
                src={article.featuredImage}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <div
              className="text-foreground leading-relaxed"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </div>

          {/* Tags */}
          {article.tags.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-muted-foreground text-sm font-medium">
                Tags:
              </h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </article>
      </div>
    </div>
  );
}
