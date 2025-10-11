import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ROUTES } from '@/constants';

interface CallToActionProps {
  className?: string;
}

export function CallToAction({ className = '' }: CallToActionProps) {
  return (
    <section className={`py-16 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-foreground mb-4 text-3xl font-bold">
            Bergabunglah dengan Komunitas Kami
          </h2>
          <p className="text-muted-foreground mb-8">
            Jadilah bagian dari jaringan profesional teknik elektro yang
            berkembang. Terhubung, belajar, dan berkembang bersama kami.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" asChild>
              <Link href={ROUTES.REGISTER}>Menjadi Anggota</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href={ROUTES.CONTACT}>Hubungi Kami</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
