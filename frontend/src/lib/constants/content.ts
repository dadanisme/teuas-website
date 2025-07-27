// Mock data for content management development

import {
  NewsArticle,
  NewsCategory,
  Event,
  EventCategory,
  MediaItem,
  MediaAlbum,
  Scholarship,
} from '@/types/content';

// Mock news categories
export const MOCK_NEWS_CATEGORIES: NewsCategory[] = [
  {
    id: 1,
    name: 'Berita Umum',
    slug: 'berita-umum',
    description: 'Berita umum seputar IKA TEUAS',
    color: '#3B82F6',
  },
  {
    id: 2,
    name: 'Prestasi Alumni',
    slug: 'prestasi-alumni',
    description: 'Prestasi dan pencapaian alumni',
    color: '#10B981',
  },
  {
    id: 3,
    name: 'Teknologi',
    slug: 'teknologi',
    description: 'Perkembangan teknologi terkini',
    color: '#8B5CF6',
  },
  {
    id: 4,
    name: 'Karir',
    slug: 'karir',
    description: 'Informasi karir dan lowongan kerja',
    color: '#F59E0B',
  },
  {
    id: 5,
    name: 'Penelitian',
    slug: 'penelitian',
    description: 'Hasil penelitian dan inovasi',
    color: '#EF4444',
  },
];

// Mock news articles
export const MOCK_NEWS_ARTICLES: NewsArticle[] = [
  {
    id: 1,
    title: 'Alumni TEUAS Raih Penghargaan Inovasi Teknologi 2024',
    content: `<p>Kami dengan bangga mengumumkan bahwa salah satu alumni TEUAS UPI, Dr. Ahmad Fauzi (Angkatan 2010), telah meraih penghargaan bergengsi "Inovasi Teknologi Terbaik 2024" dari Kementerian Riset dan Teknologi.</p>

<p>Penghargaan ini diberikan atas kontribusinya dalam mengembangkan sistem smart grid yang revolusioner untuk optimalisasi distribusi energi listrik di Indonesia. Inovasi ini telah diimplementasikan di beberapa kota besar dan terbukti mampu meningkatkan efisiensi energi hingga 30%.</p>

<p>"Saya sangat bangga bisa berkontribusi untuk kemajuan teknologi Indonesia. Semua ini tidak lepas dari fondasi ilmu yang saya dapatkan selama kuliah di Teknik Elektro UPI," ujar Dr. Ahmad Fauzi dalam sambutannya.</p>

<p>Prestasi ini semakin memperkuat reputasi alumni TEUAS UPI di kancah nasional dan internasional. Kami berharap pencapaian ini dapat menginspirasi alumni lainnya untuk terus berinovasi dan berkontribusi bagi bangsa.</p>`,
    excerpt:
      'Dr. Ahmad Fauzi, alumni TEUAS UPI angkatan 2010, meraih penghargaan Inovasi Teknologi Terbaik 2024 atas pengembangan sistem smart grid yang revolusioner.',
    featuredImage:
      'https://images.unsplash.com/photo-1753103098469-29b6e6bec545?q=80&w=2998&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    authorId: 1,
    author: {
      id: 1,
      email: 'admin@ikateuas.com',
      fullName: 'Admin IKA TEUAS',
      role: 'admin',
    },
    category: MOCK_NEWS_CATEGORIES[1],
    tags: ['prestasi', 'teknologi', 'smart grid', 'inovasi'],
    status: 'published',
    publishedAt: '2024-01-15T10:00:00Z',
    createdAt: '2024-01-14T15:30:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    viewCount: 1250,
    slug: 'alumni-teuas-raih-penghargaan-inovasi-teknologi-2024',
  },
  {
    id: 2,
    title: 'Workshop "AI dalam Teknik Elektro" Sukses Diselenggarakan',
    content: `<p>IKA TEUAS UPI berhasil menyelenggarakan workshop bertema "Artificial Intelligence dalam Teknik Elektro: Peluang dan Tantangan" pada Sabtu, 13 Januari 2024. Workshop yang dihadiri oleh lebih dari 200 peserta ini menghadirkan pembicara-pembicara terkemuka di bidang AI dan teknik elektro.</p>

<p>Acara dibuka oleh Ketua IKA TEUAS, Prof. Dr. Budi Santoso, yang menekankan pentingnya adaptasi teknologi AI dalam dunia teknik elektro modern. "AI bukan lagi masa depan, tetapi sudah menjadi kenyataan yang harus kita kuasai," ujarnya.</p>

<p>Workshop ini menghadirkan tiga sesi utama:</p>
<ul>
<li>Pengenalan AI untuk Engineer Elektro</li>
<li>Implementasi Machine Learning dalam Power System</li>
<li>Future Trends: IoT dan Smart City</li>
</ul>

<p>Para peserta mendapat kesempatan untuk hands-on practice menggunakan tools AI terbaru dan networking dengan sesama profesional. Antusiasme peserta sangat tinggi, terbukti dari banyaknya pertanyaan dan diskusi yang berlangsung hingga sesi penutupan.</p>`,
    excerpt:
      'Workshop AI dalam Teknik Elektro yang diselenggarakan IKA TEUAS sukses dihadiri 200+ peserta dengan materi hands-on practice dan networking.',
    featuredImage:
      'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop&crop=center',
    authorId: 2,
    author: {
      id: 2,
      email: 'humas@ikateuas.com',
      fullName: 'Tim Humas IKA TEUAS',
      role: 'user',
    },
    category: MOCK_NEWS_CATEGORIES[2],
    tags: ['workshop', 'AI', 'machine learning', 'teknologi'],
    status: 'published',
    publishedAt: '2024-01-14T08:00:00Z',
    createdAt: '2024-01-13T20:00:00Z',
    updatedAt: '2024-01-14T08:00:00Z',
    viewCount: 890,
    slug: 'workshop-ai-dalam-teknik-elektro-sukses-diselenggarakan',
  },
  {
    id: 3,
    title: 'Lowongan Kerja: Senior Electrical Engineer di PT Teknologi Maju',
    content: `<p>PT Teknologi Maju, perusahaan teknologi terdepan di Indonesia, membuka kesempatan karir untuk posisi Senior Electrical Engineer. Posisi ini terbuka khusus untukteknik elektro dengan pengalaman minimal 5 tahun.</p>

<h3>Persyaratan:</h3>
<ul>
<li>S1 Teknik Elektro dari universitas terakreditasi</li>
<li>Pengalaman minimal 5 tahun di bidang power system atau automation</li>
<li>Menguasai software AutoCAD, ETAP, dan PLC programming</li>
<li>Memiliki sertifikasi profesional (nilai plus)</li>
<li>Kemampuan komunikasi yang baik</li>
</ul>

<h3>Tanggung Jawab:</h3>
<ul>
<li>Merancang dan menganalisis sistem kelistrikan</li>
<li>Melakukan commissioning dan troubleshooting</li>
<li>Memimpin tim project engineering</li>
<li>Berkoordinasi dengan client dan vendor</li>
</ul>

<h3>Benefit:</h3>
<ul>
<li>Gaji kompetitif sesuai pengalaman</li>
<li>Asuransi kesehatan dan jiwa</li>
<li>Tunjangan transportasi dan makan</li>
<li>Pelatihan dan pengembangan karir</li>
<li>Bonus kinerja tahunan</li>
</ul>

<p>Kirim CV dan portfolio ke: recruitment@teknologimaju.com dengan subject "Senior Electrical Engineer - [Nama Anda]"</p>`,
    excerpt:
      'PT Teknologi Maju membuka lowongan Senior Electrical Engineer untuk alumni teknik elektro berpengalaman minimal 5 tahun dengan benefit menarik.',
    featuredImage:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&crop=center',
    authorId: 1,
    category: MOCK_NEWS_CATEGORIES[3],
    tags: ['lowongan kerja', 'senior engineer', 'karir', 'teknologi'],
    status: 'published',
    publishedAt: '2024-01-12T09:00:00Z',
    createdAt: '2024-01-11T16:00:00Z',
    updatedAt: '2024-01-12T09:00:00Z',
    viewCount: 2100,
    slug: 'lowongan-kerja-senior-electrical-engineer-pt-teknologi-maju',
  },
  {
    id: 4,
    title: 'Penelitian Terbaru: Optimalisasi Panel Surya dengan AI',
    content: `<p>Tim peneliti dari IKA TEUAS UPI berkolaborasi dengan Institut Teknologi Bandung (ITB) berhasil mengembangkan sistem optimalisasi panel surya menggunakan artificial intelligence yang dapat meningkatkan efisiensi hingga 25%.</p>

<p>Penelitian yang dipimpin oleh Dr. Sari Indrawati (Alumni TEUAS 2008) ini menggunakan algoritma machine learning untuk memprediksi kondisi cuaca dan mengoptimalkan sudut panel surya secara real-time.</p>

<p>"Sistem ini dapat secara otomatis menyesuaikan posisi panel surya berdasarkan prediksi intensitas cahaya matahari, arah angin, dan kondisi cuaca lainnya," jelasnya.</p>

<p>Hasil penelitian ini telah dipublikasikan di jurnal internasional "Renewable Energy Systems" dan mendapat apresiasi tinggi dari komunitas ilmiah global. Sistem ini juga telah dipatenkan dan siap untuk dikomersialkan.</p>

<p>Kolaborasi antara alumni dan institusi pendidikan ini menunjukkan komitmen IKA TEUAS dalam mendorong inovasi dan penelitian berkelanjutan di bidang energi terbarukan.</p>`,
    excerpt:
      'Tim peneliti IKA TEUAS berkolaborasi dengan ITB mengembangkan sistem AI untuk optimalisasi panel surya yang meningkatkan efisiensi hingga 25%.',
    featuredImage:
      'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=600&fit=crop&crop=center',
    authorId: 3,
    author: {
      id: 3,
      email: 'research@ikateuas.com',
      fullName: 'Tim Penelitian IKA TEUAS',
      role: 'user',
    },
    category: MOCK_NEWS_CATEGORIES[4],
    tags: ['penelitian', 'AI', 'panel surya', 'energi terbarukan'],
    status: 'published',
    publishedAt: '2024-01-10T14:00:00Z',
    createdAt: '2024-01-09T10:00:00Z',
    updatedAt: '2024-01-10T14:00:00Z',
    viewCount: 1580,
    slug: 'penelitian-terbaru-optimalisasi-panel-surya-dengan-ai',
  },
  {
    id: 5,
    title: 'Reuni Akbar Alumni TEUAS 2024: "Membangun Masa Depan Bersama"',
    content: `<p>IKA TEUAS UPI akan menggelar Reuni Akbar Alumni 2024 dengan tema "Membangun Masa Depan Bersama" pada tanggal 15-16 Februari 2024 di Hotel Grand Preanger, Bandung.</p>

<p>Acara yang diperkirakan akan dihadiri oleh lebih dari 500 alumni dari berbagai angkatan ini akan menampilkan berbagai kegiatan menarik:</p>

<h3>Hari Pertama (15 Februari):</h3>
<ul>
<li>09:00 - Registrasi dan Welcome Coffee</li>
<li>10:00 - Pembukaan dan Sambutan Ketua IKA TEUAS</li>
<li>11:00 - Keynote Speech: "Future of Electrical Engineering"</li>
<li>13:00 - Lunch dan Networking Session</li>
<li>15:00 - Panel Discussion: "Alumni Success Stories"</li>
<li>19:00 - Gala Dinner dan Entertainment</li>
</ul>

<h3>Hari Kedua (16 Februari):</h3>
<ul>
<li>09:00 - Technical Workshop</li>
<li>11:00 - Alumni Business Expo</li>
<li>13:00 - Lunch dan Photo Session</li>
<li>15:00 - Penutupan</li>
</ul>

<p>Pendaftaran sudah dibuka melalui website resmi dengan early bird price hingga 31 Januari 2024. Jangan lewatkan kesempatan untuk bertemu kembali dengan teman-teman lama dan membangun jaringan profesional yang lebih kuat!</p>`,
    excerpt:
      'Reuni Akbar Alumni TEUAS 2024 akan digelar 15-16 Februari di Hotel Grand Preanger Bandung dengan berbagai kegiatan menarik dan networking session.',
    featuredImage:
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop&crop=center',
    authorId: 1,
    category: MOCK_NEWS_CATEGORIES[0],
    tags: ['reuni', 'alumni', 'networking', 'acara'],
    status: 'published',
    publishedAt: '2024-01-08T12:00:00Z',
    createdAt: '2024-01-07T14:00:00Z',
    updatedAt: '2024-01-08T12:00:00Z',
    viewCount: 3200,
    slug: 'reuni-akbar-alumni-teuas-2024-membangun-masa-depan-bersama',
  },
];

// Mock event categories
export const MOCK_EVENT_CATEGORIES: EventCategory[] = [
  { id: 1, name: 'Workshop', slug: 'workshop', color: '#3B82F6', icon: 'Tool' },
  {
    id: 2,
    name: 'Seminar',
    slug: 'seminar',
    color: '#10B981',
    icon: 'Presentation',
  },
  {
    id: 3,
    name: 'Networking',
    slug: 'networking',
    color: '#8B5CF6',
    icon: 'Users',
  },
  { id: 4, name: 'Reuni', slug: 'reuni', color: '#F59E0B', icon: 'Calendar' },
  {
    id: 5,
    name: 'Konferensi',
    slug: 'konferensi',
    color: '#EF4444',
    icon: 'Microphone',
  },
];

// Mock events
export const MOCK_EVENTS: Event[] = [
  {
    id: 1,
    title: 'Workshop Internet of Things (IoT) untuk Smart Home',
    description: `Workshop intensif tentang implementasi IoT dalam smart home system. Peserta akan belajar dari dasar hingga implementasi praktis menggunakan Arduino, Raspberry Pi, dan berbagai sensor.

Materi yang akan dibahas:
- Pengenalan IoT dan ekosistemnya
- Microcontroller dan sensor untuk IoT
- Protokol komunikasi (WiFi, Bluetooth, LoRa)
- Cloud platform dan data analytics
- Hands-on project: Smart Home Monitoring System

Workshop ini cocok untuk alumni yang ingin mengembangkan skill di bidang IoT atau yang sedang merencanakan bisnis di sektor smart technology.`,
    shortDescription:
      'Workshop intensif IoT untuk smart home dengan hands-on project menggunakan Arduino dan Raspberry Pi.',
    featuredImage:
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop&crop=center',
    eventDate: '2024-02-20T09:00:00Z',
    endDate: '2024-02-20T17:00:00Z',
    location: 'Bandung, Jawa Barat',
    venue: 'Lab Teknik Elektro UPI, Gedung FPTK Lt. 3',
    registrationUrl: 'https://forms.gle/iot-workshop-2024',
    registrationDeadline: '2024-02-15T23:59:59Z',
    maxAttendees: 30,
    currentAttendees: 18,
    price: 150000,
    currency: 'IDR',
    category: MOCK_EVENT_CATEGORIES[0],
    tags: ['IoT', 'smart home', 'Arduino', 'workshop'],
    organizer: {
      name: 'Divisi Teknologi IKA TEUAS',
      email: 'tech@ikateuas.com',
      phone: '+62812345678',
    },
    status: 'upcoming',
    isPublic: true,
    requiresRegistration: true,
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-15T14:30:00Z',
    slug: 'workshop-iot-smart-home-februari-2024',
  },
  {
    id: 2,
    title: 'Seminar Nasional: "Masa Depan Energi Terbarukan di Indonesia"',
    description: `Seminar nasional yang menghadirkan para ahli energi terbarukan dari berbagai institusi terkemuka untuk membahas perkembangan dan tantangan energi terbarukan di Indonesia.

Pembicara:
- Prof. Dr. Ir. Ahmad Agus Setiawan (ITB) - "Teknologi Solar Cell Terkini"
- Dr. Ir. Maria Listiani (UI) - "Wind Energy Potential in Indonesia"
- Ir. Bambang Riyanto, M.Sc (UGM) - "Grid Integration Challenges"
- Dr. Sari Indrawati (Alumni TEUAS) - "AI in Renewable Energy Systems"

Target peserta: Akademisi, praktisi, mahasiswa, dan profesional di bidang energi.`,
    shortDescription:
      'Seminar nasional tentang masa depan energi terbarukan dengan pembicara ahli dari ITB, UI, UGM.',
    featuredImage:
      'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&h=600&fit=crop&crop=center',
    eventDate: '2024-03-05T08:00:00Z',
    endDate: '2024-03-05T16:00:00Z',
    location: 'Jakarta, DKI Jakarta',
    venue: 'Auditorium Universitas Indonesia, Depok',
    registrationUrl: 'https://forms.gle/renewable-energy-seminar',
    registrationDeadline: '2024-02-28T23:59:59Z',
    maxAttendees: 200,
    currentAttendees: 85,
    price: 0,
    currency: 'IDR',
    category: MOCK_EVENT_CATEGORIES[1],
    tags: ['energi terbarukan', 'seminar', 'solar', 'wind energy'],
    organizer: {
      name: 'IKA TEUAS UPI',
      email: 'event@ikateuas.com',
      phone: '+62812345679',
    },
    status: 'upcoming',
    isPublic: true,
    requiresRegistration: true,
    createdAt: '2024-01-05T09:00:00Z',
    updatedAt: '2024-01-12T11:00:00Z',
    slug: 'seminar-nasional-masa-depan-energi-terbarukan',
  },
];

// Mock media albums
export const MOCK_MEDIA_ALBUMS: MediaAlbum[] = [
  {
    id: 1,
    title: 'Workshop AI 2024',
    description:
      'Dokumentasi workshop Artificial Intelligence dalam Teknik Elektro',
    coverImage:
      'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop&crop=center',
    itemCount: 25,
    createdBy: 1,
    creator: {
      id: 1,
      email: 'admin@ikateuas.com',
      fullName: 'Admin IKA TEUAS',
      role: 'admin',
    },
    isPublic: true,
    tags: ['workshop', 'AI', '2024'],
    createdAt: '2024-01-14T10:00:00Z',
    updatedAt: '2024-01-14T18:00:00Z',
    slug: 'workshop-ai-2024',
  },
  {
    id: 2,
    title: 'Reuni Alumni 2023',
    description: 'Momen-momen berharga dari Reuni Alumni TEUAS 2023',
    coverImage:
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop&crop=center',
    itemCount: 45,
    createdBy: 2,
    creator: {
      id: 2,
      email: 'humas@ikateuas.com',
      fullName: 'Tim Humas IKA TEUAS',
      role: 'user',
    },
    isPublic: true,
    tags: ['reuni', 'alumni', '2023'],
    createdAt: '2023-12-15T14:00:00Z',
    updatedAt: '2023-12-20T16:00:00Z',
    slug: 'reuni-alumni-2023',
  },
];

// Mock media items
export const MOCK_MEDIA_ITEMS: MediaItem[] = [
  {
    id: 1,
    title: 'Pembukaan Workshop AI',
    description: 'Sambutan ketua IKA TEUAS pada pembukaan workshop AI',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1920&h=1080&fit=crop&crop=center',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop&crop=center',
    altText: 'Ketua IKA TEUAS memberikan sambutan pembukaan',
    fileSize: 2048576,
    dimensions: { width: 1920, height: 1080 },
    uploadedBy: 1,
    albumId: 1,
    album: MOCK_MEDIA_ALBUMS[0],
    tags: ['pembukaan', 'sambutan', 'ketua'],
    capturedAt: '2024-01-13T09:30:00Z',
    uploadedAt: '2024-01-14T10:15:00Z',
    isPublic: true,
    downloadCount: 15,
    slug: 'pembukaan-workshop-ai',
  },
  {
    id: 2,
    title: 'Sesi Hands-on Practice',
    description: 'Peserta workshop sedang melakukan praktik langsung',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&h=1080&fit=crop&crop=center',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop&crop=center',
    altText: 'Peserta workshop melakukan hands-on practice',
    fileSize: 1856432,
    dimensions: { width: 1920, height: 1080 },
    uploadedBy: 1,
    albumId: 1,
    album: MOCK_MEDIA_ALBUMS[0],
    tags: ['hands-on', 'praktik', 'peserta'],
    capturedAt: '2024-01-13T14:00:00Z',
    uploadedAt: '2024-01-14T11:00:00Z',
    isPublic: true,
    downloadCount: 8,
    slug: 'sesi-hands-on-practice',
  },
];

// Mock Scholarships
export const MOCK_SCHOLARSHIP_CATEGORIES: EventCategory[] = [
  { id: 1, 
    name: 'Education Scholarship', 
    slug: 'education-scholarship', 
    color: '#3B82F6', 
    icon: 'Tool' },
  {
    id: 2,
    name: 'Internal Scholarship',
    slug: 'internal-scholarship',
    color: '#10B981',
    icon: 'Presentation',
  },
  {
    id: 3,
    name: 'Company Scholarship',
    slug: 'company-scholarship',
    color: '#8B5CF6',
    icon: 'Users',
  },
];

export const MOCK_SCHOLARSHIPS: Scholarship[] = [
  {
    id: 1,
    title: 'Beasiswa Prestasi Teknik Elektro 2024',
    description: `Beasiswa bantuan sebesar 3 juta rupiah. `,
    shortDescription: 'Beasiswa bantuan sebesar 3 juta rupiah.',
    scholarshipType: 'partial',
    eventDate: '2024-02-20T09:00:00Z',
    endDate: '2024-02-20T17:00:00Z',
    registrationUrl: 'https://forms.gle/ika-teuas-beasiswa-2024',
    registrationDeadline: '2024-02-15T23:59:59Z',
    category: MOCK_SCHOLARSHIP_CATEGORIES[0],
    organizer: {
      name: 'Divisi Teknologi IKA TEUAS',
      email: 'tech@ikateuas.com',
      phone: '+62812345678',
    },
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-15T14:30:00Z',
    slug: 'beasiswa-prestasi-teknik-elektro-2024',
    featuredImage:
      'https://images.unsplash.com/photo-1753103098469-29b6e6bec545?q=80&w=2998&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    tags: ['beasiswa', 'prestasi', 'teknik elektro'],
    status: 'upcoming',
    requiresRegistration: true,
    requirements:[
      'Mahasiswa aktif program S1 Teknik Elektro semester 5 atau 7',
      'IPK minimal 3.75 dari skala 4.00',
      'Tidak sedang menerima beasiswa lain',
      'Surat rekomendasi dari Ketua Program Studi',
      'Membuat esai 1000 kata tentang kontribusi di bidang teknologi',
    ]
  },
  {
    id: 2,
    title: 'Beasiswa Alumni Cemerlang 2024',
    description: `Diperuntukkan bagi alumni dengan kontribusi luar biasa di bidang sosial. Total bantuan sebesar 5 juta rupiah.`,
    shortDescription: 'Beasiswa bagi alumni berprestasi bidang sosial.',
    scholarshipType: 'full',
    eventDate: '2024-03-10T08:00:00Z',
    endDate: '2024-03-10T16:00:00Z',
    registrationUrl: 'https://bit.ly/alumni-cemerlang-2024',
    registrationDeadline: '2024-03-01T23:59:59Z',
    category: MOCK_SCHOLARSHIP_CATEGORIES[1],
    organizer: {
      name: 'Forum Alumni Teknik TEUAS',
      email: 'alumni@ikateuas.com',
      phone: '+62898765432',
    },
    createdAt: '2024-01-20T11:00:00Z',
    updatedAt: '2024-01-25T09:00:00Z',
    slug: 'beasiswa-alumni-cemerlang-2024',
    featuredImage:
      'https://images.unsplash.com/photo-1753103098469-29b6e6bec545?q=80&w=2998&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    tags: ['beasiswa', 'prestasi', 'soshum'],
    status: 'upcoming',
    requiresRegistration: true,
    requirements:[
      'Mahasiswa aktif program S1 Teknik Elektro semester 5 atau 7',
      'IPK minimal 3.75 dari skala 4.00',
      'Tidak sedang menerima beasiswa lain',
      'Surat rekomendasi dari Ketua Program Studi',
      'Membuat esai 1000 kata tentang kontribusi di bidang teknologi',
    ]
  },
  {
    id: 3,
    title: 'Beasiswa Kemitraan Industri 2024',
    description: `Beasiswa parsial dari perusahaan mitra bagi mahasiswa tingkat akhir. Nilai beasiswa hingga 7 juta rupiah.`,
    shortDescription: 'Beasiswa dari perusahaan mitra untuk mahasiswa tingkat akhir.',
    scholarshipType: 'partial',
    eventDate: '2024-04-05T10:00:00Z',
    endDate: '2024-04-05T15:00:00Z',
    registrationUrl: 'https://daftar.teuas.com/kemitraan-2024',
    registrationDeadline: '2024-03-25T23:59:59Z',
    category: MOCK_SCHOLARSHIP_CATEGORIES[2],
    organizer: {
      name: 'Biro Kemitraan & Karir TEUAS',
      email: 'kemitraan@teuas.ac.id',
      phone: '+6281122334455',
    },
    createdAt: '2024-02-01T08:30:00Z',
    updatedAt: '2024-02-10T13:15:00Z',
    slug: 'beasiswa-kemitraan-industri-2024',
    featuredImage:
      'https://images.unsplash.com/photo-1753103098469-29b6e6bec545?q=80&w=2998&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    tags: ['beasiswa', 'prestasi', 'umum'],
    status: 'upcoming',
    requiresRegistration: true,
    requirements:[
      'Mahasiswa aktif program S1 Teknik Elektro semester 5 atau 7',
      'IPK minimal 3.75 dari skala 4.00',
      'Tidak sedang menerima beasiswa lain',
      'Surat rekomendasi dari Ketua Program Studi',
      'Membuat esai 1000 kata tentang kontribusi di bidang teknologi',
    ]
  },
  {
    id: 4,
    title: 'Beasiswa Kemitraan Industri 2023',
    description: `Beasiswa parsial dari perusahaan mitra bagi mahasiswa tingkat akhir. Nilai beasiswa hingga 7 juta rupiah.`,
    shortDescription: 'Beasiswa dari perusahaan mitra untuk mahasiswa tingkat akhir.',
    scholarshipType: 'partial',
    eventDate: '2024-04-05T10:00:00Z',
    endDate: '2024-04-05T15:00:00Z',
    registrationUrl: 'https://daftar.teuas.com/kemitraan-2024',
    registrationDeadline: '2024-03-25T23:59:59Z',
    category: MOCK_SCHOLARSHIP_CATEGORIES[2],
    organizer: {
      name: 'Biro Kemitraan & Karir TEUAS',
      email: 'kemitraan@teuas.ac.id',
      phone: '+6281122334455',
    },
    createdAt: '2024-02-01T08:30:00Z',
    updatedAt: '2024-02-10T13:15:00Z',
    slug: 'beasiswa-kemitraan-industri-2024',
    featuredImage:
      'https://images.unsplash.com/photo-1753103098469-29b6e6bec545?q=80&w=2998&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    tags: ['beasiswa', 'prestasi', 'umum'],
    status: 'completed',
    requiresRegistration: true,
    requirements:[
      'Mahasiswa aktif program S1 Teknik Elektro semester 5 atau 7',
      'IPK minimal 3.75 dari skala 4.00',
      'Tidak sedang menerima beasiswa lain',
      'Surat rekomendasi dari Ketua Program Studi',
      'Membuat esai 1000 kata tentang kontribusi di bidang teknologi',
    ]
  },
];