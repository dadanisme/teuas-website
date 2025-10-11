import { Metadata } from 'next';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { EventsPageContent } from '@/components/features/events/EventsPageContent';
import { ROUTES, APP_CONFIG } from '@/constants';
import { MOCK_EVENTS, MOCK_EVENT_CATEGORIES } from '@/constants/content';
import Link from 'next/link';

export const metadata: Metadata = {
  title: `Acara | ${APP_CONFIG.name}`,
  description: `Temukan berbagai acara menarik dari komunitas ${APP_CONFIG.fullName}, mulai dari seminar, workshop, hingga networking event.`,
  openGraph: {
    title: `Acara | ${APP_CONFIG.name}`,
    description: `Temukan berbagai acara menarik dari komunitas ${APP_CONFIG.fullName}, mulai dari seminar, workshop, hingga networking event.`,
    type: 'website',
  },
};

export default function EventsPage() {
  // In real implementation, these would come from API calls
  const events = MOCK_EVENTS;
  const categories = MOCK_EVENT_CATEGORIES;
  const upcomingEvents = events.filter((event) => event.status === 'upcoming');

  const breadcrumbItems = [
    { label: 'Beranda', href: ROUTES.HOME },
    { label: 'Acara', href: ROUTES.EVENTS.ROOT },
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
                      <BreadcrumbPage>{item.label}</BreadcrumbPage>
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

      {/* Content */}
      <EventsPageContent events={upcomingEvents} categories={categories} />
    </div>
  );
}
