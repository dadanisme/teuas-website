import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants';
import { Home, Search, Users, Calendar, BookOpen } from 'lucide-react';

export default function NotFound() {
  const quickLinks = [
    {
      title: 'Home',
      href: ROUTES.HOME,
      description: 'Return to homepage',
      icon: Home,
    },
    {
      title: 'Alumni Directory',
      href: ROUTES.ALUMNI.DIRECTORY,
      description: 'Find fellow alumni',
      icon: Users,
    },
    {
      title: 'Latest News',
      href: ROUTES.NEWS.ROOT,
      description: 'Stay updated with news',
      icon: BookOpen,
    },
    {
      title: 'Events',
      href: ROUTES.EVENTS.ROOT,
      description: 'Discover upcoming events',
      icon: Calendar,
    },
  ];

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-16">
      <div className="mx-auto max-w-4xl text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-primary/20 text-8xl font-bold select-none md:text-9xl">
            404
          </h1>
        </div>

        {/* Main Content */}
        <div className="mb-12">
          <h2 className="text-foreground mb-4 text-3xl font-bold md:text-4xl">
            Page Not Found
          </h2>
          <p className="text-muted-foreground mb-2 text-lg">
            Sorry, we couldn't find the page you're looking for.
          </p>
          <p className="text-muted-foreground">
            The page might have been moved, deleted, or you entered the wrong
            URL.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mb-16 flex flex-col justify-center gap-4 sm:flex-row">
          <Button asChild size="lg" className="gap-2">
            <Link href={ROUTES.HOME}>
              <Home className="h-4 w-4" />
              Go to Homepage
            </Link>
          </Button>
        </div>

        {/* Quick Links */}
        <div className="mb-12">
          <h3 className="text-foreground mb-6 text-xl font-semibold">
            Popular Pages
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {quickLinks.map((link) => {
              const IconComponent = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group bg-card hover:bg-accent rounded-lg border p-6 transition-colors"
                >
                  <div className="flex flex-col items-center space-y-3 text-center">
                    <div className="bg-primary/10 group-hover:bg-primary/20 rounded-full p-3 transition-colors">
                      <IconComponent className="text-primary h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="text-foreground group-hover:text-primary font-medium transition-colors">
                        {link.title}
                      </h4>
                      <p className="text-muted-foreground mt-1 text-sm">
                        {link.description}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Search Suggestion */}
        <div className="bg-muted/50 rounded-lg border p-6">
          <div className="mb-3 flex items-center justify-center gap-2">
            <Search className="text-muted-foreground h-5 w-5" />
            <h4 className="text-foreground font-medium">
              Looking for something specific?
            </h4>
          </div>
          <p className="text-muted-foreground mb-4">
            Try using our search feature or browse through our main sections.
          </p>
          <Button asChild variant="outline">
            <Link href={ROUTES.SEARCH}>Search Website</Link>
          </Button>
        </div>

        {/* Contact Information */}
        <div className="mt-12 border-t pt-8">
          <p className="text-muted-foreground text-sm">
            Still can't find what you're looking for?{' '}
            <Link
              href={ROUTES.CONTACT}
              className="text-primary font-medium hover:underline"
            >
              Contact us
            </Link>{' '}
            and we'll help you out.
          </p>
        </div>
      </div>
    </div>
  );
}
