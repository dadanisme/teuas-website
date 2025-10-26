'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { X } from 'lucide-react';
import { SKILL_LEVELS, COMMON_CATEGORIES } from './skill-helpers';
import type { Control, FieldArrayWithId } from 'react-hook-form';
import { FormField, FormControl } from '@/components/ui/form';
import type { UserSkillData } from '@/schemas/profile.schema';

interface SkillFieldProps {
  control: Control<{ skills: UserSkillData[] }>;
  field: FieldArrayWithId<{ skills: UserSkillData[] }, 'skills', 'id'>;
  index: number;
  onRemove: () => void;
}

export function SkillField({ control, index, onRemove }: SkillFieldProps) {
  return (
    <div className="flex items-center gap-3 rounded-lg border p-3">
      <div className="grid flex-1 grid-cols-1 gap-3 md:grid-cols-3">
        <FormField
          control={control}
          name={`skills.${index}.name`}
          render={({ field }) => (
            <FormControl>
              <Input {...field} placeholder="Nama keterampilan" />
            </FormControl>
          )}
        />

        <FormField
          control={control}
          name={`skills.${index}.category`}
          render={({ field }) => (
            <FormControl>
              <Select value={field.value || ''} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Kategori" />
                </SelectTrigger>
                <SelectContent>
                  {COMMON_CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
          )}
        />

        <FormField
          control={control}
          name={`skills.${index}.level`}
          render={({ field }) => (
            <FormControl>
              <Select
                value={field.value || 'Menengah'}
                onValueChange={field.onChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SKILL_LEVELS.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
