import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Filter, Users } from 'lucide-react';
import { GRADUATION_YEARS, LOCATIONS, COMPANIES } from '@/constants/alumni';

interface AlumniFiltersProps {
  searchQuery: string;
  selectedYear: string;
  selectedLocation: string;
  selectedCompany: string;
  filteredCount: number;
  currentPage: number;
  totalPages: number;
  onSearchChange: (value: string) => void;
  onFilterChange: (filterType: string, value: string) => void;
}

export function AlumniFilters({
  searchQuery,
  selectedYear,
  selectedLocation,
  selectedCompany,
  filteredCount,
  currentPage,
  totalPages,
  onSearchChange,
  onFilterChange,
}: AlumniFiltersProps) {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="mb-8 space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
        <Input
          placeholder="Cari alumni berdasarkan nama, posisi, atau perusahaan..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Filter Toggle */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="gap-2"
        >
          <Filter className="h-4 w-4" />
          Filter
        </Button>
        <div className="text-muted-foreground flex items-center gap-2 text-sm">
          <Users className="h-4 w-4" />
          {filteredCount} alumni ditemukan
          {totalPages > 1 && (
            <span className="ml-2">
              (Halaman {currentPage} dari {totalPages})
            </span>
          )}
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-muted/30 grid grid-cols-1 gap-4 rounded-lg border p-4 md:grid-cols-3">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Tahun Lulus
            </label>
            <Select
              value={selectedYear}
              onValueChange={(value) => onFilterChange('year', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {GRADUATION_YEARS.map((year) => (
                  <SelectItem key={year} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">Lokasi</label>
            <Select
              value={selectedLocation}
              onValueChange={(value) => onFilterChange('location', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {LOCATIONS.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">Perusahaan</label>
            <Select
              value={selectedCompany}
              onValueChange={(value) => onFilterChange('company', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {COMPANIES.map((company) => (
                  <SelectItem key={company} value={company}>
                    {company}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
    </div>
  );
}
