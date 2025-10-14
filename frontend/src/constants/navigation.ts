// Konfigurasi navigasi

import { NavItem } from '@/types';
import { ROUTES } from './index';

// Item navigasi utama
export const MAIN_NAVIGATION: NavItem[] = [
  {
    title: 'Beranda',
    href: ROUTES.HOME,
  },
  {
    title: 'Database Alumni',
    href: ROUTES.ALUMNI.DIRECTORY,
  },
  {
    title: 'Beasiswa & Donasi',
    href: ROUTES.SCHOLARSHIPS.ROOT,
    children: [
      {
        title: 'Beasiswa',
        href: ROUTES.SCHOLARSHIPS.ROOT,
        description: 'Temukan peluang beasiswa',
      },
      {
        title: 'Donasi',
        href: ROUTES.SCHOLARSHIPS.DONATE,
        description: 'Dukung dana abadi kami',
      },
    ],
  },
  {
    title: 'Berita',
    href: ROUTES.NEWS.ROOT,
  },
  {
    title: 'FGD',
    href: ROUTES.FGD.ROOT,
  },
  {
    title: 'Galeri',
    href: ROUTES.GALLERY.ROOT,
  },
];

// Item navigasi pengguna terotentikasi
export const USER_NAVIGATION: NavItem[] = [
  {
    title: 'Profil Saya',
    href: ROUTES.ALUMNI.EDIT_PROFILE,
  },
  {
    title: 'Artikel Saya',
    href: ROUTES.ALUMNI.ARTICLES.DASHBOARD,
  },
  {
    title: 'Jaringan Saya',
    href: ROUTES.ALUMNI.NETWORK,
  },
  {
    title: 'Mentoring',
    href: ROUTES.ALUMNI.MENTORSHIP.DASHBOARD,
  },
  {
    title: 'Aplikasi Saya',
    href: ROUTES.SCHOLARSHIPS.MY_APPLICATIONS,
  },
];

// Item navigasi admin
export const ADMIN_NAVIGATION: NavItem[] = [
  {
    title: 'Dasbor',
    href: ROUTES.ADMIN.DASHBOARD,
  },
  {
    title: 'Manajemen Pengguna',
    href: ROUTES.ADMIN.USERS.ROOT,
    children: [
      {
        title: 'Semua Pengguna',
        href: ROUTES.ADMIN.USERS.ROOT,
        description: 'Kelola semua pengguna terdaftar',
      },
      {
        title: 'Pendaftaran Tertunda',
        href: ROUTES.ADMIN.USERS.PENDING,
        description: 'Tinjau pendaftaran yang tertunda',
      },
    ],
  },
  {
    title: 'Manajemen Konten',
    href: ROUTES.ADMIN.CONTENT.ROOT,
    children: [
      {
        title: 'Artikel Berita',
        href: ROUTES.ADMIN.CONTENT.NEWS,
        description: 'Kelola konten berita',
      },
      {
        title: 'Acara',
        href: ROUTES.ADMIN.CONTENT.EVENTS,
        description: 'Kelola acara',
      },
      {
        title: 'Galeri Media',
        href: ROUTES.ADMIN.CONTENT.MEDIA,
        description: 'Kelola file media',
      },
      {
        title: 'Artikel Alumni',
        href: ROUTES.ADMIN.CONTENT.ARTICLES,
        description: 'Moderasi artikel alumni',
      },
    ],
  },
  {
    title: 'Analitik',
    href: ROUTES.ADMIN.ANALYTICS,
  },
  {
    title: 'Pengaturan',
    href: ROUTES.ADMIN.SETTINGS,
  },
];

// Item navigasi footer
export const FOOTER_NAVIGATION = {
  about: {
    title: 'Tentang',
    items: [
      { title: 'Beranda', href: ROUTES.HOME },
      { title: 'Tentang TEUAS', href: ROUTES.ABOUT },
      { title: 'Galeri', href: ROUTES.GALLERY.ROOT },
    ],
  },
  community: {
    title: 'Komunitas',
    items: [
      { title: 'Berita', href: ROUTES.NEWS.ROOT },
      { title: 'Artikel', href: ROUTES.ALUMNI.ARTICLES.ROOT },
      { title: 'Acara', href: ROUTES.EVENTS.ROOT },
      { title: 'FGD', href: ROUTES.FORUM.DISCUSSIONS },
    ],
  },
  opportunities: {
    title: 'Peluang',
    items: [
      { title: 'Beasiswa', href: ROUTES.SCHOLARSHIPS.ROOT },
      { title: 'Papan Lowongan', href: ROUTES.JOBS.ROOT },
      { title: 'Donasi', href: ROUTES.SCHOLARSHIPS.DONATE },
    ],
  },
  resources: {
    title: 'Sumber Daya',
    items: [
      { title: 'Direktori Alumni', href: ROUTES.ALUMNI.DIRECTORY },
      { title: 'Forum Diskusi', href: ROUTES.FORUM.DISCUSSIONS },
      { title: 'Platform Eksternal', href: ROUTES.FORUM.PLATFORMS },
      { title: 'Mentoring', href: ROUTES.ALUMNI.MENTORSHIP.ROOT },
    ],
  },
} as const;

// Konfigurasi breadcrumb
export const BREADCRUMB_CONFIG = {
  [ROUTES.ALUMNI.ROOT]: [
    { label: 'Beranda', href: ROUTES.HOME },
    { label: 'Alumni', href: ROUTES.ALUMNI.ROOT },
  ],
  [ROUTES.ALUMNI.ARTICLES.ROOT]: [
    { label: 'Beranda', href: ROUTES.HOME },
    { label: 'Alumni', href: ROUTES.ALUMNI.ROOT },
    { label: 'Artikel', href: ROUTES.ALUMNI.ARTICLES.ROOT },
  ],
  [ROUTES.NEWS.ROOT]: [
    { label: 'Beranda', href: ROUTES.HOME },
    { label: 'Berita', href: ROUTES.NEWS.ROOT },
  ],
  [ROUTES.EVENTS.ROOT]: [
    { label: 'Beranda', href: ROUTES.HOME },
    { label: 'Acara', href: ROUTES.EVENTS.ROOT },
  ],
  [ROUTES.GALLERY.ROOT]: [
    { label: 'Beranda', href: ROUTES.HOME },
    { label: 'Galeri', href: ROUTES.GALLERY.ROOT },
  ],
  [ROUTES.FORUM.ROOT]: [
    { label: 'Beranda', href: ROUTES.HOME },
    { label: 'Forum', href: ROUTES.FORUM.ROOT },
  ],
  [ROUTES.SCHOLARSHIPS.ROOT]: [
    { label: 'Beranda', href: ROUTES.HOME },
    { label: 'Beasiswa', href: ROUTES.SCHOLARSHIPS.ROOT },
  ],
  [ROUTES.JOBS.ROOT]: [
    { label: 'Beranda', href: ROUTES.HOME },
    { label: 'Pekerjaan', href: ROUTES.JOBS.ROOT },
  ],
} as const;
