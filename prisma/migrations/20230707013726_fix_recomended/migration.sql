/*
  Warnings:

  - You are about to drop the column `recomended` on the `Trip` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Trip" DROP COLUMN "recomended",
ADD COLUMN     "recommended" BOOLEAN NOT NULL DEFAULT false;
