/*
  Warnings:

  - The values [DateTime] on the enum `SupabaseColumnType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "SupabaseColumnType_new" AS ENUM ('STRING', 'INT', 'BIGINT', 'FLOAT', 'DECIMAL', 'BOOLEAN', 'DATETIME', 'JSON', 'BYTES');
ALTER TABLE "Column" ALTER COLUMN "supabaseType" TYPE "SupabaseColumnType_new" USING ("supabaseType"::text::"SupabaseColumnType_new");
ALTER TYPE "SupabaseColumnType" RENAME TO "SupabaseColumnType_old";
ALTER TYPE "SupabaseColumnType_new" RENAME TO "SupabaseColumnType";
DROP TYPE "SupabaseColumnType_old";
COMMIT;
