/*
  Warnings:

  - You are about to drop the `familyMember` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "familyMember";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "memberProfile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "parent" TEXT NOT NULL
);
