import { SectionItem } from '@/constants/legal';
import {
  FileText,
  Eye,
  Users,
  Phone,
  AlertTriangle,
  Gavel,
  UserCheck,
  Shield,
  Ban,
  Scale,
} from 'lucide-react';

export const termsSections: SectionItem[] = [
  { id: 'introduction', title: 'Pendahuluan', icon: FileText },
  { id: 'acceptance', title: 'Penerimaan Ketentuan', icon: UserCheck },
  { id: 'service-description', title: 'Deskripsi Layanan', icon: Eye },
  {
    id: 'user-responsibilities',
    title: 'Tanggung Jawab Pengguna',
    icon: Users,
  },
  { id: 'prohibited-uses', title: 'Penggunaan yang Dilarang', icon: Ban },
  {
    id: 'intellectual-property',
    title: 'Hak Kekayaan Intelektual',
    icon: Shield,
  },
  {
    id: 'limitation-liability',
    title: 'Pembatasan Tanggung Jawab',
    icon: Scale,
  },
  { id: 'modifications', title: 'Perubahan Ketentuan', icon: AlertTriangle },
  { id: 'governing-law', title: 'Hukum yang Berlaku', icon: Gavel },
  { id: 'contact', title: 'Hubungi Kami', icon: Phone },
];
