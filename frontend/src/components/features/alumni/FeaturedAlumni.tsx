'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { ArrowRight, Quote } from 'lucide-react';
import { ROUTES } from '@/constants';
import Autoplay from 'embla-carousel-autoplay';
import { useEffect, useState } from 'react';
import { type CarouselApi } from '@/components/ui/carousel';
import { cn } from '@/lib/utils';

interface Testimonial {
  name: string;
  year: number;
  position: string;
  testimonial: string;
  image: string;
}

// Testimonial data
const testimonials: Testimonial[] = [
  {
    name: 'Egin',
    year: 2016,
    position: 'Project Manager',
    testimonial:
      'Melalui IKA TEUAS, saya bisa terhubung dengan senior yang sudah lebih dulu bekerja di industri manufaktur. Berkat bimbingan mereka, saya bisa lebih siap menghadapi tantangan di dunia kerja dan kini menjadi project manager',
    image: '/assets/testimonials/Egin.png',
  },
  {
    name: 'Dante',
    year: 2016,
    position: 'Product Solution Officer',
    testimonial:
      'IKA TEUAS memberikan akses ke berbagai lowongan kerja yang sangat relevan. Dari info loker yang dibagikan, saya menemukan kesempatan untuk bergabung di startup teknologi dan mengembangkan karir saya sebagai product solution officer',
    image: '/assets/testimonials/Dante.png',
  },
  {
    name: 'Devi',
    year: 2016,
    position: 'Quality Assurance',
    testimonial:
      'Bergabung dengan IKA TEUAS membuka banyak peluang bagi saya. Melalui jaringan alumni, saya mendapatkan mentor yang membantu saya memahami industri B2B2C dan akhirnya mendapatkan pekerjaan impian saya!',
    image: '/assets/testimonials/Devi.png',
  },
  {
    name: 'Adit',
    year: 2020,
    position: 'Fresh Graduate',
    testimonial:
      'Sebagai fresh graduate, saya sempat bingung mencari pekerjaan. Namun, dengan bantuan e-learning dan bimbingan dari alumni, saya lebih percaya diri dalam wawancara dan akhirnya mendapatkan pekerjaan pertama saya!',
    image: '/assets/testimonials/Adit.png',
  },
  {
    name: 'Ramdan',
    year: 2019,
    position: 'Software Engineer',
    testimonial:
      'Bekal dari IKA TEUAS membuka jalan karier saya. Sekarang saya bekerja remote sebagai Lead Software Engineer di perusahaan Eropa, sekaligus bagian dari Apple Developer Academy international di Bali.',
    image: '/assets/testimonials/Ramdan.jpeg',
  },
];

interface FeaturedAlumniProps {
  className?: string;
}

export function FeaturedAlumni({ className = '' }: FeaturedAlumniProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  // Update current slide when carousel changes
  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section className={`bg-background py-20 ${className}`}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-4xl text-center">
          {/* Badge */}
          <div className="border-primary/20 bg-primary/10 mb-6 inline-flex items-center rounded-full border px-4 py-2 text-sm">
            <span className="text-primary font-medium">TESTIMONI ALUMNI</span>
          </div>

          {/* Title */}
          <h2 className="text-foreground mb-6 text-3xl font-bold md:text-4xl lg:text-5xl">
            Cerita Sukses Alumni TEUAS
          </h2>

          {/* Description */}
          <p className="text-muted-foreground text-lg leading-relaxed">
            Jaringan alumni Teknik Elektro UPI telah membantu banyak lulusan
            dalam membangun karir, memperluas koneksi, dan mendapatkan wawasan
            industri. Simak kisah inspiratif dari para alumni yang telah meraih
            kesuksesan di berbagai bidang!
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="mx-auto max-w-6xl">
          <Carousel
            setApi={setApi}
            opts={{
              align: 'center',
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 5000,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4 md:py-6">
              {testimonials.map((testimonial, index) => {
                const isCenter = index === current;
                return (
                  <CarouselItem
                    key={testimonial.name}
                    className="pl-2 md:basis-1/2 md:pl-4 lg:basis-1/3"
                  >
                    <Card
                      className={cn(
                        'flex h-auto flex-col overflow-hidden p-0 transition-all hover:shadow-lg md:h-[510px] lg:h-[530px] xl:h-[505px]',
                        isCenter && 'md:translate-y-[-10px] md:scale-105'
                      )}
                    >
                      {/* Full Image at Top */}
                      <div className="relative h-48 w-full">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          width={480}
                          height={480}
                          className="h-60 w-full object-cover"
                        />
                      </div>
                      {/* Content Area */}
                      <CardContent className="mt-6 flex flex-1 flex-col p-6 text-center">
                        <p className="text-muted-foreground mb-6 flex-1 text-sm leading-relaxed italic">
                          <Quote className="text-primary mx-auto mr-1 inline-block h-6 w-6" />
                          {testimonial.testimonial}
                        </p>
                        <div className="mt-auto space-y-2">
                          <h4 className="text-foreground text-lg font-semibold">
                            {testimonial.name} /{' '}
                            <span className="text-primary text-sm font-medium">
                              {testimonial.position}
                            </span>
                          </h4>
                          <p className="text-muted-foreground text-xs">
                            Angkatan {testimonial.year}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>

        {/* View All Button */}
        <div className="mt-16 text-center">
          <Button variant="outline" size="lg" asChild>
            <Link href={ROUTES.ALUMNI.DIRECTORY}>
              Jelajahi Direktori Alumni
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
