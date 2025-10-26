export const SKILL_LEVELS = ['Pemula', 'Menengah', 'Mahir', 'Ahli'] as const;

export const COMMON_CATEGORIES = [
  'Bahasa Pemrograman',
  'Pengembangan Web',
  'Pengembangan Mobile',
  'Basis Data',
  'DevOps',
  'Desain',
  'Manajemen Proyek',
  'Ilmu Data',
  'Pembelajaran Mesin',
  'Komputasi Awan',
  'Lainnya',
];

export function getLevelColor(level?: string) {
  switch (level) {
    case 'Ahli':
      return 'bg-primary/10 text-primary border-primary/20';
    case 'Mahir':
      return 'bg-secondary/10 text-secondary-foreground border-secondary/20';
    case 'Menengah':
      return 'bg-accent/10 text-accent-foreground border-accent/20';
    case 'Pemula':
      return 'bg-muted text-muted-foreground border-border';
    default:
      return 'bg-muted text-muted-foreground border-border';
  }
}

export function getLevelStars(level?: string) {
  switch (level) {
    case 'Ahli':
      return 4;
    case 'Mahir':
      return 3;
    case 'Menengah':
      return 2;
    case 'Pemula':
      return 1;
    default:
      return 0;
  }
}
