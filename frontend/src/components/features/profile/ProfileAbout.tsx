'use client';

import { Card } from '@/components/ui/card';
import { MapPin, Calendar, GraduationCap, Hash } from 'lucide-react';
import { EditBasicProfileDialog } from './forms/EditBasicProfileDialog';
import type { ProfileData } from '@/types/profile-query';

interface ProfileAboutProps {
  profile?: ProfileData | null;
}

export function ProfileAbout({ profile }: ProfileAboutProps) {
  return (
    <Card className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-foreground text-xl font-semibold">About</h2>
        <EditBasicProfileDialog profile={profile} />
      </div>

      <div className="space-y-4">
        {/* Bio */}
        {profile?.bio ? (
          <p className="text-foreground leading-relaxed">{profile.bio}</p>
        ) : (
          <p className="text-muted-foreground italic">
            Add a bio to tell others about yourself
          </p>
        )}

        {/* Details Grid */}
        <div className="grid grid-cols-1 gap-4 border-t pt-4 md:grid-cols-2">
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="text-muted-foreground h-4 w-4" />
            <span className="text-muted-foreground">Location:</span>
            <span className="text-foreground">
              {profile?.location || 'Not specified'}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Calendar className="text-muted-foreground h-4 w-4" />
            <span className="text-muted-foreground">Class of:</span>
            <span className="text-foreground">
              {profile?.year || 'Not specified'}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <GraduationCap className="text-muted-foreground h-4 w-4" />
            <span className="text-muted-foreground">Education:</span>
            <span className="text-foreground">
              {profile?.degree && profile?.major
                ? `${profile.degree} ${profile.major}`
                : 'Not specified'}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Hash className="text-muted-foreground h-4 w-4" />
            <span className="text-muted-foreground">NIM:</span>
            <span className="text-foreground">
              {profile?.nim || 'Not specified'}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
