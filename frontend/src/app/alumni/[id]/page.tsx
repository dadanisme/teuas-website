import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { AlumniProfileHeader } from '@/components/features/alumni/AlumniProfileHeader';
import { AlumniProfileContent } from '@/components/features/alumni/AlumniProfileContent';
import { AlumniProfileSidebar } from '@/components/features/alumni/AlumniProfileSidebar';
import { ROUTES } from '@/constants';
import { MOCK_ALUMNI } from '@/constants/alumni';

interface AlumniProfilePageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: AlumniProfilePageProps): Promise<Metadata> {
  const { id: _id } = await params;
  // In a real app, you would fetch the alumni data here
  const alumniName = 'Alumni Profile'; // This would come from API

  return {
    title: `${alumniName} - Alumni Profile | TEUAS`,
    description: `View ${alumniName}'s profile in the TEUAS Alumni Directory. Connect with fellow alumni and expand your professional network.`,
    openGraph: {
      title: `${alumniName} - Alumni Profile | TEUAS`,
      description: `View ${alumniName}'s profile in the TEUAS Alumni Directory.`,
      type: 'profile',
    },
  };
}

export default async function AlumniProfilePage({
  params,
}: AlumniProfilePageProps) {
  const { id } = await params;

  // Find alumni by ID from constants
  const alumni = MOCK_ALUMNI.find((a) => a.id === parseInt(id));

  if (!alumni) {
    notFound();
  }

  const breadcrumbItems = [
    { label: 'Beranda', href: ROUTES.HOME },
    { label: 'Alumni', href: ROUTES.ALUMNI.ROOT },
    { label: alumni.fullName, href: ROUTES.ALUMNI.PROFILE(id) },
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
