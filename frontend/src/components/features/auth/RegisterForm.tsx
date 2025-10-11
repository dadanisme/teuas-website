'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { FormAlert } from '@/components/ui/alert';
import { useAuth } from '@/hooks/useAuth';
import {
  signUpWithConfirmSchema,
  type SignUpWithConfirmData,
} from '@/schemas/auth.schema';
import { RegisterFormFields } from './RegisterFormFields';
import { SubmitButton } from './form-fields/SubmitButton';

interface RegisterFormProps {
  onSubmit?: (data: SignUpWithConfirmData) => Promise<void>;
  isLoading?: boolean;
  error?: string;
}

function RegisterFormComponent({
  onSubmit,
  isLoading: externalLoading,
  error: externalError,
}: RegisterFormProps) {
  const { signUp } = useAuth();

  const form = useForm<SignUpWithConfirmData>({
    resolver: zodResolver(signUpWithConfirmSchema),
    defaultValues: {
      fullName: '',
      nim: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false,
    },
  });

  const isLoading = externalLoading || form.formState.isSubmitting;
  const error = externalError || form.formState.errors.root?.message;

  const handleFormSubmit = async (data: SignUpWithConfirmData) => {
    try {
      if (onSubmit) {
        await onSubmit(data);
      } else {
        const { error } = await signUp({
          email: data.email,
          password: data.password,
          fullName: data.fullName.trim(),
          nim: data.nim,
        });

        if (error) {
          form.setError('root', { message: error });
          return;
        }
      }
    } catch (error) {
      form.setError('root', {
        message:
          error instanceof Error
            ? error.message
            : 'Terjadi kesalahan saat mendaftar',
      });
    }
  };

  return (
    <Card className="bg-card/80 border-0 shadow-lg backdrop-blur-sm">
      <CardContent className="space-y-6 p-6">
        <FormAlert errors={error} dismissible autoHide autoHideDelay={7000} />

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className="space-y-5"
          >
            <RegisterFormFields control={form.control} isLoading={isLoading} />
            <SubmitButton
              isLoading={isLoading}
              loadingText="Membuat akun..."
              submitText="Buat Akun"
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default RegisterFormComponent;
