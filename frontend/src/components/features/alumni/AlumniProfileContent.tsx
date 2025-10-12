'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Briefcase,
  GraduationCap,
  Award,
  Calendar,
  MapPin,
  ExternalLink,
  Star,
} from 'lucide-react';
import { AlumniProfile } from '@/types/alumni-query';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

interface AlumniProfileContentProps {
  alumni: AlumniProfile;
}

export function AlumniProfileContent({ alumni }: AlumniProfileContentProps) {
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
          <CardContent className="space-y-6">
            {alumni.user_experiences.map((work, index) => (
              <div key={work.id} className="space-y-2">
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg font-semibold">{work.position}</h3>
                  <p className="text-primary font-medium">{work.company}</p>
                  <div className="text-muted-foreground flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {work.start_date
                          ? format(new Date(work.start_date), 'MMM yyyy', {
                              locale: id,
                            })
                          : 'N/A'}{' '}
                        -{' '}
                        {work.is_current
                          ? 'Sekarang'
                          : work.end_date
                            ? format(new Date(work.end_date), 'MMM yyyy', {
                                locale: id,
                              })
                            : 'N/A'}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{work.location || 'N/A'}</span>
                    </div>
                  </div>
                </div>
                {work.description && (
                  <p className="text-muted-foreground leading-relaxed">
                    {work.description}
                  </p>
                )}
                {index < (alumni.user_experiences?.length ?? 0) - 1 && (
                  <Separator className="mt-4" />
                )}
              </div>
            ))}
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
          <CardContent className="space-y-4">
            {alumni.user_educations.map((education) => (
              <div key={education.id} className="space-y-2">
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg font-semibold">
                    {education.institution || 'N/A'}
                  </h3>
                  <p className="text-primary font-medium">
                    {education.degree || 'N/A'}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {education.field_of_study || 'N/A'}
                  </p>
                  <div className="text-muted-foreground flex items-center gap-1 text-sm">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {education.start_date
                        ? format(new Date(education.start_date), 'yyyy', {
                            locale: id,
                          })
                        : 'N/A'}{' '}
                      -{' '}
                      {education.end_date
                        ? format(new Date(education.end_date), 'yyyy', {
                            locale: id,
                          })
                        : 'Sekarang'}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Grade: {education.grade || 'N/A'}
                  </p>
                </div>
                {education.description && (
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {education.description}
                  </p>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
