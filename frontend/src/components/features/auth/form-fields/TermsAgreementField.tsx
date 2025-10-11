'use client';

import React from 'react';
import Link from 'next/link';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { ROUTES } from '@/constants';

interface TermsAgreementFieldProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export function TermsAgreementField({
  checked,
  onChange,
  disabled = false,
}: TermsAgreementFieldProps) {
  return (
    <Label
      htmlFor="agree-terms"
      className="text-muted-foreground cursor-pointer text-sm leading-relaxed font-normal"
    >
      <input
        id="agree-terms"
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        className={cn(
          'bg-background border-input text-primary mr-2 h-4 w-4 rounded',
          'focus:ring-ring focus:ring-2 focus:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50'
        )}
      />
      <span>
        <span>Saya setuju dengan </span>
        <Link
          href={ROUTES.TERMS}
          className="text-accent-foreground hover:text-accent-foreground/80 font-medium transition-colors"
        >
          Syarat dan Ketentuan
        </Link>
        <span> dan </span>
        <Link
          href={ROUTES.PRIVACY}
          className="text-accent-foreground hover:text-accent-foreground/80 font-medium transition-colors"
        >
          Kebijakan Privasi
        </Link>
      </span>
    </Label>
  );
}
