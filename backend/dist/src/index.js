import fastify from 'fastify';
import cors from '@fastify/cors';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import prisma from '@infra/database/prismaClient';
import { PrismaDocumentRepository } from '@infra/database/prisma/PrismaDocumentRepository';
import { CreateDocumentUseCase } from '@application/use-cases/CreateDocumentUseCase';
import { ListDocumentsUseCase } from '@application/use-cases/ListDocumentsUseCase';
import { UpdateDocumentStatusUseCase } from '@application/use-cases/UpdateDocumentStatusUseCase';
import { DeleteDocumentUseCase } from '@application/use-cases/DeleteDocumentUseCase';
import { DocumentController } from '@presentation/controllers/DocumentController';
import { documentRoutes } from '@presentation/routes/documentRoutes';
const app = fastify({ logger: true });
//app.register(cors, { origin: '*' });  // Para dev; 
app.register(cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
});
app.register(swagger, {
    mode: 'dynamic',
    openapi: {
        info: {
            title: 'SuperSign Document API',
            description: 'API para gerenciamento de documentos',
            version: '1.0.0',
        },
        servers: [{ url: 'http://localhost:3000' }],
        tags: [{ name: 'documents', description: 'Operacoes de documentos' }],
    },
});
app.register(swaggerUi, {
    routePrefix: '/docs',
});
app.setErrorHandler((err, _req, reply) => {
    if (err.validation) {
        reply.code(400).send({ success: false, message: err.message });
        return;
    }
    reply.code(err.statusCode || 500).send({
        success: false,
        message: err.message || 'Erro interno do servidor',
    });
});
const repository = new PrismaDocumentRepository(prisma);
const createUseCase = new CreateDocumentUseCase(repository);
const listUseCase = new ListDocumentsUseCase(repository);
const updateStatusUseCase = new UpdateDocumentStatusUseCase(repository);
const deleteUseCase = new DeleteDocumentUseCase(repository);
const controller = new DocumentController(createUseCase, listUseCase, updateStatusUseCase, deleteUseCase);
app.register(async (instance) => {
    await documentRoutes(instance, controller);
});
const start = async () => {
    try {
        await app.listen({ port: 3000, host: '0.0.0.0' });
        console.log('Server rodando em http://localhost:3000');
    }
    catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};
export { app };
if (process.env.NODE_ENV !== 'test') {
    start();
    process.on('SIGINT', async () => {
        await app.close();
        process.exit(0);
    });
}
//# sourceMappingURL=index.js.map