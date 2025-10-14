import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Profil | IKA TEUAS UPI',
  description: 'Edit informasi profil Anda dan kelola detail profesional Anda',
};

interface ProfileLayoutProps {
  children: React.ReactNode;
}

export default function ProfileLayout({ children }: ProfileLayoutProps) {
  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 py-8">{children}</div>
    </div>
  );
}
