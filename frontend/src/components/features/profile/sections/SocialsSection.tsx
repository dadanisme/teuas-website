'use client';

import { Control, useFieldArray } from 'react-hook-form';
import { CompleteProfileData } from '@/schemas/profile.schema';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Trash2, Link, Linkedin, Github, Instagram, Facebook, Youtube, Twitter, Globe } from 'lucide-react';

interface SocialsSectionProps {
  control: Control<CompleteProfileData>;
}

export function SocialsSection({ control }: SocialsSectionProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'socials',
  });

  const addSocial = () => {
    append({
      platform: 'linkedin',
      url: '',
      username: '',
    });
  };

  const socialPlatforms = [
    { value: 'linkedin', label: 'LinkedIn', icon: Linkedin, placeholder: 'https://linkedin.com/in/username' },
    { value: 'github', label: 'GitHub', icon: Github, placeholder: 'https://github.com/username' },
    { value: 'twitter', label: 'Twitter', icon: Twitter, placeholder: 'https://twitter.com/username' },
    { value: 'instagram', label: 'Instagram', icon: Instagram, placeholder: 'https://instagram.com/username' },
    { value: 'facebook', label: 'Facebook', icon: Facebook, placeholder: 'https://facebook.com/username' },
    { value: 'youtube', label: 'YouTube', icon: Youtube, placeholder: 'https://youtube.com/@username' },
    { value: 'tiktok', label: 'TikTok', icon: Link, placeholder: 'https://tiktok.com/@username' },
    { value: 'website', label: 'Website', icon: Globe, placeholder: 'https://yourwebsite.com' },
  ];

  const getPlatformInfo = (platform: string) => {
    return socialPlatforms.find(p => p.value === platform) || socialPlatforms[0];
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Media Sosial & Website</h3>
          <p className="text-sm text-muted-foreground">
            Tambahkan tautan ke profil media sosial dan website Anda.
          </p>
        </div>
        <Button type="button" onClick={addSocial} variant="outline" size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Tambah Link
        </Button>
      </div>

      {fields.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Link className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-center">
              Belum ada tautan media sosial yang ditambahkan.
              <br />
              Klik tombol "Tambah Link" untuk memulai.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {fields.map((field, index) => {
            const platformInfo = getPlatformInfo(field.platform);
            const PlatformIcon = platformInfo.icon;
            
            return (
              <Card key={field.id}>
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center justify-between text-base">
                    <div className="flex items-center space-x-2">
                      <PlatformIcon className="h-4 w-4" />
                      <span>{platformInfo.label}</span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => remove(index)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Platform */}
                  <FormField
                    control={control}
                    name={`socials.${index}.platform`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Platform *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih platform" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {socialPlatforms.map((platform) => {
                              const Icon = platform.icon;
                              return (
                                <SelectItem key={platform.value} value={platform.value}>
                                  <div className="flex items-center space-x-2">
                                    <Icon className="h-4 w-4" />
                                    <span>{platform.label}</span>
                                  </div>
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* URL */}
                  <FormField
                    control={control}
                    name={`socials.${index}.url`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>URL *</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder={platformInfo.placeholder}
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Masukkan URL lengkap ke profil Anda
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Username */}
                  <FormField
                    control={control}
                    name={`socials.${index}.username`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="@username atau nama tampilan"
                            {...field} 
                            value={field.value || ''}
                          />
                        </FormControl>
                        <FormDescription>
                          Opsional: username atau nama tampilan Anda
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

