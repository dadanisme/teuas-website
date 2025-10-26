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
import { Plus, Edit2, Trash2, Briefcase, MapPin } from 'lucide-react';
import { Timeline, TimelineItem } from '@/components/common/Timeline';
import { ExperienceForm } from './forms/ExperienceForm';
import { useUpdateExperiences } from '@/hooks/queries/useProfile';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import type { ProfileData } from '@/types/profile-query';
import type { UserExperienceData } from '@/schemas/profile.schema';

interface ProfileExperienceProps {
  profile?: ProfileData | null;
}

export function ProfileExperience({ profile }: ProfileExperienceProps) {
  const { user } = useAuth();
  const updateExperiences = useUpdateExperiences();
  const [isAddingExperience, setIsAddingExperience] = useState(false);
  const [editingExperience, setEditingExperience] =
    useState<UserExperienceData | null>(null);

  const experiences = profile?.user_experiences || [];

  // Convert database experience to form data
  const convertToFormData = (
    dbExp: (typeof experiences)[0]
  ): UserExperienceData => ({
    id: dbExp.id,
    company: dbExp.company,
    position: dbExp.position,
    start_date: dbExp.start_date || undefined,
    end_date: dbExp.end_date || undefined,
    is_current: dbExp.is_current || undefined,
    description: dbExp.description || undefined,
    location: dbExp.location || undefined,
  });

  const handleSaveExperience = async (experienceData: UserExperienceData) => {
    if (!user?.id) return;

    try {
      let updatedExperiences: UserExperienceData[];

      if (editingExperience) {
        // Update existing experience
        updatedExperiences = experiences.map((exp) =>
          exp.id === editingExperience.id
            ? { ...experienceData, id: exp.id }
            : convertToFormData(exp)
        );
      } else {
        // Add new experience
        updatedExperiences = [
          ...experiences.map(convertToFormData),
          experienceData,
        ];
      }

      const result = await updateExperiences.mutateAsync({
        userId: user.id,
        experiences: updatedExperiences,
      });

      if (result.error) {
        toast.error(result.error);
        return;
      }

      toast.success(
        editingExperience
          ? 'Pengalaman berhasil diperbarui'
          : 'Pengalaman berhasil ditambahkan'
      );
      setIsAddingExperience(false);
      setEditingExperience(null);
    } catch {
      toast.error('Gagal menyimpan pengalaman');
    }
  };

  const handleDeleteExperience = async (experienceId: string) => {
    if (!user?.id) return;

    try {
      const updatedExperiences = experiences
        .filter((exp) => exp.id !== experienceId)
        .map(convertToFormData);

      const result = await updateExperiences.mutateAsync({
        userId: user.id,
        experiences: updatedExperiences,
      });

      if (result.error) {
        toast.error(result.error);
        return;
      }

      toast.success('Pengalaman berhasil dihapus');
    } catch {
      toast.error('Gagal menghapus pengalaman');
    }
  };

  const formatDate = (dateString?: string | null) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    });
  };

  // Transform experiences to timeline items
  const timelineItems: TimelineItem[] = experiences.map((experience) => ({
    id: experience.id || '',
    icon: Briefcase,
    title: experience.position,
    subtitle: experience.company,
    badge: experience.is_current
      ? { label: 'Saat Ini', variant: 'default' as const }
      : undefined,
    dateRange: `${formatDate(experience.start_date)} - ${
      experience.is_current ? 'Sekarang' : formatDate(experience.end_date)
    }`,
    metadata: experience.location
      ? [{ icon: MapPin, label: experience.location }]
      : undefined,
    description: experience.description || undefined,
  }));

  return (
    <Card className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-foreground text-xl font-semibold">Pengalaman</h2>
        <Dialog open={isAddingExperience} onOpenChange={setIsAddingExperience}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Tambah Pengalaman
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[80vh] max-w-2xl overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Tambah Pengalaman Kerja</DialogTitle>
            </DialogHeader>
            <ExperienceForm
              onSave={handleSaveExperience}
              onCancel={() => setIsAddingExperience(false)}
              isLoading={updateExperiences.isPending}
            />
          </DialogContent>
        </Dialog>
      </div>

      <Timeline
        items={timelineItems}
        renderActions={(item) => {
          const experience = experiences.find((exp) => exp.id === item.id);
          if (!experience) return null;

          return (
            <>
              <Dialog
                open={editingExperience?.id === experience.id}
                onOpenChange={(open) => !open && setEditingExperience(null)}
              >
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      setEditingExperience(convertToFormData(experience))
                    }
                  >
                    <Edit2 className="h-3 w-3" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-h-[80vh] max-w-2xl overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Edit Pengalaman Kerja</DialogTitle>
                  </DialogHeader>
                  <ExperienceForm
                    initialData={editingExperience || undefined}
                    onSave={handleSaveExperience}
                    onCancel={() => setEditingExperience(null)}
                    isLoading={updateExperiences.isPending}
                  />
                </DialogContent>
              </Dialog>

              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  experience.id && handleDeleteExperience(experience.id)
                }
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </>
          );
        }}
        emptyState={{
          icon: Briefcase,
          message: 'Belum ada pengalaman kerja yang ditambahkan',
          action: (
            <Button
              variant="outline"
              onClick={() => setIsAddingExperience(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Tambah Pengalaman Pertama Anda
            </Button>
          ),
        }}
      />
    </Card>
  );
}
