import { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="bg-background">
      <div className="flex items-center justify-center px-6 py-12 md:min-h-[calc(100vh-80px)]">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
