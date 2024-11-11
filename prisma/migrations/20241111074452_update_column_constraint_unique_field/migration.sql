/*
  Warnings:

  - A unique constraint covering the columns `[columnId,type]` on the table `ColumnConstraint` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ColumnConstraint_columnId_type_key" ON "ColumnConstraint"("columnId", "type");
