'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DatePicker } from './DatePicker';
import type { UserCertificationData } from '@/schemas/profile.schema';

interface CertificationFormProps {
  initialData?: UserCertificationData;
  onSave: (data: UserCertificationData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function CertificationForm({
  initialData,
  onSave,
  onCancel,
  isLoading = false,
}: CertificationFormProps) {
  const [formData, setFormData] = useState<UserCertificationData>({
    name: '',
    issuer: '',
    issue_date: '',
    expiry_date: '',
    credential_id: '',
    credential_url: '',
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

    if (!formData.name.trim()) {
      newErrors.name = 'Certification name is required';
    }

    if (!formData.issuer.trim()) {
      newErrors.issuer = 'Issuer is required';
    }

    if (formData.credential_url && formData.credential_url.trim()) {
      try {
        new URL(formData.credential_url);
      } catch {
        newErrors.credential_url = 'Please enter a valid URL';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Clean up empty strings to undefined for optional fields
    const dataToSave = {
      ...formData,
      issue_date: formData.issue_date || undefined,
      expiry_date: formData.expiry_date || undefined,
      credential_id: formData.credential_id?.trim() || undefined,
      credential_url: formData.credential_url?.trim() || undefined,
    };

    onSave(dataToSave);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 py-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Certification Name *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            placeholder="e.g. AWS Certified Solutions Architect"
            className={errors.name ? 'border-destructive' : ''}
          />
          {errors.name && (
            <p className="text-destructive text-sm">{errors.name}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="issuer">Issuing Organization *</Label>
          <Input
            id="issuer"
            value={formData.issuer}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, issuer: e.target.value }))
            }
            placeholder="e.g. Amazon Web Services"
            className={errors.issuer ? 'border-destructive' : ''}
          />
          {errors.issuer && (
            <p className="text-destructive text-sm">{errors.issuer}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="issue_date">Issue Date</Label>
          <DatePicker
            value={formData.issue_date || ''}
            onChange={(date) =>
              setFormData((prev) => ({ ...prev, issue_date: date }))
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="expiry_date">Expiry Date</Label>
          <DatePicker
            value={formData.expiry_date || ''}
            onChange={(date) =>
              setFormData((prev) => ({ ...prev, expiry_date: date }))
            }
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="credential_id">Credential ID</Label>
        <Input
          id="credential_id"
          value={formData.credential_id || ''}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, credential_id: e.target.value }))
          }
          placeholder="e.g. ABC123XYZ"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="credential_url">Credential URL</Label>
        <Input
          id="credential_url"
          type="url"
          value={formData.credential_url || ''}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, credential_url: e.target.value }))
          }
          placeholder="https://..."
          className={errors.credential_url ? 'border-destructive' : ''}
        />
        {errors.credential_url && (
          <p className="text-destructive text-sm">{errors.credential_url}</p>
        )}
        <p className="text-muted-foreground text-xs">
          Link to verify your certification online
        </p>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save Certification'}
        </Button>
      </div>
    </form>
  );
}
