import { FileText } from 'lucide-react';
import { TableOfContentsProps } from '@/constants/legal';

export const TableOfContents = ({ sections }: TableOfContentsProps) => (
  <div className="sticky top-8">
    <div className="rounded-2xl border border-slate-200/50 bg-white/80 p-6 shadow-lg backdrop-blur-sm dark:border-slate-700/50 dark:bg-slate-800/80">
      <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-800 dark:text-slate-200">
        <FileText className="h-5 w-5 text-blue-600" />
        Daftar Isi
      </h3>
      <nav className="space-y-2">
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="group flex items-center gap-3 rounded-lg p-2 text-sm text-slate-600 transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 dark:text-slate-400 dark:hover:bg-blue-900/20"
          >
            <section.icon className="h-4 w-4 transition-colors group-hover:text-blue-600" />
            {section.title}
          </a>
        ))}
      </nav>
    </div>
  </div>
);
