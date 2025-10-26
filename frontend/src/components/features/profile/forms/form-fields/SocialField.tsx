'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';
import { getPlatformByValue } from './social-helpers';
import type { Control, FieldArrayWithId } from 'react-hook-form';
import { FormField, FormControl } from '@/components/ui/form';
import type { UserSocialData } from '@/schemas/profile.schema';

interface SocialFieldProps {
  control: Control<{ socials: UserSocialData[] }>;
  field: FieldArrayWithId<{ socials: UserSocialData[] }, 'socials', 'id'>;
  index: number;
  onRemove: () => void;
}

export function SocialField({
  control,
  field,
  index,
  onRemove,
}: SocialFieldProps) {
  const platform = getPlatformByValue(field.platform);

  return (
    <div className="flex items-center gap-3 rounded-lg border p-3">
      <div className="flex min-w-0 flex-1 items-center gap-2">
        {platform?.icon}
        <span className="font-medium">{platform?.label}</span>
      </div>

      <div className="grid flex-1 grid-cols-1 gap-3 md:grid-cols-2">
        <FormField
          control={control}
          name={`socials.${index}.url`}
          render={({ field }) => (
            <FormControl>
              <Input {...field} placeholder="URL" type="url" />
            </FormControl>
          )}
        />

        <FormField
          control={control}
          name={`socials.${index}.username`}
          render={({ field }) => (
            <FormControl>
              <Input {...field} placeholder="Username (opsional)" />
            </FormControl>
          )}
        />
      </div>

      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={onRemove}
        className="text-destructive hover:text-destructive"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}
