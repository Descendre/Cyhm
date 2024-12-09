-- CreateEnum
CREATE TYPE "SupabaseColumnType" AS ENUM ('String', 'Int', 'BigInt', 'Float', 'Decimal', 'Boolean', 'DateTime', 'Json', 'Bytes');

-- AlterEnum
ALTER TYPE "DBType" ADD VALUE 'SUPABASE';

-- AlterTable
ALTER TABLE "Column" ADD COLUMN     "supabaseType" "SupabaseColumnType";
