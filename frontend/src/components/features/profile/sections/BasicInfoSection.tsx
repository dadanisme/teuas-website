'use client';

import { Control } from 'react-hook-form';
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

interface BasicInfoSectionProps {
  control: Control<CompleteProfileData>;
}

export function BasicInfoSection({ control }: BasicInfoSectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Informasi Dasar</h3>
        <p className="text-sm text-muted-foreground">
          Informasi dasar tentang diri Anda yang akan ditampilkan di profil.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Full Name */}
        <FormField
          control={control}
          name="full_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Lengkap *</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan nama lengkap" {...field} />
              </FormControl>
              <FormDescription>
                Nama lengkap sesuai dengan dokumen resmi
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* NIM */}
        <FormField
          control={control}
          name="nim"
          render={({ field }) => (
            <FormItem>
              <FormLabel>NIM *</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan NIM" {...field} />
              </FormControl>
              <FormDescription>
                Nomor Induk Mahasiswa saat kuliah
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone */}
        <FormField
          control={control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nomor Telepon</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Contoh: +62812345678" 
                  {...field} 
                  value={field.value || ''}
                />
              </FormControl>
              <FormDescription>
                Nomor telepon yang dapat dihubungi
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Location */}
        <FormField
          control={control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lokasi</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Contoh: Jakarta, Indonesia" 
                  {...field} 
                  value={field.value || ''}
                />
              </FormControl>
              <FormDescription>
                Kota atau wilayah tempat tinggal saat ini
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Bio */}
      <FormField
        control={control}
        name="bio"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Bio</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Ceritakan sedikit tentang diri Anda..."
                className="min-h-[100px]"
                {...field}
                value={field.value || ''}
              />
            </FormControl>
            <FormDescription>
              Deskripsi singkat tentang diri Anda (maksimal 500 karakter)
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

