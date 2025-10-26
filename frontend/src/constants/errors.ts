/**
 * Comprehensive error message constants in Bahasa Indonesia
 * Covers Supabase, database, network, and application errors
 */

export const ERROR_MESSAGES = {
  // Authentication Errors
  AUTH: {
    INVALID_CREDENTIALS: 'Email atau kata sandi tidak valid',
    USER_NOT_FOUND: 'Pengguna tidak ditemukan',
    USER_ALREADY_EXISTS: 'Email sudah terdaftar',
    EMAIL_NOT_CONFIRMED: 'Email belum diverifikasi. Silakan periksa email Anda',
    INVALID_EMAIL: 'Format email tidak valid',
    WEAK_PASSWORD: 'Kata sandi terlalu lemah',
    PASSWORD_TOO_SHORT: 'Kata sandi harus minimal 8 karakter',
    SESSION_EXPIRED: 'Sesi Anda telah berakhir. Silakan masuk kembali',
    UNAUTHORIZED: 'Anda tidak memiliki akses. Silakan masuk terlebih dahulu',
    TOKEN_EXPIRED: 'Token keamanan telah kedaluwarsa',
    INVALID_TOKEN: 'Token keamanan tidak valid',
    EMAIL_ALREADY_USED: 'Email sudah digunakan',
    SIGNUP_DISABLED: 'Pendaftaran sementara dinonaktifkan',
    PASSWORD_MISMATCH: 'Kata sandi tidak cocok',
  },

  // Database Errors
  DATABASE: {
    NOT_FOUND: 'Data tidak ditemukan',
    CONNECTION_FAILED: 'Gagal terhubung ke database',
    QUERY_FAILED: 'Gagal mengambil data',
    INSERT_FAILED: 'Gagal menyimpan data',
    UPDATE_FAILED: 'Gagal memperbarui data',
    DELETE_FAILED: 'Gagal menghapus data',
    DUPLICATE_ENTRY: 'Data sudah ada',
    PERMISSION_DENIED: 'Anda tidak memiliki izin untuk mengakses data ini',
    CONSTRAINT_VIOLATION: 'Data tidak memenuhi persyaratan',
    FOREIGN_KEY_VIOLATION:
      'Tidak dapat menghapus karena data terkait dengan data lain',
  },

  // Network Errors
  NETWORK: {
    NO_CONNECTION: 'Tidak ada koneksi internet. Periksa koneksi Anda',
    TIMEOUT: 'Permintaan terlalu lama. Silakan coba lagi',
    SERVER_ERROR: 'Terjadi kesalahan pada server. Silakan coba lagi nanti',
    BAD_REQUEST: 'Permintaan tidak valid',
    SERVICE_UNAVAILABLE: 'Layanan sedang tidak tersedia',
    TOO_MANY_REQUESTS: 'Terlalu banyak permintaan. Silakan tunggu sebentar',
  },

  // Validation Errors
  VALIDATION: {
    REQUIRED_FIELD: 'Field ini wajib diisi',
    INVALID_FORMAT: 'Format tidak valid',
    INVALID_INPUT: 'Input tidak valid. Periksa kembali data Anda',
    MIN_LENGTH: 'Input terlalu pendek',
    MAX_LENGTH: 'Input terlalu panjang',
    INVALID_EMAIL_FORMAT: 'Format email tidak valid',
    INVALID_PHONE: 'Format nomor telepon tidak valid',
    INVALID_DATE: 'Format tanggal tidak valid',
    INVALID_NUMBER: 'Harus berupa angka',
  },

  // Storage/Upload Errors
  STORAGE: {
    UPLOAD_FAILED: 'Gagal mengunggah file',
    FILE_TOO_LARGE: 'Ukuran file terlalu besar',
    INVALID_FILE_TYPE: 'Tipe file tidak didukung',
    DOWNLOAD_FAILED: 'Gagal mengunduh file',
    DELETE_FAILED: 'Gagal menghapus file',
    STORAGE_QUOTA_EXCEEDED: 'Kuota penyimpanan penuh',
  },

  // Profile Errors
  PROFILE: {
    UPDATE_FAILED: 'Gagal memperbarui profil',
    LOAD_FAILED: 'Gagal memuat profil',
    INVALID_DATA: 'Data profil tidak valid',
    AVATAR_UPLOAD_FAILED: 'Gagal mengunggah foto profil',
  },

  // Alumni Errors
  ALUMNI: {
    NOT_FOUND: 'Data alumni tidak ditemukan',
    LOAD_FAILED: 'Gagal memuat data alumni',
    FILTER_FAILED: 'Gagal memfilter data alumni',
    STATS_FAILED: 'Gagal memuat statistik alumni',
  },

  // Generic Errors
  GENERIC: {
    UNKNOWN: 'Terjadi kesalahan yang tidak terduga',
    SOMETHING_WENT_WRONG: 'Terjadi kesalahan. Silakan coba lagi',
    TRY_AGAIN: 'Silakan coba lagi',
    CONTACT_SUPPORT: 'Jika masalah berlanjut, hubungi tim dukungan',
    FEATURE_UNAVAILABLE: 'Fitur ini belum tersedia',
    MAINTENANCE: 'Sistem sedang dalam pemeliharaan',
  },
} as const;

// Success messages for reference
export const SUCCESS_MESSAGES = {
  AUTH: {
    LOGIN_SUCCESS: 'Berhasil masuk',
    LOGOUT_SUCCESS: 'Berhasil keluar',
    REGISTER_SUCCESS: 'Pendaftaran berhasil',
    PASSWORD_RESET_SENT: 'Link reset password telah dikirim ke email Anda',
    PASSWORD_CHANGED: 'Kata sandi berhasil diubah',
    EMAIL_VERIFIED: 'Email berhasil diverifikasi',
  },
  PROFILE: {
    UPDATE_SUCCESS: 'Profil berhasil diperbarui',
    AVATAR_UPDATED: 'Foto profil berhasil diperbarui',
  },
  GENERIC: {
    SAVE_SUCCESS: 'Data berhasil disimpan',
    DELETE_SUCCESS: 'Data berhasil dihapus',
    UPDATE_SUCCESS: 'Data berhasil diperbarui',
  },
} as const;
