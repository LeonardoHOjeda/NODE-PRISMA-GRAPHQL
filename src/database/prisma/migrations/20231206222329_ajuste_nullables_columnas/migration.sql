/*
  Warnings:

  - You are about to drop the column `createdAt` on the `calificaciones` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `calificaciones` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `calificaciones` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `materias` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `materias` table. All the data in the column will be lost.
  - You are about to drop the column `profesorId` on the `materias` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `materias` table. All the data in the column will be lost.
  - Added the required column `profesor_id` to the `materias` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `materias` DROP FOREIGN KEY `materias_profesorId_fkey`;

-- AlterTable
ALTER TABLE `alumnos` MODIFY `updated_at` DATETIME(3) NULL,
    MODIFY `deleted_at` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `calificaciones` DROP COLUMN `createdAt`,
    DROP COLUMN `deletedAt`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `deleted_at` DATETIME(3) NULL,
    ADD COLUMN `updated_at` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `materias` DROP COLUMN `createdAt`,
    DROP COLUMN `deletedAt`,
    DROP COLUMN `profesorId`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `deleted_at` DATETIME(3) NULL,
    ADD COLUMN `profesor_id` INTEGER NOT NULL,
    ADD COLUMN `updated_at` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `profesores` MODIFY `updated_at` DATETIME(3) NULL,
    MODIFY `deleted_at` DATETIME(3) NULL;

-- AddForeignKey
ALTER TABLE `materias` ADD CONSTRAINT `materias_profesor_id_fkey` FOREIGN KEY (`profesor_id`) REFERENCES `profesores`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
