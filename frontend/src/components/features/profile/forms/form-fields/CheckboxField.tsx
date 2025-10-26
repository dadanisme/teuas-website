'use client';

import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { FormControl, FormItem, FormLabel } from '@/components/ui/form';

interface CheckboxFieldProps {
  label: string;
  disabled?: boolean;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  id?: string;
}

export function CheckboxField({
  label,
  disabled = false,
  checked,
  onCheckedChange,
  id,
}: CheckboxFieldProps) {
  return (
    <FormItem>
      <div className="flex items-center space-x-2">
        <FormControl>
          <Checkbox
            id={id}
            checked={checked}
            onCheckedChange={onCheckedChange}
            disabled={disabled}
          />
        </FormControl>
        <FormLabel htmlFor={id} className="text-sm font-normal">
          {label}
        </FormLabel>
      </div>
    </FormItem>
  );
}
