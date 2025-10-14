import { NewsArticle } from '@/types/content';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, User, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { ROUTES } from '@/constants';

interface NewsHeroSectionProps {
  featuredArticle: NewsArticle;
}

export function NewsHeroSection({ featuredArticle }: NewsHeroSectionProps) {
  return (
    <section className="from-primary/5 via-background to-secondary/5 bg-gradient-to-br py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h1 className="text-foreground mb-4 text-4xl font-bold">
            Berita TEUAS UPI
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            Dapatkan informasi terkini seputar prestasi alumni, perkembangan
            teknologi, dan berbagai kegiatan komunitas TEUAS UPI
          </p>
        </div>

        {/* Featured Article */}
        <Card className="overflow-hidden p-0 shadow-lg transition-shadow duration-300 hover:shadow-xl">
          <div className="grid grid-cols-1 gap-0 lg:grid-cols-2">
            {/* Image */}
            <div className="relative h-64 lg:h-full">
              <Image
                src={
                  featuredArticle.featuredImage ||
                  '/images/placeholder-news.jpg'
                }
                alt={featuredArticle.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute top-4 left-4">
                <Badge
                  variant="secondary"
                  className="bg-primary text-primary-foreground"
                >
                  Berita Utama
                </Badge>
              </div>
            </div>

            {/* Content */}
            <CardContent className="flex flex-col justify-center p-8">
              <div className="mb-4">
                <Badge variant="outline" className="mb-3">
                  {featuredArticle.category.name}
                </Badge>
                <h2 className="text-foreground mb-4 line-clamp-3 text-2xl font-bold lg:text-3xl">
                  {featuredArticle.title}
                </h2>
                <p className="text-muted-foreground mb-6 line-clamp-3">
                  {featuredArticle.excerpt}
                </p>
              </div>

              {/* Meta Info */}
              <div className="text-muted-foreground mb-6 flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{featuredArticle.author?.fullName || 'Admin'}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {featuredArticle.publishedAt
                      ? new Date(
                          featuredArticle.publishedAt
                        ).toLocaleDateString('id-ID', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })
                      : 'Belum dipublikasi'}
                  </span>
                </div>
              </div>

              {/* CTA */}
              <Button asChild className="w-fit">
                <Link href={`${ROUTES.NEWS.ROOT}/${featuredArticle.slug}`}>
                  Baca Selengkapnya
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </div>
        </Card>
      </div>
    </section>
  );
}
