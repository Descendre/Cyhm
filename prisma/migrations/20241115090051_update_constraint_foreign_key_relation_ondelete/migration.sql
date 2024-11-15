-- DropForeignKey
ALTER TABLE "ColumnConstraint" DROP CONSTRAINT "ColumnConstraint_foreignId_fkey";

-- AddForeignKey
ALTER TABLE "ColumnConstraint" ADD CONSTRAINT "ColumnConstraint_foreignId_fkey" FOREIGN KEY ("foreignId") REFERENCES "Column"("id") ON DELETE CASCADE ON UPDATE CASCADE;
