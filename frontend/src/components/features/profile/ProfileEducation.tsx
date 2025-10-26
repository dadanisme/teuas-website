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
import { Plus, Edit2, Trash2, GraduationCap, Award } from 'lucide-react';
import { Timeline, TimelineItem } from '@/components/common/Timeline';
import { EducationForm } from './forms/EducationForm';
import { useUpdateEducations } from '@/hooks/queries/useProfile';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import type { ProfileData } from '@/types/profile-query';
import type { UserEducationData } from '@/schemas/profile.schema';

interface ProfileEducationProps {
  profile?: ProfileData | null;
}

export function ProfileEducation({ profile }: ProfileEducationProps) {
  const { user } = useAuth();
  const updateEducations = useUpdateEducations();
  const [isAddingEducation, setIsAddingEducation] = useState(false);
  const [editingEducation, setEditingEducation] =
    useState<UserEducationData | null>(null);

  const educations = profile?.user_educations || [];

  // Convert database education to form data
  const convertToFormData = (
    dbEdu: (typeof educations)[0]
  ): UserEducationData => ({
    id: dbEdu.id,
    institution: dbEdu.institution,
    degree: dbEdu.degree,
    field_of_study: dbEdu.field_of_study || undefined,
    start_date: dbEdu.start_date || undefined,
    end_date: dbEdu.end_date || undefined,
    grade: dbEdu.grade || undefined,
    description: dbEdu.description || undefined,
  });

  const handleSaveEducation = async (educationData: UserEducationData) => {
    if (!user?.id) return;

    try {
      let updatedEducations: UserEducationData[];

      if (editingEducation) {
        // Update existing education
        updatedEducations = educations.map((edu) =>
          edu.id === editingEducation.id
            ? { ...educationData, id: edu.id }
            : convertToFormData(edu)
        );
      } else {
        // Add new education
        updatedEducations = [
          ...educations.map(convertToFormData),
          educationData,
        ];
      }

      const result = await updateEducations.mutateAsync({
        userId: user.id,
        educations: updatedEducations,
      });

      if (result.error) {
        toast.error(result.error);
        return;
      }

      toast.success(
        editingEducation
          ? 'Pendidikan berhasil diperbarui'
          : 'Pendidikan berhasil ditambahkan'
      );
      setIsAddingEducation(false);
      setEditingEducation(null);
    } catch {
      toast.error('Gagal menyimpan pendidikan');
    }
  };

  const handleDeleteEducation = async (educationId: string) => {
    if (!user?.id) return;

    try {
      const updatedEducations = educations
        .filter((edu) => edu.id !== educationId)
        .map(convertToFormData);

      const result = await updateEducations.mutateAsync({
        userId: user.id,
        educations: updatedEducations,
      });

      if (result.error) {
        toast.error(result.error);
        return;
      }

      toast.success('Pendidikan berhasil dihapus');
    } catch {
      toast.error('Gagal menghapus pendidikan');
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

  // Transform educations to timeline items
  const timelineItems: TimelineItem[] = educations.map((education) => ({
    id: education.id || '',
    icon: GraduationCap,
    title: education.degree,
    subtitle: education.institution,
    badge: education.field_of_study
      ? { label: education.field_of_study, variant: 'secondary' as const }
      : undefined,
    dateRange: `${formatDate(education.start_date)} - ${formatDate(education.end_date)}`,
    metadata: education.grade
      ? [{ icon: Award, label: `Nilai: ${education.grade}` }]
      : undefined,
    description: education.description || undefined,
  }));

  return (
    <Card className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-foreground text-xl font-semibold">Pendidikan</h2>
        <Dialog open={isAddingEducation} onOpenChange={setIsAddingEducation}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Tambah Pendidikan
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[80vh] max-w-2xl overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Tambah Pendidikan</DialogTitle>
            </DialogHeader>
            <EducationForm
              onSave={handleSaveEducation}
              onCancel={() => setIsAddingEducation(false)}
              isLoading={updateEducations.isPending}
            />
          </DialogContent>
        </Dialog>
      </div>

      <Timeline
        items={timelineItems}
        renderActions={(item) => {
          const education = educations.find((edu) => edu.id === item.id);
          if (!education) return null;

          return (
            <>
              <Dialog
                open={editingEducation?.id === education.id}
                onOpenChange={(open) => !open && setEditingEducation(null)}
              >
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      setEditingEducation(convertToFormData(education))
                    }
                  >
                    <Edit2 className="h-3 w-3" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-h-[80vh] max-w-2xl overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Edit Pendidikan</DialogTitle>
                  </DialogHeader>
                  <EducationForm
                    initialData={editingEducation || undefined}
                    onSave={handleSaveEducation}
                    onCancel={() => setEditingEducation(null)}
                    isLoading={updateEducations.isPending}
                  />
                </DialogContent>
              </Dialog>

              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  education.id && handleDeleteEducation(education.id)
                }
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </>
          );
        }}
        emptyState={{
          icon: GraduationCap,
          message: 'Belum ada pendidikan yang ditambahkan',
          action: (
            <Button
              variant="outline"
              onClick={() => setIsAddingEducation(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Tambah Pendidikan Anda
            </Button>
          ),
        }}
      />
    </Card>
  );
}
