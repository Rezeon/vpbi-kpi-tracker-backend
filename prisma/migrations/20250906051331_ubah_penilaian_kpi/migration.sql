/*
  Warnings:

  - Added the required column `bulan` to the `MatriksKPI` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tahun` to the `MatriksKPI` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."MatriksKPI" ADD COLUMN     "bulan" TEXT NOT NULL,
ADD COLUMN     "tahun" INTEGER NOT NULL;
