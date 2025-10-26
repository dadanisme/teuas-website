'use client';

import { useState, useEffect } from 'react';
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
import { Badge } from '@/components/ui/badge';
import { Plus, X, Star } from 'lucide-react';
import type { UserSkillData } from '@/schemas/profile.schema';

interface SkillsFormProps {
  initialSkills?: UserSkillData[];
  onSave: (skills: UserSkillData[]) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function SkillsForm({
  initialSkills = [],
  onSave,
  onCancel,
  isLoading = false,
}: SkillsFormProps) {
  const [skills, setSkills] = useState<UserSkillData[]>(initialSkills);
  const [newSkill, setNewSkill] = useState<Partial<UserSkillData>>({
    name: '',
    category: '',
    level: 'Menengah',
  });

  useEffect(() => {
    setSkills(initialSkills);
  }, [initialSkills]);

  const skillLevels = ['Pemula', 'Menengah', 'Mahir', 'Ahli'] as const;

  const commonCategories = [
    'Bahasa Pemrograman',
    'Pengembangan Web',
    'Pengembangan Mobile',
    'Basis Data',
    'DevOps',
    'Desain',
    'Manajemen Proyek',
    'Ilmu Data',
    'Pembelajaran Mesin',
    'Komputasi Awan',
    'Lainnya',
  ];

  const handleAddSkill = () => {
    if (!newSkill.name?.trim()) return;

    const skillToAdd: UserSkillData = {
      name: newSkill.name.trim(),
      category: newSkill.category || 'Lainnya',
      level: newSkill.level || 'Menengah',
    };

    setSkills((prev) => [...prev, skillToAdd]);
    setNewSkill({
      name: '',
      category: '',
      level: 'Menengah',
    });
  };

  const handleRemoveSkill = (index: number) => {
    setSkills((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpdateSkill = (
    index: number,
    field: keyof UserSkillData,
    value: string
  ) => {
    setSkills((prev) =>
      prev.map((skill, i) =>
        i === index ? { ...skill, [field]: value } : skill
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(skills);
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6 py-4">
      {/* Add New Skill */}
      <div className="bg-muted/30 space-y-4 rounded-lg border p-4">
        <h3 className="text-foreground font-medium">
          Tambah Keterampilan Baru
        </h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="skill_name">Nama *</Label>
            <Input
              id="skill_name"
              value={newSkill.name || ''}
              onChange={(e) =>
                setNewSkill((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="cth. JavaScript"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="skill_category">Kategori</Label>
            <Select
              value={newSkill.category || ''}
              onValueChange={(value) =>
                setNewSkill((prev) => ({ ...prev, category: value }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih kategori" />
              </SelectTrigger>
              <SelectContent>
                {commonCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="skill_level">Tingkat</Label>
            <Select
              value={newSkill.level || 'Menengah'}
              onValueChange={(value) =>
                setNewSkill((prev) => ({
                  ...prev,
                  level: value as (typeof skillLevels)[number],
                }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {skillLevels.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button
          type="button"
          onClick={handleAddSkill}
          disabled={!newSkill.name?.trim()}
          size="sm"
        >
          <Plus className="mr-2 h-4 w-4" />
          Tambah Keterampilan
        </Button>
      </div>

      {/* Current Skills */}
      <div className="space-y-4">
        <h3 className="text-foreground font-medium">
          Keterampilan Saat Ini ({skills.length})
        </h3>

        {skills.length > 0 ? (
          <div className="space-y-3">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="flex items-center gap-3 rounded-lg border p-3"
              >
                <div className="grid flex-1 grid-cols-1 gap-3 md:grid-cols-3">
                  <Input
                    value={skill.name}
                    onChange={(e) =>
                      handleUpdateSkill(index, 'name', e.target.value)
                    }
                    placeholder="Nama"
                  />

                  <Select
                    value={skill.category || ''}
                    onValueChange={(value) =>
                      handleUpdateSkill(index, 'category', value)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      {commonCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    value={skill.level || 'Menengah'}
                    onValueChange={(value) =>
                      handleUpdateSkill(index, 'level', value)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {skillLevels.map((level) => (
                        <SelectItem key={level} value={level}>
                          <div className="flex items-center gap-2">
                            <span>{level}</span>
                            <div className="flex items-center gap-0.5">
                              {Array.from({ length: 4 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-2.5 w-2.5 ${
                                    i < getLevelStars(level)
                                      ? 'fill-current'
                                      : 'fill-muted stroke-current'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveSkill(index)}
                  className="text-destructive hover:text-destructive"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground py-4 text-center">
            Belum ada keterampilan yang ditambahkan. Tambahkan keterampilan
            pertama Anda di atas.
          </p>
        )}
      </div>

      {/* Preview */}
      {skills.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-foreground font-medium">Pratinjau</h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <Badge
                key={index}
                variant="outline"
                className={getLevelColor(skill.level)}
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
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Batal
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Menyimpan...' : 'Simpan Keterampilan'}
        </Button>
      </div>
    </form>
  );
}
