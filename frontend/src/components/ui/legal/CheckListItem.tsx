import { CheckCircle } from 'lucide-react';
import { ChecklistItemProps } from '@/constants/legal';

export const ChecklistItem = ({
  children,
  color = 'blue',
}: ChecklistItemProps) => (
  <div className="flex items-start gap-3 rounded-lg bg-white p-3 dark:bg-slate-800">
    <CheckCircle className={`h-5 w-5 text-${color}-600 mt-0.5 flex-shrink-0`} />
    <span className="text-slate-700 dark:text-slate-300">{children}</span>
  </div>
);
