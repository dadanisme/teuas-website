'use client';

import { useState, useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface DatePickerProps {
  value?: string;
  onChange: (date: string) => void;
  onBlur?: () => void;
  name?: string;
  disabled?: boolean;
  className?: string;
  includeFutureYears?: boolean;
  futureYearsCount?: number;
}

export function DatePicker({
  value,
  onChange,
  onBlur,
  name: _name,
  disabled = false,
  className,
  includeFutureYears = false,
  futureYearsCount = 10,
}: DatePickerProps) {
  const [selectedYear, setSelectedYear] = useState<number | undefined>(() => {
    if (value) {
      const date = new Date(value);
      return date.getFullYear();
    }
    return undefined;
  });

  const [selectedMonth, setSelectedMonth] = useState<number | undefined>(() => {
    if (value) {
      const date = new Date(value);
      return date.getMonth();
    }
    return undefined;
  });

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const currentYear = new Date().getFullYear();
  const startYear = 1990;
  const endYear = includeFutureYears
    ? currentYear + futureYearsCount
    : currentYear;
  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, i) => endYear - i
  );

  // Update state when value prop changes
  useEffect(() => {
    if (value) {
      const date = new Date(value);
      setSelectedYear(date.getFullYear());
      setSelectedMonth(date.getMonth());
    } else {
      setSelectedYear(undefined);
      setSelectedMonth(undefined);
    }
  }, [value]);

  return (
    <div className={`grid grid-cols-2 gap-2 ${className}`}>
      {/* Month Select */}
      <Select
        value={
          selectedMonth !== undefined ? selectedMonth.toString() : undefined
        }
        onValueChange={(value) => {
          const monthValue = parseInt(value);
          setSelectedMonth(monthValue);
          // Auto-update the date when month changes (only if year is also selected)
          if (selectedYear !== undefined) {
            const dateString = `${selectedYear}-${String(monthValue + 1).padStart(2, '0')}-01`;
            onChange(dateString);
          }
          onBlur?.();
        }}
        disabled={disabled}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Month" />
        </SelectTrigger>
        <SelectContent>
          {months.map((month, index) => (
            <SelectItem key={index} value={index.toString()}>
              {month}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Year Select */}
      <Select
        value={selectedYear !== undefined ? selectedYear.toString() : undefined}
        onValueChange={(value) => {
          const yearValue = parseInt(value);
          setSelectedYear(yearValue);
          // Auto-update the date when year changes (only if month is also selected)
          if (selectedMonth !== undefined) {
            const dateString = `${yearValue}-${String(selectedMonth + 1).padStart(2, '0')}-01`;
            onChange(dateString);
          }
          onBlur?.();
        }}
        disabled={disabled}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Year" />
        </SelectTrigger>
        <SelectContent>
          {years.map((year) => (
            <SelectItem key={year} value={year.toString()}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
