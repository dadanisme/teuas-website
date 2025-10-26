'use client';

import React, { forwardRef } from 'react';
import { Textarea } from '@/components/ui/textarea';
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

interface TextAreaFieldProps {
  label: string;
  placeholder?: string;
  disabled?: boolean;
  rows?: number;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  name?: string;
}

export const TextAreaField = forwardRef<
  HTMLTextAreaElement,
  TextAreaFieldProps
>(({ label, placeholder, disabled = false, rows = 4, ...fieldProps }, ref) => {
  return (
    <FormItem>
      <FormLabel className="text-sm font-medium">{label}</FormLabel>
      <FormControl>
        <Textarea
          ref={ref}
          placeholder={placeholder}
          disabled={disabled}
          rows={rows}
          {...fieldProps}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
});

TextAreaField.displayName = 'TextAreaField';
