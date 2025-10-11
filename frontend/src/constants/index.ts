// Konstanta dan konfigurasi aplikasi

// Konfigurasi aplikasi
export const APP_CONFIG = {
  name: 'TEUAS UPI',
  fullName: 'Teknik Elektro Unity And Solidarity',
  description: 'Ikatan Alumni Teknik Elektro UPI',
  shortDescription:
    'Menghubungkan alumni teknik elektro dari Universitas Pendidikan Indonesia',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  version: '1.0.0',

  // Informasi kontak
  contact: {
    email: 'info@ikateuas.com',
    phone: '+62 22 2013163',
    address: 'Jl. Dr. Setiabudhi No. 229, Bandung 40154, Indonesia',
  },

  // Tautan media sosial
  social: {
    facebook: 'https://facebook.com/ikateuas',
    instagram: 'https://instagram.com/ikateuas_upi',
    twitter: 'https://twitter.com/ikateuas',
    linkedin: 'https://linkedin.com/company/ikateuas',
    youtube: 'https://youtube.com/c/ikateuas',
  },

  // Konfigurasi API
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
    timeout: 10000,
    version: 'v1',
  },

  // Flag fitur
  features: {
    registration: true,
    forum: true,
    mentorship: true,
    jobs: true,
    scholarships: true,
    events: true,
    gallery: true,
    articles: true,
  },
} as const;

// Konstanta rute
export const ROUTES = {
  // Rute publik
  HOME: '/',
  ABOUT: '/about',
  CONTACT: '/contact',

  // Rute autentikasi
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',

  // Rute alumni
  ALUMNI: {
    ROOT: '/alumni',
    DIRECTORY: '/alumni',
    PROFILE: (id: string) => `/alumni/${id}`,
    EDIT_PROFILE: '/alumni/edit',
    NETWORK: '/alumni/network',

    // Artikel alumni
    ARTICLES: {
      ROOT: '/alumni/articles',
      CREATE: '/alumni/articles/create',
      EDIT: (id: string) => `/alumni/articles/edit/${id}`,
      VIEW: (slug: string) => `/alumni/articles/${slug}`,
      DASHBOARD: '/alumni/articles/dashboard',
    },

    // Mentoring
    MENTORSHIP: {
      ROOT: '/alumni/mentorship',
      FIND_MENTOR: '/alumni/mentorship/find-mentor',
      DASHBOARD: '/alumni/mentorship/dashboard',
    },
  },

  // Rute konten
  NEWS: {
    ROOT: '/news',
    ARTICLE: (slug: string) => `/news/${slug}`,
    CATEGORY: (slug: string) => `/news/category/${slug}`,
  },

  EVENTS: {
    ROOT: '/events',
    DETAIL: (slug: string) => `/events/${slug}`,
    CALENDAR: '/events/calendar',
    REGISTER: (slug: string) => `/events/${slug}/register`,
  },

  GALLERY: {
    ROOT: '/gallery',
    ALBUM: (slug: string) => `/gallery/${slug}`,
    MEDIA: (albumSlug: string, mediaSlug: string) =>
      `/gallery/${albumSlug}/${mediaSlug}`,
  },

  FGD: {
    ROOT: '/fgd',
    DETAIL: (slug: string) => `/fgd/${slug}`,
  },

  // Rute komunitas
  FORUM: {
    ROOT: '/forum',
    DISCUSSIONS: '/forum/discussions',
    DISCUSSION: (id: string) => `/forum/discussions/${id}`,
    CREATE: '/forum/discussions/create',
    PLATFORMS: '/forum/platforms',
  },

  // Rute peluang
  SCHOLARSHIPS: {
    ROOT: '/scholarships',
    DETAIL: (slug: string) => `/scholarships/${slug}`,
    APPLY: (slug: string) => `/scholarships/${slug}/apply`,
    DONATE: '/scholarships/donate',
    MY_APPLICATIONS: '/scholarships/my-applications',
    DONORS: '/scholarships/donors',
  },

  JOBS: {
    ROOT: '/jobs',
    DETAIL: (id: string) => `/jobs/${id}`,
    POST: '/jobs/post',
    APPLICATIONS: '/jobs/applications',
  },

  // Rute admin
  ADMIN: {
    ROOT: '/admin',
    DASHBOARD: '/admin',

    USERS: {
      ROOT: '/admin/users',
      PENDING: '/admin/users/pending',
      DETAIL: (id: string) => `/admin/users/${id}`,
    },

    CONTENT: {
      ROOT: '/admin/content',
      NEWS: '/admin/content/news',
      EVENTS: '/admin/content/events',
      MEDIA: '/admin/content/media',
      ARTICLES: '/admin/content/articles',
    },

    ANALYTICS: '/admin/analytics',
    SETTINGS: '/admin/settings',
  },

  // Rute utilitas
  SEARCH: '/search',
  PRIVACY: '/privacy',
  TERMS: '/terms',
  SITEMAP: '/sitemap.xml',
} as const;

// Program akademik dan jurusan
export const MAJORS = [
  'Teknik Elektro',
  'Teknik Elektronika',
  'Teknik Telekomunikasi',
  'Teknik Komputer',
  'Teknik Informatika',
  'Sistem Informasi',
] as const;

// Tahun kelulusan (35 tahun terakhir)
export const GRADUATION_YEARS = Array.from(
  { length: 35 },
  (_, i) => new Date().getFullYear() - i
);

// Peran pengguna
export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  MODERATOR: 'moderator',
} as const;

// Kategori artikel
export const ARTICLE_CATEGORIES = [
  { id: 'technology', name: 'Teknologi', color: '#3B82F6' },
  { id: 'career', name: 'Pengembangan Karir', color: '#10B981' },
  { id: 'research', name: 'Penelitian & Inovasi', color: '#8B5CF6' },
  { id: 'industry', name: 'Wawasan Industri', color: '#F59E0B' },
  { id: 'education', name: 'Pendidikan', color: '#EF4444' },
  { id: 'entrepreneurship', name: 'Kewirausahaan', color: '#EC4899' },
  { id: 'lifestyle', name: 'Gaya Hidup', color: '#6B7280' },
] as const;

// Kategori acara
export const EVENT_CATEGORIES = [
  { id: 'networking', name: 'Networking', color: '#3B82F6', icon: 'Users' },
  { id: 'workshop', name: 'Workshop', color: '#10B981', icon: 'Tool' },
  { id: 'seminar', name: 'Seminar', color: '#8B5CF6', icon: 'Presentation' },
  {
    id: 'conference',
    name: 'Konferensi',
    color: '#F59E0B',
    icon: 'Microphone',
  },
  { id: 'social', name: 'Acara Sosial', color: '#EF4444', icon: 'Heart' },
  { id: 'career', name: 'Bursa Kerja', color: '#EC4899', icon: 'Briefcase' },
  { id: 'reunion', name: 'Reuni', color: '#06B6D4', icon: 'Calendar' },
] as const;

// Kategori formulir kontak
export const CONTACT_CATEGORIES = [
  { value: 'general', label: 'Pertanyaan Umum' },
  { value: 'alumni-services', label: 'Layanan Alumni' },
  { value: 'technical', label: 'Dukungan Teknis' },
  { value: 'partnerships', label: 'Kemitraan' },
  { value: 'media', label: 'Pertanyaan Media' },
  { value: 'feedback', label: 'Umpan Balik' },
] as const;

// Batasan unggahan file
export const UPLOAD_LIMITS = {
  IMAGE: {
    maxSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
    maxWidth: 2048,
    maxHeight: 2048,
  },
  DOCUMENT: {
    maxSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ],
  },
  VIDEO: {
    maxSize: 100 * 1024 * 1024, // 100MB
    allowedTypes: ['video/mp4', 'video/webm', 'video/ogg'],
  },
} as const;

// Default paginasi
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
  ITEMS_PER_PAGE_OPTIONS: [10, 20, 50, 100],
} as const;

// Konfigurasi tema
export const THEME = {
  COLORS: {
    PRIMARY: '#1E40AF', // Blue
    SECONDARY: '#059669', // Green
    ACCENT: '#7C3AED', // Purple
    WARNING: '#D97706', // Orange
    DANGER: '#DC2626', // Red
    SUCCESS: '#059669', // Green
  },
  FONTS: {
    SANS: ['Inter', 'system-ui', 'sans-serif'],
    MONO: ['Fira Code', 'Monaco', 'Consolas', 'monospace'],
  },
} as const;

// Durasi animasi
export const ANIMATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
  EXTRA_SLOW: 1000,
} as const;

// Breakpoint (harus sesuai dengan konfigurasi Tailwind)
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const;

// Kunci penyimpanan lokal
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'ika_teuas_auth_token',
  USER_PREFERENCES: 'ika_teuas_user_preferences',
  THEME: 'ika_teuas_theme',
  LANGUAGE: 'ika_teuas_language',
  SEARCH_HISTORY: 'ika_teuas_search_history',
  DRAFT_ARTICLES: 'ika_teuas_draft_articles',
} as const;

// Pesan kesalahan
export const ERROR_MESSAGES = {
  NETWORK: 'Kesalahan jaringan. Periksa koneksi internet Anda.',
  UNAUTHORIZED: 'Anda tidak berwenang untuk melakukan tindakan ini.',
  FORBIDDEN: 'Akses ditolak. Silakan hubungi administrator.',
  NOT_FOUND: 'Sumber daya yang diminta tidak ditemukan.',
  VALIDATION: 'Periksa input Anda dan coba lagi.',
  SERVER: 'Kesalahan server. Silakan coba lagi nanti.',
  UNKNOWN: 'Terjadi kesalahan yang tidak terduga.',
} as const;

// Pesan sukses
export const SUCCESS_MESSAGES = {
  SAVE: 'Perubahan berhasil disimpan',
  CREATE: 'Berhasil dibuat',
  UPDATE: 'Berhasil diperbarui',
  DELETE: 'Berhasil dihapus',
  SEND: 'Berhasil dikirim',
  UPLOAD: 'Berhasil diunggah',
  LOGIN: 'Berhasil masuk',
  LOGOUT: 'Berhasil keluar',
  REGISTER: 'Pendaftaran berhasil diselesaikan',
} as const;
