import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Briefcase, MapPin } from 'lucide-react';
import { ROUTES } from '@/constants';
import type { AlumniProfile } from '@/types/alumni';

interface AlumniCardProps {
  alumni: AlumniProfile;
}

export function AlumniCard({ alumni }: AlumniCardProps) {
  return (
    <Card className="flex h-full flex-col overflow-hidden p-0 transition-all hover:shadow-lg">
      <CardContent className="flex h-full flex-col p-0">
        {/* Profile Header */}
        <div className="from-foreground/10 to-primary/15 relative bg-gradient-to-r p-6 pb-16">
          <div className="absolute bottom-0 left-6 translate-y-1/2">
            <div className="border-background relative h-20 w-20 overflow-hidden rounded-full border-4">
              <Image
                src={alumni.profilePhoto || '/assets/avatars/avatar.png'}
                alt={alumni.fullName}
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="absolute bottom-[3px] left-30 translate-y-1/2">
            <h3 className="text-foreground line-clamp-1 text-lg font-semibold">
              {alumni.fullName}
            </h3>

            <p className="text-muted-foreground line-clamp-1 text-sm">
              Class of {alumni.graduationYear}
            </p>
          </div>
          {alumni.mentorshipInfo.isAvailableAsMentor && (
            <Badge className="absolute top-4 right-4 bg-green-100 text-green-800">
              Mentor
            </Badge>
          )}
        </div>

        {/* Profile Content */}
        <div className="mt-6 flex flex-grow flex-col p-6">
          <div className="mb-4 space-y-2">
            <div className="flex items-center gap-2">
              <div className="text-muted-foreground flex items-center gap-2 text-sm">
                <Briefcase className="text-muted-foreground h-4 w-4" />
                <span className="line-clamp-1">{alumni.position}</span>
              </div>
              <div className="bg-primary h-1.5 w-1.5 rounded-full" />
              <div className="flex items-center gap-2 text-sm">
                <span className="line-clamp-1 font-medium">
                  {alumni.currentCompany}
                </span>
              </div>
            </div>
            <div className="text-muted-foreground flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4" />
              <span>
                {alumni.workExperience[0]?.location || 'Lokasi tidak tersedia'}
              </span>
            </div>
          </div>

          {alumni.bio && (
            <p className="text-muted-foreground mb-4 line-clamp-2 text-sm">
              {alumni.bio}
            </p>
          )}

          {/* Skills */}
          {alumni.skills && alumni.skills.length > 0 && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-1">
                {alumni.skills.slice(0, 3).map((skill) => (
                  <Badge key={skill.id} variant="secondary" className="text-xs">
                    {skill.name}
                  </Badge>
                ))}
                {alumni.skills.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{alumni.skills.length - 3} lainnya
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Action Button - pushed to bottom */}
          <div className="mt-auto">
            <Button asChild className="w-full">
              <Link href={ROUTES.ALUMNI.PROFILE(alumni.id.toString())}>
                Lihat Profil
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
