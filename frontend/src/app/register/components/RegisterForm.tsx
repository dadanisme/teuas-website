'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
  User,
  Hash,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { FormAlert } from '@/components/ui/alert';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/constants';
import type { SignUpData } from '@/schemas/auth.schema';

interface RegisterFormData {
  firstName: string;
  lastName: string;
  nim: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

interface RegisterFormProps {
  onSubmit?: (data: RegisterFormData) => Promise<void>;
  isLoading?: boolean;
  error?: string;
}

function RegisterFormComponent({
  onSubmit,
  isLoading: externalLoading,
  error: externalError,
}: RegisterFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: '',
    lastName: '',
    nim: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });
  const [internalLoading, setInternalLoading] = useState(false);
  const [internalError, setInternalError] = useState<string>('');

  const router = useRouter();
  const { signUp, isAuthenticated } = useAuth();

  const isLoading = externalLoading || internalLoading;
  const error = externalError || internalError;

  // Redirect if already authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      router.push(ROUTES.HOME);
    }
  }, [isAuthenticated, router]);

  const handleInputChange = (
    field: keyof RegisterFormData,
    value: string | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (internalError) {
      setInternalError('');
    }
  };

  const validateForm = (): boolean => {
    if (!formData.firstName.trim()) {
      setInternalError('First name is required');
      return false;
    }

    if (!formData.lastName.trim()) {
      setInternalError('Last name is required');
      return false;
    }

    if (!formData.nim.trim()) {
      setInternalError('NIM is required');
      return false;
    }

    if (formData.nim.length < 6) {
      setInternalError('NIM must be at least 6 characters long');
      return false;
    }

    if (!formData.email.trim()) {
      setInternalError('Email is required');
      return false;
    }

    if (!formData.email.includes('@')) {
      setInternalError('Please enter a valid email address');
      return false;
    }

    if (!formData.password.trim()) {
      setInternalError('Password is required');
      return false;
    }

    if (formData.password.length < 8) {
      setInternalError('Password must be at least 8 characters long');
      return false;
    }

    if (!formData.confirmPassword.trim()) {
      setInternalError('Please confirm your password');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setInternalError('Passwords do not match');
      return false;
    }

    if (!formData.agreeToTerms) {
      setInternalError('You must agree to the terms and conditions');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setInternalError('');

    if (!validateForm()) {
      return;
    }

    try {
      if (onSubmit) {
        await onSubmit(formData);
      } else {
        setInternalLoading(true);

        // Use real Supabase authentication
        const signUpData: SignUpData = {
          email: formData.email,
          password: formData.password,
          fullName: `${formData.firstName} ${formData.lastName}`.trim(),
          nim: formData.nim,
        };

        const { error } = await signUp(signUpData);

        if (error) {
          setInternalError(error);
          setInternalLoading(false);
          return;
        }

        // Success - redirect will be handled by useEffect or show success message
        setInternalLoading(false);
        // You might want to show a success message here if email confirmation is required
      }
    } catch (error) {
      setInternalLoading(false);
      setInternalError(
        error instanceof Error
          ? error.message
          : 'An error occurred during registration'
      );
    }
  };

  return (
    <Card className="border-0 bg-white/80 shadow-lg backdrop-blur-sm">
      <CardContent className="space-y-6 p-6">
        {/* Enhanced Error/Success Alert */}
        <FormAlert errors={error} dismissible autoHide autoHideDelay={7000} />

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name Fields Row */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* First Name Field */}
            <div className="space-y-2">
              <Label
                htmlFor="firstName"
                className="text-sm font-medium text-[#374957]"
              >
                First Name
              </Label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <User className="h-4 w-4 text-[#374957]" />
                </div>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  required
                  value={formData.firstName}
                  onChange={(e) =>
                    handleInputChange('firstName', e.target.value)
                  }
                  className="border-[#374957]/20 pl-9 transition-all duration-200 focus:ring-2 focus:ring-[#014631]/20"
                  placeholder="Enter first name"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Last Name Field */}
            <div className="space-y-2">
              <Label
                htmlFor="lastName"
                className="text-sm font-medium text-[#374957]"
              >
                Last Name
              </Label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <User className="h-4 w-4 text-[#374957]" />
                </div>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  required
                  value={formData.lastName}
                  onChange={(e) =>
                    handleInputChange('lastName', e.target.value)
                  }
                  className="border-[#374957]/20 pl-9 transition-all duration-200 focus:ring-2 focus:ring-[#014631]/20"
                  placeholder="Enter last name"
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>

          {/* NIM Field */}
          <div className="space-y-2">
            <Label htmlFor="nim" className="text-sm font-medium text-[#374957]">
              NIM (Student ID)
            </Label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Hash className="h-4 w-4 text-[#374957]" />
              </div>
              <Input
                id="nim"
                name="nim"
                type="text"
                autoComplete="off"
                required
                value={formData.nim}
                onChange={(e) => handleInputChange('nim', e.target.value)}
                className="border-[#374957]/20 pl-9 transition-all duration-200 focus:ring-2 focus:ring-[#014631]/20"
                placeholder="Enter your NIM"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-[#374957]"
            >
              Email Address
            </Label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Mail className="h-4 w-4 text-[#374957]" />
              </div>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="border-[#374957]/20 pl-9 transition-all duration-200 focus:ring-2 focus:ring-[#014631]/20"
                placeholder="Enter your email"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="text-sm font-medium text-[#374957]"
            >
              Password
            </Label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Lock className="h-4 w-4 text-[#374957]" />
              </div>
              <Input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                required
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="border-[#374957]/20 pr-9 pl-9 transition-all duration-200 focus:ring-2 focus:ring-[#014631]/20"
                placeholder="Create a password"
                disabled={isLoading}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3 transition-colors hover:text-[#0C1532] disabled:cursor-not-allowed"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-[#374957]" />
                ) : (
                  <Eye className="h-4 w-4 text-[#374957]" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div className="space-y-2">
            <Label
              htmlFor="confirmPassword"
              className="text-sm font-medium text-[#374957]"
            >
              Confirm Password
            </Label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Lock className="h-4 w-4 text-[#374957]" />
              </div>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                autoComplete="new-password"
                required
                value={formData.confirmPassword}
                onChange={(e) =>
                  handleInputChange('confirmPassword', e.target.value)
                }
                className="border-[#374957]/20 pr-9 pl-9 transition-all duration-200 focus:ring-2 focus:ring-[#014631]/20"
                placeholder="Confirm your password"
                disabled={isLoading}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3 transition-colors hover:text-[#0C1532] disabled:cursor-not-allowed"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                disabled={isLoading}
                tabIndex={-1}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4 text-[#374957]" />
                ) : (
                  <Eye className="h-4 w-4 text-[#374957]" />
                )}
              </button>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-start space-x-2">
            <input
              id="agree-terms"
              name="agree-terms"
              type="checkbox"
              checked={formData.agreeToTerms}
              onChange={(e) =>
                handleInputChange('agreeToTerms', e.target.checked)
              }
              disabled={isLoading}
              className={cn(
                'bg-background mt-1 h-4 w-4 rounded border-[#374957]/20 text-[#014631]',
                'focus:ring-2 focus:ring-[#014631]/20 focus:ring-offset-2',
                'disabled:cursor-not-allowed disabled:opacity-50'
              )}
            />
            <Label
              htmlFor="agree-terms"
              className="cursor-pointer text-sm leading-relaxed font-normal text-[#374957]"
            >
              I agree to the{' '}
              <Link
                href="/terms"
                className="font-medium text-[#E46713] transition-colors hover:text-[#E46713]/80"
              >
                Terms and Conditions
              </Link>{' '}
              and{' '}
              <Link
                href="/privacy"
                className="font-medium text-[#E46713] transition-colors hover:text-[#E46713]/80"
              >
                Privacy Policy
              </Link>
            </Label>
          </div>

          {/* Register Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#014631] text-white transition-all duration-200 hover:bg-[#31453F] hover:shadow-lg"
            size="lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating account...
              </>
            ) : (
              <>
                Create Account
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default RegisterFormComponent;
