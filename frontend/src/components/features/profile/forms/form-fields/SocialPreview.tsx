'use client';

import { getPlatformByValue } from './social-helpers';
import type { UserSocialData } from '@/schemas/profile.schema';

interface SocialPreviewProps {
  social: UserSocialData;
}

export function SocialPreview({ social }: SocialPreviewProps) {
  const platform = getPlatformByValue(social.platform);

  return (
    <div className="bg-muted/30 flex items-center gap-3 rounded-lg border p-2">
      {platform?.icon}
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium">{platform?.label}</p>
        {social.username && (
          <p className="text-muted-foreground truncate text-xs">
            @{social.username}
          </p>
        )}
      </div>
    </div>
  );
}
