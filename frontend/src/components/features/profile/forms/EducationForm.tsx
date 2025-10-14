'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { DatePicker } from './DatePicker';
import type { UserEducationData } from '@/schemas/profile.schema';

interface EducationFormProps {
  initialData?: UserEducationData;
  onSave: (data: UserEducationData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function EducationForm({
  initialData,
  onSave,
  onCancel,
  isLoading = false,
}: EducationFormProps) {
  const [formData, setFormData] = useState<UserEducationData>({
    institution: '',
    degree: '',
    field_of_study: '',
    start_date: '',
    end_date: '',
    grade: '',
    description: '',
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

    if (!formData.institution.trim()) {
      newErrors.institution = 'Institution name is required';
    }

    if (!formData.degree.trim()) {
      newErrors.degree = 'Degree is required';
    }

    if (!formData.start_date) {
      newErrors.start_date = 'Start date is required';
    }

    if (!formData.end_date) {
      newErrors.end_date = 'End date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 py-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="institution">Institution *</Label>
          <Input
            id="institution"
            value={formData.institution}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, institution: e.target.value }))
            }
            placeholder="e.g. Universitas Pendidikan Indonesia"
            className={errors.institution ? 'border-destructive' : ''}
          />
          {errors.institution && (
            <p className="text-destructive text-sm">{errors.institution}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="degree">Degree *</Label>
          <Input
            id="degree"
            value={formData.degree}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, degree: e.target.value }))
            }
            placeholder="e.g. Bachelor of Science"
            className={errors.degree ? 'border-destructive' : ''}
          />
          {errors.degree && (
            <p className="text-destructive text-sm">{errors.degree}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="field_of_study">Field of Study</Label>
        <Input
          id="field_of_study"
          value={formData.field_of_study || ''}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, field_of_study: e.target.value }))
          }
          placeholder="e.g. Electrical Engineering"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="start_date">Start Date *</Label>
          <DatePicker
            value={formData.start_date || ''}
            onChange={(date) =>
              setFormData((prev) => ({ ...prev, start_date: date }))
            }
            className={errors.start_date ? 'border-destructive' : ''}
          />
          {errors.start_date && (
            <p className="text-destructive text-sm">{errors.start_date}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="end_date">End Date *</Label>
          <DatePicker
            value={formData.end_date || ''}
            onChange={(date) =>
              setFormData((prev) => ({ ...prev, end_date: date }))
            }
            className={errors.end_date ? 'border-destructive' : ''}
          />
          {errors.end_date && (
            <p className="text-destructive text-sm">{errors.end_date}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="grade">Grade/GPA</Label>
        <Input
          id="grade"
          value={formData.grade || ''}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, grade: e.target.value }))
          }
          placeholder="e.g. 3.8/4.0 or Magna Cum Laude"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description || ''}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, description: e.target.value }))
          }
          placeholder="Describe your studies, achievements, activities..."
          rows={4}
        />
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save Education'}
        </Button>
      </div>
    </form>
  );
}
