'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { Edit2 } from 'lucide-react';
import { useUpdateBasicProfile } from '@/hooks/queries/useProfile';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { BasicProfileFields } from './form-fields/BasicProfileFields';
import {
  basicProfileSchema,
  type BasicProfileData,
} from '@/schemas/profile.schema';
import type { ProfileData } from '@/types/profile-query';

interface EditBasicProfileDialogProps {
  profile?: ProfileData | null;
}

export function EditBasicProfileDialog({
  profile,
}: EditBasicProfileDialogProps) {
  const { user } = useAuth();
  const updateBasicProfile = useUpdateBasicProfile();

  const form = useForm<BasicProfileData>({
    resolver: zodResolver(basicProfileSchema),
    defaultValues: {
      full_name: profile?.full_name || '',
      nim: profile?.nim || '',
      bio: profile?.bio || '',
      location: profile?.location || '',
      phone: profile?.phone || '',
      year: profile?.year || undefined,
      major: profile?.major || undefined,
      degree: profile?.degree || undefined,
    },
  });

  useEffect(() => {
    if (profile) {
      form.reset({
        full_name: profile.full_name || '',
        nim: profile.nim || '',
        bio: profile.bio || '',
        location: profile.location || '',
        phone: profile.phone || '',
        year: profile.year || undefined,
        major: profile.major || undefined,
        degree: profile.degree || undefined,
      });
    }
  }, [profile, form]);

  const handleFormSubmit = async (data: BasicProfileData) => {
    if (!user?.id) return;

    try {
      const result = await updateBasicProfile.mutateAsync({
        userId: user.id,
        data,
      });

      if (result.error) {
        toast.error(result.error);
        return;
      }

      toast.success('Profil berhasil diperbarui');
      form.reset(data);
    } catch {
      toast.error('Gagal memperbarui profil');
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Edit2 className="mr-2 h-4 w-4" />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Informasi Dasar</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className="space-y-4 py-4"
          >
            <BasicProfileFields control={form.control} />

            <div className="flex justify-end gap-2 pt-4">
              <DialogTrigger asChild>
                <Button type="button" variant="outline">
                  Batal
                </Button>
              </DialogTrigger>
              <Button type="submit" disabled={updateBasicProfile.isPending}>
                {updateBasicProfile.isPending
                  ? 'Menyimpan...'
                  : 'Simpan Perubahan'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
