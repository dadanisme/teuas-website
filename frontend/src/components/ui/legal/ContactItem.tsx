import { ContactItemProps } from '@/constants/legal';

export const ContactItem = ({
  icon: Icon,
  label,
  value,
  color = 'emerald',
}: ContactItemProps) => (
  <div className="flex items-center gap-3">
    <div className={`p-2 bg-${color}-100 dark:bg-${color}-900/50 rounded-lg`}>
      <Icon className={`h-5 w-5 text-${color}-600`} />
    </div>
    <div>
      <span className="text-sm text-slate-500 dark:text-slate-400">
        {label}
      </span>
      <p className="font-medium text-slate-700 dark:text-slate-300">{value}</p>
    </div>
  </div>
);
