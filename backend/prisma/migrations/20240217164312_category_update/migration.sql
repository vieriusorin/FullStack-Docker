-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_categoryId_fkey";

-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "categoryId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;
