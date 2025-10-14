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
import { Plus, Trash2, Award } from 'lucide-react';

interface CertificationsSectionProps {
  control: Control<CompleteProfileData>;
}

export function CertificationsSection({ control }: CertificationsSectionProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'certifications',
  });

  const addCertification = () => {
    append({
      name: '',
      issuer: '',
      issue_date: '',
      expiry_date: '',
      credential_id: '',
      credential_url: '',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Sertifikasi & Lisensi</h3>
          <p className="text-sm text-muted-foreground">
            Tambahkan sertifikasi profesional dan lisensi yang Anda miliki.
          </p>
        </div>
        <Button type="button" onClick={addCertification} variant="outline" size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Tambah Sertifikasi
        </Button>
      </div>

      {fields.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Award className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-center">
              Belum ada sertifikasi yang ditambahkan.
              <br />
              Klik tombol "Tambah Sertifikasi" untuk memulai.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {fields.map((field, index) => (
            <Card key={field.id}>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center justify-between text-base">
                  <span>Sertifikasi {index + 1}</span>
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
                  {/* Name */}
                  <FormField
                    control={control}
                    name={`certifications.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nama Sertifikasi *</FormLabel>
                        <FormControl>
                          <Input placeholder="Contoh: AWS Certified Solutions Architect" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Issuer */}
                  <FormField
                    control={control}
                    name={`certifications.${index}.issuer`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Penerbit *</FormLabel>
                        <FormControl>
                          <Input placeholder="Contoh: Amazon Web Services" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Issue Date */}
                  <FormField
                    control={control}
                    name={`certifications.${index}.issue_date`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tanggal Terbit</FormLabel>
                        <FormControl>
                          <Input 
                            type="date" 
                            {...field} 
                            value={field.value || ''}
                          />
                        </FormControl>
                        <FormDescription>
                          Tanggal sertifikasi diterbitkan
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Expiry Date */}
                  <FormField
                    control={control}
                    name={`certifications.${index}.expiry_date`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tanggal Kadaluarsa</FormLabel>
                        <FormControl>
                          <Input 
                            type="date" 
                            {...field} 
                            value={field.value || ''}
                          />
                        </FormControl>
                        <FormDescription>
                          Kosongkan jika tidak ada tanggal kadaluarsa
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Credential ID */}
                  <FormField
                    control={control}
                    name={`certifications.${index}.credential_id`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ID Kredensial</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Nomor atau ID sertifikat"
                            {...field} 
                            value={field.value || ''}
                          />
                        </FormControl>
                        <FormDescription>
                          Nomor sertifikat atau ID kredensial
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Credential URL */}
                  <FormField
                    control={control}
                    name={`certifications.${index}.credential_url`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>URL Kredensial</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="https://..."
                            {...field} 
                            value={field.value || ''}
                          />
                        </FormControl>
                        <FormDescription>
                          Link untuk memverifikasi sertifikasi
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

