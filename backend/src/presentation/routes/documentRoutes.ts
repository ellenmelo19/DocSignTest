import { FastifyInstance } from 'fastify';
import { DocumentController } from '../controllers/DocumentController';

export async function documentRoutes(app: FastifyInstance, controller: DocumentController): Promise<void> {
  const documentSchema = {
    type: 'object',
    properties: {
      id: { type: 'string', format: 'uuid' },
      titulo: { type: 'string' },
      descricao: { type: 'string' },
      status: { type: 'string', enum: ['PENDENTE', 'ASSINADO'] },
      criado_em: { type: 'string', format: 'date-time' },
    },
  };

  app.post(
    '/documents',
    {
      schema: {
        tags: ['documents'],
        summary: 'Criar documento',
        body: {
          type: 'object',
          required: ['titulo', 'descricao'],
          properties: {
            titulo: { type: 'string', minLength: 1 },
            descricao: { type: 'string', minLength: 1 },
          },
        },
      },
    },
    controller.create.bind(controller)
  );

  app.get(
    '/documents',
    {
      schema: {
        tags: ['documents'],
        summary: 'Listar documentos',
        querystring: {
          type: 'object',
          properties: {
            page: { type: 'integer', minimum: 1, default: 1 },
            pageSize: { type: 'integer', minimum: 1, maximum: 50, default: 10 },
            search: { type: 'string' },
          },
        },
      },
    },
    controller.list.bind(controller)
  );

  app.patch(
    '/documents/:id',
    {
      schema: {
        tags: ['documents'],
        summary: 'Atualizar status do documento',
        params: {
          type: 'object',
          required: ['id'],
          properties: {
            id: { type: 'string', format: 'uuid' },
          },
        },
        body: {
          type: 'object',
          required: ['status'],
          properties: {
            status: { type: 'string', enum: ['PENDENTE', 'ASSINADO'] },
          },
        },
        response: {
          200: {
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              data: documentSchema,
            },
          },
        },
      },
    },
    controller.updateStatus.bind(controller)
  );

  app.delete(
    '/documents/:id',
    {
      schema: {
        tags: ['documents'],
        summary: 'Deletar documento',
        params: {
          type: 'object',
          required: ['id'],
          properties: {
            id: { type: 'string', format: 'uuid' },
          },
        },
      },
    },
    controller.delete.bind(controller)
  );
}

//Separa rotas dos controllers neah
