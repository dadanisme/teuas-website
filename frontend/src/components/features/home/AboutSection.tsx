import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants';

export function AboutSection() {
  return (
    <section className="bg-background py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Left Content Column */}
          <div className="space-y-6">
            {/* Badge */}
            <div className="border-primary/20 bg-primary/10 inline-flex items-center rounded-full border px-3 py-1 text-sm">
              <span className="text-primary font-medium">IKA TEUAS</span>
            </div>

            {/* Title */}
            <h2 className="text-foreground text-3xl leading-tight font-bold md:text-4xl lg:text-5xl">
              Teknik Elektro Unity And Solidarity
            </h2>

            {/* Description */}
            <p className="text-muted-foreground text-lg leading-relaxed">
              IKA TEUAS adalah komunitas alumni Teknik Elektro UPI yang
              bertujuan membangun jaringan profesional, berbagi pengalaman,
              serta membuka peluang bagi mahasiswa dan alumni dalam dunia kerja.
            </p>

            {/* CTA Button */}
            <div className="pt-4">
              <Button size="lg" asChild>
                <Link href={ROUTES.ABOUT}>Tentang Kami</Link>
              </Button>
            </div>
          </div>

          {/* Right Images Column */}
          <div className="relative hidden h-96 lg:block">
            {/* Horizontal Image - Overlapping */}
            <div className="border-primary absolute top-1/2 left-0 z-20 h-60 w-80 -translate-y-1/2 transform overflow-hidden rounded-lg border-2 xl:w-96">
              <Image
                src="/assets/images/image-business-1.png"
                alt="TEUAS Community"
                fill
                className="object-cover"
              />
            </div>

            {/* Vertical Image - Background */}
            <div className="border-primary absolute top-0 right-0 h-full w-64 overflow-hidden rounded-lg border-2 xl:w-80">
              <Image
                src="/assets/images/image-business-2.png"
                alt="TEUAS Alumni Network"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Mobile Images - Simple Stack */}
          <div className="space-y-4 lg:hidden">
            <div className="border-primary relative h-60 overflow-hidden rounded-lg border-2 sm:h-96">
              <Image
                src="/assets/images/image-business-1.png"
                alt="TEUAS Community"
                fill
                className="object-cover"
              />
            </div>
            <div className="border-primary relative h-64 overflow-hidden rounded-lg border-2">
              <Image
                src="/assets/images/image-business-2.png"
                alt="TEUAS Alumni Network"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
