import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Users,
  GraduationCap,
  Newspaper,
  MessageSquare,
  Camera,
} from 'lucide-react';
import { ROUTES } from '@/constants';

const focusFeatures = [
  {
    id: 1,
    icon: Users,
    title: 'Database Alumni',
    subheading: 'Bangun Jaringan & Koneksi',
    description: 'Temukan alumni TEUAS dan perluas relasi profesionalmu',
    href: ROUTES.ALUMNI.DIRECTORY,
  },
  {
    id: 2,
    icon: GraduationCap,
    title: 'Scholarship & Donation',
    subheading: 'Inspirasi dari Prestasi Terbaik',
    description: 'Jelajahi pencapaian mahasiswa dan jadilah bagian dari mereka',
    href: ROUTES.SCHOLARSHIPS.ROOT,
  },
  {
    id: 3,
    icon: Newspaper,
    title: 'News',
    subheading: 'Peluang Karir yang Sesuai',
    description: 'Akses lowongan kerja terbaru yang relevan dengan bidangmu',
    href: ROUTES.NEWS.ROOT,
  },
  {
    id: 4,
    icon: MessageSquare,
    title: 'FGD',
    subheading: 'Forum Group Discussion',
    description: 'Temukan alumni TEUAS dan perluas relasi profesionalmu',
    href: ROUTES.FGD.ROOT,
  },
  {
    id: 5,
    icon: Camera,
    title: 'Gallery',
    subheading: 'Inspirasi dari Prestasi Terbaik',
    description: 'Jelajahi pencapaian mahasiswa dan jadilah bagian dari mereka',
    href: ROUTES.GALLERY.ROOT,
  },
];

export function OurFocus() {
  return (
    <section className="bg-muted/50 py-20">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="mx-auto mb-16 max-w-4xl text-center">
          {/* Badge */}
          <div className="border-primary/20 bg-primary/10 mb-6 inline-flex items-center rounded-full border px-4 py-2 text-sm">
            <span className="text-primary font-medium">KOMITMEN IKA TEUAS</span>
          </div>

          {/* Title */}
          <h2 className="text-foreground mb-6 text-3xl font-bold md:text-4xl lg:text-5xl">
            Fokus Utama Kami
          </h2>

          {/* Description */}
          <p className="text-muted-foreground text-lg leading-relaxed">
            IKA TEUAS hadir untuk membangun jaringan alumni yang solid,
            mendukung prestasi mahasiswa, membuka peluang karir, dan memberikan
            akses pembelajaran bagi lulusan Teknik Elektro UPI. Jelajahi fitur
            utama kami dan temukan manfaatnya untuk masa depanmu!
          </p>
        </div>

        {/* Features Grid */}
        <div className="mx-auto grid max-w-6xl grid-cols-6 gap-8">
          {focusFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={feature.id}
                className={`group bg-background relative col-span-6 w-full overflow-hidden rounded-xl border p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg md:col-span-3 xl:col-span-2 ${
                  index === 3 ? 'xl:col-start-2' : ''
                }`}
              >
                {/* Bottom Primary Line */}
                <div className="bg-primary absolute bottom-0 left-0 h-1 w-0 transition-all duration-300 ease-out group-hover:w-full"></div>
                {/* Icon */}
                <div className="bg-primary/10 group-hover:bg-primary/20 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg transition-colors">
                  <IconComponent className="text-primary h-6 w-6" />
                </div>

                {/* Title */}
                <h3 className="text-foreground mb-2 text-xl font-bold">
                  {feature.title}
                </h3>

                {/* Subheading */}
                <h4 className="text-primary mb-3 text-lg font-semibold">
                  {feature.subheading}
                </h4>

                {/* Description */}
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {feature.description}
                </p>

                {/* Link */}
                <Button
                  variant="ghost"
                  className="group/button text-primary hover:text-primary mx-auto h-auto p-0 font-medium"
                  asChild
                >
                  <Link
                    href={feature.href}
                    className="inline-flex items-center"
                  >
                    Pelajari Lebih Lanjut
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/button:translate-x-1" />
                  </Link>
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
