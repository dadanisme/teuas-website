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
  fullName: string;
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
    fullName: '',
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
    if (!formData.fullName.trim()) {
      setInternalError('Full name is required');
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
          fullName: formData.fullName.trim(),
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
    <Card className="bg-card/80 border-0 shadow-lg backdrop-blur-sm">
      <CardContent className="space-y-6 p-6">
        {/* Enhanced Error/Success Alert */}
        <FormAlert errors={error} dismissible autoHide autoHideDelay={7000} />

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name Field */}
          <div className="space-y-2">
            <Label
              htmlFor="fullName"
              className="text-muted-foreground text-sm font-medium"
            >
              Full Name
            </Label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <User className="text-muted-foreground h-4 w-4" />
              </div>
              <Input
                id="fullName"
                name="fullName"
                type="text"
                autoComplete="name"
                required
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                className="border-input focus:ring-ring pl-9 transition-all duration-200 focus:ring-2"
                placeholder="Enter your full name"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* NIM Field */}
          <div className="space-y-2">
            <Label
              htmlFor="nim"
              className="text-muted-foreground text-sm font-medium"
            >
              NIM (Student ID)
            </Label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Hash className="text-muted-foreground h-4 w-4" />
              </div>
              <Input
                id="nim"
                name="nim"
                type="text"
                autoComplete="off"
                required
                value={formData.nim}
                onChange={(e) => handleInputChange('nim', e.target.value)}
                className="border-input focus:ring-ring pl-9 transition-all duration-200 focus:ring-2"
                placeholder="Enter your NIM"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-muted-foreground text-sm font-medium"
            >
              Email Address
            </Label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Mail className="text-muted-foreground h-4 w-4" />
              </div>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="border-input focus:ring-ring pl-9 transition-all duration-200 focus:ring-2"
                placeholder="Enter your email"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="text-muted-foreground text-sm font-medium"
            >
              Password
            </Label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Lock className="text-muted-foreground h-4 w-4" />
              </div>
              <Input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                required
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="border-input focus:ring-ring pr-9 pl-9 transition-all duration-200 focus:ring-2"
                placeholder="Create a password"
                disabled={isLoading}
              />
              <button
                type="button"
                className="hover:text-foreground absolute inset-y-0 right-0 flex items-center pr-3 transition-colors disabled:cursor-not-allowed"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="text-muted-foreground h-4 w-4" />
                ) : (
                  <Eye className="text-muted-foreground h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div className="space-y-2">
            <Label
              htmlFor="confirmPassword"
              className="text-muted-foreground text-sm font-medium"
            >
              Confirm Password
            </Label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Lock className="text-muted-foreground h-4 w-4" />
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
                className="border-input focus:ring-ring pr-9 pl-9 transition-all duration-200 focus:ring-2"
                placeholder="Confirm your password"
                disabled={isLoading}
              />
              <button
                type="button"
                className="hover:text-foreground absolute inset-y-0 right-0 flex items-center pr-3 transition-colors disabled:cursor-not-allowed"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                disabled={isLoading}
                tabIndex={-1}
              >
                {showConfirmPassword ? (
                  <EyeOff className="text-muted-foreground h-4 w-4" />
                ) : (
                  <Eye className="text-muted-foreground h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="space-y-2">
            <Label
              htmlFor="agree-terms"
              className="text-muted-foreground cursor-pointer text-sm leading-relaxed font-normal"
            >
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
                  'bg-background border-input text-primary mr-2 h-4 w-4 rounded',
                  'focus:ring-ring focus:ring-2 focus:ring-offset-2',
                  'disabled:cursor-not-allowed disabled:opacity-50'
                )}
              />
              <span>
                <span>I agree to the </span>
                <Link
                  href={ROUTES.TERMS}
                  className="text-accent-foreground hover:text-accent-foreground/80 font-medium transition-colors"
                >
                  Terms and Conditions
                </Link>
                <span> and </span>
                <Link
                  href={ROUTES.PRIVACY}
                  className="text-accent-foreground hover:text-accent-foreground/80 font-medium transition-colors"
                >
                  Privacy Policy
                </Link>
              </span>
            </Label>
          </div>

          {/* Register Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-primary text-primary-foreground hover:bg-primary/90 w-full transition-all duration-200 hover:shadow-lg"
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
