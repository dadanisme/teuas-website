import { Event } from '@/types/content';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, MapPin, Users, Clock, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { ROUTES } from '@/constants';

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const eventDate = new Date(event.eventDate);

  const getStatusBadge = () => {
    const now = new Date();
    const isToday = eventDate.toDateString() === now.toDateString();
    const isTomorrow =
      eventDate.toDateString() ===
      new Date(Date.now() + 86400000).toDateString();

    if (event.status === 'ongoing') {
      return (
        <Badge variant="default" className="bg-success text-success-foreground">
          Sedang Berlangsung
        </Badge>
      );
    }

    if (event.status === 'completed') {
      return <Badge variant="secondary">Selesai</Badge>;
    }

    if (event.status === 'cancelled') {
      return <Badge variant="destructive">Dibatalkan</Badge>;
    }

    if (isToday) {
      return (
        <Badge variant="default" className="bg-warning text-warning-foreground">
          Hari Ini
        </Badge>
      );
    }

    if (isTomorrow) {
      return (
        <Badge variant="default" className="bg-primary text-primary-foreground">
          Besok
        </Badge>
      );
    }

    return (
      <Badge className="bg-background/90 text-foreground">Mendatang</Badge>
    );
  };

  return (
    <Card className="group overflow-hidden p-0 transition-shadow duration-300 hover:shadow-lg">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={event.featuredImage || '/images/placeholder-event.jpg'}
          alt={event.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3 flex items-center gap-1">
          <Badge
            variant="secondary"
            className="bg-background/90 text-foreground border-primary"
          >
            {event.category.name}
          </Badge>
          {getStatusBadge()}
        </div>
      </div>

      {/* Content */}
      <CardContent className="p-4">
        <h3 className="text-foreground group-hover:text-primary mb-2 line-clamp-2 font-semibold transition-colors">
          {event.title}
        </h3>

        <p className="text-muted-foreground mb-4 line-clamp-2 text-sm">
          {event.shortDescription}
        </p>

        {/* Event Details */}
        <div className="text-muted-foreground mb-4 space-y-2 text-xs">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>
              {eventDate.toLocaleDateString('id-ID', {
                weekday: 'short',
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </span>
            <Clock className="ml-2 h-3 w-3" />
            <span>
              {eventDate.toLocaleTimeString('id-ID', {
                hour: '2-digit',
                minute: '2-digit',
              })}{' '}
              WIB
            </span>
          </div>

          <div className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            <span className="line-clamp-1">{event.location}</span>
          </div>

          {event.maxAttendees && (
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              <span>
                {event.currentAttendees || 0} / {event.maxAttendees} peserta
              </span>
            </div>
          )}
        </div>

        {/* Price */}
        {event.price !== undefined && (
          <div className="mb-4">
            {event.price === 0 ? (
              <Badge
                variant="secondary"
                className="bg-success/10 text-success border-success/20"
              >
                Gratis
              </Badge>
            ) : (
              <span className="text-primary text-sm font-medium">
                {new Intl.NumberFormat('id-ID', {
                  style: 'currency',
                  currency: event.currency || 'IDR',
                }).format(event.price)}
              </span>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1" asChild>
            <Link href={ROUTES.EVENTS.DETAIL(event.slug)}>Lihat Detail</Link>
          </Button>

          {event.requiresRegistration &&
            event.registrationUrl &&
            event.status === 'upcoming' && (
              <Button size="sm" asChild>
                <Link href={event.registrationUrl} target="_blank">
                  Daftar
                  <ExternalLink className="ml-1 h-3 w-3" />
                </Link>
              </Button>
            )}
        </div>
      </CardContent>
    </Card>
  );
}
