-- CreateEnum
CREATE TYPE "public"."StatusBukti" AS ENUM ('draft', 'menunggu_verifikasi', 'disetujui', 'ditolak');

-- CreateTable
CREATE TABLE "public"."BuktiKPI" (
    "id" SERIAL NOT NULL,
    "karyawanId" INTEGER NOT NULL,
    "matriksId" INTEGER NOT NULL,
    "bulan" TEXT NOT NULL,
    "fileUrl" TEXT,
    "deskripsi" TEXT,
    "status" "public"."StatusBukti" NOT NULL DEFAULT 'draft',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BuktiKPI_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."BuktiKPI" ADD CONSTRAINT "BuktiKPI_karyawanId_fkey" FOREIGN KEY ("karyawanId") REFERENCES "public"."Karyawan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BuktiKPI" ADD CONSTRAINT "BuktiKPI_matriksId_fkey" FOREIGN KEY ("matriksId") REFERENCES "public"."MatriksKPI"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
