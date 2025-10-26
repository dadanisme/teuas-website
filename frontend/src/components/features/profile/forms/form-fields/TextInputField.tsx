'use client';

import React, { forwardRef } from 'react';
import { Input } from '@/components/ui/input';
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

interface TextInputFieldProps {
  label: string;
  placeholder?: string;
  disabled?: boolean;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  name?: string;
  type?: string;
}

export const TextInputField = forwardRef<HTMLInputElement, TextInputFieldProps>(
  (
    { label, placeholder, disabled = false, type = 'text', ...fieldProps },
    ref
  ) => {
    return (
      <FormItem>
        <FormLabel className="text-sm font-medium">{label}</FormLabel>
        <FormControl>
          <Input
            ref={ref}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            {...fieldProps}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    );
  }
);

TextInputField.displayName = 'TextInputField';
