import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Play, Calendar, Image as ImageIcon, Video, Eye } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ROUTES } from '@/constants';
import { MediaAlbum } from '@/types/content';

interface MediaHeroSectionProps {
  featuredAlbum: MediaAlbum;
}

export function MediaHeroSection({ featuredAlbum }: MediaHeroSectionProps) {
  const totalItems = featuredAlbum.itemCount;
  // For now, we'll assume all items are photos since we don't have detailed breakdown
  const photoCount = featuredAlbum.itemCount;
  const videoCount = 0; // We'll set this to 0 for now

  return (
    <section className="from-primary/10 via-background to-secondary/10 relative bg-gradient-to-br py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <Badge variant="outline" className="text-primary border-primary">
                Album Unggulan
              </Badge>

              <h1 className="text-foreground text-4xl leading-tight font-bold lg:text-5xl">
                {featuredAlbum.title}
              </h1>

              <p className="text-muted-foreground text-lg leading-relaxed">
                {featuredAlbum.description}
              </p>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="text-muted-foreground h-4 w-4" />
                <span className="text-muted-foreground">
                  {new Date(featuredAlbum.createdAt).toLocaleDateString(
                    'id-ID',
                    {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    }
                  )}
                </span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <ImageIcon className="text-muted-foreground h-4 w-4" />
                <span className="text-muted-foreground">{photoCount} Foto</span>
              </div>

              {videoCount > 0 && (
                <div className="flex items-center gap-2 text-sm">
                  <Video className="text-muted-foreground h-4 w-4" />
                  <span className="text-muted-foreground">
                    {videoCount} Video
                  </span>
                </div>
              )}

              <div className="flex items-center gap-2 text-sm">
                <Eye className="text-muted-foreground h-4 w-4" />
                <span className="text-muted-foreground">1.2K views</span>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg">
                <Link href={ROUTES.GALLERY.ALBUM(featuredAlbum.slug)}>
                  <Play className="mr-2 h-4 w-4" />
                  Lihat Album
                </Link>
              </Button>

              <Button variant="outline" size="lg" asChild>
                <Link href="#gallery">Jelajahi Semua</Link>
              </Button>
            </div>
          </div>

          {/* Featured Image/Video */}
          <div className="relative">
            <Card className="overflow-hidden p-0 shadow-2xl">
              <CardContent className="p-0">
                <div className="relative h-64 md:h-80 lg:h-96">
                  <Image
                    src={
                      featuredAlbum.coverImage ||
                      '/images/placeholder-album.jpg'
                    }
                    alt={featuredAlbum.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </CardContent>
            </Card>

            {/* Floating stats card */}
            <Card className="bg-background/95 absolute right-6 -bottom-6 left-6 border shadow-lg backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-foreground text-2xl font-bold">
                      {totalItems}
                    </div>
                    <div className="text-muted-foreground text-xs">
                      Total Media
                    </div>
                  </div>
                  <div>
                    <div className="text-foreground text-2xl font-bold">
                      {photoCount}
                    </div>
                    <div className="text-muted-foreground text-xs">Foto</div>
                  </div>
                  <div>
                    <div className="text-foreground text-2xl font-bold">
                      {videoCount}
                    </div>
                    <div className="text-muted-foreground text-xs">Video</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
