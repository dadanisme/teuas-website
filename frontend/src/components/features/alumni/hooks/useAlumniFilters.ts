import { useState, useMemo } from 'react';
import { MOCK_ALUMNI } from '@/constants/alumni';
import type { AlumniProfile } from '@/types/alumni';

const ITEMS_PER_PAGE = 8;

export function useAlumniFilters() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('Semua Tahun');
  const [selectedLocation, setSelectedLocation] = useState('Semua Lokasi');
  const [selectedCompany, setSelectedCompany] = useState('Semua Perusahaan');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredAlumni = useMemo(() => {
    return MOCK_ALUMNI.filter((alumni: AlumniProfile) => {
      const matchesSearch =
        alumni.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (alumni.position &&
          alumni.position.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (alumni.currentCompany &&
          alumni.currentCompany
            .toLowerCase()
            .includes(searchQuery.toLowerCase()));

      const matchesYear =
        selectedYear === 'Semua Tahun' ||
        alumni.graduationYear?.toString() === selectedYear;
      const matchesLocation =
        selectedLocation === 'Semua Lokasi' ||
        alumni.workExperience.some((exp) =>
          exp.location?.includes(selectedLocation)
        );
      const matchesCompany =
        selectedCompany === 'Semua Perusahaan' ||
        (alumni.currentCompany &&
          alumni.currentCompany.includes(selectedCompany));

      return matchesSearch && matchesYear && matchesLocation && matchesCompany;
    });
  }, [searchQuery, selectedYear, selectedLocation, selectedCompany]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredAlumni.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentAlumni = filteredAlumni.slice(startIndex, endIndex);

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
    setCurrentPage(1);
  };

  return {
    // State
    searchQuery,
    selectedYear,
    selectedLocation,
    selectedCompany,
    currentPage,

    // Computed values
    filteredAlumni,
    currentAlumni,
    totalPages,

    // Actions
    setCurrentPage,
    handleFilterChange,
    handleSearchChange,
  };
}
