/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Individual` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Individual` table. All the data in the column will be lost.
  - You are about to drop the `AdditionalDetail` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Relationship` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AdditionalDetail" DROP CONSTRAINT "AdditionalDetail_individualId_fkey";

-- DropForeignKey
ALTER TABLE "Relationship" DROP CONSTRAINT "Relationship_individual1Id_fkey";

-- DropForeignKey
ALTER TABLE "Relationship" DROP CONSTRAINT "Relationship_individual2Id_fkey";

-- AlterTable
ALTER TABLE "Individual" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "fatherID" TEXT,
ADD COLUMN     "motherID" TEXT,
ADD COLUMN     "parentToChild" TEXT,
ADD COLUMN     "spouseID" TEXT;

-- DropTable
DROP TABLE "AdditionalDetail";

-- DropTable
DROP TABLE "Relationship";
