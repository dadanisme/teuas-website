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
import { SkillField } from './form-fields/SkillField';
import { SkillPreview } from './form-fields/SkillPreview';
import { SKILL_LEVELS, COMMON_CATEGORIES } from './form-fields/skill-helpers';
import { userSkillSchema, type UserSkillData } from '@/schemas/profile.schema';

const skillsFormSchema = z.object({
  skills: z.array(userSkillSchema),
});

type SkillsFormData = z.infer<typeof skillsFormSchema>;

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
  const form = useForm<SkillsFormData>({
    resolver: zodResolver(skillsFormSchema),
    defaultValues: {
      skills: initialSkills,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'skills',
  });

  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState<
    'Pemula' | 'Menengah' | 'Mahir' | 'Ahli'
  >('Menengah');

  useEffect(() => {
    form.reset({ skills: initialSkills });
  }, [initialSkills, form]);

  const handleAddSkill = () => {
    const name = newSkillName.trim();
    if (!name) return;

    append({
      name,
      category: newSkillCategory || 'Lainnya',
      level: newSkillLevel || 'Menengah',
    });

    setNewSkillName('');
    setNewSkillCategory('');
    setNewSkillLevel('Menengah');
  };

  const handleFormSubmit = (data: SkillsFormData) => {
    onSave(data.skills);
  };

  const skills = form.watch('skills');

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="space-y-6 py-4"
      >
        {/* Add New Skill */}
        <div className="bg-muted/30 space-y-4 rounded-lg border p-4">
          <h3 className="text-foreground font-medium">
            Tambah Keterampilan Baru
          </h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="newSkillName">Nama *</Label>
              <Input
                id="newSkillName"
                value={newSkillName}
                onChange={(e) => setNewSkillName(e.target.value)}
                placeholder="cth. JavaScript"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="newSkillCategory">Kategori</Label>
              <Select
                value={newSkillCategory}
                onValueChange={(value) => setNewSkillCategory(value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih kategori" />
                </SelectTrigger>
                <SelectContent>
                  {COMMON_CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="newSkillLevel">Tingkat</Label>
              <Select
                value={newSkillLevel}
                onValueChange={(value) =>
                  setNewSkillLevel(value as typeof newSkillLevel)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SKILL_LEVELS.map((level) => (
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
            disabled={!newSkillName.trim()}
            size="sm"
          >
            <Plus className="mr-2 h-4 w-4" />
            Tambah Keterampilan
          </Button>
        </div>

        {/* Current Skills */}
        <div className="space-y-4">
          <h3 className="text-foreground font-medium">
            Keterampilan Saat Ini ({fields.length})
          </h3>

          {fields.length > 0 ? (
            <div className="space-y-3">
              {fields.map((field, index) => (
                <SkillField
                  key={field.id}
                  control={
                    form.control as unknown as Control<{
                      skills: UserSkillData[];
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
                <SkillPreview key={index} skill={skill} />
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
    </Form>
  );
}
