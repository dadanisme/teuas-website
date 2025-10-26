'use client';

import { FormField } from '@/components/ui/form';
import { TextInputField } from './TextInputField';
import { TextAreaField } from './TextAreaField';
import { SelectField } from './SelectField';
import type { Control } from 'react-hook-form';
import type { BasicProfileData } from '@/schemas/profile.schema';

interface BasicProfileFieldsProps {
  control: Control<BasicProfileData>;
}

export function BasicProfileFields({ control }: BasicProfileFieldsProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormField
          control={control}
          name="full_name"
          render={({ field }) => (
            <TextInputField
              label="Nama Lengkap *"
              placeholder="Masukkan nama lengkap Anda"
              {...field}
            />
          )}
        />

        <FormField
          control={control}
          name="nim"
          render={({ field }) => (
            <TextInputField
              label="NIM *"
              placeholder="Masukkan NIM Anda"
              {...field}
            />
          )}
        />
      </div>

      <FormField
        control={control}
        name="bio"
        render={({ field }) => (
          <TextAreaField
            label="Bio"
            placeholder="Ceritakan tentang diri Anda..."
            rows={4}
            {...field}
          />
        )}
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormField
          control={control}
          name="location"
          render={({ field }) => (
            <TextInputField
              label="Lokasi"
              placeholder="Kota, Negara"
              {...field}
            />
          )}
        />

        <FormField
          control={control}
          name="phone"
          render={({ field }) => (
            <TextInputField
              label="Telepon"
              placeholder="+62 xxx xxx xxxx"
              {...field}
            />
          )}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <FormField
          control={control}
          name="year"
          render={({ field }) => (
            <TextInputField
              label="Tahun Masuk"
              type="number"
              placeholder="2024"
              {...field}
              value={field.value?.toString() || ''}
              onChange={(e) =>
                field.onChange(
                  e.target.value ? parseInt(e.target.value) : undefined
                )
              }
            />
          )}
        />

        <FormField
          control={control}
          name="degree"
          render={({ field }) => (
            <SelectField
              label="Gelar"
              placeholder="Pilih gelar"
              options={[
                { value: 'S1', label: 'S1' },
                { value: 'D3', label: 'D3' },
              ]}
              {...field}
            />
          )}
        />

        <FormField
          control={control}
          name="major"
          render={({ field }) => (
            <SelectField
              label="Jurusan"
              placeholder="Pilih jurusan"
              options={[
                { value: 'Teknik Elektro', label: 'Teknik Elektro' },
                {
                  value: 'Pendidikan Teknik Elektro',
                  label: 'Pendidikan Teknik Elektro',
                },
              ]}
              {...field}
            />
          )}
        />
      </div>
    </div>
  );
}
