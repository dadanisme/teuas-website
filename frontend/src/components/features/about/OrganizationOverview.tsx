import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Calendar, Award, Building } from 'lucide-react';
import Link from 'next/link';
import { ROUTES } from '@/constants';

interface OrganizationOverviewProps {
  className?: string;
}

export function OrganizationOverview({
  className = '',
}: OrganizationOverviewProps) {
  const stats = [
    {
      icon: Users,
      value: '2,500+',
      label: 'Alumni di Seluruh Dunia',
      description: 'Profesional terhubung di seluruh dunia',
    },
    {
      icon: Calendar,
      value: '60+',
      label: 'Tahun Keunggulan',
      description: 'Sejak 1963, mengembangkan talenta teknik',
    },
    {
      icon: Award,
      value: '100+',
      label: 'Penghargaan Industri',
      description: 'Pengakuan dari pencapaian alumni',
    },
    {
      icon: Building,
      value: '500+',
      label: 'Perusahaan Mitra',
      description: 'Organisasi yang mempekerjakan lulusan kami',
    },
  ];

  return (
    <section className={`py-16 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-foreground mb-6 text-3xl font-bold">
              Organisasi Kami
            </h2>
            <div className="text-muted-foreground space-y-4">
              <p>
                IKA TEUAS UPI (Ikatan Keluarga Alumni Teknik Elektro UPI) adalah
                asosiasi alumni resmi dari jurusan Teknik Elektro di Universitas
                Pendidikan Indonesia. Selama lebih dari enam dekade, kami telah
                menghubungkan para lulusan, memupuk hubungan profesional, dan
                berkontribusi pada kemajuan pendidikan teknik elektro.
              </p>
              <p>
                Jaringan kami tersebar di seluruh Indonesia dan internasional,
                menyatukan para profesional dari berbagai industri termasuk
                teknologi, energi, telekomunikasi, pendidikan, dan
                kewirausahaan. Kami berfungsi sebagai jembatan antara akademia
                dan industri, memfasilitasi transfer pengetahuan dan
                pengembangan profesional.
              </p>
              <p>
                Melalui berbagai program dan inisiatif kami, kami mendukung
                mahasiswa saat ini, lulusan baru, dan profesional berpengalaman
                dalam perjalanan karir mereka sambil mempertahankan ikatan kuat
                dengan alma mater kami dan berkontribusi pada komunitas teknik
                yang lebih luas.
              </p>
            </div>

            <div className="mt-8">
              <Button asChild>
                <Link href={ROUTES.ALUMNI.DIRECTORY}>
                  Jelajahi Direktori Alumni
                </Link>
              </Button>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <div className="mb-3 flex justify-center">
                      <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-lg">
                        <IconComponent className="text-primary h-6 w-6" />
                      </div>
                    </div>
                    <div className="text-foreground text-2xl font-bold">
                      {stat.value}
                    </div>
                    <div className="text-foreground text-sm font-medium">
                      {stat.label}
                    </div>
                    <div className="text-muted-foreground text-xs">
                      {stat.description}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
