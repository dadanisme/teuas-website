'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus, Edit2, Trash2, Briefcase, MapPin, Calendar } from 'lucide-react';
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

      <div className="space-y-4">
        {experiences.length > 0 ? (
          experiences.map((experience) => (
            <div
              key={experience.id}
              className="border-primary/20 relative border-l-2 pl-4"
            >
              <div className="bg-primary absolute top-2 -left-2 h-4 w-4 rounded-full"></div>

              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <Briefcase className="text-muted-foreground h-4 w-4" />
                    <h3 className="text-foreground font-semibold">
                      {experience.position}
                    </h3>
                    {experience.is_current && (
                      <Badge variant="default" className="text-xs">
                        Saat Ini
                      </Badge>
                    )}
                  </div>

                  <p className="text-primary mb-2 font-medium">
                    {experience.company}
                  </p>

                  <div className="text-muted-foreground mb-2 flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>
                        {formatDate(experience.start_date)} -{' '}
                        {experience.is_current
                          ? 'Sekarang'
                          : formatDate(experience.end_date)}
                      </span>
                    </div>
                    {experience.location && (
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span>{experience.location}</span>
                      </div>
                    )}
                  </div>

                  {experience.description && (
                    <p className="text-foreground text-sm leading-relaxed">
                      {experience.description}
                    </p>
                  )}
                </div>

                <div className="ml-4 flex gap-1">
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
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="py-8 text-center">
            <Briefcase className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
            <p className="text-muted-foreground mb-4">
              Belum ada pengalaman kerja yang ditambahkan
            </p>
            <Button
              variant="outline"
              onClick={() => setIsAddingExperience(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Tambah Pengalaman Pertama Anda
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
