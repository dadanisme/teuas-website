'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form, FormField } from '@/components/ui/form';
import { TextInputField } from './form-fields/TextInputField';
import { TextAreaField } from './form-fields/TextAreaField';
import { DatePickerField } from './form-fields/DatePickerField';
import { CheckboxField } from './form-fields/CheckboxField';
import {
  userExperienceSchema,
  type UserExperienceData,
} from '@/schemas/profile.schema';

interface ExperienceFormProps {
  initialData?: UserExperienceData;
  onSave: (data: UserExperienceData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function ExperienceForm({
  initialData,
  onSave,
  onCancel,
  isLoading = false,
}: ExperienceFormProps) {
  const form = useForm<UserExperienceData>({
    resolver: zodResolver(userExperienceSchema),
    defaultValues: {
      company: '',
      position: '',
      start_date: '',
      end_date: '',
      is_current: false,
      description: '',
      location: '',
      ...initialData,
    },
  });

  const isCurrent = form.watch('is_current');

  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    }
  }, [initialData, form]);

  useEffect(() => {
    if (isCurrent) {
      form.setValue('end_date', '');
    }
  }, [isCurrent, form]);

  const handleFormSubmit = (data: UserExperienceData) => {
    const dataToSave = {
      ...data,
      end_date: data.is_current ? undefined : data.end_date,
    };
    onSave(dataToSave);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="space-y-4 py-4"
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <TextInputField
                label="Posisi *"
                placeholder="cth. Software Engineer"
                {...field}
              />
            )}
          />

          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <TextInputField
                label="Perusahaan *"
                placeholder="cth. Google"
                {...field}
              />
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <TextInputField
              label="Lokasi"
              placeholder="cth. Jakarta, Indonesia"
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
              <DatePickerField
                label="Tanggal Selesai"
                disabled={isCurrent}
                {...field}
              />
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="is_current"
          render={({ field }) => (
            <CheckboxField
              id="is_current"
              label="Saya saat ini bekerja di sini"
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <TextAreaField
              label="Deskripsi"
              placeholder="Deskripsikan peran dan pencapaian Anda..."
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
            {isLoading ? 'Menyimpan...' : 'Simpan Pengalaman'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
