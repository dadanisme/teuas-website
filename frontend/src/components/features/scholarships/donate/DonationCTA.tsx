'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MessageCircle, HandHeart } from 'lucide-react';
import { ROUTES } from '@/lib/constants';

interface DonationCTAProps {
  className?: string;
}

export function DonationCTA({ className = '' }: DonationCTAProps) {
  return (
    <section className={`bg-primary/5 py-20 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          {/* Main CTA */}
          <div className="mb-16">
            <h2 className="text-foreground mb-6 text-3xl font-bold md:text-4xl">
              Uluran Tanganmu Dapat Mengubah Hidup Mereka
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Dengan prinsip 'Dari Kita, Oleh Kita, Untuk Kemajuan Teknik Elektro UPI', Ikatan Alumni mengambil inisiatif untuk menciptakan dampak berkelanjutan. Kami percaya bahwa investasi pada sumber daya manusia adalah kunci kemajuan. Program beasiswa dan donasi ini dirancang dan dikelola secara profesional oleh tim alumni untuk memastikan setiap rupiah kontribusi tersalurkan secara efektif dan transparan.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" asChild>
                <Link href={ROUTES.SCHOLARSHIPS.DONORS}>
                  <HandHeart className="mr-2 h-5 w-5" />
                  Sisihkan Donasi
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href={ROUTES.CONTACT}>
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Hubungi Kami
                </Link>
              </Button>
            </div>
          </div>




        </div>
      </div>
    </section>
  );
}
