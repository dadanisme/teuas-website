'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Users, MapPin, Briefcase, GraduationCap } from 'lucide-react';
import { useAlumniStats } from '@/hooks/queries/useAlumni';

interface AlumniStatsProps {
  className?: string;
}

export function AlumniStats({ className = '' }: AlumniStatsProps) {
  const { data: statsResponse, isLoading, isError } = useAlumniStats();

  if (isLoading) {
    return (
      <div
        className={`grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 ${className}`}
      >
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="bg-muted mb-2 h-4 rounded"></div>
              <div className="bg-muted mb-2 h-8 rounded"></div>
              <div className="bg-muted h-3 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (isError || !statsResponse?.data || statsResponse.error) {
    return (
      <div className={`py-8 text-center ${className}`}>
        <p className="text-muted-foreground">Gagal memuat statistik alumni</p>
      </div>
    );
  }

  const stats = statsResponse.data;

  const statItems = [
    {
      icon: Users,
      value: stats.total_alumni.toLocaleString('id-ID'),
      label: 'Total Alumni',
      description: 'Alumni terdaftar di seluruh dunia',
    },
    {
      icon: MapPin,
      value: `${stats.by_location.length}+`,
      label: 'Lokasi',
      description: 'Alumni tersebar di berbagai lokasi',
    },
    {
      icon: Briefcase,
      value: `${stats.by_company.length}+`,
      label: 'Perusahaan',
      description: 'Alumni bekerja di perusahaan terkemuka',
    },
    {
      icon: GraduationCap,
      value: `${stats.by_year.length}+`,
      label: 'Angkatan',
      description: 'Tahun kelulusan yang berbeda',
    },
  ];

  return (
    <section className={`bg-background py-16 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {statItems.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="bg-muted/30 border-0 text-center">
                <CardContent className="p-6">
                  <div className="bg-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                    <Icon className="text-primary h-8 w-8" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-foreground text-3xl font-bold">
                      {stat.value}
                    </h3>
                    <p className="text-foreground text-lg font-semibold">
                      {stat.label}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {stat.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
