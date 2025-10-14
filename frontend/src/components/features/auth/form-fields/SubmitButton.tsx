'use client';

import React from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SubmitButtonProps {
  isLoading: boolean;
  loadingText: string;
  submitText: string;
  disabled?: boolean;
}

export function SubmitButton({
  isLoading,
  loadingText,
  submitText,
  disabled = false,
}: SubmitButtonProps) {
  return (
    <Button
      type="submit"
      disabled={isLoading || disabled}
      className="bg-primary text-primary-foreground hover:bg-primary/90 w-full transition-all duration-200 hover:shadow-lg"
      size="lg"
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {loadingText}
        </>
      ) : (
        <>
          {submitText}
          <ArrowRight className="ml-2 h-4 w-4" />
        </>
      )}
    </Button>
  );
}
