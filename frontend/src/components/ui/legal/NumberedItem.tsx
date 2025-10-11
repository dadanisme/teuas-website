import { NumberedItemProps } from '@/constants/legal';

export const NumberedItem = ({
  children,
  number,
  color = 'indigo',
}: NumberedItemProps) => (
  <div className="flex items-start gap-3 rounded-lg bg-white p-3 dark:bg-slate-800">
    <div
      className={`h-6 w-6 bg-${color}-100 dark:bg-${color}-900/50 mt-0.5 flex flex-shrink-0 items-center justify-center rounded-full`}
    >
      <span className={`text-${color}-600 text-sm font-semibold`}>
        {number}
      </span>
    </div>
    <span className="text-slate-700 dark:text-slate-300">{children}</span>
  </div>
);
