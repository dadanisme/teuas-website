import { SectionItem } from '@/constants/legal';
import { FileText, Eye, Lock, Users, Phone, Shield } from 'lucide-react';

export const privacySections: SectionItem[] = [
  { id: 'introduction', title: 'Pendahuluan', icon: FileText },
  { id: 'file-log', title: 'File Log', icon: Eye },
  {
    id: 'information-collection',
    title: 'Informasi yang Kami Kumpulkan',
    icon: Users,
  },
  { id: 'usage', title: 'Penggunaan Informasi', icon: Lock },
  { id: 'data-protection', title: 'Perlindungan Data', icon: Shield },
  { id: 'data-sharing', title: 'Berbagi Informasi', icon: Users },
  { id: 'user-rights', title: 'Hak-Hak Anda', icon: Lock },
  { id: 'contact', title: 'Hubungi Kami', icon: Phone },
];
