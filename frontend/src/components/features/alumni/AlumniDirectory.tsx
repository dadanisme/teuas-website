'use client';

import { Users } from 'lucide-react';
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
        <div className="py-12 text-center">
          <div className="border-primary mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"></div>
          <p className="text-muted-foreground">Memuat data alumni...</p>
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
