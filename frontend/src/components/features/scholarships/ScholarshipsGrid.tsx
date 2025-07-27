import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from 'lucide-react';
import { Scholarship } from '@/types/content';
import { ScholarshipsCard } from './ScholarshipsCard';
interface EventsGridProps {
    events: Scholarship[];
    isLoading?: boolean;
}

export function ScholarshipsGrid({ events, isLoading = false }: EventsGridProps) {
    if (isLoading) {
        return (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
                {Array.from({ length: 4 }).map((_, index) => (
                    <Card key={index} className="overflow-hidden">
                        <div className="bg-muted h-48 animate-pulse" />
                        <CardContent className="p-4">
                            <div className="bg-muted mb-2 h-4 animate-pulse rounded" />
                            <div className="bg-muted mb-3 h-6 animate-pulse rounded" />
                            <div className="space-y-2">
                                <div className="bg-muted h-3 animate-pulse rounded" />
                                <div className="bg-muted h-3 w-3/4 animate-pulse rounded" />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        );
    }

    if (events.length === 0) {
        return (
            <div className="py-12 text-center">
                <div className="text-muted-foreground mb-4">
                    <Calendar className="mx-auto mb-4 h-12 w-12 opacity-50" />
                    <h3 className="mb-2 text-lg font-medium">Belum ada beasiswa</h3>
                    <p>Belum ada beasiswa yang tersedia saat ini.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {events.map((event) => (
                <ScholarshipsCard key={event.id} event={event} />
            ))}
        </div>
    );
}
