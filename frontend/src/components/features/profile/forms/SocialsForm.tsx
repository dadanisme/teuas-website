'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Plus,
  X,
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
  Github,
  Youtube,
  Music,
  Globe,
} from 'lucide-react';
import type { UserSocialData } from '@/schemas/profile.schema';

interface SocialsFormProps {
  initialSocials?: UserSocialData[];
  onSave: (socials: UserSocialData[]) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

type SocialPlatform =
  | 'linkedin'
  | 'twitter'
  | 'instagram'
  | 'facebook'
  | 'github'
  | 'youtube'
  | 'tiktok'
  | 'website';

export function SocialsForm({
  initialSocials = [],
  onSave,
  onCancel,
  isLoading = false,
}: SocialsFormProps) {
  const [socials, setSocials] = useState<UserSocialData[]>(initialSocials);
  const [newSocial, setNewSocial] = useState<Partial<UserSocialData>>({
    platform: 'linkedin',
    url: '',
    username: '',
  });

  useEffect(() => {
    setSocials(initialSocials);
  }, [initialSocials]);

  const platforms: {
    value: SocialPlatform;
    label: string;
    icon: React.ReactNode;
    placeholder: string;
  }[] = [
    {
      value: 'linkedin',
      label: 'LinkedIn',
      icon: <Linkedin className="h-4 w-4" />,
      placeholder: 'https://linkedin.com/in/username',
    },
    {
      value: 'github',
      label: 'GitHub',
      icon: <Github className="h-4 w-4" />,
      placeholder: 'https://github.com/username',
    },
    {
      value: 'twitter',
      label: 'Twitter',
      icon: <Twitter className="h-4 w-4" />,
      placeholder: 'https://twitter.com/username',
    },
    {
      value: 'instagram',
      label: 'Instagram',
      icon: <Instagram className="h-4 w-4" />,
      placeholder: 'https://instagram.com/username',
    },
    {
      value: 'facebook',
      label: 'Facebook',
      icon: <Facebook className="h-4 w-4" />,
      placeholder: 'https://facebook.com/username',
    },
    {
      value: 'youtube',
      label: 'YouTube',
      icon: <Youtube className="h-4 w-4" />,
      placeholder: 'https://youtube.com/@username',
    },
    {
      value: 'tiktok',
      label: 'TikTok',
      icon: <Music className="h-4 w-4" />,
      placeholder: 'https://tiktok.com/@username',
    },
    {
      value: 'website',
      label: 'Website',
      icon: <Globe className="h-4 w-4" />,
      placeholder: 'https://yourwebsite.com',
    },
  ];

  const handleAddSocial = () => {
    if (!newSocial.platform || !newSocial.url?.trim()) return;

    // Check if platform already exists
    const existingPlatform = socials.find(
      (social) => social.platform === newSocial.platform
    );
    if (existingPlatform) {
      return; // Don't add duplicate platforms
    }

    const socialToAdd: UserSocialData = {
      platform: newSocial.platform as SocialPlatform,
      url: newSocial.url.trim(),
      username: newSocial.username?.trim() || undefined,
    };

    setSocials((prev) => [...prev, socialToAdd]);
    setNewSocial({
      platform: 'linkedin',
      url: '',
      username: '',
    });
  };

  const handleRemoveSocial = (index: number) => {
    setSocials((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpdateSocial = (
    index: number,
    field: keyof UserSocialData,
    value: string
  ) => {
    setSocials((prev) =>
      prev.map((social, i) =>
        i === index ? { ...social, [field]: value } : social
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(socials);
  };

  const getAvailablePlatforms = () => {
    const usedPlatforms = socials.map((social) => social.platform);
    return platforms.filter(
      (platform) => !usedPlatforms.includes(platform.value)
    );
  };

  const getCurrentPlatform = () => {
    return platforms.find((p) => p.value === newSocial.platform);
  };

  const validateUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 py-4">
      {/* Add New Social Link */}
      {getAvailablePlatforms().length > 0 && (
        <div className="bg-muted/30 space-y-4 rounded-lg border p-4">
          <h3 className="text-foreground font-medium">
            Tambah Tautan Media Sosial
          </h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="platform">Platform</Label>
              <Select
                value={newSocial.platform || ''}
                onValueChange={(value) =>
                  setNewSocial((prev) => ({
                    ...prev,
                    platform: value as SocialPlatform,
                    url: '',
                    username: '',
                  }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih platform" />
                </SelectTrigger>
                <SelectContent>
                  {getAvailablePlatforms().map((platform) => (
                    <SelectItem key={platform.value} value={platform.value}>
                      <div className="flex items-center gap-2">
                        {platform.icon}
                        <span>{platform.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="url">URL *</Label>
              <Input
                id="url"
                type="url"
                value={newSocial.url || ''}
                onChange={(e) =>
                  setNewSocial((prev) => ({ ...prev, url: e.target.value }))
                }
                placeholder={getCurrentPlatform()?.placeholder || 'https://...'}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Username (opsional)</Label>
              <Input
                id="username"
                value={newSocial.username || ''}
                onChange={(e) =>
                  setNewSocial((prev) => ({
                    ...prev,
                    username: e.target.value,
                  }))
                }
                placeholder="username"
              />
            </div>
          </div>

          <Button
            type="button"
            onClick={handleAddSocial}
            disabled={
              !newSocial.platform ||
              !newSocial.url?.trim() ||
              !validateUrl(newSocial.url)
            }
            size="sm"
          >
            <Plus className="mr-2 h-4 w-4" />
            Tambah Tautan
          </Button>
        </div>
      )}

      {/* Current Social Links */}
      <div className="space-y-4">
        <h3 className="text-foreground font-medium">
          Tautan Media Sosial ({socials.length})
        </h3>

        {socials.length > 0 ? (
          <div className="space-y-3">
            {socials.map((social, index) => {
              const platform = platforms.find(
                (p) => p.value === social.platform
              );
              return (
                <div
                  key={index}
                  className="flex items-center gap-3 rounded-lg border p-3"
                >
                  <div className="flex min-w-0 flex-1 items-center gap-2">
                    {platform?.icon}
                    <span className="font-medium">{platform?.label}</span>
                  </div>

                  <div className="grid flex-1 grid-cols-1 gap-3 md:grid-cols-2">
                    <Input
                      value={social.url}
                      onChange={(e) =>
                        handleUpdateSocial(index, 'url', e.target.value)
                      }
                      placeholder="URL"
                      type="url"
                    />

                    <Input
                      value={social.username || ''}
                      onChange={(e) =>
                        handleUpdateSocial(index, 'username', e.target.value)
                      }
                      placeholder="Username (opsional)"
                    />
                  </div>

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveSocial(index)}
                    className="text-destructive hover:text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-muted-foreground py-4 text-center">
            Belum ada tautan media sosial yang ditambahkan. Tambahkan tautan
            pertama Anda di atas.
          </p>
        )}
      </div>

      {/* Preview */}
      {socials.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-foreground font-medium">Pratinjau</h3>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            {socials.map((social, index) => {
              const platform = platforms.find(
                (p) => p.value === social.platform
              );
              return (
                <div
                  key={index}
                  className="bg-muted/30 flex items-center gap-3 rounded-lg border p-2"
                >
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
            })}
          </div>
        </div>
      )}

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Batal
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Menyimpan...' : 'Simpan Tautan Media Sosial'}
        </Button>
      </div>
    </form>
  );
}
