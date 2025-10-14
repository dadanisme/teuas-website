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
import {
  Plus,
  Edit2,
  Trash2,
  GraduationCap,
  Calendar,
  Award,
} from 'lucide-react';
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
          ? 'Education updated successfully'
          : 'Education added successfully'
      );
      setIsAddingEducation(false);
      setEditingEducation(null);
    } catch {
      toast.error('Failed to save education');
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

      toast.success('Education deleted successfully');
    } catch {
      toast.error('Failed to delete education');
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
        <h2 className="text-foreground text-xl font-semibold">Education</h2>
        <Dialog open={isAddingEducation} onOpenChange={setIsAddingEducation}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Education
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[80vh] max-w-2xl overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add Education</DialogTitle>
            </DialogHeader>
            <EducationForm
              onSave={handleSaveEducation}
              onCancel={() => setIsAddingEducation(false)}
              isLoading={updateEducations.isPending}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {educations.length > 0 ? (
          educations.map((education) => (
            <div
              key={education.id}
              className="border-primary/20 relative border-l-2 pl-4"
            >
              <div className="bg-primary absolute top-2 -left-2 h-4 w-4 rounded-full"></div>

              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <GraduationCap className="text-muted-foreground h-4 w-4" />
                    <h3 className="text-foreground font-semibold">
                      {education.degree}
                    </h3>
                    {education.field_of_study && (
                      <Badge variant="secondary" className="text-xs">
                        {education.field_of_study}
                      </Badge>
                    )}
                  </div>

                  <p className="text-primary mb-2 font-medium">
                    {education.institution}
                  </p>

                  <div className="text-muted-foreground mb-2 flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>
                        {formatDate(education.start_date)} -{' '}
                        {formatDate(education.end_date)}
                      </span>
                    </div>
                    {education.grade && (
                      <div className="flex items-center gap-1">
                        <Award className="h-3 w-3" />
                        <span>Grade: {education.grade}</span>
                      </div>
                    )}
                  </div>

                  {education.description && (
                    <p className="text-foreground text-sm leading-relaxed">
                      {education.description}
                    </p>
                  )}
                </div>

                <div className="ml-4 flex gap-1">
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
                        <DialogTitle>Edit Education</DialogTitle>
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
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="py-8 text-center">
            <GraduationCap className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
            <p className="text-muted-foreground mb-4">No education added yet</p>
            <Button
              variant="outline"
              onClick={() => setIsAddingEducation(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Your Education
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
