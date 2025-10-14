'use client';

import { useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Camera, MapPin, Calendar, Mail, Phone, Upload } from 'lucide-react';
import type { ProfileData } from '@/types/profile-query';

interface ProfileHeaderProps {
  profile?: ProfileData | null;
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarUpload = async (
    _event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // TODO: Implement avatar upload
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((word) => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card className="from-background to-primary/10 bg-gradient-to-r p-6">
      <div className="flex flex-col items-center gap-6 md:flex-row">
        {/* Avatar Section */}
        <div className="relative h-max">
          <Avatar className="h-32 w-32">
            <AvatarImage
              src={profile?.photo_url || ''}
              alt={profile?.full_name || 'Profile'}
            />
            <AvatarFallback className="text-2xl">
              {profile?.full_name ? getInitials(profile.full_name) : 'U'}
            </AvatarFallback>
          </Avatar>
          <Button
            size="sm"
            variant="outline"
            className="absolute -right-2 -bottom-2 h-8 w-8 rounded-full p-0"
            onClick={triggerFileInput}
          >
            {false ? (
              <Upload className="h-4 w-4 animate-spin" />
            ) : (
              <Camera className="h-4 w-4" />
            )}
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleAvatarUpload}
            className="hidden"
          />
        </div>

        {/* Profile Info */}
        <div className="flex-1 space-y-4">
          <div>
            <h1 className="text-foreground text-3xl font-bold">
              {profile?.full_name || 'Your Name'}
            </h1>
            <p className="text-muted-foreground mt-1 text-lg">
              {profile?.major && profile?.degree
                ? `${profile.degree} ${profile.major}`
                : 'Add your degree and major'}
            </p>
          </div>

          {/* Profile Details */}
          <div className="text-muted-foreground flex flex-wrap gap-4 text-sm">
            {profile?.location && (
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{profile.location}</span>
              </div>
            )}
            {profile?.year && (
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>Class of {profile.year}</span>
              </div>
            )}
            {profile?.email && (
              <div className="flex items-center gap-1">
                <Mail className="h-4 w-4" />
                <span>{profile.email}</span>
              </div>
            )}
            {profile?.phone && (
              <div className="flex items-center gap-1">
                <Phone className="h-4 w-4" />
                <span>{profile.phone}</span>
              </div>
            )}
          </div>

          {/* NIM Badge */}
          {profile?.nim && (
            <div>
              <Badge variant="secondary">NIM: {profile.nim}</Badge>
            </div>
          )}

          {/* Bio */}
          {profile?.bio && (
            <p className="text-foreground leading-relaxed">{profile.bio}</p>
          )}
        </div>
      </div>
    </Card>
  );
}
