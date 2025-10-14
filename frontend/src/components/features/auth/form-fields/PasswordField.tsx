'use client';

import React, { useState, forwardRef } from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

interface PasswordFieldProps {
  label: string;
  placeholder: string;
  name?: string;
  autoComplete?: string;
  disabled?: boolean;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

export const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  (
    {
      label,
      placeholder,
      name,
      autoComplete = 'current-password',
      disabled = false,
      ...fieldProps
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <FormItem>
        <FormLabel className="text-muted-foreground text-sm font-medium">
          {label}
        </FormLabel>
        <FormControl>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Lock className="text-muted-foreground h-4 w-4" />
            </div>
            <Input
              ref={ref}
              name={name}
              type={showPassword ? 'text' : 'password'}
              autoComplete={autoComplete}
              className="border-input focus:ring-ring pr-9 pl-9 transition-all duration-200 focus:ring-2"
              placeholder={placeholder}
              disabled={disabled}
              {...fieldProps}
            />
            <button
              type="button"
              className="hover:text-foreground absolute inset-y-0 right-0 flex items-center pr-3 transition-colors disabled:cursor-not-allowed"
              onClick={() => setShowPassword(!showPassword)}
              disabled={disabled}
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="text-muted-foreground h-4 w-4" />
              ) : (
                <Eye className="text-muted-foreground h-4 w-4" />
              )}
            </button>
          </div>
        </FormControl>
        <FormMessage />
      </FormItem>
    );
  }
);

PasswordField.displayName = 'PasswordField';
