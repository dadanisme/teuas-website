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
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Calendar,
  Clock,
  Share2,
  ArrowLeft,
  ExternalLink,
  Phone,
  Mail,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { ROUTES, APP_CONFIG } from '@/constants';
import { MOCK_SCHOLARSHIPS } from '@/constants/content';

interface ScholarshipsDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: ScholarshipsDetailPageProps): Promise<Metadata> {
  // In real implementation, this would fetch from API
  const { slug } = await params;
  const event = MOCK_SCHOLARSHIPS.find((e) => e.slug === slug);

  if (!event) {
    return {
      title: 'Beasiswa Tidak Ditemukan',
    };
  }

  return {
    title: `${event.title} | ${APP_CONFIG.name}`,
    description: event.shortDescription,
    openGraph: {
      title: event.title,
      description: event.shortDescription,
      type: 'article',
      images: event.featuredImage ? [event.featuredImage] : undefined,
    },
  };
}

export default async function ScholarshipsDetailPage({
  params,
}: ScholarshipsDetailPageProps) {
  // In real implementation, this would fetch from API
  const { slug } = await params;
  const event = MOCK_SCHOLARSHIPS.find((e) => e.slug === slug);

  if (!event) {
    notFound();
  }

  const eventDate = new Date(event.eventDate);
  const endDate = event.endDate ? new Date(event.endDate) : null;
  const registrationDeadline = event.registrationDeadline
    ? new Date(event.registrationDeadline)
    : null;

  const breadcrumbItems = [
    { label: 'Beranda', href: ROUTES.HOME },
    { label: 'Beasiswa', href: ROUTES.SCHOLARSHIPS.ROOT },
    { label: event.title, href: `${ROUTES.SCHOLARSHIPS.ROOT}/${event.slug}` },
  ];

  const relatedEvents = MOCK_SCHOLARSHIPS.filter(
    (e) => e.id !== event.id && e.category.id === event.category.id
  ).slice(0, 3);

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
          <Link href={ROUTES.SCHOLARSHIPS.ROOT}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali ke Beasiswa
          </Link>
        </Button>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Event Content */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {/* Header */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Badge
                    variant="outline"
                    className="border-primary text-primary"
                  >
                    {event.category.name}
                  </Badge>
                </div>

                <h1 className="text-foreground text-3xl leading-tight font-bold lg:text-4xl">
                  {event.title}
                </h1>

                <p className="text-muted-foreground text-lg">
                  {event.shortDescription}
                </p>

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
              {event.featuredImage && (
                <div className="relative h-64 overflow-hidden rounded-lg md:h-96">
                  <Image
                    src={event.featuredImage}
                    alt={event.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}

              {/* Description */}
              <div className="prose prose-lg max-w-none">
                <h2 className="mb-4 text-xl font-semibold">
                  Deskripsi Beasiswa
                </h2>
                <div
                  className="text-foreground leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: event.description }}
                />
              </div>

              {/* Requirements */}
              {event.requirements && (
                <div className="space-y-4">
                  <h2 className="mb-4 text-xl font-semibold">Persyaratan</h2>
                  <ul className="text-muted-foreground list-disc pl-5">
                    {event.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Event Date */}

              {/* Gallery */}
              {event.gallery && event.gallery.length > 0 && (
                <div>
                  <h2 className="mb-4 text-xl font-semibold">Galeri</h2>
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                    {event.gallery.map((image, index) => (
                      <div
                        key={index}
                        className="relative h-32 overflow-hidden rounded-lg"
                      >
                        <Image
                          src={image}
                          alt={`${event.title} gallery ${index + 1}`}
                          fill
                          className="object-cover transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              {event.tags.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-muted-foreground text-sm font-medium">
                    Tags:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {event.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Event Details Card */}
              <Card className="p-0">
                <CardContent className="p-6">
                  <h3 className="mb-4 text-lg font-semibold">
                    Detail Beasiswa
                  </h3>
                  <div className="space-y-4">
                    {/* Date & Time */}
                    <div className="flex items-start gap-3">
                      <Calendar className="text-muted-foreground mt-0.5 h-5 w-5" />
                      <div>
                        <p className="font-medium">
                          {eventDate.toLocaleDateString('id-ID', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                        <p className="text-muted-foreground text-sm">
                          {eventDate.toLocaleTimeString('id-ID', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}{' '}
                          WIB
                          {endDate && (
                            <>
                              {' '}
                              -{' '}
                              {endDate.toLocaleTimeString('id-ID', {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}{' '}
                              WIB
                            </>
                          )}
                        </p>
                      </div>
                    </div>

                    {/* Registration Deadline */}
                    {registrationDeadline && (
                      <div className="flex items-start gap-3">
                        <Clock className="text-muted-foreground mt-0.5 h-5 w-5" />
                        <div>
                          <p className="font-medium">Batas Pendaftaran</p>
                          <p className="text-muted-foreground text-sm">
                            {registrationDeadline.toLocaleDateString('id-ID', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Registration Button */}
                  {event.requiresRegistration &&
                    event.registrationUrl &&
                    event.status === 'upcoming' && (
                      <div className="mt-6">
                        <Button asChild className="w-full">
                          <Link href={event.registrationUrl} target="_blank">
                            Daftar Sekarang
                            <ExternalLink className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    )}
                </CardContent>
              </Card>

              {/* Organizer Info */}
              <Card className="p-0">
                <CardContent className="p-6">
                  <h3 className="mb-4 text-lg font-semibold">
                    Penyedia Beasiswa
                  </h3>
                  <div className="space-y-3">
                    <p className="font-medium">{event.organizer.name}</p>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Mail className="text-muted-foreground h-4 w-4" />
                        <a
                          href={`mailto:${event.organizer.email}`}
                          className="text-primary hover:underline"
                        >
                          {event.organizer.email}
                        </a>
                      </div>

                      {event.organizer.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="text-muted-foreground h-4 w-4" />
                          <a
                            href={`tel:${event.organizer.phone}`}
                            className="text-primary hover:underline"
                          >
                            {event.organizer.phone}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Related Events */}
              {relatedEvents.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="mb-4 text-lg font-semibold">
                      Beasiswa Terkait
                    </h3>
                    <div className="space-y-4">
                      {relatedEvents.map((relatedEvent) => (
                        <Link
                          key={relatedEvent.id}
                          href={ROUTES.SCHOLARSHIPS.DETAIL(relatedEvent.slug)}
                          className="group block"
                        >
                          <div className="flex gap-3">
                            <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded">
                              <Image
                                src={
                                  relatedEvent.featuredImage ||
                                  '/images/placeholder-event.jpg'
                                }
                                alt={relatedEvent.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <h4 className="text-foreground group-hover:text-primary line-clamp-2 text-sm font-medium transition-colors">
                                {relatedEvent.title}
                              </h4>
                              <p className="text-muted-foreground mt-1 text-xs">
                                {new Date(
                                  relatedEvent.eventDate
                                ).toLocaleDateString('id-ID', {
                                  day: 'numeric',
                                  month: 'short',
                                })}
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
