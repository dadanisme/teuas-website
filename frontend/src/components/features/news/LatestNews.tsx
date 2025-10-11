import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { ROUTES } from '@/constants';
import { formatDistanceToNow } from 'date-fns';

interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  slug: string;
  featuredImage?: string;
  category: {
    name: string;
  };
  publishedAt: string;
  readingTime: number;
}

const newsItems: NewsItem[] = [
  {
    id: 1,
    title: 'IKA TEUAS UPI Mengadakan Acara Networking Tahunan 2025',
    excerpt:
      'Bergabunglah dengan kami untuk pertemuan alumni terbesar tahun ini, menampilkan pembicara utama, sesi networking, dan peluang karir.',
    slug: 'acara-networking-tahunan-2025',
    featuredImage: '/assets/images/image-business-1.png',
    category: {
      name: 'Acara',
    },
    publishedAt: '2025-01-15T10:00:00Z',
    readingTime: 3,
  },
  {
    id: 2,
    title: 'Program Beasiswa Baru untuk Mahasiswa Teknik Elektro',
    excerpt:
      'Kami dengan bangga mengumumkan program beasiswa baru yang mendukung calon mahasiswa teknik elektro dari latar belakang kurang mampu.',
    slug: 'program-beasiswa-baru-2025',
    featuredImage: '/assets/images/image-minimal-1.png',
    category: {
      name: 'Beasiswa',
    },
    publishedAt: '2025-01-12T14:30:00Z',
    readingTime: 5,
  },
  {
    id: 3,
    title: 'Kisah Sukses Alumni: Inovasi dalam Energi Terbarukan',
    excerpt:
      'Temui Sarah Wijaya, lulusan 2018, yang menciptakan gebrakan di sektor energi terbarukan dengan teknologi panel surya yang revolusioner.',
    slug: 'kisah-sukses-alumni-energi-terbarukan',
    featuredImage: '/assets/images/image-abstract-1.png',
    category: {
      name: 'Sorotan Alumni',
    },
    publishedAt: '2025-01-10T09:15:00Z',
    readingTime: 4,
  },
];
interface LatestNewsProps {
  title?: string;
  showViewAll?: boolean;
  maxItems?: number;
  className?: string;
}

export function LatestNews({
  title = 'Berita & Kegiatan',
  showViewAll = true,
  maxItems = 3,
  className = '',
}: LatestNewsProps) {
  // Mock data - would come from API in real implementation

  const formatDate = (dateString: string) => {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  };

  return (
    <section className={`py-16 ${className} bg-muted/50`}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12">
          {/* Badge */}
          <div className="mb-6 text-center">
            <div className="border-primary/20 bg-primary/10 inline-flex items-center rounded-full border px-4 py-2 text-sm">
              <span className="text-primary font-medium">
                INFORMASI TERKINI
              </span>
            </div>
          </div>

          {/* Title and CTA */}
          <div className="flex flex-col text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
            <div>
              <h2 className="text-foreground mb-2 text-3xl font-bold md:text-4xl lg:text-5xl">
                {title}
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Tetap terkini dengan berita dan kegiatan terbaru dari komunitas
                kami
              </p>
            </div>

            {showViewAll && (
              <Button
                variant="outline"
                size="lg"
                asChild
                className="hidden sm:flex"
              >
                <Link href={ROUTES.NEWS.ROOT}>
                  Lebih Lanjut
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            )}
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {newsItems.slice(0, maxItems).map((item) => (
            <Card
              key={item.id}
              className="group overflow-hidden p-0 transition-transform hover:scale-[1.02]"
            >
              {/* Featured Image */}
              {item.featuredImage && (
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={item.featuredImage}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-primary text-primary-foreground">
                      {item.category.name}
                    </Badge>
                  </div>
                </div>
              )}

              <CardHeader className="px-6 pt-6 pb-2">
                <h3 className="group-hover:text-primary line-clamp-2 text-lg leading-tight font-semibold">
                  <Link href={ROUTES.NEWS.ARTICLE(item.slug)}>
                    {item.title}
                  </Link>
                </h3>
              </CardHeader>

              <CardContent className="px-6 pb-6">
                <p className="text-muted-foreground mb-4 line-clamp-3 text-sm">
                  {item.excerpt}
                </p>

                {/* Meta Information */}
                <div className="text-muted-foreground flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{formatDate(item.publishedAt)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{item.readingTime} menit baca</span>
                    </div>
                  </div>
                </div>

                {/* Read More Link */}
                <Link
                  href={ROUTES.NEWS.ARTICLE(item.slug)}
                  className="text-primary mt-4 inline-flex items-center text-sm font-medium hover:underline"
                >
                  Baca Selengkapnya
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mobile CTA Button */}
        {showViewAll && (
          <div className="mt-12 text-center sm:hidden">
            <Button variant="outline" size="lg" asChild>
              <Link href={ROUTES.NEWS.ROOT}>
                Lebih Lanjut
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
