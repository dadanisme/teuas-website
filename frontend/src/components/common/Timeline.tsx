import { ReactNode } from 'react';
import { Badge } from '@/components/ui/badge';
import { LucideIcon } from 'lucide-react';

export interface TimelineItem {
  id: string;
  icon?: LucideIcon;
  title: string;
  subtitle: string;
  badge?: {
    label: string;
    variant?: 'default' | 'secondary' | 'outline' | 'destructive';
  };
  dateRange?: string;
  metadata?: Array<{
    icon?: LucideIcon;
    label: string;
  }>;
  description?: string;
}

interface TimelineProps {
  items: TimelineItem[];
  renderActions?: (item: TimelineItem) => ReactNode;
  emptyState?: {
    icon: LucideIcon;
    message: string;
    action?: ReactNode;
  };
}

export function Timeline({ items, renderActions, emptyState }: TimelineProps) {
  if (items.length === 0 && emptyState) {
    const EmptyIcon = emptyState.icon;
    return (
      <div className="py-8 text-center">
        <EmptyIcon className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
        <p className="text-muted-foreground mb-4">{emptyState.message}</p>
        {emptyState.action}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="border-primary/20 relative border-l-2 pl-4"
        >
          <div className="bg-primary absolute top-2 -left-2 h-4 w-4 rounded-full"></div>

          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="mb-1 flex items-center gap-2">
                {item.icon && (
                  <item.icon className="text-muted-foreground h-4 w-4" />
                )}
                <h3 className="text-foreground font-semibold">{item.title}</h3>
                {item.badge && (
                  <Badge
                    variant={item.badge.variant || 'default'}
                    className="text-xs"
                  >
                    {item.badge.label}
                  </Badge>
                )}
              </div>

              <p className="text-primary mb-2 font-medium">{item.subtitle}</p>

              {(item.dateRange ||
                (item.metadata && item.metadata.length > 0)) && (
                <div className="text-muted-foreground mb-2 flex flex-wrap gap-4 text-sm">
                  {item.dateRange && (
                    <div className="flex items-center gap-1">
                      <span>{item.dateRange}</span>
                    </div>
                  )}
                  {item.metadata?.map((meta, index) => (
                    <div key={index} className="flex items-center gap-1">
                      {meta.icon && <meta.icon className="h-3 w-3" />}
                      <span>{meta.label}</span>
                    </div>
                  ))}
                </div>
              )}

              {item.description && (
                <p className="text-foreground text-sm leading-relaxed">
                  {item.description}
                </p>
              )}
            </div>

            {renderActions && (
              <div className="ml-4 flex gap-1">{renderActions(item)}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
