'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Edit2 } from 'lucide-react';
import { useUpdateBasicProfile } from '@/hooks/queries/useProfile';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import type { ProfileData } from '@/types/profile-query';
import type { BasicProfileData } from '@/schemas/profile.schema';

interface EditBasicProfileDialogProps {
  profile?: ProfileData | null;
}

export function EditBasicProfileDialog({
  profile,
}: EditBasicProfileDialogProps) {
  const { user } = useAuth();
  const updateBasicProfile = useUpdateBasicProfile();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<BasicProfileData>>({
    full_name: profile?.full_name || '',
    nim: profile?.nim || '',
    bio: profile?.bio || '',
    location: profile?.location || '',
    phone: profile?.phone || '',
    year: profile?.year || undefined,
    major: profile?.major || undefined,
    degree: profile?.degree || undefined,
  });

  const handleSave = async () => {
    if (!user?.id) return;

    try {
      const result = await updateBasicProfile.mutateAsync({
        userId: user.id,
        data: formData,
      });

      if (result.error) {
        toast.error(result.error);
        return;
      }

      toast.success('Profile updated successfully');
      setIsOpen(false);
    } catch {
      toast.error('Failed to update profile');
    }
  };

  const handleCancel = () => {
    setFormData({
      full_name: profile?.full_name || '',
      nim: profile?.nim || '',
      bio: profile?.bio || '',
      location: profile?.location || '',
      phone: profile?.phone || '',
      year: profile?.year || undefined,
      major: profile?.major || undefined,
      degree: profile?.degree || undefined,
    });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Edit2 className="mr-2 h-4 w-4" />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Basic Information</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="full_name">Full Name *</Label>
              <Input
                id="full_name"
                value={formData.full_name}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    full_name: e.target.value,
                  }))
                }
                placeholder="Enter your full name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nim">NIM *</Label>
              <Input
                id="nim"
                value={formData.nim}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, nim: e.target.value }))
                }
                placeholder="Enter your NIM"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={formData.bio || ''}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, bio: e.target.value }))
              }
              placeholder="Tell us about yourself..."
              rows={4}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location || ''}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    location: e.target.value,
                  }))
                }
                placeholder="City, Country"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={formData.phone || ''}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    phone: e.target.value,
                  }))
                }
                placeholder="+62 xxx xxx xxxx"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="year">Year of Entry</Label>
              <Input
                id="year"
                type="number"
                value={formData.year || ''}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    year: e.target.value ? parseInt(e.target.value) : undefined,
                  }))
                }
                placeholder="2024"
                min="1990"
                max={new Date().getFullYear()}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="degree">Degree</Label>
              <Select
                value={formData.degree || ''}
                onValueChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    degree: value as 'S1' | 'D3',
                  }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select degree" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="S1">S1</SelectItem>
                  <SelectItem value="D3">D3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="major">Major</Label>
              <Select
                value={formData.major || ''}
                onValueChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    major: value as
                      | 'Teknik Elektro'
                      | 'Pendidikan Teknik Elektro',
                  }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select major" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Teknik Elektro">Teknik Elektro</SelectItem>
                  <SelectItem value="Pendidikan Teknik Elektro">
                    Pendidikan Teknik Elektro
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={updateBasicProfile.isPending}
            >
              {updateBasicProfile.isPending ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
