'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

interface TextInputFieldProps {
  label: string;
  placeholder: string;
  icon: LucideIcon;
  type?: string;
  autoComplete?: string;
  disabled?: boolean;
}

export function TextInputField({
  label,
  placeholder,
  icon: Icon,
  type = 'text',
  autoComplete,
  disabled = false,
}: TextInputFieldProps) {
  return (
    <FormItem>
      <FormLabel className="text-muted-foreground text-sm font-medium">
        {label}
      </FormLabel>
      <FormControl>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Icon className="text-muted-foreground h-4 w-4" />
          </div>
          <Input
            type={type}
            autoComplete={autoComplete}
            className="border-input focus:ring-ring pl-9 transition-all duration-200 focus:ring-2"
            placeholder={placeholder}
            disabled={disabled}
          />
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}
