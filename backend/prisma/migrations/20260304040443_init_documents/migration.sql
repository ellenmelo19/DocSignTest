-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDENTE', 'ASSINADO');

-- CreateTable
CREATE TABLE "documents" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'PENDENTE',
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "documents_pkey" PRIMARY KEY ("id")
);
