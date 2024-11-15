-- DropForeignKey
ALTER TABLE "ColumnConstraint" DROP CONSTRAINT "ColumnConstraint_toForeignId_fkey";

-- AddForeignKey
ALTER TABLE "ColumnConstraint" ADD CONSTRAINT "ColumnConstraint_toForeignId_fkey" FOREIGN KEY ("toForeignId") REFERENCES "ColumnConstraint"("id") ON DELETE CASCADE ON UPDATE CASCADE;
