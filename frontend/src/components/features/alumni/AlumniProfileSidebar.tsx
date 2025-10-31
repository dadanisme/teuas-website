'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Mail, Phone } from 'lucide-react';
import { AlumniProfile } from '@/types/alumni-query';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

interface AlumniProfileSidebarProps {
  alumni: AlumniProfile;
}

export function AlumniProfileSidebar({ alumni }: AlumniProfileSidebarProps) {
  return (
    <div className="space-y-6">
      {/* Basic Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Informasi Dasar</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm">NIM</span>
            <span className="font-semibold">{alumni.nim || 'N/A'}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm">Angkatan</span>
            <span className="font-semibold">{alumni.year || 'N/A'}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm">Jurusan</span>
            <span className="font-semibold">{alumni.major || 'N/A'}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm">Gelar</span>
            <span className="font-semibold">{alumni.degree || 'N/A'}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm">Lokasi</span>
            <span className="font-semibold">{alumni.location || 'N/A'}</span>
          </div>
        </CardContent>
      </Card>

      {/* Contact Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Kontak</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span className="text-sm">{alumni.email}</span>
            </div>

            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span className="text-sm">{alumni.phone || 'N/A'}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Social Links */}
      {alumni.user_socials && alumni.user_socials.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Media Sosial</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {alumni.user_socials.map((social) => (
              <div
                key={social.id}
                className="flex items-center justify-between"
              >
                <span className="text-sm capitalize">{social.platform}</span>
                <Button variant="outline" size="sm" asChild>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs"
                  >
                    Lihat
                  </a>
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Account Status */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Status Akun</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm">Status</span>
            <Badge variant={alumni.role === 'user' ? 'default' : 'secondary'}>
              {alumni.role === 'user' ? 'Alumni' : alumni.role}
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm">Akun</span>
            <Badge variant={alumni.deleted ? 'destructive' : 'default'}>
              {alumni.deleted ? 'Nonaktif' : 'Aktif'}
            </Badge>
          </div>

          <div className="text-muted-foreground text-xs">
            Bergabung:{' '}
            {format(new Date(alumni.created_at), 'dd MMM yyyy', {
              locale: id,
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
