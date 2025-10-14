'use client';

import React, { forwardRef } from 'react';
import { Mail } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

interface EmailFieldProps {
  label: string;
  placeholder: string;
  disabled?: boolean;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  name?: string;
}

export const EmailField = forwardRef<HTMLInputElement, EmailFieldProps>(
  ({ label, placeholder, disabled = false, ...fieldProps }, ref) => {
    return (
      <FormItem>
        <FormLabel className="text-muted-foreground text-sm font-medium">
          {label}
        </FormLabel>
        <FormControl>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Mail className="text-muted-foreground h-4 w-4" />
            </div>
            <Input
              ref={ref}
              type="email"
              autoComplete="email"
              className="border-input focus:ring-ring pl-9 transition-all duration-200 focus:ring-2"
              placeholder={placeholder}
              disabled={disabled}
              {...fieldProps}
            />
          </div>
        </FormControl>
        <FormMessage />
      </FormItem>
    );
  }
);

EmailField.displayName = 'EmailField';
