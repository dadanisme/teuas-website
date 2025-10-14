'use client';

import { Control } from 'react-hook-form';
import { CompleteProfileData } from '@/schemas/profile.schema';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface AcademicSectionProps {
  control: Control<CompleteProfileData>;
}

export function AcademicSection({ control }: AcademicSectionProps) {
  // Generate year options (from 1990 to current year)
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from(
    { length: currentYear - 1989 },
    (_, i) => currentYear - i
  );

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Informasi Akademik</h3>
        <p className="text-sm text-muted-foreground">
          Informasi tentang latar belakang akademik Anda di TEUAS UPI.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Year */}
        <FormField
          control={control}
          name="year"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tahun Lulus</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(parseInt(value))}
                value={field.value?.toString() || ''}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih tahun" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {yearOptions.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Tahun kelulusan dari TEUAS UPI
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Major */}
        <FormField
          control={control}
          name="major"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Jurusan</FormLabel>
              <Select onValueChange={field.onChange} value={field.value || ''}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih jurusan" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Teknik Elektro">Teknik Elektro</SelectItem>
                  <SelectItem value="Pendidikan Teknik Elektro">
                    Pendidikan Teknik Elektro
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Jurusan yang Anda ambil saat kuliah
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Degree */}
        <FormField
          control={control}
          name="degree"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Jenjang</FormLabel>
              <Select onValueChange={field.onChange} value={field.value || ''}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih jenjang" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="D3">D3 (Diploma 3)</SelectItem>
                  <SelectItem value="S1">S1 (Sarjana)</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Jenjang pendidikan yang Anda tempuh
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
