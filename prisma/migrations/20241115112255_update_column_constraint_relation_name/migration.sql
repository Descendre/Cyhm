/*
  Warnings:

  - You are about to drop the column `foreignId` on the `ColumnConstraint` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ColumnConstraint" DROP CONSTRAINT "ColumnConstraint_foreignId_fkey";

-- AlterTable
ALTER TABLE "ColumnConstraint" DROP COLUMN "foreignId",
ADD COLUMN     "fromForeignId" TEXT,
ADD COLUMN     "toForeignId" TEXT;

-- AddForeignKey
ALTER TABLE "ColumnConstraint" ADD CONSTRAINT "ColumnConstraint_fromForeignId_fkey" FOREIGN KEY ("fromForeignId") REFERENCES "ColumnConstraint"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ColumnConstraint" ADD CONSTRAINT "ColumnConstraint_toForeignId_fkey" FOREIGN KEY ("toForeignId") REFERENCES "ColumnConstraint"("id") ON DELETE SET NULL ON UPDATE CASCADE;
