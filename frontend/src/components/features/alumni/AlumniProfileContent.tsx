'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Briefcase,
  GraduationCap,
  Award,
  Calendar,
  MapPin,
  ExternalLink,
  Star,
} from 'lucide-react';
import { Timeline, TimelineItem } from '@/components/common/Timeline';
import { AlumniProfile } from '@/types/alumni-query';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

interface AlumniProfileContentProps {
  alumni: AlumniProfile;
}

export function AlumniProfileContent({ alumni }: AlumniProfileContentProps) {
  // Transform experiences to timeline items
  const experienceItems: TimelineItem[] =
    alumni.user_experiences?.map((work) => ({
      id: work.id || '',
      icon: Briefcase,
      title: work.position,
      subtitle: work.company,
      badge: work.is_current
        ? { label: 'Saat Ini', variant: 'default' as const }
        : undefined,
      dateRange: `${
        work.start_date
          ? format(new Date(work.start_date), 'MMM yyyy', { locale: id })
          : 'N/A'
      } - ${
        work.is_current
          ? 'Sekarang'
          : work.end_date
            ? format(new Date(work.end_date), 'MMM yyyy', { locale: id })
            : 'N/A'
      }`,
      metadata: work.location
        ? [{ icon: MapPin, label: work.location }]
        : undefined,
      description: work.description || undefined,
    })) || [];

  return (
    <div className="space-y-6">
      {/* Work Experience */}
      {alumni.user_experiences && alumni.user_experiences.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Pengalaman Kerja
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Timeline items={experienceItems} />
          </CardContent>
        </Card>
      )}

      {/* Skills */}
      {alumni.user_skills && alumni.user_skills.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              Keahlian
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {alumni.user_skills.map((skill) => (
                <div
                  key={skill.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="flex-1">
                    <h4 className="font-medium">{skill.name}</h4>
                    <p className="text-muted-foreground text-sm capitalize">
                      {skill.level || 'N/A'}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {skill.category || 'N/A'}
                    </p>
                  </div>
                  {skill.level && (
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          skill.level === 'expert' ? 'default' : 'secondary'
                        }
                      >
                        {skill.level === 'expert'
                          ? 'Ahli'
                          : skill.level === 'advanced'
                            ? 'Mahir'
                            : skill.level === 'intermediate'
                              ? 'Menengah'
                              : 'Pemula'}
                      </Badge>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Certifications */}
      {alumni.user_certifications && alumni.user_certifications.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Sertifikasi
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {alumni.user_certifications.map((cert, index) => (
              <div
                key={index}
                className="flex items-start justify-between rounded-lg border p-4"
              >
                <div className="flex-1 space-y-1">
                  <h4 className="font-semibold">{cert.name}</h4>
                  <p className="text-primary">{cert.issuer}</p>
                  <div className="text-muted-foreground flex flex-wrap gap-4 text-sm">
                    {cert.issue_date && (
                      <span>
                        Diterbitkan:{' '}
                        {format(new Date(cert.issue_date), 'MMM yyyy', {
                          locale: id,
                        })}
                      </span>
                    )}
                    {cert.expiry_date && (
                      <span>
                        Berlaku hingga:{' '}
                        {format(new Date(cert.expiry_date), 'MMM yyyy', {
                          locale: id,
                        })}
                      </span>
                    )}
                  </div>
                  <p className="text-muted-foreground text-xs">
                    ID: {cert.credential_id || 'N/A'}
                  </p>
                </div>
                {cert.credential_url && (
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={cert.credential_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Education */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Pendidikan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">
              Universitas Pendidikan Indonesia
            </h3>
            <p className="text-primary font-medium">{alumni.major || 'N/A'}</p>
            <div className="text-muted-foreground flex items-center gap-1 text-sm">
              <Calendar className="h-4 w-4" />
              <span>Lulus {alumni.year || 'N/A'}</span>
            </div>
            <p className="text-muted-foreground text-sm">
              NIM: {alumni.nim || 'N/A'}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Education from user_educations table */}
      {alumni.user_educations && alumni.user_educations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              Pendidikan Lainnya
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Timeline
              items={
                alumni.user_educations?.map((education) => ({
                  id: education.id || '',
                  icon: GraduationCap,
                  title: education.degree || 'N/A',
                  subtitle: education.institution || 'N/A',
                  badge: education.field_of_study
                    ? {
                        label: education.field_of_study,
                        variant: 'secondary' as const,
                      }
                    : undefined,
                  dateRange: `${
                    education.start_date
                      ? format(new Date(education.start_date), 'yyyy', {
                          locale: id,
                        })
                      : 'N/A'
                  } - ${
                    education.end_date
                      ? format(new Date(education.end_date), 'yyyy', {
                          locale: id,
                        })
                      : 'Sekarang'
                  }`,
                  metadata: education.grade
                    ? [{ icon: Award, label: `Grade: ${education.grade}` }]
                    : undefined,
                  description: education.description || undefined,
                })) || []
              }
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
