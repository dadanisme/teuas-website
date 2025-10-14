'use client';

import Link from 'next/link';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { AlumniProfileHeader } from './AlumniProfileHeader';
import { AlumniProfileContent } from './AlumniProfileContent';
import { AlumniProfileSidebar } from './AlumniProfileSidebar';
import { useAlumniProfile } from '@/hooks/queries/useAlumni';
import { ROUTES } from '@/constants';

interface AlumniProfilePageProps {
  id: string;
}

export function AlumniProfilePage({ id }: AlumniProfilePageProps) {
  const {
    data: alumniResponse,
    isLoading,
    isError,
    error,
  } = useAlumniProfile(id);

  if (isLoading) {
    return (
      <div className="bg-background min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="bg-muted h-8 w-1/3 rounded"></div>
            <div className="bg-muted h-64 rounded"></div>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <div className="space-y-4 lg:col-span-2">
                <div className="bg-muted h-32 rounded"></div>
                <div className="bg-muted h-32 rounded"></div>
              </div>
              <div className="lg:col-span-1">
                <div className="bg-muted h-64 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !alumniResponse?.data || alumniResponse.error) {
    return (
      <div className="bg-background min-h-screen">
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="mb-4 text-2xl font-bold">Alumni tidak ditemukan</h1>
          <p className="text-muted-foreground mb-4">
            {error instanceof Error
              ? error.message
              : 'Profil alumni tidak dapat ditemukan'}
          </p>
          <Link
            href={ROUTES.ALUMNI.ROOT}
            className="text-primary hover:underline"
          >
            Kembali ke Direktori Alumni
          </Link>
        </div>
      </div>
    );
  }

  const alumni = alumniResponse.data;

  const breadcrumbItems = [
    { label: 'Beranda', href: ROUTES.HOME },
    { label: 'Alumni', href: ROUTES.ALUMNI.ROOT },
    { label: alumni.full_name, href: ROUTES.ALUMNI.PROFILE(id) },
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

      {/* Profile Header */}
      <AlumniProfileHeader alumni={alumni} />

      {/* Profile Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <AlumniProfileContent alumni={alumni} />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <AlumniProfileSidebar alumni={alumni} />
          </div>
        </div>
      </div>
    </div>
  );
}
