-- AlterTable
ALTER TABLE "ColumnConstraint" ADD COLUMN     "foreignId" TEXT;

-- AddForeignKey
ALTER TABLE "ColumnConstraint" ADD CONSTRAINT "ColumnConstraint_foreignId_fkey" FOREIGN KEY ("foreignId") REFERENCES "Column"("id") ON DELETE SET NULL ON UPDATE CASCADE;
