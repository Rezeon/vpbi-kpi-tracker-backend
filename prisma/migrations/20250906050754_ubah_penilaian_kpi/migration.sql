/*
  Warnings:

  - Added the required column `tahun` to the `PenilaianKPI` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."PenilaianKPI" ADD COLUMN     "tahun" TEXT NOT NULL;
