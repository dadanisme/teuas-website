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
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Trash2, Briefcase } from 'lucide-react';

interface ExperienceSectionProps {
  control: Control<CompleteProfileData>;
}

export function ExperienceSection({ control }: ExperienceSectionProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'experiences',
  });

  const addExperience = () => {
    append({
      company: '',
      position: '',
      start_date: '',
      end_date: '',
      is_current: false,
      description: '',
      location: '',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Pengalaman Kerja</h3>
          <p className="text-sm text-muted-foreground">
            Tambahkan pengalaman kerja dan posisi yang pernah Anda jalani.
          </p>
        </div>
        <Button type="button" onClick={addExperience} variant="outline" size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Tambah Pengalaman
        </Button>
      </div>

      {fields.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Briefcase className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-center">
              Belum ada pengalaman kerja yang ditambahkan.
              <br />
              Klik tombol "Tambah Pengalaman" untuk memulai.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {fields.map((field, index) => (
            <Card key={field.id}>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center justify-between text-base">
                  <span>Pengalaman {index + 1}</span>
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
                  {/* Company */}
                  <FormField
                    control={control}
                    name={`experiences.${index}.company`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Perusahaan *</FormLabel>
                        <FormControl>
                          <Input placeholder="Nama perusahaan" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Position */}
                  <FormField
                    control={control}
                    name={`experiences.${index}.position`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Posisi *</FormLabel>
                        <FormControl>
                          <Input placeholder="Jabatan/posisi" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Location */}
                  <FormField
                    control={control}
                    name={`experiences.${index}.location`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Lokasi</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Kota, Negara" 
                            {...field} 
                            value={field.value || ''}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Is Current */}
                  <FormField
                    control={control}
                    name={`experiences.${index}.is_current`}
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Masih bekerja di sini</FormLabel>
                          <FormDescription>
                            Centang jika ini adalah pekerjaan saat ini
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />

                  {/* Start Date */}
                  <FormField
                    control={control}
                    name={`experiences.${index}.start_date`}
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
                    name={`experiences.${index}.end_date`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tanggal Selesai</FormLabel>
                        <FormControl>
                          <Input 
                            type="date" 
                            {...field} 
                            value={field.value || ''}
                          />
                        </FormControl>
                        <FormDescription>
                          Kosongkan jika masih bekerja
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Description */}
                <FormField
                  control={control}
                  name={`experiences.${index}.description`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Deskripsi Pekerjaan</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Jelaskan tanggung jawab dan pencapaian Anda..."
                          className="min-h-[80px]"
                          {...field}
                          value={field.value || ''}
                        />
                      </FormControl>
                      <FormDescription>
                        Uraikan tugas, tanggung jawab, dan pencapaian Anda
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

