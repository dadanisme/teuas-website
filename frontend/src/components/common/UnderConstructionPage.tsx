import { Construction, Home } from 'lucide-react';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Link from 'next/link';
import { ROUTES } from '@/constants';

interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

interface UnderConstructionPageProps {
  title: string;
  breadcrumbs?: BreadcrumbItem[];
  estimatedCompletion?: string;
}

export function UnderConstructionPage({
  title,
  breadcrumbs = [],
  estimatedCompletion = 'Segera hadir',
}: UnderConstructionPageProps) {
  const defaultBreadcrumbs = [
    { label: 'Beranda', href: ROUTES.HOME },
    { label: title, current: true },
  ];

  const finalBreadcrumbs =
    breadcrumbs.length > 0 ? breadcrumbs : defaultBreadcrumbs;

  return (
    <div className="bg-background">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center text-center">
          {/* Construction Icon */}
          <div className="mb-8">
            <div className="relative">
              <Construction className="mx-auto h-24 w-24 animate-pulse text-yellow-600 dark:text-yellow-400" />
              <div className="absolute -top-2 -right-2 h-6 w-6 animate-bounce rounded-full bg-yellow-400 dark:bg-yellow-500" />
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full space-y-6">
            {/* Breadcrumb */}
            <div className="flex justify-center">
              <Breadcrumb>
                <BreadcrumbList>
                  {finalBreadcrumbs.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <BreadcrumbItem>
                        {item.href && !item.current ? (
                          <BreadcrumbLink asChild>
                            <Link href={item.href}>{item.label}</Link>
                          </BreadcrumbLink>
                        ) : (
                          <BreadcrumbPage>{item.label}</BreadcrumbPage>
                        )}
                      </BreadcrumbItem>
                      {index < finalBreadcrumbs.length - 1 && (
                        <BreadcrumbSeparator />
                      )}
                    </div>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>
            </div>

            {/* Title */}
            <h1 className="text-center text-2xl font-bold">
              Halaman Sedang Dalam Pengembangan
            </h1>

            {/* Description */}
            <div className="space-y-4 text-center">
              <p className="text-muted-foreground text-lg">
                Halaman{' '}
                <span className="text-foreground font-semibold">{title}</span>{' '}
                sedang dalam tahap pengembangan.
              </p>
              <p className="text-muted-foreground">
                Kami sedang bekerja keras untuk memberikan pengalaman terbaik
                bagi Anda. Terima kasih atas kesabaran Anda.
              </p>
            </div>

            <Separator />

            {/* Status Alert */}
            <Alert
              variant="warning"
              icon={<Construction />}
              description={`Estimasi selesai: ${estimatedCompletion}`}
            />

            {/* Action Buttons */}
            <div className="flex flex-col justify-center gap-4 pt-4 sm:flex-row">
              <Button asChild variant="default" size="lg">
                <Link href={ROUTES.HOME}>
                  <Home className="mr-2 h-4 w-4" />
                  Kembali ke Beranda
                </Link>
              </Button>
            </div>

            {/* Additional Info */}
            <div className="border-t pt-6">
              <p className="text-muted-foreground text-center text-sm">
                Untuk informasi lebih lanjut, silakan{' '}
                <Link
                  href={ROUTES.CONTACT}
                  className="text-primary font-medium hover:underline"
                >
                  hubungi kami
                </Link>{' '}
                atau kunjungi{' '}
                <a
                  href="https://github.com/teuasupi/Project_Website_Database"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-medium hover:underline"
                >
                  repository GitHub
                </a>{' '}
                untuk melihat progress pengembangan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
