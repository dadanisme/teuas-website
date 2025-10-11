import Link from 'next/link';
import { GraduationCap, Network, Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { APP_CONFIG } from '@/constants';
import { ROUTES } from '@/constants';
import RegisterForm from './components/RegisterForm';
import Image from 'next/image';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';

export default function RegisterPage() {
  const features = [
    {
      icon: GraduationCap,
      title: 'Alumni Network',
      description:
        'Connect with thousands of electrical engineering graduates worldwide',
    },
    {
      icon: Network,
      title: 'Professional Growth',
      description:
        'Access career opportunities and industry insights from experienced professionals',
    },
    {
      icon: Shield,
      title: 'Secure Platform',
      description:
        'Your data is protected with enterprise-grade security and privacy measures',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F9FB] via-white to-[#F8F9FB]">
      <div className="flex min-h-[calc(100vh-80px)]">
        {/* Left Side - Register Form */}
        <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="mx-auto w-full max-w-lg">
            {/* Logo and Title */}
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#014631]/10">
                <Image
                  src="/assets/icon/logo.png"
                  alt="IKA TE UPI Logo"
                  width={40}
                  height={40}
                />
              </div>
              <h2 className="mb-2 text-3xl font-bold text-[#0C1532]">
                Join Our Community
              </h2>
              <p className="text-[#374957]">
                Create your {APP_CONFIG.name} account and connect with fellow
                alumni
              </p>
            </div>

            {/* Register Form Card - Client Component */}
            <ErrorBoundary>
              <RegisterForm />
            </ErrorBoundary>

            {/* Login Link */}
            <div className="mt-6 text-center">
              <p className="text-[#374957]">
                Already have an account?{' '}
                <Link
                  href={ROUTES.LOGIN}
                  className="font-medium text-[#E46713] transition-colors hover:text-[#E46713]/80"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Info Panel */}
        <div className="hidden flex-1 flex-col justify-center bg-gradient-to-br from-[#014631] to-[#31453F] p-12 text-white lg:flex">
          <div className="max-w-md">
            <h2 className="mb-6 text-4xl font-bold">
              Start Your Journey with {APP_CONFIG.name}
            </h2>
            <p className="mb-12 text-lg leading-relaxed text-white/90">
              Become part of the {APP_CONFIG.fullName} community and unlock
              endless possibilities for professional growth and networking.
            </p>

            {/* Features */}
            <div className="space-y-8">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm">
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="mb-1 text-lg font-semibold">
                        {feature.title}
                      </div>
                      <div className="text-sm leading-relaxed text-white/80">
                        {feature.description}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Success Story Card */}
            <Card className="mt-12 border-white/20 bg-white/10 backdrop-blur-sm">
              <CardContent className="text-center">
                <p className="mb-3 text-white/90 italic">
                  "Joining IKA TEUAS UPI opened doors I never imagined. The
                  connections I made here transformed my career path
                  completely."
                </p>
                <p className="text-sm font-medium text-white/80">
                  — ALUMNI SUCCESS STORY
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
