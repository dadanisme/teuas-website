'use client';

import React from 'react';
import { User, Hash } from 'lucide-react';
import { Control } from 'react-hook-form';
import { FormField } from '@/components/ui/form';
import { EmailField } from './form-fields/EmailField';
import { PasswordField } from './form-fields/PasswordField';
import { TextInputField } from './form-fields/TextInputField';
import { TermsAgreementField } from './form-fields/TermsAgreementField';
import type { SignUpWithConfirmData } from '@/schemas/auth.schema';

interface RegisterFormFieldsProps {
  control: Control<SignUpWithConfirmData>;
  isLoading: boolean;
}

export function RegisterFormFields({
  control,
  isLoading,
}: RegisterFormFieldsProps) {
  return (
    <>
      <FormField
        control={control}
        name="fullName"
        render={({ field }) => (
          <TextInputField
            label="Nama Lengkap"
            placeholder="Masukkan nama lengkap Anda"
            icon={User}
            autoComplete="name"
            disabled={isLoading}
            {...field}
          />
        )}
      />

      <FormField
        control={control}
        name="nim"
        render={({ field }) => (
          <TextInputField
            label="NIM (Nomor Induk Mahasiswa)"
            placeholder="Masukkan NIM Anda"
            icon={Hash}
            autoComplete="off"
            disabled={isLoading}
            {...field}
          />
        )}
      />

      <FormField
        control={control}
        name="email"
        render={({ field }) => (
          <EmailField
            label="Alamat Email"
            placeholder="Masukkan alamat email Anda"
            disabled={isLoading}
            {...field}
          />
        )}
      />

      <FormField
        control={control}
        name="password"
        render={({ field }) => (
          <PasswordField
            label="Kata Sandi"
            placeholder="Buat kata sandi"
            autoComplete="new-password"
            disabled={isLoading}
            {...field}
          />
        )}
      />

      <FormField
        control={control}
        name="confirmPassword"
        render={({ field }) => (
          <PasswordField
            label="Konfirmasi Kata Sandi"
            placeholder="Konfirmasi kata sandi Anda"
            autoComplete="new-password"
            disabled={isLoading}
            {...field}
          />
        )}
      />

      <FormField
        control={control}
        name="agreeToTerms"
        render={({ field }) => (
          <TermsAgreementField
            checked={field.value}
            onChange={field.onChange}
            disabled={isLoading}
          />
        )}
      />
    </>
  );
}
