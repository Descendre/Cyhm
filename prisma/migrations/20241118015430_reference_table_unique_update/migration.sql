/*
  Warnings:

  - A unique constraint covering the columns `[foreignKeyId]` on the table `Reference` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Reference_foreignKeyId_key" ON "Reference"("foreignKeyId");
