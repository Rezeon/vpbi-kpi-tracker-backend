/*
  Warnings:

  - A unique constraint covering the columns `[leaderId]` on the table `Divisi` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."Divisi" ADD COLUMN     "leaderId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Divisi_leaderId_key" ON "public"."Divisi"("leaderId");

-- AddForeignKey
ALTER TABLE "public"."Divisi" ADD CONSTRAINT "Divisi_leaderId_fkey" FOREIGN KEY ("leaderId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
