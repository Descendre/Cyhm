/*
  Warnings:

  - You are about to drop the column `fromForeignId` on the `ColumnConstraint` table. All the data in the column will be lost.
  - You are about to drop the column `toForeignId` on the `ColumnConstraint` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ColumnConstraint" DROP CONSTRAINT "ColumnConstraint_fromForeignId_fkey";

-- DropForeignKey
ALTER TABLE "ColumnConstraint" DROP CONSTRAINT "ColumnConstraint_toForeignId_fkey";

-- AlterTable
ALTER TABLE "ColumnConstraint" DROP COLUMN "fromForeignId",
DROP COLUMN "toForeignId";

-- CreateTable
CREATE TABLE "Reference" (
    "id" TEXT NOT NULL,
    "foreignKeyId" TEXT NOT NULL,
    "primaryKeyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reference_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Reference" ADD CONSTRAINT "Reference_foreignKeyId_fkey" FOREIGN KEY ("foreignKeyId") REFERENCES "ColumnConstraint"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reference" ADD CONSTRAINT "Reference_primaryKeyId_fkey" FOREIGN KEY ("primaryKeyId") REFERENCES "ColumnConstraint"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
