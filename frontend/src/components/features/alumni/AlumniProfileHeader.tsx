'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  MapPin,
  Building,
  Calendar,
  Mail,
  Phone,
  MessageCircle,
  UserPlus,
  ExternalLink,
} from 'lucide-react';
import { AlumniProfile } from '@/types/alumni-query';

interface AlumniProfileHeaderProps {
  alumni: AlumniProfile;
}

export function AlumniProfileHeader({ alumni }: AlumniProfileHeaderProps) {
  const currentWork =
    alumni.user_experiences?.find((exp) => exp.is_current) ||
    alumni.user_experiences?.[0];

  return (
    <section className="bg-foreground py-12">
      <div className="container mx-auto px-4">
        <Card className="bg-background border-0 shadow-lg">
          <CardContent className="p-8">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
              {/* Profile Photo */}
              <div className="flex-shrink-0">
                <div className="border-primary/20 relative h-32 w-32 overflow-hidden rounded-full border-4 lg:h-40 lg:w-40">
                  <Image
                    src={alumni.photo_url || '/assets/avatars/avatar.png'}
                    alt={alumni.full_name}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-1 space-y-4">
                <div>
                  <h1 className="text-foreground text-3xl font-bold lg:text-4xl">
                    {alumni.full_name}
                  </h1>
                  <p className="text-muted-foreground text-lg">
                    {currentWork?.position}{' '}
                    {currentWork?.company && `at ${currentWork.company}`}
                  </p>
                </div>

                {/* Basic Info */}
                <div className="text-muted-foreground flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Lulus {alumni.year || 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Building className="h-4 w-4" />
                    <span>{alumni.major || 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{alumni.location || 'N/A'}</span>
                  </div>
                </div>

                {/* Bio */}
                {alumni.bio && (
                  <p className="text-muted-foreground leading-relaxed">
                    {alumni.bio}
                  </p>
                )}

                {/* Skills */}
                {alumni.user_skills && alumni.user_skills.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {alumni.user_skills.slice(0, 5).map((skill) => (
                      <Badge key={skill.id} variant="secondary">
                        {skill.name}
                      </Badge>
                    ))}
                    {alumni.user_skills.length > 5 && (
                      <Badge variant="outline">
                        +{alumni.user_skills.length - 5} lainnya
                      </Badge>
                    )}
                  </div>
                )}

                {/* Contact Info */}
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`mailto:${alumni.email}`}>
                      <Mail className="mr-2 h-4 w-4" />
                      Email
                    </Link>
                  </Button>
                  {alumni.phone && (
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`tel:${alumni.phone}`}>
                        <Phone className="mr-2 h-4 w-4" />
                        Telepon
                      </Link>
                    </Button>
                  )}
                  {alumni.user_socials?.map((social) => (
                    <Button key={social.id} variant="outline" size="sm" asChild>
                      <Link
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        {social.platform.charAt(0).toUpperCase() +
                          social.platform.slice(1)}
                      </Link>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 lg:flex-shrink-0">
                <Button>
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Kirim Pesan
                </Button>
                <Button variant="outline">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Tambah Koneksi
                </Button>
                {/* Mentorship info not available in database */}
                {false && (
                  <Button variant="outline">
                    <Calendar className="mr-2 h-4 w-4" />
                    Request Mentoring
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
