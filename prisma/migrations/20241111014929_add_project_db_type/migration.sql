/*
  Warnings:

  - Added the required column `dbType` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DBType" AS ENUM ('SQLITE');

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "dbType" "DBType" NOT NULL;
