'use client';

import { useEffect, useState } from 'react';
import { useForm, useFieldArray, type Control } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
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
import { Plus } from 'lucide-react';
import { Form } from '@/components/ui/form';
import { SocialField } from './form-fields/SocialField';
import { SocialPreview } from './form-fields/SocialPreview';
import {
  SOCIAL_PLATFORMS,
  validateUrl,
  type SocialPlatform,
} from './form-fields/social-helpers';
import {
  userSocialSchema,
  type UserSocialData,
} from '@/schemas/profile.schema';

const socialsFormSchema = z.object({
  socials: z.array(userSocialSchema),
});

type SocialsFormData = z.infer<typeof socialsFormSchema>;

interface SocialsFormProps {
  initialSocials?: UserSocialData[];
  onSave: (socials: UserSocialData[]) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function SocialsForm({
  initialSocials = [],
  onSave,
  onCancel,
  isLoading = false,
}: SocialsFormProps) {
  const form = useForm<SocialsFormData>({
    resolver: zodResolver(socialsFormSchema),
    defaultValues: {
      socials: initialSocials,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'socials',
  });

  const [newPlatform, setNewPlatform] = useState<SocialPlatform>('linkedin');
  const [newUrl, setNewUrl] = useState('');
  const [newUsername, setNewUsername] = useState('');

  useEffect(() => {
    form.reset({ socials: initialSocials });
  }, [initialSocials, form]);

  const socials = form.watch('socials');

  const getAvailablePlatforms = () => {
    const usedPlatforms = socials.map((social) => social.platform);
    return SOCIAL_PLATFORMS.filter(
      (platform) => !usedPlatforms.includes(platform.value)
    );
  };

  const getCurrentPlatform = () => {
    return SOCIAL_PLATFORMS.find((p) => p.value === newPlatform);
  };

  const handleAddSocial = () => {
    const url = newUrl.trim();

    if (!newPlatform || !url || !validateUrl(url)) return;

    const existingPlatform = socials.find(
      (social) => social.platform === newPlatform
    );
    if (existingPlatform) return;

    append({
      platform: newPlatform,
      url,
      username: newUsername.trim() || undefined,
    });

    setNewPlatform('linkedin');
    setNewUrl('');
    setNewUsername('');
  };

  const handleFormSubmit = (data: SocialsFormData) => {
    onSave(data.socials);
  };

  const availablePlatforms = getAvailablePlatforms();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="space-y-6 py-4"
      >
        {/* Add New Social Link */}
        {availablePlatforms.length > 0 && (
          <div className="bg-muted/30 space-y-4 rounded-lg border p-4">
            <h3 className="text-foreground font-medium">
              Tambah Tautan Media Sosial
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="newPlatform">Platform</Label>
                <Select
                  value={newPlatform}
                  onValueChange={(value) => {
                    setNewPlatform(value as SocialPlatform);
                    setNewUrl('');
                    setNewUsername('');
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih platform" />
                  </SelectTrigger>
                  <SelectContent>
                    {availablePlatforms.map((platform) => (
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
                <Label htmlFor="newUrl">URL *</Label>
                <Input
                  id="newUrl"
                  type="url"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  placeholder={
                    getCurrentPlatform()?.placeholder || 'https://...'
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="newUsername">Username (opsional)</Label>
                <Input
                  id="newUsername"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  placeholder="username"
                />
              </div>
            </div>

            <Button
              type="button"
              onClick={handleAddSocial}
              disabled={!newPlatform || !newUrl.trim() || !validateUrl(newUrl)}
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
            Tautan Media Sosial ({fields.length})
          </h3>

          {fields.length > 0 ? (
            <div className="space-y-3">
              {fields.map((field, index) => (
                <SocialField
                  key={field.id}
                  control={
                    form.control as unknown as Control<{
                      socials: UserSocialData[];
                    }>
                  }
                  field={field}
                  index={index}
                  onRemove={() => remove(index)}
                />
              ))}
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
              {socials.map((social, index) => (
                <SocialPreview key={index} social={social} />
              ))}
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
    </Form>
  );
}
