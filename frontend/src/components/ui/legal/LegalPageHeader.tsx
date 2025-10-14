import { Calendar } from 'lucide-react';
import { LegalPageHeaderProps } from '@/constants/legal';

export const LegalPageHeader = ({
  title,
  subtitle,
  icon: Icon,
  gradientColors,
}: LegalPageHeaderProps) => (
  <div
    className={`bg-gradient-to-r ${gradientColors} relative overflow-hidden p-8 text-center text-white`}
  >
    <div className="absolute inset-0 bg-black/10"></div>
    <div className="relative z-10">
      <div className="mb-4 flex justify-center">
        <div className="rounded-full bg-white/20 p-4 backdrop-blur-sm">
          <Icon className="h-12 w-12" />
        </div>
      </div>
      <h1 className="mb-4 text-4xl font-bold">{title}</h1>
      <h2 className="mb-4 text-xl opacity-90">{subtitle}</h2>
      <div className="flex items-center justify-center gap-2 text-blue-100">
        <Calendar className="h-4 w-4" />
        <p className="text-sm">
          Terakhir diperbarui:{' '}
          {new Date().toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>
    </div>
  </div>
);
