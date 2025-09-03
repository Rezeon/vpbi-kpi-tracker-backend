/*
  Warnings:

  - A unique constraint covering the columns `[karyawanId]` on the table `PenilaianKPI` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PenilaianKPI_karyawanId_key" ON "public"."PenilaianKPI"("karyawanId");
