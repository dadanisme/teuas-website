'use client';

import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle } from 'lucide-react';
import type { ProfileData } from '@/types/profile-query';

interface ProfileStatsProps {
  profile?: ProfileData | null;
}

export function ProfileStats({ profile }: ProfileStatsProps) {
  // Calculate profile completion percentage
  const calculateCompletion = () => {
    if (!profile) return 0;

    let completed = 0;
    const total = 8;

    // Basic info checks
    if (profile.full_name) completed++;
    if (profile.bio) completed++;
    if (profile.location) completed++;
    if (profile.phone) completed++;

    // Related data checks
    if (profile.user_experiences?.length) completed++;
    if (profile.user_educations?.length) completed++;
    if (profile.user_skills?.length) completed++;
    if (profile.user_socials?.length) completed++;

    return Math.round((completed / total) * 100);
  };

  const completionPercentage = calculateCompletion();

  const getCompletionStatus = () => {
    if (completionPercentage >= 80)
      return { text: 'Excellent', variant: 'default' as const };
    if (completionPercentage >= 60)
      return { text: 'Good', variant: 'secondary' as const };
    if (completionPercentage >= 40)
      return { text: 'Fair', variant: 'outline' as const };
    return { text: 'Needs Work', variant: 'destructive' as const };
  };

  const status = getCompletionStatus();

  const sections = [
    {
      name: 'Basic Information',
      completed: !!(
        profile?.full_name &&
        profile?.bio &&
        profile?.location &&
        profile?.phone
      ),
      items: ['Name', 'Bio', 'Location', 'Phone'],
    },
    {
      name: 'Work Experience',
      completed: !!profile?.user_experiences?.length,
      items: ['Current/Past Positions'],
    },
    {
      name: 'Education',
      completed: !!profile?.user_educations?.length,
      items: ['Academic Background'],
    },
    {
      name: 'Skills',
      completed: !!profile?.user_skills?.length,
      items: ['Professional Skills'],
    },
    {
      name: 'Social Links',
      completed: !!profile?.user_socials?.length,
      items: ['Professional Networks'],
    },
  ];

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-foreground text-xl font-semibold">
            Profile Completion
          </h2>
          <Badge variant={status.variant}>{status.text}</Badge>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {completionPercentage}% Complete
            </span>
            <span className="text-muted-foreground">
              {sections.filter((s) => s.completed).length} of {sections.length}{' '}
              sections
            </span>
          </div>
          <Progress value={completionPercentage} className="h-2" />
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {sections.map((section) => (
            <div
              key={section.name}
              className="bg-muted/30 flex items-center gap-2 rounded-lg p-2"
            >
              {section.completed ? (
                <CheckCircle className="text-primary h-4 w-4" />
              ) : (
                <AlertCircle className="text-muted-foreground h-4 w-4" />
              )}
              <span className="text-foreground text-sm font-medium">
                {section.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
