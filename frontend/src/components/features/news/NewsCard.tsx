import { NewsArticle } from '@/types/content';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, User, Eye } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { ROUTES } from '@/constants';

interface NewsCardProps {
  article: NewsArticle;
}

export function NewsCard({ article }: NewsCardProps) {
  return (
    <Card className="group overflow-hidden p-0 transition-shadow duration-300 hover:shadow-lg">
      <Link href={`${ROUTES.NEWS.ROOT}/${article.slug}`}>
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={article.featuredImage || '/images/placeholder-news.jpg'}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3">
            <Badge
              variant="secondary"
              className="bg-background/90 text-foreground"
            >
              {article.category.name}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <CardContent className="p-4">
          <h3 className="text-foreground group-hover:text-primary mb-2 line-clamp-2 font-semibold transition-colors">
            {article.title}
          </h3>

          <p className="text-muted-foreground mb-4 line-clamp-3 text-sm">
            {article.excerpt}
          </p>

          {/* Meta Info */}
          <div className="text-muted-foreground flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <User className="h-3 w-3" />
                <span>{article.author?.fullName || 'Admin'}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>
                  {article.publishedAt
                    ? new Date(article.publishedAt).toLocaleDateString(
                        'id-ID',
                        {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        }
                      )
                    : 'Draft'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              <span>{article.viewCount.toLocaleString()}</span>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
