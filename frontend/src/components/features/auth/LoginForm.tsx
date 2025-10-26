'use client';

import React from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormField } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { ROUTES } from '@/constants';
import { FormAlert } from '@/components/ui/alert';
import { signInSchema, type SignInData } from '@/schemas/auth.schema';
import { useSignInMutation } from '@/hooks/queries/useAuthMutations';
import { EmailField } from './form-fields/EmailField';
import { PasswordField } from './form-fields/PasswordField';
import { SubmitButton } from './form-fields/SubmitButton';

interface LoginFormProps {
  onSubmit?: (data: SignInData) => Promise<void>;
  isLoading?: boolean;
  error?: string;
}

function LoginFormComponent({ onSubmit }: LoginFormProps) {
  const { mutateAsync: signIn, isPending: isSigningIn } = useSignInMutation();

  const form = useForm<SignInData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    shouldUnregister: false,
  });

  const isLoading = form.formState.isSubmitting || isSigningIn;
  const error = form.formState.errors.root?.message;

  const handleFormSubmit = async (data: SignInData) => {
    try {
      if (onSubmit) {
        await onSubmit(data);
      } else {
        await signIn(data);
      }
    } catch (error) {
      // Error is already mapped to Indonesian in the service layer
      form.setError('root', {
        message:
          error instanceof Error
            ? error.message
            : 'Terjadi kesalahan saat masuk',
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
            className="space-y-6"
          >
            <FormField
              control={form.control}
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
              control={form.control}
              name="password"
              render={({ field }) => (
                <PasswordField
                  label="Kata Sandi"
                  placeholder="Masukkan kata sandi Anda"
                  disabled={isLoading}
                  {...field}
                />
              )}
            />

            <div className="flex items-center justify-between">
              <FormField
                control={form.control}
                name="rememberMe"
                render={({ field }) => (
                  <div className="flex items-center space-x-2">
                    <input
                      id="remember-me"
                      type="checkbox"
                      checked={field.value}
                      onChange={field.onChange}
                      disabled={isLoading}
                      className={cn(
                        'bg-background border-input text-primary h-4 w-4 rounded',
                        'focus:ring-ring focus:ring-2 focus:ring-offset-2',
                        'disabled:cursor-not-allowed disabled:opacity-50'
                      )}
                    />
                    <Label
                      htmlFor="remember-me"
                      className="text-muted-foreground cursor-pointer text-sm font-normal"
                    >
                      Ingat saya
                    </Label>
                  </div>
                )}
              />
              <Link
                href={ROUTES.FORGOT_PASSWORD}
                className="text-accent-foreground hover:text-accent-foreground/80 text-sm font-medium transition-colors"
              >
                Lupa kata sandi?
              </Link>
            </div>

            <SubmitButton
              isLoading={isLoading}
              loadingText="Masuk..."
              submitText="Masuk"
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default LoginFormComponent;
