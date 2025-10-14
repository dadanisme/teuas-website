'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  useProfile,
  useUpdateCompleteProfile,
} from '@/hooks/queries/useProfile';
import {
  completeProfileSchema,
  type CompleteProfileData,
} from '@/schemas/profile.schema';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FormAlert } from '@/components/ui/alert';
import {
  Loader2,
  Save,
  User,
  GraduationCap,
  Briefcase,
  Award,
  Users,
  Link,
} from 'lucide-react';
import { BasicInfoSection } from './sections/BasicInfoSection';
import { AcademicSection } from './sections/AcademicSection';
import { ExperienceSection } from './sections/ExperienceSection';
import { SkillsSection } from './sections/SkillsSection';
import { EducationSection } from './sections/EducationSection';
import { SocialsSection } from './sections/SocialsSection';
import { CertificationsSection } from './sections/CertificationsSection';

interface ProfileFormProps {
  userId: string;
}

type ProfileSection =
  | 'basic'
  | 'academic'
  | 'experiences'
  | 'skills'
  | 'educations'
  | 'socials'
  | 'certifications';

export function ProfileForm({ userId }: ProfileFormProps) {
  const [activeTab, setActiveTab] = useState<ProfileSection>('basic');
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');
  const [submitMessage, setSubmitMessage] = useState<string>('');

  // Fetch current profile data
  const { data: profileResponse, isLoading, error } = useProfile(userId);
  const updateProfile = useUpdateCompleteProfile();

  // Initialize form with current data
  const form = useForm<CompleteProfileData>({
    resolver: zodResolver(completeProfileSchema),
    defaultValues: {
      full_name: '',
      nim: '',
      bio: '',
      location: '',
      phone: '',
      year: undefined,
      major: undefined,
      degree: undefined,
      experiences: [],
      skills: [],
      certifications: [],
      educations: [],
      socials: [],
    },
  });

  // Update form when profile data loads
  useEffect(() => {
    if (profileResponse?.data) {
      const profile = profileResponse.data;
      form.reset({
        full_name: profile.full_name || '',
        nim: profile.nim || '',
        bio: profile.bio || '',
        location: profile.location || '',
        phone: profile.phone || '',
        year: profile.year || undefined,
        major: profile.major || undefined,
        degree: profile.degree || undefined,
        experiences: (profile.user_experiences || []).map((exp) => ({
          id: exp.id,
          company: exp.company,
          position: exp.position,
          start_date: exp.start_date || undefined,
          end_date: exp.end_date || undefined,
          is_current: exp.is_current || undefined,
          description: exp.description || undefined,
          location: exp.location || undefined,
        })),
        skills: (profile.user_skills || []).map((skill) => ({
          id: skill.id,
          name: skill.name,
          category: skill.category || undefined,
          level: skill.level as
            | 'Beginner'
            | 'Intermediate'
            | 'Advanced'
            | 'Expert'
            | undefined,
        })),
        certifications: (profile.user_certifications || []).map((cert) => ({
          id: cert.id,
          name: cert.name,
          issuer: cert.issuer,
          issue_date: cert.issue_date || undefined,
          expiry_date: cert.expiry_date || undefined,
          credential_id: cert.credential_id || undefined,
          credential_url: cert.credential_url || undefined,
        })),
        educations: (profile.user_educations || []).map((edu) => ({
          id: edu.id,
          institution: edu.institution,
          degree: edu.degree,
          field_of_study: edu.field_of_study || undefined,
          start_date: edu.start_date || undefined,
          end_date: edu.end_date || undefined,
          grade: edu.grade || undefined,
          description: edu.description || undefined,
        })),
        socials: (profile.user_socials || []).map((social) => ({
          id: social.id,
          platform: social.platform,
          url: social.url,
          username: social.username || undefined,
        })),
      });
    }
  }, [profileResponse?.data, form]);

  const onSubmit = async (data: CompleteProfileData) => {
    try {
      setSubmitStatus('idle');
      setSubmitMessage('');

      // Separate basic profile data from related data
      const {
        experiences,
        skills,
        certifications,
        educations,
        socials,
        ...basicData
      } = data;

      await updateProfile.mutateAsync({
        userId,
        profileData: {
          basic: basicData,
          experiences,
          skills,
          certifications,
          educations,
          socials,
        },
      });

      setSubmitStatus('success');
      setSubmitMessage('Profil berhasil diperbarui!');
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage(
        error instanceof Error
          ? error.message
          : 'Terjadi kesalahan saat memperbarui profil'
      );
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <div className="flex items-center space-x-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-muted-foreground">Memuat profil...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="py-12">
          <FormAlert
            errors="Gagal memuat profil. Silakan refresh halaman."
            className="mb-0"
          />
        </CardContent>
      </Card>
    );
  }

  const tabsConfig = [
    {
      value: 'basic' as const,
      label: 'Informasi Dasar',
      icon: User,
    },
    {
      value: 'academic' as const,
      label: 'Akademik',
      icon: GraduationCap,
    },
    {
      value: 'experiences' as const,
      label: 'Pengalaman Kerja',
      icon: Briefcase,
    },
    {
      value: 'skills' as const,
      label: 'Keahlian',
      icon: Award,
    },
    {
      value: 'educations' as const,
      label: 'Pendidikan',
      icon: GraduationCap,
    },
    {
      value: 'socials' as const,
      label: 'Media Sosial',
      icon: Link,
    },
    {
      value: 'certifications' as const,
      label: 'Sertifikasi',
      icon: Users,
    },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Status Messages */}
        {submitStatus === 'success' && (
          <FormAlert
            success={submitMessage}
            dismissible
            autoHide
            autoHideDelay={5000}
          />
        )}
        {submitStatus === 'error' && (
          <FormAlert
            errors={submitMessage}
            dismissible
            autoHide
            autoHideDelay={7000}
          />
        )}

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Edit Profil</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs
              value={activeTab}
              onValueChange={(value) => setActiveTab(value as ProfileSection)}
            >
              <TabsList className="flex w-full overflow-x-auto lg:grid lg:grid-cols-7">
                {tabsConfig.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <TabsTrigger
                      key={tab.value}
                      value={tab.value}
                      className="flex min-w-0 flex-shrink-0 items-center space-x-1 text-xs whitespace-nowrap lg:text-sm"
                    >
                      <Icon className="h-3 w-3 lg:h-4 lg:w-4" />
                      <span className="hidden sm:inline lg:inline">
                        {tab.label}
                      </span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>

              <div className="mt-6">
                <TabsContent value="basic">
                  <BasicInfoSection control={form.control} />
                </TabsContent>

                <TabsContent value="academic">
                  <AcademicSection control={form.control} />
                </TabsContent>

                <TabsContent value="experiences">
                  <ExperienceSection control={form.control} />
                </TabsContent>

                <TabsContent value="skills">
                  <SkillsSection control={form.control} />
                </TabsContent>

                <TabsContent value="educations">
                  <EducationSection control={form.control} />
                </TabsContent>

                <TabsContent value="socials">
                  <SocialsSection control={form.control} />
                </TabsContent>

                <TabsContent value="certifications">
                  <CertificationsSection control={form.control} />
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={updateProfile.isPending || !form.formState.isDirty}
            className="min-w-[120px]"
          >
            {updateProfile.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Menyimpan...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Simpan Profil
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
