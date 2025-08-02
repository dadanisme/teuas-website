'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Users, HandHeart, Banknote } from 'lucide-react';

interface StatItem {
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  label: string;
  description: string;
}

const stats: StatItem[] = [
  {
    icon: Users,
    value: '500+',
    label: 'Total Mahasiswa',
    description: 'Mahasiswa terbantu',
  },
  {
    icon: HandHeart,
    value: '100+',
    label: 'Orang',
    description: 'Sudah Berpartisipasi',
  },
  {
    icon: Banknote,
    value: '100jt+',
    label: 'Rupiah',
    description: 'Total Donasi Terkumpul',
  },
];

interface DonationStatsProps {
  className?: string;
}

export function DonationStats({ className = '' }: DonationStatsProps) {
  return (
    <section className={`bg-background py-16 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat, index) => {
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
