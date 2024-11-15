/*
  Warnings:

  - A unique constraint covering the columns `[foreignKeyId,primaryKeyId]` on the table `Reference` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Reference_foreignKeyId_primaryKeyId_key" ON "Reference"("foreignKeyId", "primaryKeyId");
