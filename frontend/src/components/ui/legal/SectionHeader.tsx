import { SectionHeaderProps } from '@/constants/legal';

export const SectionHeader = ({
  icon: Icon,
  title,
  color,
}: SectionHeaderProps) => (
  <div className="mb-6 flex items-center gap-3">
    <div className={`p-3 bg-${color}-100 dark:bg-${color}-900/30 rounded-xl`}>
      <Icon className={`h-6 w-6 text-${color}-600`} />
    </div>
    <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200">
      {title}
    </h2>
  </div>
);
