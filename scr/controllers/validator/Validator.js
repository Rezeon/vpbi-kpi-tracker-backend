const { z, optional } = require("zod");

const RoleEnum = z.enum(["admin", "user", "leader"], {
  errorMap: () => ({ message: "Role harus berupa 'admin' atau 'user'." }),
});

const NotifTypeEnum = z.enum(["in_app", "email"], {
  errorMap: () => ({ message: "Tipe notifikasi harus 'in_app' atau 'email'." }),
});
const StatusBuktiEnum = z.enum(
  ["draft", "menunggu_verifikasi", "disetujui", "ditolak"],
  {
    errorMap: () => ({
      message: "Tipe status , menunggu_verifikasi, disetujui, ditolak",
    }),
  }
);
const NotifStatusEnum = z.enum(["terkirim", "gagal", "terbaca"], {
  errorMap: () => ({
    message: "Status notifikasi harus 'terkirim', 'gagal', atau 'terbaca'.",
  }),
});

const userSchema = z.object({
  clerkId: z
    .string({ required_error: "clerkId wajib diisi" })
    .min(1, { message: "clerkId tidak boleh kosong" }),

  role: RoleEnum,

  karyawanId: z
    .number({ invalid_type_error: "karyawanId harus berupa angka" })
    .int({ message: "karyawanId harus bilangan bulat" })
    .optional(),

  username: z
    .string({ required_error: "Username wajib diisi" })
    .min(3, { message: "Username minimal 3 karakter" }),

  email: z
    .string({ required_error: "Email wajib diisi" })
    .email({ message: "Format email tidak valid" }),
});

const karyawanSchema = z.object({
  userId: z
    .number({ invalid_type_error: "userId harus berupa angka" })
    .int({ message: "userId harus bilangan bulat" })
    .optional(),

  nama: z
    .string({ required_error: "Nama wajib diisi" })
    .min(1, { message: "Nama tidak boleh kosong" }),

  email: z
    .string({ required_error: "Email wajib diisi" })
    .email({ message: "Format email tidak valid" }),

  posisi: z
    .string({ required_error: "Posisi wajib diisi" })
    .min(1, { message: "Posisi tidak boleh kosong" }),

  divisiId: z
    .number({ invalid_type_error: "divisiId harus berupa angka" })
    .int({ message: "divisiId harus bilangan bulat" }),

  tanggalMasuk: z.coerce.date({
    required_error: "Tanggal masuk wajib diisi",
    invalid_type_error: "Format tanggal tidak valid",
  }),
});

const divisiSchema = z.object({
  leaderId: z
    .number({ invalid_type_error: "leaderId harus berupa angka" })
    .int({ message: "leaderId harus bilangan bulat" }),
  nama: z
    .string({ required_error: "Nama divisi wajib diisi" })
    .min(1, { message: "Nama divisi tidak boleh kosong" }),

  deskripsi: z
    .string({ required_error: "Deskripsi wajib diisi" })
    .min(1, { message: "Deskripsi tidak boleh kosong" }),
});

const matriksKpiSchema = z.object({
  namaKPI: z
    .string({ required_error: "Nama KPI wajib diisi" })
    .min(1, { message: "Nama KPI tidak boleh kosong" }),
  tahun: z
    .number({ required_error: "tahun wajib diisi" })
    .min(1, { message: "tahun tidak boleh kosong" }),
  bulan: z
    .string({ required_error: "bulan wajib diisi" })
    .min(1, { message: "bulan tidak boleh kosong" }),

  deskripsi: z
    .string({ required_error: "Deskripsi wajib diisi" })
    .min(1, { message: "Deskripsi tidak boleh kosong" }),

  bobot: z
    .number({ invalid_type_error: "Bobot harus berupa angka" })
    .min(0, { message: "Bobot tidak boleh negatif" }),
  karyawanId: z
    .number({ invalid_type_error: "karyawanId harus berupa angka" })
    .int({ message: "karyawanId harus bilangan bulat" }),
});

const penilaianKpiSchema = z.object({
  karyawanId: z
    .number({ invalid_type_error: "karyawanId harus berupa angka" })
    .int({ message: "karyawanId harus bilangan bulat" }),

  bulan: z
    .string({ required_error: "Bulan wajib diisi" })
    .min(1, { message: "Bulan tidak boleh kosong" }),
  tahun: z
    .string({ required_error: "tahun wajib diisi" })
    .min(1, { message: "tahun tidak boleh kosong" }),
  totalSkor: z
    .number({ invalid_type_error: "Total skor harus berupa angka" })
    .nullable()
    .optional(),

  dibuatOlehId: z
    .number({ invalid_type_error: "dibuatOlehId harus berupa angka" })
    .int({ message: "dibuatOlehId harus bilangan bulat" }),
});

const detailPenilaianSchema = z.object({
  penilaianId: z
    .number({ invalid_type_error: "penilaianId harus berupa angka" })
    .int({ message: "penilaianId harus bilangan bulat" }),

  matriksId: z
    .number({ invalid_type_error: "matriksId harus berupa angka" })
    .int({ message: "matriksId harus bilangan bulat" }),

  nilai: z.number({ invalid_type_error: "Nilai harus berupa angka" }),
});

const laporanKpiSchema = z.object({
  karyawanId: z
    .number({ invalid_type_error: "karyawanId harus berupa angka" })
    .int({ message: "karyawanId harus bilangan bulat" }),

  bulan: z
    .string({ required_error: "Bulan wajib diisi" })
    .min(1, { message: "Bulan tidak boleh kosong" }),

  rataRata: z.number({ invalid_type_error: "Rata-rata harus berupa angka" }),

  ringkasan: z.string().optional(),
});

const buktiKpiSchema = z.object({
  karyawanId: z
    .number({ invalid_type_error: "harus berupa int" })
    .int({ message: "user harus bilangan bulat" }),
  matriksId: z
    .number({ invalid_type_error: "harus berupa int" })
    .int({ message: "harus berupa bilangan bulat" }),
  bulan: z
    .string({ required_error: "bulan harus diisi" })
    .min(1, { message: "bulan harus diisi" }),
  fileUrl: z
    .string({ required_error: "harus diisi" })
    .min(0, { message: "harus berupa URL yang valid" }),
  deskripsi: z
    .string({ required_error: "harus diisi" })
    .min(1, { message: "deskripsi harus diisi" }),
  status: StatusBuktiEnum,
});

const notifikasiSchema = z.object({
  userId: z
    .number({ invalid_type_error: "userId harus berupa angka" })
    .int({ message: "userId harus bilangan bulat" }),

  judul: z
    .string({ required_error: "Judul wajib diisi" })
    .min(1, { message: "Judul tidak boleh kosong" }),

  pesan: z
    .string({ required_error: "Pesan wajib diisi" })
    .min(1, { message: "Pesan tidak boleh kosong" }),

  tipe: NotifTypeEnum,
  status: NotifStatusEnum,
});

const resetTokenSchema = z.object({
  userId: z
    .number({ invalid_type_error: "userId harus berupa angka" })
    .int({ message: "userId harus bilangan bulat" }),

  token: z
    .string({ required_error: "Token wajib diisi" })
    .min(1, { message: "Token tidak boleh kosong" }),

  expiresAt: z.coerce.date({
    required_error: "Tanggal kadaluarsa wajib diisi",
    invalid_type_error: "Format tanggal kadaluarsa tidak valid",
  }),

  used: z.boolean().optional(),
});

module.exports = {
  userSchema,
  karyawanSchema,
  divisiSchema,
  matriksKpiSchema,
  penilaianKpiSchema,
  detailPenilaianSchema,
  laporanKpiSchema,
  buktiKpiSchema,
  notifikasiSchema,
  resetTokenSchema,
};
