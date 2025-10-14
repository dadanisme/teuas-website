'use client';

import { Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { AlumniCard } from './AlumniCard';
import { AlumniFilters } from './AlumniFilters';
import { AlumniPagination } from './AlumniPagination';
import { useAlumniFilters } from './hooks/useAlumniFilters';

export function AlumniDirectory() {
  const {
    searchQuery,
    selectedYear,
    selectedLocation,
    selectedCompany,
    currentPage,
    currentAlumni,
    totalPages,
    filteredCount,
    isLoading,
    isError,
    error,
    isSearching,
    filterOptions,
    setCurrentPage,
    handleFilterChange,
    handleSearchChange,
  } = useAlumniFilters();

  return (
    <div className="container mx-auto px-4 py-8">
      <AlumniFilters
        searchQuery={searchQuery}
        selectedYear={selectedYear}
        selectedLocation={selectedLocation}
        selectedCompany={selectedCompany}
        filteredCount={filteredCount}
        currentPage={currentPage}
        totalPages={totalPages}
        filterOptions={filterOptions}
        isSearching={isSearching}
        onSearchChange={handleSearchChange}
        onFilterChange={handleFilterChange}
      />

      {/* Loading State */}
      {isLoading && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <Card key={i} className="flex h-full flex-col overflow-hidden p-0">
              <CardContent className="flex h-full flex-col p-0">
                {/* Profile Header Skeleton */}
                <div className="from-muted/50 to-muted/30 relative bg-gradient-to-r p-6 pb-16">
                  <div className="absolute bottom-0 left-6 translate-y-1/2">
                    <Skeleton className="h-20 w-20 rounded-full" />
                  </div>
                  <div className="absolute bottom-[3px] left-30 translate-y-1/2">
                    <Skeleton className="mb-2 h-5 w-32" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                </div>

                {/* Profile Content Skeleton */}
                <div className="mt-6 flex flex-grow flex-col p-6">
                  <div className="mb-4 space-y-2">
                    {/* Position and Company */}
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-4 w-4 rounded" />
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-1.5 w-1.5 rounded-full" />
                      <Skeleton className="h-4 w-20" />
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-4 w-4 rounded" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                  </div>

                  {/* Bio */}
                  <div className="mb-4 space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>

                  {/* Skills */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      <Skeleton className="h-6 w-16 rounded-full" />
                      <Skeleton className="h-6 w-20 rounded-full" />
                      <Skeleton className="h-6 w-14 rounded-full" />
                    </div>
                  </div>

                  {/* Button */}
                  <div className="mt-auto">
                    <Skeleton className="h-10 w-full rounded-md" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="py-12 text-center">
          <Users className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
          <h3 className="text-destructive mb-2 text-lg font-semibold">
            Terjadi kesalahan
          </h3>
          <p className="text-muted-foreground">
            {error instanceof Error
              ? error.message
              : 'Gagal memuat data alumni'}
          </p>
        </div>
      )}

      {/* Alumni Grid */}
      {!isLoading && !isError && (
        <>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {currentAlumni.map((alumni) => (
              <AlumniCard key={alumni.id} alumni={alumni} />
            ))}
          </div>

          {/* Empty State */}
          {currentAlumni.length === 0 && (
            <div className="py-12 text-center">
              <Users className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
              <h3 className="mb-2 text-lg font-semibold">
                Tidak ada alumni ditemukan
              </h3>
              <p className="text-muted-foreground">
                Coba ubah kriteria pencarian atau filter Anda
              </p>
            </div>
          )}

          <AlumniPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
}
