/*
  Warnings:

  - You are about to drop the column `type` on the `Column` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "SQliteColumnType" AS ENUM ('INT', 'TEXT', 'REAL', 'BLOB', 'NULL');

-- AlterTable
ALTER TABLE "Column" DROP COLUMN "type",
ADD COLUMN     "sqliteType" "SQliteColumnType";

-- DropEnum
DROP TYPE "ColumnType";
