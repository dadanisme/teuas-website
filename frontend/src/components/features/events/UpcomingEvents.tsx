import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react';
import { ROUTES } from '@/constants';
import { format, isToday, isTomorrow, parseISO } from 'date-fns';

interface Event {
  id: number;
  title: string;
  description: string;
  slug: string;
  featuredImage?: string;
  eventDate: string;
  endDate?: string;
  location: string;
  venue?: string;
  maxAttendees?: number;
  currentAttendees?: number;
  category: {
    name: string;
    color: string;
    icon: string;
  };
  isOnline: boolean;
  isFree: boolean;
  registrationUrl?: string;
}

interface UpcomingEventsProps {
  title?: string;
  showViewAll?: boolean;
  maxItems?: number;
  className?: string;
}

export function UpcomingEvents({
  title = 'Upcoming Events',
  showViewAll = true,
  maxItems = 3,
  className = '',
}: UpcomingEventsProps) {
  // Mock data - would come from API in real implementation
  const upcomingEvents: Event[] = [
    {
      id: 1,
      title: 'Tech Talk: AI in Electrical Engineering',
      description:
        'Join us for an insightful discussion on how artificial intelligence is revolutionizing electrical engineering practices and creating new opportunities.',
      slug: 'tech-talk-ai-electrical-engineering',
      featuredImage: '/assets/images/image-business-2.png',
      eventDate: '2025-01-25T19:00:00Z',
      endDate: '2025-01-25T21:00:00Z',
      location: 'Jakarta',
      venue: 'UPI Kampus Cibiru',
      maxAttendees: 100,
      currentAttendees: 67,
      category: {
        name: 'Tech Talk',
        color: '#3B82F6',
        icon: '💡',
      },
      isOnline: false,
      isFree: true,
      registrationUrl: 'https://forms.google.com/ai-tech-talk',
    },
    {
      id: 2,
      title: 'Alumni Networking Night',
      description:
        'Connect with fellow alumni, share experiences, and build meaningful professional relationships in a relaxed evening setting.',
      slug: 'alumni-networking-night-january',
      featuredImage: '/assets/images/image-minimal-2.png',
      eventDate: '2025-02-01T18:30:00Z',
      endDate: '2025-02-01T22:00:00Z',
      location: 'Bandung',
      venue: 'Hotel Pullman Bandung',
      maxAttendees: 150,
      currentAttendees: 89,
      category: {
        name: 'Networking',
        color: '#10B981',
        icon: '🤝',
      },
      isOnline: false,
      isFree: false,
    },
    {
      id: 3,
      title: 'Virtual Career Fair 2025',
      description:
        'Explore career opportunities with top companies in technology, energy, and engineering sectors. Connect directly with recruiters and hiring managers.',
      slug: 'virtual-career-fair-2025',
      featuredImage: '/assets/images/image-abstract-2.png',
      eventDate: '2025-02-10T09:00:00Z',
      endDate: '2025-02-10T17:00:00Z',
      location: 'Online',
      venue: 'Zoom Platform',
      maxAttendees: 500,
      currentAttendees: 234,
      category: {
        name: 'Career Fair',
        color: '#8B5CF6',
        icon: '💼',
      },
      isOnline: true,
      isFree: true,
      registrationUrl: 'https://zoom.us/career-fair-2025',
    },
  ];

  const formatEventDate = (dateString: string) => {
    const date = parseISO(dateString);
    if (isToday(date)) return 'Today';
    if (isTomorrow(date)) return 'Tomorrow';
    return format(date, 'MMM dd, yyyy');
  };

  const formatEventTime = (dateString: string) => {
    return format(parseISO(dateString), 'h:mm a');
  };

  const getAvailabilityStatus = (event: Event) => {
    if (!event.maxAttendees) return null;
    const percentage =
      ((event.currentAttendees || 0) / event.maxAttendees) * 100;

    if (percentage >= 100) return { text: 'Full', color: 'destructive' };
    if (percentage >= 90) return { text: 'Almost Full', color: 'destructive' };
    if (percentage >= 75) return { text: 'Limited Spots', color: 'secondary' };
    return { text: 'Available', color: 'default' };
  };

  return (
    <section className={`py-16 ${className}`}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12 flex items-center justify-between">
          <div>
            <h2 className="text-foreground text-3xl font-bold md:text-4xl">
              {title}
            </h2>
            <p className="text-muted-foreground mt-2">
              Don't miss out on these amazing opportunities to connect and learn
            </p>
          </div>

          {showViewAll && (
            <Button variant="outline" asChild className="hidden sm:flex">
              <Link href={ROUTES.EVENTS.ROOT}>
                View All Events
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {upcomingEvents.slice(0, maxItems).map((event) => {
            const availabilityStatus = getAvailabilityStatus(event);

            return (
              <Card
                key={event.id}
                className="group overflow-hidden p-0 transition-transform hover:scale-[1.02]"
              >
                {/* Featured Image */}
                {event.featuredImage && (
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={event.featuredImage}
                      alt={event.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <Badge
                        style={{ backgroundColor: event.category.color }}
                        className="text-white"
                      >
                        <span className="mr-1">{event.category.icon}</span>
                        {event.category.name}
                      </Badge>
                    </div>

                    {/* Free/Online Badges */}
                    <div className="absolute top-4 right-4 space-y-2">
                      {event.isFree && (
                        <Badge
                          variant="secondary"
                          className="block bg-green-100 text-green-800"
                        >
                          Free
                        </Badge>
                      )}
                      {event.isOnline && (
                        <Badge
                          variant="secondary"
                          className="block bg-blue-100 text-blue-800"
                        >
                          Online
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                <CardHeader className="px-6 pt-6 pb-2">
                  <h3 className="group-hover:text-primary line-clamp-2 text-lg leading-tight font-semibold">
                    <Link href={ROUTES.EVENTS.DETAIL(event.slug)}>
                      {event.title}
                    </Link>
                  </h3>
                </CardHeader>

                <CardContent className="px-6 pb-6">
                  <p className="text-muted-foreground mb-4 line-clamp-2 text-sm">
                    {event.description}
                  </p>

                  {/* Event Details */}
                  <div className="mb-4 space-y-2">
                    <div className="text-muted-foreground flex items-center text-xs">
                      <Calendar className="mr-2 h-3 w-3" />
                      <span>
                        {formatEventDate(event.eventDate)} at{' '}
                        {formatEventTime(event.eventDate)}
                      </span>
                    </div>

                    <div className="text-muted-foreground flex items-center text-xs">
                      <MapPin className="mr-2 h-3 w-3" />
                      <span>{event.venue || event.location}</span>
                    </div>

                    {event.maxAttendees && (
                      <div className="flex items-center justify-between text-xs">
                        <div className="text-muted-foreground flex items-center">
                          <Users className="mr-2 h-3 w-3" />
                          <span>
                            {event.currentAttendees}/{event.maxAttendees}{' '}
                            attendees
                          </span>
                        </div>
                        {availabilityStatus && (
                          <Badge
                            variant={
                              availabilityStatus.color as
                                | 'default'
                                | 'secondary'
                                | 'destructive'
                                | 'outline'
                            }
                            className="text-xs"
                          >
                            {availabilityStatus.text}
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <Button size="sm" className="flex-1" asChild>
                      <Link href={ROUTES.EVENTS.DETAIL(event.slug)}>
                        Learn More
                      </Link>
                    </Button>
                    {event.registrationUrl && (
                      <Button size="sm" variant="outline" asChild>
                        <Link href={event.registrationUrl} target="_blank">
                          Register
                        </Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Mobile View All Button */}
        {showViewAll && (
          <div className="mt-8 text-center sm:hidden">
            <Button variant="outline" asChild>
              <Link href={ROUTES.EVENTS.ROOT}>
                View All Events
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
