'use client';

import React from 'react';
import { DatePicker } from '../DatePicker';
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

interface DatePickerFieldProps {
  label: string;
  disabled?: boolean;
  value?: string;
  onChange?: (date: string) => void;
  onBlur?: () => void;
  name?: string;
  includeFutureYears?: boolean;
  futureYearsCount?: number;
}

export function DatePickerField({
  label,
  disabled = false,
  value,
  onChange,
  onBlur,
  name,
  includeFutureYears = false,
  futureYearsCount = 10,
}: DatePickerFieldProps) {
  return (
    <FormItem>
      <FormLabel className="text-sm font-medium">{label}</FormLabel>
      <FormControl>
        <DatePicker
          value={value}
          onChange={(date) => onChange?.(date)}
          onBlur={onBlur}
          name={name}
          disabled={disabled}
          includeFutureYears={includeFutureYears}
          futureYearsCount={futureYearsCount}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}
