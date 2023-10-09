-- CreateTable
CREATE TABLE `paciente` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(100) NULL,
    `email` VARCHAR(100) NULL,
    `password` VARCHAR(100) NULL,
    `role` VARCHAR(2) NULL DEFAULT 'C',
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deleted_at` DATETIME(0) NULL,
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `professional` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(100) NULL,
    `email` VARCHAR(100) NULL,
    `password` VARCHAR(100) NULL,
    `role` VARCHAR(2) NULL DEFAULT 'P',
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deleted_at` DATETIME(0) NULL,
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `crp` VARCHAR(100) NULL,
    `professionalcol` VARCHAR(45) NULL,
    `professionalcol1` VARCHAR(45) NULL,
    `teste` VARCHAR(100) NULL,
    `teste2` VARCHAR(100) NULL,

    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `consulta` (
    `id` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NULL,
    `pacienteId` VARCHAR(100) NOT NULL,
    `profissionalId` VARCHAR(100) NOT NULL,
    `statusId` VARCHAR(191) NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deleted_at` DATETIME(0) NULL,
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `consulta_pacienteId_fkey`(`pacienteId`),
    INDEX `consulta_profissionalId_fkey`(`profissionalId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `refresh_tokens` (
    `id` VARCHAR(191) NOT NULL,
    `token` VARCHAR(255) NULL,
    `professional_id` VARCHAR(191) NULL,
    `paciente_id` VARCHAR(191) NULL,
    `expire_in` VARCHAR(255) NULL,

    INDEX `refresh_tokens_paciente_id_fkey`(`paciente_id`),
    INDEX `refresh_tokens_professional_id_fkey`(`professional_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `medicalreport` (
    `id` VARCHAR(191) NOT NULL,
    `complaint` VARCHAR(191) NULL,
    `evolution` VARCHAR(191) NULL,
    `consultaId` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deleted_at` DATETIME(0) NULL,
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `medicalReport_consultaId_key`(`consultaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `professionalpaciente` (
    `id` VARCHAR(191) NOT NULL,
    `pacienteId` VARCHAR(100) NOT NULL,
    `profissionalId` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reset_password_professional` (
    `id` VARCHAR(191) NOT NULL,
    `token` VARCHAR(255) NULL,
    `expiration_data` VARCHAR(255) NULL,
    `professionalId` VARCHAR(100) NULL,
    `used` BOOLEAN NULL DEFAULT false,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `pacienteId` VARCHAR(100) NULL,

    INDEX `Reset_Password_Professional_professionalId_fkey`(`professionalId`),
    INDEX `Reset_Password_Professional_pacienteId_fkey`(`pacienteId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `statusconsulta` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NULL,

    UNIQUE INDEX `statusConsulta_nome_key`(`nome`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `consulta` ADD CONSTRAINT `consulta_pacienteId_fkey` FOREIGN KEY (`pacienteId`) REFERENCES `paciente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `consulta` ADD CONSTRAINT `consulta_profissionalId_fkey` FOREIGN KEY (`profissionalId`) REFERENCES `professional`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `consulta` ADD CONSTRAINT `consulta_statusId_fkey` FOREIGN KEY (`statusId`) REFERENCES `statusconsulta`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `professionalpaciente` ADD CONSTRAINT `professionalpaciente_pacienteId_fkey` FOREIGN KEY (`pacienteId`) REFERENCES `paciente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `professionalpaciente` ADD CONSTRAINT `professionalpaciente_profissionalId_fkey` FOREIGN KEY (`profissionalId`) REFERENCES `professional`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
