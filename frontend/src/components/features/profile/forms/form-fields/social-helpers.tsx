import {
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
  Github,
  Youtube,
  Music,
  Globe,
} from 'lucide-react';

export type SocialPlatform =
  | 'linkedin'
  | 'twitter'
  | 'instagram'
  | 'facebook'
  | 'github'
  | 'youtube'
  | 'tiktok'
  | 'website';

export const SOCIAL_PLATFORMS = [
  {
    value: 'linkedin' as SocialPlatform,
    label: 'LinkedIn',
    icon: <Linkedin className="h-4 w-4" />,
    placeholder: 'https://linkedin.com/in/username',
  },
  {
    value: 'github' as SocialPlatform,
    label: 'GitHub',
    icon: <Github className="h-4 w-4" />,
    placeholder: 'https://github.com/username',
  },
  {
    value: 'twitter' as SocialPlatform,
    label: 'Twitter',
    icon: <Twitter className="h-4 w-4" />,
    placeholder: 'https://twitter.com/username',
  },
  {
    value: 'instagram' as SocialPlatform,
    label: 'Instagram',
    icon: <Instagram className="h-4 w-4" />,
    placeholder: 'https://instagram.com/username',
  },
  {
    value: 'facebook' as SocialPlatform,
    label: 'Facebook',
    icon: <Facebook className="h-4 w-4" />,
    placeholder: 'https://facebook.com/username',
  },
  {
    value: 'youtube' as SocialPlatform,
    label: 'YouTube',
    icon: <Youtube className="h-4 w-4" />,
    placeholder: 'https://youtube.com/@username',
  },
  {
    value: 'tiktok' as SocialPlatform,
    label: 'TikTok',
    icon: <Music className="h-4 w-4" />,
    placeholder: 'https://tiktok.com/@username',
  },
  {
    value: 'website' as SocialPlatform,
    label: 'Website',
    icon: <Globe className="h-4 w-4" />,
    placeholder: 'https://yourwebsite.com',
  },
];

export function getPlatformByValue(value: string) {
  return SOCIAL_PLATFORMS.find((p) => p.value === value);
}

export function validateUrl(url: string) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
