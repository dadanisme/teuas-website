import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

export interface SectionItem {
  id: string;
  title: string;
  icon: LucideIcon;
}

export interface BreadcrumbItem {
  label: string;
  href: string;
}

export interface SectionHeaderProps {
  icon: LucideIcon;
  title: string;
  color: string;
}

export interface InfoCardProps {
  children: ReactNode;
  color?: string;
  className?: string;
}

export interface ChecklistItemProps {
  children: ReactNode;
  color?: string;
}

export interface NumberedItemProps {
  children: ReactNode;
  number: number;
  color?: string;
}

export interface ContactItemProps {
  icon: LucideIcon;
  label: string;
  value: string;
  color?: string;
}

export interface TableOfContentsProps {
  sections: SectionItem[];
}

export interface LegalPageHeaderProps {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  gradientColors: string;
}
