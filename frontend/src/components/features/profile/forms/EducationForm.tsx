'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form, FormField } from '@/components/ui/form';
import { TextInputField } from './form-fields/TextInputField';
import { TextAreaField } from './form-fields/TextAreaField';
import { DatePickerField } from './form-fields/DatePickerField';
import {
  userEducationSchema,
  type UserEducationData,
} from '@/schemas/profile.schema';

interface EducationFormProps {
  initialData?: UserEducationData;
  onSave: (data: UserEducationData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function EducationForm({
  initialData,
  onSave,
  onCancel,
  isLoading = false,
}: EducationFormProps) {
  const form = useForm<UserEducationData>({
    resolver: zodResolver(userEducationSchema),
    defaultValues: {
      institution: '',
      degree: '',
      field_of_study: '',
      start_date: '',
      end_date: '',
      grade: '',
      description: '',
      ...initialData,
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    }
  }, [initialData, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSave)} className="space-y-4 py-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="institution"
            render={({ field }) => (
              <TextInputField
                label="Institusi *"
                placeholder="contoh: Universitas Pendidikan Indonesia"
                {...field}
              />
            )}
          />

          <FormField
            control={form.control}
            name="degree"
            render={({ field }) => (
              <TextInputField
                label="Gelar *"
                placeholder="contoh: Sarjana Teknik"
                {...field}
              />
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="field_of_study"
          render={({ field }) => (
            <TextInputField
              label="Bidang Studi"
              placeholder="contoh: Teknik Elektro"
              {...field}
            />
          )}
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="start_date"
            render={({ field }) => (
              <DatePickerField label="Tanggal Mulai *" {...field} />
            )}
          />

          <FormField
            control={form.control}
            name="end_date"
            render={({ field }) => (
              <DatePickerField label="Tanggal Selesai *" {...field} />
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="grade"
          render={({ field }) => (
            <TextInputField
              label="Nilai/IPK"
              placeholder="contoh: 3.8/4.0 atau Cum Laude"
              {...field}
            />
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <TextAreaField
              label="Deskripsi"
              placeholder="Deskripsikan studi, pencapaian, aktivitas Anda..."
              rows={4}
              {...field}
            />
          )}
        />

        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Batal
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Menyimpan...' : 'Simpan Pendidikan'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
