'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { DatePicker } from './DatePicker';
import type { UserExperienceData } from '@/schemas/profile.schema';

interface ExperienceFormProps {
  initialData?: UserExperienceData;
  onSave: (data: UserExperienceData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function ExperienceForm({
  initialData,
  onSave,
  onCancel,
  isLoading = false,
}: ExperienceFormProps) {
  const [formData, setFormData] = useState<UserExperienceData>({
    company: '',
    position: '',
    start_date: '',
    end_date: '',
    is_current: false,
    description: '',
    location: '',
    ...initialData,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required';
    }

    if (!formData.position.trim()) {
      newErrors.position = 'Position is required';
    }

    if (!formData.start_date) {
      newErrors.start_date = 'Start date is required';
    }

    if (!formData.is_current && !formData.end_date) {
      newErrors.end_date = 'End date is required when not current position';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Clear end_date if current position
    const dataToSave = {
      ...formData,
      end_date: formData.is_current ? undefined : formData.end_date,
    };

    onSave(dataToSave);
  };

  const handleCurrentChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      is_current: checked,
      end_date: checked ? '' : prev.end_date,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 py-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="position">Posisi *</Label>
          <Input
            id="position"
            value={formData.position}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, position: e.target.value }))
            }
            placeholder="contoh: Software Engineer"
            className={errors.position ? 'border-destructive' : ''}
          />
          {errors.position && (
            <p className="text-destructive text-sm">{errors.position}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="company">Perusahaan *</Label>
          <Input
            id="company"
            value={formData.company}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, company: e.target.value }))
            }
            placeholder="contoh: Google"
            className={errors.company ? 'border-destructive' : ''}
          />
          {errors.company && (
            <p className="text-destructive text-sm">{errors.company}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Lokasi</Label>
        <Input
          id="location"
          value={formData.location || ''}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, location: e.target.value }))
          }
          placeholder="contoh: Jakarta, Indonesia"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="start_date">Tanggal Mulai *</Label>
          <DatePicker
            value={formData.start_date || ''}
            onChange={(date: string) =>
              setFormData((prev) => ({ ...prev, start_date: date }))
            }
            className={errors.start_date ? 'border-destructive' : ''}
          />
          {errors.start_date && (
            <p className="text-destructive text-sm">{errors.start_date}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="end_date">Tanggal Selesai</Label>
          <DatePicker
            value={formData.end_date || ''}
            onChange={(date: string) =>
              setFormData((prev) => ({ ...prev, end_date: date }))
            }
            disabled={formData.is_current}
            className={errors.end_date ? 'border-destructive' : ''}
          />
          {errors.end_date && (
            <p className="text-destructive text-sm">{errors.end_date}</p>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="is_current"
          checked={formData.is_current}
          onCheckedChange={handleCurrentChange}
        />
        <Label htmlFor="is_current" className="text-sm font-normal">
          Saya saat ini bekerja di sini
        </Label>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Deskripsi</Label>
        <Textarea
          id="description"
          value={formData.description || ''}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, description: e.target.value }))
          }
          placeholder="Deskripsikan peran dan pencapaian Anda..."
          rows={4}
        />
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Batal
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Menyimpan...' : 'Simpan Pengalaman'}
        </Button>
      </div>
    </form>
  );
}
