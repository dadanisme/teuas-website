import Link from 'next/link';
import { Users, Award, Building } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { APP_CONFIG } from '@/constants';
import { ROUTES } from '@/constants';
import LoginForm from './components/LoginForm';
import Image from 'next/image';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';

export default function LoginPage() {
  const stats = [
    { icon: Users, value: '700+', label: 'Alumni Connected' },
    { icon: Award, value: '17+ Years', label: 'Excellence' },
    { icon: Building, value: '50+', label: 'Partner Companies' },
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-[#F8F9FB] via-white to-[#F8F9FB]">
        <div className="flex min-h-[calc(100vh-80px)]">
          {/* Left Side - Login Form */}
          <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="mx-auto w-full max-w-md">
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
                  Welcome Back
                </h2>
                <p className="text-[#374957]">
                  Sign in to your {APP_CONFIG.name} account
                </p>
              </div>

              {/* Login Form Card - Client Component */}
              <ErrorBoundary>
                <LoginForm />
              </ErrorBoundary>

              {/* Register Link */}
              <div className="mt-6 text-center">
                <p className="text-[#374957]">
                  Don't have an account?{' '}
                  <Link
                    href={ROUTES.REGISTER}
                    className="font-medium text-[#E46713] transition-colors hover:text-[#E46713]/80"
                  >
                    Register here
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Info Panel */}
          <div className="hidden flex-1 flex-col justify-center bg-gradient-to-br from-[#014631] to-[#31453F] p-12 text-white lg:flex">
            <div className="max-w-md">
              <h2 className="mb-6 text-4xl font-bold">
                Connect with 2,500+ Alumni
              </h2>
              <p className="mb-12 text-lg leading-relaxed text-white/90">
                Join the {APP_CONFIG.fullName} community and unlock access to
                our extensive network of electrical engineering professionals
                across Indonesia and internationally.
              </p>

              {/* Stats */}
              <div className="space-y-6">
                {stats.map((stat, index) => {
                  const IconComponent = stat.icon;
                  return (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm">
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="text-xl font-bold">{stat.value}</div>
                        <div className="text-sm text-white/80">
                          {stat.label}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Quote Card */}
              <Card className="mt-12 border-white/20 bg-white/10 backdrop-blur-sm">
                <CardContent className="text-center">
                  <p className="mb-3 text-white/90 italic">
                    "IKA TEUAS UPI has been instrumental in my career growth.
                    The network and resources available here are invaluable."
                  </p>
                  <p className="text-sm font-medium text-white/80">
                    — DANTE IKA BANGET
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
