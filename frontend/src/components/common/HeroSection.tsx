import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Zap,
  Cpu,
  Radio,
  CircuitBoard,
  Lightbulb,
  Battery,
  Plane,
  GraduationCap,
} from 'lucide-react';
import { ROUTES } from '@/constants';

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  primaryAction?: {
    text: string;
    href: string;
  };
  secondaryAction?: {
    text: string;
    href: string;
  };
  backgroundImage?: string;
}

export function HeroSection({
  title = 'Membangun Koneksi, Berbagi Ilmu, Meraih Masa Depan',
  subtitle = 'TEUAS UPI',
  description = 'TEUAS hadir untuk mempererat jaringan alumni, mendukung mahasiswa, dan membuka peluang karir bagi lulusan Teknik Elektro UPI',
  primaryAction = {
    text: 'Gabung Sekarang',
    href: ROUTES.REGISTER,
  },
  secondaryAction = {
    text: 'Explore Directory',
    href: ROUTES.ALUMNI.DIRECTORY,
  },
  backgroundImage,
}: HeroSectionProps) {
  return (
    <section className="overflow-hidde relative bg-black">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/assets/hero/background.png)' }}
      />

      {/* Background Pattern Overlay */}
      <div className="bg-grid-white/[0.02] absolute inset-0 bg-[size:60px_60px]" />

      {/* Decorative Electrical Icons */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Top Left */}
        <Zap className="absolute top-20 left-10 h-8 w-8 rotate-12 text-white/20" />
        <CircuitBoard className="absolute top-32 left-32 h-6 w-6 -rotate-12 text-white/15" />
        <Lightbulb className="absolute top-48 left-16 h-10 w-10 text-white/12" />

        {/* Top Right */}
        <Cpu className="absolute top-16 right-20 h-12 w-12 rotate-45 text-white/15" />
        <Radio className="absolute top-40 right-12 h-8 w-8 -rotate-30 text-white/20" />
        <Battery className="absolute top-60 right-32 h-6 w-6 rotate-15 text-white/15" />

        {/* Bottom Left */}
        <CircuitBoard className="absolute bottom-32 left-20 h-14 w-14 rotate-30 text-white/12" />
        <Zap className="absolute bottom-48 left-40 h-8 w-8 -rotate-45 text-white/15" />

        {/* Bottom Right */}
        <Lightbulb className="absolute right-16 bottom-20 h-10 w-10 rotate-60 text-white/15" />
        <Cpu className="absolute right-40 bottom-40 h-6 w-6 text-white/20" />

        {/* Center scattered */}
        <Radio className="absolute top-1/3 left-1/4 h-8 w-8 rotate-90 text-white/12" />
        <Battery className="absolute top-2/3 right-1/3 h-10 w-10 -rotate-15 text-white/12" />
        <Zap className="absolute bottom-1/3 left-2/3 h-6 w-6 rotate-135 text-white/15" />
      </div>

      {/* Additional Background Image Overlay */}
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}

      <div className="relative">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            {/* Content Column */}
            <div className="relative text-center lg:text-left">
              {/* Badge */}
              <div className="mb-6 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm backdrop-blur-sm">
                <GraduationCap className="text-primary h-4 w-4" />
                <span className="text-primary-foreground ml-2">
                  Menghubungkan alumni sejak 2006
                </span>
              </div>

              {/* Subtitle */}
              <p className="text-primary mb-4 text-xl font-medium md:text-2xl">
                {subtitle}
              </p>

              {/* Main Heading */}
              <h1 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
                {title}
              </h1>

              {/* Description */}
              <p className="mx-auto mb-10 max-w-2xl text-lg text-white/80 md:text-xl lg:mx-0">
                {description}
              </p>

              {/* Action Buttons */}
              <div className="mb-16 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-base"
                  asChild
                >
                  <Link href={primaryAction.href}>
                    {primaryAction.text}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href={secondaryAction.href}>
                    {secondaryAction.text}
                  </Link>
                </Button>
              </div>
            </div>

            {/* Image Column */}
            <div className="hidden justify-center lg:flex lg:justify-end">
              {/* Big Rocket Shape - Above person image */}
              <div className="absolute bottom-10 -mr-10">
                <div className="absolute -top-36 left-1/2 z-10 translate-x-[-50%]">
                  <Plane className="h-40 w-40 text-white/10" />
                </div>
                <Image
                  src="/assets/hero/person.png"
                  alt="TEUAS UPI Alumni"
                  width={560}
                  height={600}
                  className=""
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute right-0 -bottom-1 left-0">
          <svg
            className="h-32 w-full fill-white"
            viewBox="0 0 1200 160"
            preserveAspectRatio="none"
          >
            <path d="M0,80 C200,140 400,20 600,80 C800,140 1000,20 1200,80 L1200,160 L0,160 Z" />
          </svg>
        </div>
      </div>
    </section>
  );
}
