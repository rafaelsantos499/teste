/*
  Warnings:

  - You are about to drop the column `professionalcol` on the `professional` table. All the data in the column will be lost.
  - You are about to drop the column `professionalcol1` on the `professional` table. All the data in the column will be lost.
  - You are about to drop the column `teste` on the `professional` table. All the data in the column will be lost.
  - You are about to drop the column `teste2` on the `professional` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `professional` DROP COLUMN `professionalcol`,
    DROP COLUMN `professionalcol1`,
    DROP COLUMN `teste`,
    DROP COLUMN `teste2`;
