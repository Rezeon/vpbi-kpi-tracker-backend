-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('admin', 'user');

-- CreateEnum
CREATE TYPE "public"."NotifType" AS ENUM ('in_app', 'email');

-- CreateEnum
CREATE TYPE "public"."NotifStatus" AS ENUM ('terkirim', 'gagal', 'terbaca');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "clerkId" TEXT NOT NULL,
    "role" "public"."Role" NOT NULL,
    "karyawanId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Karyawan" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "nama" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "posisi" TEXT NOT NULL,
    "divisiId" INTEGER NOT NULL,
    "tanggalMasuk" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Karyawan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Divisi" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Divisi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."MatriksKPI" (
    "id" SERIAL NOT NULL,
    "namaKPI" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "bobot" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MatriksKPI_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PenilaianKPI" (
    "id" SERIAL NOT NULL,
    "karyawanId" INTEGER NOT NULL,
    "bulan" TEXT NOT NULL,
    "totalSkor" DOUBLE PRECISION NOT NULL,
    "dibuatOlehId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PenilaianKPI_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."DetailPenilaian" (
    "id" SERIAL NOT NULL,
    "penilaianId" INTEGER NOT NULL,
    "matriksId" INTEGER NOT NULL,
    "nilai" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "DetailPenilaian_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."LaporanKPI" (
    "id" SERIAL NOT NULL,
    "karyawanId" INTEGER NOT NULL,
    "bulan" TEXT NOT NULL,
    "rataRata" DOUBLE PRECISION NOT NULL,
    "ringkasan" TEXT,

    CONSTRAINT "LaporanKPI_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Notifikasi" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "judul" TEXT NOT NULL,
    "pesan" TEXT NOT NULL,
    "tipe" "public"."NotifType" NOT NULL,
    "status" "public"."NotifStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notifikasi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ResetToken" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "used" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ResetToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkId_key" ON "public"."User"("clerkId");

-- CreateIndex
CREATE UNIQUE INDEX "User_karyawanId_key" ON "public"."User"("karyawanId");

-- CreateIndex
CREATE UNIQUE INDEX "Karyawan_userId_key" ON "public"."Karyawan"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Karyawan_email_key" ON "public"."Karyawan"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ResetToken_token_key" ON "public"."ResetToken"("token");

-- AddForeignKey
ALTER TABLE "public"."Karyawan" ADD CONSTRAINT "Karyawan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Karyawan" ADD CONSTRAINT "Karyawan_divisiId_fkey" FOREIGN KEY ("divisiId") REFERENCES "public"."Divisi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PenilaianKPI" ADD CONSTRAINT "PenilaianKPI_karyawanId_fkey" FOREIGN KEY ("karyawanId") REFERENCES "public"."Karyawan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PenilaianKPI" ADD CONSTRAINT "PenilaianKPI_dibuatOlehId_fkey" FOREIGN KEY ("dibuatOlehId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DetailPenilaian" ADD CONSTRAINT "DetailPenilaian_penilaianId_fkey" FOREIGN KEY ("penilaianId") REFERENCES "public"."PenilaianKPI"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DetailPenilaian" ADD CONSTRAINT "DetailPenilaian_matriksId_fkey" FOREIGN KEY ("matriksId") REFERENCES "public"."MatriksKPI"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LaporanKPI" ADD CONSTRAINT "LaporanKPI_karyawanId_fkey" FOREIGN KEY ("karyawanId") REFERENCES "public"."Karyawan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Notifikasi" ADD CONSTRAINT "Notifikasi_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ResetToken" ADD CONSTRAINT "ResetToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
