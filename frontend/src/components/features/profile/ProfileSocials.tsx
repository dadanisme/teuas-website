'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Plus,
  Edit2,
  ExternalLink,
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
  Github,
  Youtube,
  Music,
  Globe,
} from 'lucide-react';
import { SocialsForm } from './forms/SocialsForm';
import { useUpdateSocials } from '@/hooks/queries/useProfile';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import type { ProfileData } from '@/types/profile-query';
import type { UserSocialData } from '@/schemas/profile.schema';

interface ProfileSocialsProps {
  profile?: ProfileData | null;
}

export function ProfileSocials({ profile }: ProfileSocialsProps) {
  const { user } = useAuth();
  const updateSocials = useUpdateSocials();
  const [isManagingSocials, setIsManagingSocials] = useState(false);

  const socials = profile?.user_socials || [];

  // Convert database social to form data
  const convertToFormData = (
    dbSocial: (typeof socials)[0]
  ): UserSocialData => ({
    id: dbSocial.id,
    platform: dbSocial.platform,
    url: dbSocial.url,
    username: dbSocial.username || undefined,
  });

  const handleSaveSocials = async (socialsData: UserSocialData[]) => {
    if (!user?.id) return;

    try {
      const result = await updateSocials.mutateAsync({
        userId: user.id,
        socials: socialsData,
      });

      if (result.error) {
        toast.error(result.error);
        return;
      }

      toast.success('Social links updated successfully');
      setIsManagingSocials(false);
    } catch {
      toast.error('Failed to update social links');
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'linkedin':
        return <Linkedin className="h-5 w-5" />;
      case 'twitter':
        return <Twitter className="h-5 w-5" />;
      case 'instagram':
        return <Instagram className="h-5 w-5" />;
      case 'facebook':
        return <Facebook className="h-5 w-5" />;
      case 'github':
        return <Github className="h-5 w-5" />;
      case 'youtube':
        return <Youtube className="h-5 w-5" />;
      case 'tiktok':
        return <Music className="h-5 w-5" />;
      case 'website':
        return <Globe className="h-5 w-5" />;
      default:
        return <Globe className="h-5 w-5" />;
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'linkedin':
        return 'text-primary hover:text-primary/80';
      case 'twitter':
        return 'text-secondary-foreground hover:text-secondary-foreground/80';
      case 'instagram':
        return 'text-accent-foreground hover:text-accent-foreground/80';
      case 'facebook':
        return 'text-primary hover:text-primary/80';
      case 'github':
        return 'text-foreground hover:text-foreground/80';
      case 'youtube':
        return 'text-destructive hover:text-destructive/80';
      case 'tiktok':
        return 'text-foreground hover:text-foreground/80';
      case 'website':
        return 'text-primary hover:text-primary/80';
      default:
        return 'text-muted-foreground hover:text-foreground';
    }
  };

  const getPlatformName = (platform: string) => {
    switch (platform) {
      case 'linkedin':
        return 'LinkedIn';
      case 'twitter':
        return 'Twitter';
      case 'instagram':
        return 'Instagram';
      case 'facebook':
        return 'Facebook';
      case 'github':
        return 'GitHub';
      case 'youtube':
        return 'YouTube';
      case 'tiktok':
        return 'TikTok';
      case 'website':
        return 'Website';
      default:
        return platform.charAt(0).toUpperCase() + platform.slice(1);
    }
  };

  return (
    <Card className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-foreground text-xl font-semibold">Social Links</h2>
        <Dialog open={isManagingSocials} onOpenChange={setIsManagingSocials}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Edit2 className="mr-2 h-4 w-4" />
              Manage Links
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[80vh] max-w-2xl overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Manage Social Links</DialogTitle>
            </DialogHeader>
            <SocialsForm
              initialSocials={socials.map(convertToFormData)}
              onSave={handleSaveSocials}
              onCancel={() => setIsManagingSocials(false)}
              isLoading={updateSocials.isPending}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {socials.length > 0 ? (
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {socials.map((social) => (
              <a
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:bg-muted/50 group flex items-center gap-3 rounded-lg border p-3 transition-colors"
              >
                <div
                  className={`${getPlatformColor(social.platform)} transition-colors`}
                >
                  {getPlatformIcon(social.platform)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-foreground font-medium">
                    {getPlatformName(social.platform)}
                  </p>
                  {social.username && (
                    <p className="text-muted-foreground truncate text-sm">
                      @{social.username}
                    </p>
                  )}
                </div>
                <ExternalLink className="text-muted-foreground group-hover:text-foreground h-4 w-4 transition-colors" />
              </a>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center">
            <Globe className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
            <p className="text-muted-foreground mb-4">
              No social links added yet
            </p>
            <Button
              variant="outline"
              onClick={() => setIsManagingSocials(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Social Links
            </Button>
          </div>
        )}

        {socials.length > 0 && (
          <div className="border-t pt-4">
            <p className="text-muted-foreground text-sm">
              {socials.length} social link{socials.length !== 1 ? 's' : ''}{' '}
              added
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
