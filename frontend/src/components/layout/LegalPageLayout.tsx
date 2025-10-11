import { ReactNode } from 'react';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Link from 'next/link';
import { TableOfContents } from '@/components/ui/legal/TableOfContents';
import { LegalPageHeader } from '@/components/ui/legal/LegalPageHeader';
import {
  BreadcrumbItem as BreadcrumbItemType,
  SectionItem,
  LegalPageHeaderProps,
} from '@/constants/legal';

interface LegalPageLayoutProps {
  breadcrumbItems: BreadcrumbItemType[];
  sections: SectionItem[];
  headerProps: LegalPageHeaderProps;
  backgroundGradient: string;
  hoverColor: string;
  children: ReactNode;
}

export const LegalPageLayout = ({
  breadcrumbItems,
  sections,
  headerProps,
  backgroundGradient,
  hoverColor,
  children,
}: LegalPageLayoutProps) => (
  <div className={`${backgroundGradient} min-h-screen`}>
    <div className="border-b border-slate-200/50 bg-white/70 backdrop-blur-sm dark:border-slate-700/50 dark:bg-slate-900/70">
      <div className="container mx-auto px-4 py-4">
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbItems.map((item, index) => (
              <div key={index} className="flex items-center">
                <BreadcrumbItem>
                  {index < breadcrumbItems.length - 1 ? (
                    <BreadcrumbLink asChild>
                      <Link
                        href={item.href}
                        className={`hover:${hoverColor} transition-colors`}
                      >
                        {item.label}
                      </Link>
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage className={`${hoverColor} font-medium`}>
                      {item.label}
                    </BreadcrumbPage>
                  )}
                </BreadcrumbItem>
                {index < breadcrumbItems.length - 1 && <BreadcrumbSeparator />}
              </div>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>

    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="grid gap-8 lg:grid-cols-4">
        {/* Table of Contents */}
        <div className="lg:col-span-1">
          <TableOfContents sections={sections} />
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="overflow-hidden rounded-2xl border border-slate-200/50 bg-white/80 shadow-xl backdrop-blur-sm dark:border-slate-700/50 dark:bg-slate-800/80">
            <LegalPageHeader {...headerProps} />
            <div className="space-y-12 p-8 lg:p-12">{children}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
