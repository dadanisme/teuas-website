import Image from 'next/image';

interface SplashScreenProps {
  message?: string;
}

/**
 * Full-screen splash screen with logo and loading animation
 * Used during authentication state checks and initial loading
 */
export function SplashScreen({ message }: SplashScreenProps) {
  return (
    <div className="bg-background fixed inset-0 z-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        {/* Logo with fade-in animation */}
        <div className="animate-fade-in">
          <Image
            src="/logo.png"
            alt="TEUAS UPI Logo"
            width={120}
            height={120}
            className="h-auto w-28 opacity-90 md:w-32"
            priority
          />
        </div>

        {/* Loading spinner */}
        <div className="flex flex-col items-center gap-3">
          <div className="border-primary h-10 w-10 animate-spin rounded-full border-t-2 border-b-2" />

          {/* Optional loading message */}
          {message && (
            <p className="text-muted-foreground animate-pulse text-sm">
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
