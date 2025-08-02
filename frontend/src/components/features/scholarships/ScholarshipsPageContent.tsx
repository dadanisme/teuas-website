'use client';

import { useState, useMemo } from 'react';
import { EventsFilterSidebar } from '@/components/features/events/EventsFilterSidebar';
import { EventCategory, EventFilter } from '@/types/content';
import { Scholarship } from '@/types/content';
import { ScholarshipsGrid } from '@/components/features/scholarships/ScholarshipsGrid';
interface ScholarshipsPageContentProps {
  events: Scholarship[];
  categories: EventCategory[];
}

export function ScholarshipsPageContent({
  events,
  categories,
}: ScholarshipsPageContentProps) {
  const [selectedFilters, setSelectedFilters] = useState<Partial<EventFilter>>(
    {}
  );

  // Filter events based on selected filters
  const filteredEvents = useMemo(() => {
    let filtered = events.slice(0); // To exclude featured event

    //  Apply status filter
    if (selectedFilters.status) {
      filtered = filtered.filter(
        (event) => event.status === selectedFilters.status
      );
    }

    // Apply search filter
    if (selectedFilters.search) {
      const searchTerm = selectedFilters.search.toLowerCase();
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(searchTerm) ||
          event.description.toLowerCase().includes(searchTerm)
      );
    }

    // Apply category filter
    if (selectedFilters.category) {
      filtered = filtered.filter(
        (event) => event.category.slug === selectedFilters.category
      );
    }

    // Apply date range filter
    if (selectedFilters.dateFrom && selectedFilters.dateFrom.trim() !== '') {
      const fromDate = new Date(selectedFilters.dateFrom as string);
      if (!isNaN(fromDate.getTime())) {
        filtered = filtered.filter(
          (event) => new Date(event.eventDate) >= fromDate
        );
      }
    }

    if (selectedFilters.dateTo && selectedFilters.dateTo.trim() !== '') {
      const toDate = new Date(selectedFilters.dateTo as string);
      if (!isNaN(toDate.getTime())) {
        filtered = filtered.filter(
          (event) => new Date(event.eventDate) <= toDate
        );
      }
    }

    return filtered;
  }, [events, selectedFilters]);

  const handleFilterChange = (filters: Partial<EventFilter>) => {
    setSelectedFilters(filters);
  };

  return (
    <>
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Filter Sidebar */}
          <div className="lg:col-span-1">
            <EventsFilterSidebar
              categories={categories}
              selectedFilters={selectedFilters}
              onFilterChange={handleFilterChange}
            />
          </div>

          {/* Events Grid */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <h2 className="text-foreground mb-2 text-2xl font-bold">
                Beasiswa Untukmu
              </h2>
              <p className="text-muted-foreground">
                Temukan beasiswa yang sesuai dengan kriteria Anda
              </p>
              {Object.keys(selectedFilters).length > 0 && (
                <p className="text-muted-foreground mt-2 text-sm">
                  Menampilkan {filteredEvents.length} dari {events.length}{' '}
                  beasiswa
                </p>
              )}
            </div>

            <ScholarshipsGrid events={filteredEvents} />
          </div>
        </div>
      </div>
    </>
  );
}
