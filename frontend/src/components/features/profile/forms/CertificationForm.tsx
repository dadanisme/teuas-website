'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form, FormField } from '@/components/ui/form';
import { TextInputField } from './form-fields/TextInputField';
import { DatePickerField } from './form-fields/DatePickerField';
import {
  userCertificationSchema,
  type UserCertificationData,
} from '@/schemas/profile.schema';

interface CertificationFormProps {
  initialData?: UserCertificationData;
  onSave: (data: UserCertificationData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function CertificationForm({
  initialData,
  onSave,
  onCancel,
  isLoading = false,
}: CertificationFormProps) {
  const form = useForm<UserCertificationData>({
    resolver: zodResolver(userCertificationSchema),
    defaultValues: {
      name: '',
      issuer: '',
      issue_date: '',
      expiry_date: '',
      credential_id: '',
      credential_url: '',
      ...initialData,
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    }
  }, [initialData, form]);

  const handleFormSubmit = (data: UserCertificationData) => {
    const dataToSave = {
      ...data,
      issue_date: data.issue_date || undefined,
      expiry_date: data.expiry_date || undefined,
      credential_id: data.credential_id?.trim() || undefined,
      credential_url: data.credential_url?.trim() || undefined,
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
            name="name"
            render={({ field }) => (
              <TextInputField
                label="Nama Sertifikasi *"
                placeholder="cth. AWS Certified Solutions Architect"
                {...field}
              />
            )}
          />

          <FormField
            control={form.control}
            name="issuer"
            render={({ field }) => (
              <TextInputField
                label="Organisasi Penerbit *"
                placeholder="cth. Amazon Web Services"
                {...field}
              />
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="issue_date"
            render={({ field }) => (
              <DatePickerField label="Tanggal Terbit" {...field} />
            )}
          />

          <FormField
            control={form.control}
            name="expiry_date"
            render={({ field }) => (
              <DatePickerField
                label="Tanggal Kadaluarsa"
                includeFutureYears={true}
                futureYearsCount={10}
                {...field}
              />
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="credential_id"
          render={({ field }) => (
            <TextInputField
              label="ID Kredensial"
              placeholder="cth. ABC123XYZ"
              {...field}
            />
          )}
        />

        <FormField
          control={form.control}
          name="credential_url"
          render={({ field }) => (
            <div className="space-y-2">
              <TextInputField
                label="URL Kredensial"
                type="url"
                placeholder="https://..."
                {...field}
              />
              <p className="text-muted-foreground text-xs">
                Tautan untuk memverifikasi sertifikasi Anda secara online
              </p>
            </div>
          )}
        />

        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Batal
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Menyimpan...' : 'Simpan Sertifikasi'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
