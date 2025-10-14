import { MediaAlbum } from '@/types/content';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Eye, Download, ExternalLink, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ROUTES } from '@/constants';

interface MediaCardProps {
  album: MediaAlbum;
}

export function MediaCard({ album }: MediaCardProps) {
  return (
    <Card className="group overflow-hidden p-0 transition-all duration-300 hover:shadow-lg">
      <CardContent className="p-0">
        {/* Album Cover */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={album.coverImage || '/images/placeholder-album.jpg'}
            alt={album.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          {/* Item count badge */}
          <div className="absolute top-3 right-3 rounded-full bg-black/70 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
            {album.itemCount} item{album.itemCount > 1 ? 's' : ''}
          </div>

          {/* View button overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <Button
              asChild
              size="sm"
              className="bg-white/90 text-black hover:bg-white"
            >
              <Link href={ROUTES.GALLERY.ALBUM(album.slug)}>
                <Eye className="mr-2 h-4 w-4" />
                Lihat Album
              </Link>
            </Button>
          </div>
        </div>

        {/* Album Info */}
        <div className="space-y-3 p-4">
          <div className="space-y-2">
            <h3 className="text-foreground group-hover:text-primary line-clamp-1 font-semibold transition-colors">
              {album.title}
            </h3>

            {album.description && (
              <p className="text-muted-foreground line-clamp-2 text-sm">
                {album.description}
              </p>
            )}
          </div>

          {/* Meta info */}
          <div className="text-muted-foreground flex items-center justify-between text-xs">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>
                {new Date(album.createdAt).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <User className="h-3 w-3" />
              <span>{album.creator?.fullName || 'Admin'}</span>
            </div>
          </div>

          {/* Tags */}
          {album.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {album.tags.slice(0, 3).map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="px-2 py-0.5 text-xs"
                >
                  #{tag}
                </Badge>
              ))}
              {album.tags.length > 3 && (
                <Badge variant="outline" className="px-2 py-0.5 text-xs">
                  +{album.tags.length - 3}
                </Badge>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-2 pt-2">
            <Button asChild size="sm" className="flex-1">
              <Link href={ROUTES.GALLERY.ALBUM(album.slug)}>Lihat Detail</Link>
            </Button>

            <Button variant="outline" size="sm">
              <Download className="h-4 w-4" />
            </Button>

            <Button variant="outline" size="sm">
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
