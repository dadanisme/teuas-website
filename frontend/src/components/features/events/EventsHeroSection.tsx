import { Event } from '@/types/content';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, MapPin, Users, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { ROUTES } from '@/constants';

interface EventsHeroSectionProps {
  featuredEvent: Event;
}

export function EventsHeroSection({ featuredEvent }: EventsHeroSectionProps) {
  const eventDate = new Date(featuredEvent.eventDate);
  const isToday = eventDate.toDateString() === new Date().toDateString();
  const isTomorrow =
    eventDate.toDateString() === new Date(Date.now() + 86400000).toDateString();

  const getDateLabel = () => {
    if (isToday) return 'Hari Ini';
    if (isTomorrow) return 'Besok';
    return eventDate.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <section className="from-primary/5 via-background to-secondary/5 bg-gradient-to-br py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h1 className="text-foreground mb-4 text-4xl font-bold">
            Acara TEUAS UPI
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            Bergabunglah dengan berbagai acara menarik dari komunitas alumni
            TEUAS UPI. Perluas jaringan, tingkatkan skill, dan raih peluang
            baru.
          </p>
        </div>

        {/* Featured Event */}
        <Card className="overflow-hidden p-0 shadow-lg transition-shadow duration-300 hover:shadow-xl">
          <div className="grid grid-cols-1 gap-0 lg:grid-cols-2">
            {/* Image */}
            <div className="relative h-64 lg:h-full">
              <Image
                src={
                  featuredEvent.featuredImage || '/images/placeholder-event.jpg'
                }
                alt={featuredEvent.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute top-4 left-4">
                <Badge
                  variant="secondary"
                  className="bg-primary text-primary-foreground"
                >
                  Acara Unggulan
                </Badge>
              </div>
              {featuredEvent.status === 'upcoming' && (
                <div className="absolute top-4 right-4">
                  <Badge variant="default" className="bg-green-500 text-white">
                    {getDateLabel()}
                  </Badge>
                </div>
              )}
            </div>

            {/* Content */}
            <CardContent className="flex flex-col justify-center p-8">
              <div className="mb-4">
                <Badge
                  variant="outline"
                  className="mb-3"
                  style={{
                    borderColor: featuredEvent.category.color,
                    color: featuredEvent.category.color,
                  }}
                >
                  {featuredEvent.category.name}
                </Badge>
                <h2 className="text-foreground mb-4 line-clamp-3 text-2xl font-bold lg:text-3xl">
                  {featuredEvent.title}
                </h2>
                <p className="text-muted-foreground mb-6 line-clamp-3">
                  {featuredEvent.shortDescription}
                </p>
              </div>

              {/* Event Details */}
              <div className="mb-6 space-y-3 text-sm">
                <div className="text-muted-foreground flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {eventDate.toLocaleDateString('id-ID', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                  <Clock className="ml-2 h-4 w-4" />
                  <span>
                    {eventDate.toLocaleTimeString('id-ID', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}{' '}
                    WIB
                  </span>
                </div>

                <div className="text-muted-foreground flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{featuredEvent.location}</span>
                  {featuredEvent.venue && (
                    <>
                      <span>•</span>
                      <span>{featuredEvent.venue}</span>
                    </>
                  )}
                </div>

                {featuredEvent.maxAttendees && (
                  <div className="text-muted-foreground flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>
                      {featuredEvent.currentAttendees || 0} /{' '}
                      {featuredEvent.maxAttendees} peserta
                    </span>
                  </div>
                )}

                {featuredEvent.price && featuredEvent.price > 0 && (
                  <div className="text-muted-foreground flex items-center gap-2">
                    <span className="font-medium">
                      {new Intl.NumberFormat('id-ID', {
                        style: 'currency',
                        currency: featuredEvent.currency || 'IDR',
                      }).format(featuredEvent.price)}
                    </span>
                  </div>
                )}
              </div>

              {/* CTA */}
              <div className="flex gap-3">
                <Button asChild className="flex-1">
                  <Link href={ROUTES.EVENTS.DETAIL(featuredEvent.slug)}>
                    Lihat Detail
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>

                {featuredEvent.requiresRegistration &&
                  featuredEvent.registrationUrl && (
                    <Button asChild variant="outline">
                      <Link
                        href={featuredEvent.registrationUrl}
                        target="_blank"
                      >
                        Daftar Sekarang
                      </Link>
                    </Button>
                  )}
              </div>
            </CardContent>
          </div>
        </Card>
      </div>
    </section>
  );
}
