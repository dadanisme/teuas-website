'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Plus,
  Edit2,
  Trash2,
  Award,
  Calendar,
  ExternalLink,
  Hash,
} from 'lucide-react';
import { CertificationForm } from './forms/CertificationForm';
import { useUpdateCertifications } from '@/hooks/queries/useProfile';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import type { ProfileData } from '@/types/profile-query';
import type { UserCertificationData } from '@/schemas/profile.schema';

interface ProfileCertificationsProps {
  profile?: ProfileData | null;
}

export function ProfileCertifications({ profile }: ProfileCertificationsProps) {
  const { user } = useAuth();
  const updateCertifications = useUpdateCertifications();
  const [isAddingCertification, setIsAddingCertification] = useState(false);
  const [editingCertification, setEditingCertification] =
    useState<UserCertificationData | null>(null);

  const certifications = profile?.user_certifications || [];

  // Convert database certification to form data
  const convertToFormData = (
    dbCert: (typeof certifications)[0]
  ): UserCertificationData => ({
    id: dbCert.id,
    name: dbCert.name,
    issuer: dbCert.issuer,
    issue_date: dbCert.issue_date || undefined,
    expiry_date: dbCert.expiry_date || undefined,
    credential_id: dbCert.credential_id || undefined,
    credential_url: dbCert.credential_url || undefined,
  });

  const handleSaveCertification = async (
    certificationData: UserCertificationData
  ) => {
    if (!user?.id) return;

    try {
      let updatedCertifications: UserCertificationData[];

      if (editingCertification) {
        // Update existing certification
        updatedCertifications = certifications.map((cert) =>
          cert.id === editingCertification.id
            ? { ...certificationData, id: cert.id }
            : convertToFormData(cert)
        );
      } else {
        // Add new certification
        updatedCertifications = [
          ...certifications.map(convertToFormData),
          certificationData,
        ];
      }

      const result = await updateCertifications.mutateAsync({
        userId: user.id,
        certifications: updatedCertifications,
      });

      if (result.error) {
        toast.error(result.error);
        return;
      }

      toast.success(
        editingCertification
          ? 'Sertifikasi berhasil diperbarui'
          : 'Sertifikasi berhasil ditambahkan'
      );
      setIsAddingCertification(false);
      setEditingCertification(null);
    } catch {
      toast.error('Gagal menyimpan sertifikasi');
    }
  };

  const handleDeleteCertification = async (certificationId: string) => {
    if (!user?.id) return;

    try {
      const updatedCertifications = certifications
        .filter((cert) => cert.id !== certificationId)
        .map(convertToFormData);

      const result = await updateCertifications.mutateAsync({
        userId: user.id,
        certifications: updatedCertifications,
      });

      if (result.error) {
        toast.error(result.error);
        return;
      }

      toast.success('Sertifikasi berhasil dihapus');
    } catch {
      toast.error('Gagal menghapus sertifikasi');
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    });
  };

  const isExpired = (expiryDate?: string) => {
    if (!expiryDate) return false;
    return new Date(expiryDate) < new Date();
  };

  return (
    <Card className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-foreground text-xl font-semibold">Sertifikasi</h2>
        <Dialog
          open={isAddingCertification}
          onOpenChange={setIsAddingCertification}
        >
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Tambah Sertifikasi
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[80vh] max-w-2xl overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Tambah Sertifikasi</DialogTitle>
            </DialogHeader>
            <CertificationForm
              onSave={handleSaveCertification}
              onCancel={() => setIsAddingCertification(false)}
              isLoading={updateCertifications.isPending}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {certifications.length > 0 ? (
          certifications.map((certification) => (
            <div
              key={certification.id}
              className="hover:bg-muted/30 rounded-lg border p-4 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-2">
                    <Award className="text-primary h-5 w-5" />
                    <h3 className="text-foreground font-semibold">
                      {certification.name}
                    </h3>
                    {certification.expiry_date &&
                      isExpired(certification.expiry_date) && (
                        <Badge variant="destructive" className="text-xs">
                          Kedaluwarsa
                        </Badge>
                      )}
                  </div>

                  <p className="text-primary mb-3 font-medium">
                    {certification.issuer}
                  </p>

                  <div className="text-muted-foreground mb-3 flex flex-wrap gap-4 text-sm">
                    {certification.issue_date && (
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>
                          Diterbitkan: {formatDate(certification.issue_date)}
                        </span>
                      </div>
                    )}
                    {certification.expiry_date && (
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span
                          className={
                            isExpired(certification.expiry_date)
                              ? 'text-destructive'
                              : ''
                          }
                        >
                          Berakhir: {formatDate(certification.expiry_date)}
                        </span>
                      </div>
                    )}
                    {certification.credential_id && (
                      <div className="flex items-center gap-1">
                        <Hash className="h-3 w-3" />
                        <span>ID: {certification.credential_id}</span>
                      </div>
                    )}
                  </div>

                  {certification.credential_url && (
                    <div className="mb-3">
                      <a
                        href={certification.credential_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary inline-flex items-center gap-1 text-sm hover:underline"
                      >
                        <ExternalLink className="h-3 w-3" />
                        Lihat Kredensial
                      </a>
                    </div>
                  )}
                </div>

                <div className="ml-4 flex gap-1">
                  <Dialog
                    open={editingCertification?.id === certification.id}
                    onOpenChange={(open) =>
                      !open && setEditingCertification(null)
                    }
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          setEditingCertification(
                            convertToFormData(certification)
                          )
                        }
                      >
                        <Edit2 className="h-3 w-3" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-h-[80vh] max-w-2xl overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Edit Sertifikasi</DialogTitle>
                      </DialogHeader>
                      <CertificationForm
                        initialData={editingCertification || undefined}
                        onSave={handleSaveCertification}
                        onCancel={() => setEditingCertification(null)}
                        isLoading={updateCertifications.isPending}
                      />
                    </DialogContent>
                  </Dialog>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      certification.id &&
                      handleDeleteCertification(certification.id)
                    }
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="py-8 text-center">
            <Award className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
            <p className="text-muted-foreground mb-4">
              Belum ada sertifikasi yang ditambahkan
            </p>
            <Button
              variant="outline"
              onClick={() => setIsAddingCertification(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Tambah Sertifikasi Pertama Anda
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
