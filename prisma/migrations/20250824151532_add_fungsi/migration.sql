/*
  Warnings:

  - You are about to drop the `ResetToken` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `karyawanId` to the `MatriksKPI` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "public"."Role" ADD VALUE 'leader';

-- DropForeignKey
ALTER TABLE "public"."ResetToken" DROP CONSTRAINT "ResetToken_userId_fkey";

-- AlterTable
ALTER TABLE "public"."MatriksKPI" ADD COLUMN     "karyawanId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "public"."ResetToken";

-- AddForeignKey
ALTER TABLE "public"."MatriksKPI" ADD CONSTRAINT "MatriksKPI_karyawanId_fkey" FOREIGN KEY ("karyawanId") REFERENCES "public"."Karyawan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
