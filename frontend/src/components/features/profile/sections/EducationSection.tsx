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
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2, GraduationCap } from 'lucide-react';

interface EducationSectionProps {
  control: Control<CompleteProfileData>;
}

export function EducationSection({ control }: EducationSectionProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'educations',
  });

  const addEducation = () => {
    append({
      institution: '',
      degree: '',
      field_of_study: '',
      start_date: '',
      end_date: '',
      grade: '',
      description: '',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Riwayat Pendidikan</h3>
          <p className="text-sm text-muted-foreground">
            Tambahkan riwayat pendidikan formal dan non-formal Anda.
          </p>
        </div>
        <Button type="button" onClick={addEducation} variant="outline" size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Tambah Pendidikan
        </Button>
      </div>

      {fields.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <GraduationCap className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-center">
              Belum ada riwayat pendidikan yang ditambahkan.
              <br />
              Klik tombol "Tambah Pendidikan" untuk memulai.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {fields.map((field, index) => (
            <Card key={field.id}>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center justify-between text-base">
                  <span>Pendidikan {index + 1}</span>
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
                <div className="grid gap-4 md:grid-cols-2">
                  {/* Institution */}
                  <FormField
                    control={control}
                    name={`educations.${index}.institution`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Institusi *</FormLabel>
                        <FormControl>
                          <Input placeholder="Nama universitas/sekolah" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Degree */}
                  <FormField
                    control={control}
                    name={`educations.${index}.degree`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gelar/Jenjang *</FormLabel>
                        <FormControl>
                          <Input placeholder="Contoh: S1, S2, D3, SMA" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Field of Study */}
                  <FormField
                    control={control}
                    name={`educations.${index}.field_of_study`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bidang Studi</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Contoh: Teknik Elektro" 
                            {...field} 
                            value={field.value || ''}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Grade */}
                  <FormField
                    control={control}
                    name={`educations.${index}.grade`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nilai/IPK</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Contoh: 3.75, Cum Laude" 
                            {...field} 
                            value={field.value || ''}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Start Date */}
                  <FormField
                    control={control}
                    name={`educations.${index}.start_date`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tanggal Mulai</FormLabel>
                        <FormControl>
                          <Input 
                            type="date" 
                            {...field} 
                            value={field.value || ''}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* End Date */}
                  <FormField
                    control={control}
                    name={`educations.${index}.end_date`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tanggal Lulus</FormLabel>
                        <FormControl>
                          <Input 
                            type="date" 
                            {...field} 
                            value={field.value || ''}
                          />
                        </FormControl>
                        <FormDescription>
                          Kosongkan jika masih menempuh
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Description */}
                <FormField
                  control={control}
                  name={`educations.${index}.description`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Deskripsi</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Ceritakan tentang pencapaian, aktivitas, atau hal menarik selama pendidikan..."
                          className="min-h-[80px]"
                          {...field}
                          value={field.value || ''}
                        />
                      </FormControl>
                      <FormDescription>
                        Opsional: prestasi, organisasi, atau aktivitas selama pendidikan
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

