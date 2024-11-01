/*
  Warnings:

  - A unique constraint covering the columns `[fromUserId,toUserId,projectId]` on the table `Notify` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Notify" ADD COLUMN     "isRejected" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "Notify_fromUserId_toUserId_projectId_key" ON "Notify"("fromUserId", "toUserId", "projectId");
