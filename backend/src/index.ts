import fastify from 'fastify';
import cors from '@fastify/cors';
import prisma from '@infra/database/prismaClient';
import { PrismaDocumentRepository } from '@infra/database/prisma/PrismaDocumentRepository';
import { CreateDocumentUseCase } from '@application/use-cases/CreateDocumentUseCase';
import { ListDocumentsUseCase } from '@application/use-cases/ListDocumentsUseCase';
import { UpdateDocumentStatusUseCase } from '@application/use-cases/UpdateDocumentStatusUseCase';
import { DeleteDocumentUseCase } from '@application/use-cases/DeleteDocumentUseCase';
import { DocumentController } from '@presentation/controllers/DocumentController';
import { documentRoutes } from '@presentation/routes/documentRoutes';

const app = fastify({ logger: true });

app.register(cors, { origin: '*' });  // Para dev; 

const repository = new PrismaDocumentRepository(prisma);
const createUseCase = new CreateDocumentUseCase(repository);
const listUseCase = new ListDocumentsUseCase(repository);
const updateStatusUseCase = new UpdateDocumentStatusUseCase(repository);
const deleteUseCase = new DeleteDocumentUseCase(repository);
const controller = new DocumentController(createUseCase, listUseCase, updateStatusUseCase, deleteUseCase);

// Registra rotas
documentRoutes(app, controller);

const start = async () => {
  try {
    await app.listen({ port: 3000, host: '0.0.0.0' });
    console.log('Server rodando em http://localhost:3000');
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();

process.on('SIGINT', async () => {
  await app.close();
  process.exit(0);
});