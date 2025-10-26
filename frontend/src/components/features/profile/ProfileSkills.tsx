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
import { Plus, Edit2, Code, Star } from 'lucide-react';
import { SkillsForm } from './forms/SkillsForm';
import { useUpdateSkills } from '@/hooks/queries/useProfile';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import type { ProfileData } from '@/types/profile-query';
import type { UserSkillData } from '@/schemas/profile.schema';

interface ProfileSkillsProps {
  profile?: ProfileData | null;
}

export function ProfileSkills({ profile }: ProfileSkillsProps) {
  const { user } = useAuth();
  const updateSkills = useUpdateSkills();
  const [isManagingSkills, setIsManagingSkills] = useState(false);

  const skills = profile?.user_skills || [];

  // Convert database skill to form data
  const convertToFormData = (dbSkill: (typeof skills)[0]): UserSkillData => ({
    id: dbSkill.id,
    name: dbSkill.name,
    category: dbSkill.category || undefined,
    level:
      (dbSkill.level as 'Pemula' | 'Menengah' | 'Mahir' | 'Ahli') || undefined,
  });

  const handleSaveSkills = async (skillsData: UserSkillData[]) => {
    if (!user?.id) return;

    try {
      const result = await updateSkills.mutateAsync({
        userId: user.id,
        skills: skillsData,
      });

      if (result.error) {
        toast.error(result.error);
        return;
      }

      toast.success('Keahlian berhasil diperbarui');
      setIsManagingSkills(false);
    } catch {
      toast.error('Gagal memperbarui keahlian');
    }
  };

  const getSkillsByCategory = () => {
    const categorized: Record<string, UserSkillData[]> = {};

    skills.forEach((skill) => {
      const category = skill.category || 'Lainnya';
      if (!categorized[category]) {
        categorized[category] = [];
      }
      categorized[category].push(convertToFormData(skill));
    });

    return categorized;
  };

  const getLevelColor = (level?: string) => {
    switch (level) {
      case 'Ahli':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'Mahir':
        return 'bg-secondary/10 text-secondary-foreground border-secondary/20';
      case 'Menengah':
        return 'bg-accent/10 text-accent-foreground border-accent/20';
      case 'Pemula':
        return 'bg-muted text-muted-foreground border-border';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getLevelStars = (level?: string) => {
    switch (level) {
      case 'Ahli':
        return 4;
      case 'Mahir':
        return 3;
      case 'Menengah':
        return 2;
      case 'Pemula':
        return 1;
      default:
        return 0;
    }
  };

  const skillsByCategory = getSkillsByCategory();

  return (
    <Card className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-foreground text-xl font-semibold">Keahlian</h2>
        <Dialog open={isManagingSkills} onOpenChange={setIsManagingSkills}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Edit2 className="mr-2 h-4 w-4" />
              Kelola Keahlian
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[80vh] max-w-3xl overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Kelola Keahlian</DialogTitle>
            </DialogHeader>
            <SkillsForm
              initialSkills={skills.map(convertToFormData)}
              onSave={handleSaveSkills}
              onCancel={() => setIsManagingSkills(false)}
              isLoading={updateSkills.isPending}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-6">
        {Object.keys(skillsByCategory).length > 0 ? (
          Object.entries(skillsByCategory).map(([category, categorySkills]) => (
            <div key={category} className="space-y-3">
              <h3 className="text-foreground flex items-center gap-2 font-medium">
                <Code className="text-muted-foreground h-4 w-4" />
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {categorySkills.map((skill) => (
                  <div key={skill.id} className="group relative">
                    <Badge
                      variant="outline"
                      className={`${getLevelColor(skill.level)} transition-all duration-200 hover:scale-105`}
                    >
                      <span className="font-medium">{skill.name}</span>
                      {skill.level && (
                        <div className="ml-2 flex items-center gap-0.5">
                          {Array.from({ length: 4 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-2.5 w-2.5 ${
                                i < getLevelStars(skill.level)
                                  ? 'fill-current'
                                  : 'fill-muted stroke-current'
                              }`}
                            />
                          ))}
                        </div>
                      )}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="py-8 text-center">
            <Code className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
            <p className="text-muted-foreground mb-4">
              Belum ada keahlian yang ditambahkan
            </p>
            <Button variant="outline" onClick={() => setIsManagingSkills(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Tambah Keahlian Anda
            </Button>
          </div>
        )}

        {skills.length > 0 && (
          <div className="border-t pt-4">
            <p className="text-muted-foreground text-sm">
              {skills.length} keahlian •{Object.keys(skillsByCategory).length}{' '}
              kategori
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
