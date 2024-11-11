/*
  Warnings:

  - You are about to drop the column `constraintValue` on the `ColumnConstraint` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "SqliteClauseType" AS ENUM ('AUTO_INCREMENT');

-- AlterTable
ALTER TABLE "ColumnConstraint" DROP COLUMN "constraintValue",
ADD COLUMN     "sqliteClause" "SqliteClauseType";
