'use client';

import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';
import { getLevelColor, getLevelStars } from './skill-helpers';
import type { UserSkillData } from '@/schemas/profile.schema';

interface SkillPreviewProps {
  skill: UserSkillData;
}

export function SkillPreview({ skill }: SkillPreviewProps) {
  return (
    <Badge
      variant="outline"
      className={`${getLevelColor(skill.level)} transition-all duration-200 hover:scale-105`}
    >
      <span className="font-medium">{skill.name}</span>
      {skill.level && (
        <div className="ml-2 flex items-center gap-0.5">
          {Array.from({ length: 4 }).map((_, i) => (
            <Star
              key={i}
              className={`h-2.5 w-2.5 ${
                i < getLevelStars(skill.level)
                  ? 'fill-current'
                  : 'fill-muted stroke-current'
              }`}
            />
          ))}
        </div>
      )}
    </Badge>
  );
}
