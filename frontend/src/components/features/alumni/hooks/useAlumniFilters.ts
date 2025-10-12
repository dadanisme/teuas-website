import { useState, useMemo, useEffect } from 'react';
import { debounce } from 'lodash';
import {
  useAlumniList,
  useAlumniFilterOptions,
} from '@/hooks/queries/useAlumni';
import type { AlumniFilters } from '@/types/alumni-query';

const ITEMS_PER_PAGE = 12;

export function useAlumniFilters() {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [selectedYear, setSelectedYear] = useState('Semua Tahun');
  const [selectedLocation, setSelectedLocation] = useState('Semua Lokasi');
  const [selectedCompany, setSelectedCompany] = useState('Semua Perusahaan');
  const [currentPage, setCurrentPage] = useState(1);

  // Debounced search function using lodash
  const debouncedSearch = useMemo(
    () =>
      debounce((query: string) => {
        setDebouncedSearchQuery(query);
        setCurrentPage(1); // Reset to first page when search changes
        setIsSearching(false);
      }, 300),
    []
  );

  // Cleanup debounced function on unmount
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  // Build filters for the API
  const filters: AlumniFilters = useMemo(() => {
    const apiFilters: AlumniFilters = {
      page: currentPage,
      limit: ITEMS_PER_PAGE,
    };

    if (debouncedSearchQuery.trim()) {
      apiFilters.search = debouncedSearchQuery.trim();
    }

    if (selectedYear !== 'Semua Tahun') {
      apiFilters.year = parseInt(selectedYear);
    }

    if (selectedLocation !== 'Semua Lokasi') {
      apiFilters.location = selectedLocation;
    }

    if (selectedCompany !== 'Semua Perusahaan') {
      apiFilters.company = selectedCompany;
    }

    return apiFilters;
  }, [
    debouncedSearchQuery,
    selectedYear,
    selectedLocation,
    selectedCompany,
    currentPage,
  ]);

  // Fetch alumni data using React Query
  const {
    data: alumniResponse,
    isLoading,
    isError,
    error,
  } = useAlumniList(filters);

  // Get filter options
  const filterOptions = useAlumniFilterOptions();

  // Extract data from response
  const currentAlumni = alumniResponse?.data || [];
  const pagination = alumniResponse?.pagination || null;
  const totalPages = pagination?.totalPages || 0;
  const filteredCount = pagination?.total || 0;

  // Reset to first page when filters change
  const handleFilterChange = (filterType: string, value: string) => {
    setCurrentPage(1);
    switch (filterType) {
      case 'year':
        setSelectedYear(value);
        break;
      case 'location':
        setSelectedLocation(value);
        break;
      case 'company':
        setSelectedCompany(value);
        break;
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);

    // Set searching state if query is different from current debounced query
    if (value !== debouncedSearchQuery) {
      setIsSearching(true);
    }

    debouncedSearch(value);
  };

  return {
    // State
    searchQuery,
    selectedYear,
    selectedLocation,
    selectedCompany,
    currentPage,

    // Computed values
    currentAlumni,
    totalPages,
    filteredCount,

    // Loading and error states
    isLoading: isLoading || isSearching,
    isError,
    error,
    isSearching,

    // Filter options
    filterOptions,

    // Actions
    setCurrentPage,
    handleFilterChange,
    handleSearchChange,
  };
}
