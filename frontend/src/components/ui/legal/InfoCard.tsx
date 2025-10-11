import { InfoCardProps } from '@/constants/legal';

export const InfoCard = ({
  children,
  color = 'blue',
  className = '',
}: InfoCardProps) => (
  <div
    className={`bg-${color}-50 dark:bg-${color}-900/20 rounded-xl p-6 ${className}`}
  >
    {children}
  </div>
);
