'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ROUTES } from '@/constants';
import { FormAlert } from '@/components/ui/alert';

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface LoginFormProps {
  onSubmit?: (data: LoginFormData) => Promise<void>;
  isLoading?: boolean;
  error?: string;
}

function LoginFormComponent({
  onSubmit,
  isLoading: externalLoading,
  error: externalError,
}: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [internalLoading, setInternalLoading] = useState(false);
  const [internalError, setInternalError] = useState<string>('');

  const isLoading = externalLoading || internalLoading;
  const error = externalError || internalError;

  const handleInputChange = (
    field: keyof LoginFormData,
    value: string | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (internalError) {
      setInternalError('');
    }
  };

  const validateForm = (): boolean => {
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

    if (formData.password.length < 6) {
      setInternalError('Password must be at least 6 characters long');
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
        await new Promise((resolve) => setTimeout(resolve, 2000));
        if (process.env.NODE_ENV === 'development') {
          console.log('Login attempt:', formData);
        }
        setInternalLoading(false);
      }
    } catch (error) {
      setInternalLoading(false);
      setInternalError(
        error instanceof Error
          ? error.message
          : 'An error occurred during login'
      );
    }
  };

  return (
    <Card className="border-0 bg-white/80 shadow-lg backdrop-blur-sm">
      <CardContent className="space-y-6 p-6">
        {/* Enhanced Error/Success Alert */}
        <FormAlert errors={error} dismissible autoHide autoHideDelay={7000} />

        <form onSubmit={handleSubmit} className="space-y-6">
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
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="border-[#374957]/20 pr-9 pl-9 transition-all duration-200 focus:ring-2 focus:ring-[#014631]/20"
                placeholder="Enter your password"
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

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={formData.rememberMe}
                onChange={(e) =>
                  handleInputChange('rememberMe', e.target.checked)
                }
                disabled={isLoading}
                className={cn(
                  'bg-background h-4 w-4 rounded border-[#374957]/20 text-[#014631]',
                  'focus:ring-2 focus:ring-[#014631]/20 focus:ring-offset-2',
                  'disabled:cursor-not-allowed disabled:opacity-50'
                )}
              />
              <Label
                htmlFor="remember-me"
                className="cursor-pointer text-sm font-normal text-[#374957]"
              >
                Remember me
              </Label>
            </div>
            <Link
              href={ROUTES.FORGOT_PASSWORD}
              className="text-sm font-medium text-[#E46713] transition-colors hover:text-[#E46713]/80"
            >
              Forgot password?
            </Link>
          </div>

          {/* Login Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#014631] text-white transition-all duration-200 hover:bg-[#31453F] hover:shadow-lg"
            size="lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                Sign in
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default LoginFormComponent;
