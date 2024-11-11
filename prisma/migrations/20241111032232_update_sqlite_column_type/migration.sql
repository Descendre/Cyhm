/*
  Warnings:

  - The values [INT] on the enum `SQliteColumnType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "SQliteColumnType_new" AS ENUM ('INTEGER', 'TEXT', 'REAL', 'BLOB', 'NULL');
ALTER TABLE "Column" ALTER COLUMN "sqliteType" TYPE "SQliteColumnType_new" USING ("sqliteType"::text::"SQliteColumnType_new");
ALTER TYPE "SQliteColumnType" RENAME TO "SQliteColumnType_old";
ALTER TYPE "SQliteColumnType_new" RENAME TO "SQliteColumnType";
DROP TYPE "SQliteColumnType_old";
COMMIT;
