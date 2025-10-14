'use client';

import { Control, useFieldArray } from 'react-hook-form';
import { CompleteProfileData } from '@/schemas/profile.schema';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Trash2, Award } from 'lucide-react';

interface SkillsSectionProps {
  control: Control<CompleteProfileData>;
}

export function SkillsSection({ control }: SkillsSectionProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'skills',
  });

  const addSkill = () => {
    append({
      name: '',
      category: '',
      level: undefined,
    });
  };

  const skillCategories = [
    'Programming',
    'Design',
    'Management',
    'Communication',
    'Technical',
    'Other',
  ];

  const skillLevels = [
    { value: 'Beginner', label: 'Pemula' },
    { value: 'Intermediate', label: 'Menengah' },
    { value: 'Advanced', label: 'Mahir' },
    { value: 'Expert', label: 'Ahli' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Keahlian & Skill</h3>
          <p className="text-sm text-muted-foreground">
            Tambahkan keahlian dan skill yang Anda kuasai.
          </p>
        </div>
        <Button type="button" onClick={addSkill} variant="outline" size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Tambah Skill
        </Button>
      </div>

      {fields.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Award className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-center">
              Belum ada skill yang ditambahkan.
              <br />
              Klik tombol "Tambah Skill" untuk memulai.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {fields.map((field, index) => (
            <Card key={field.id}>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center justify-between text-base">
                  <span>Skill {index + 1}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => remove(index)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Skill Name */}
                <FormField
                  control={control}
                  name={`skills.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Skill *</FormLabel>
                      <FormControl>
                        <Input placeholder="Contoh: JavaScript, Leadership, dll" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Category */}
                <FormField
                  control={control}
                  name={`skills.${index}.category`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kategori</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value || ''}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih kategori" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {skillCategories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Level */}
                <FormField
                  control={control}
                  name={`skills.${index}.level`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Level Keahlian</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value || ''}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {skillLevels.map((level) => (
                            <SelectItem key={level.value} value={level.value}>
                              {level.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Seberapa mahir Anda dalam skill ini
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

