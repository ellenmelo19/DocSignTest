import { FastifyRequest, FastifyReply } from 'fastify';
import { ZodError } from 'zod';

import { CreateDocumentUseCase } from '@application/use-cases/CreateDocumentUseCase';
import { ListDocumentsUseCase } from '@application/use-cases/ListDocumentsUseCase';
import { UpdateDocumentStatusUseCase } from '@application/use-cases/UpdateDocumentStatusUseCase';
import { DeleteDocumentUseCase } from '@application/use-cases/DeleteDocumentUseCase';
import {
  CreateDocumentSchema,
  UpdateDocumentStatusSchema,
  CreateDocumentDto,
  ListDocumentsQueryDto,
  ListDocumentsQuerySchema,
} from '@application/dtos/document.dto';
import { success, created, noContent, error } from '../utils/httpResponses';

export class DocumentController {
  constructor(
    private createUseCase: CreateDocumentUseCase,
    private listUseCase: ListDocumentsUseCase,
    private updateStatusUseCase: UpdateDocumentStatusUseCase,
    private deleteUseCase: DeleteDocumentUseCase
  ) {}

  async create(req: FastifyRequest<{ Body: CreateDocumentDto }>, reply: FastifyReply): Promise<void> {
    try {
      const dto = CreateDocumentSchema.parse(req.body);
      const document = await this.createUseCase.execute(dto);
      created(reply, document);
    } catch (err: unknown) {
      if (err instanceof ZodError) {
        return error(reply, err.issues.map((issue) => issue.message).join('; '), 400);
      }
      error(reply, (err as Error).message || 'Erro interno do servidor', 500);
    }
  }

  async list(req: FastifyRequest<{ Querystring: ListDocumentsQueryDto }>, reply: FastifyReply): Promise<void> {
    try {
      const query = ListDocumentsQuerySchema.parse(req.query);
      const documents = await this.listUseCase.execute(query);
      success(reply, documents);
    } catch (err: unknown) {
      if (err instanceof ZodError) {
        return error(reply, err.issues.map((issue) => issue.message).join('; '), 400);
      }
      error(reply, (err as Error).message || 'Erro interno do servidor', 500);
    }
  }

  async updateStatus(
    req: FastifyRequest<{ Params: { id: string }; Body: { status: string } }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const dto = UpdateDocumentStatusSchema.parse({
        id: req.params.id,
        status: req.body.status,
      });
      const document = await this.updateStatusUseCase.execute(dto);
      if (!document) {
        return error(reply, 'Documento nao encontrado', 404);
      }
      success(reply, document);
    } catch (err: unknown) {
      if (err instanceof ZodError) {
        return error(reply, err.issues.map((issue) => issue.message).join('; '), 400);
      }
      error(reply, (err as Error).message || 'Erro interno do servidor', 500);
    }
  }

  async delete(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply): Promise<void> {
    try {
      await this.deleteUseCase.execute(req.params.id);
      noContent(reply);
    } catch (err: unknown) {
      error(reply, (err as Error).message || 'Documento nao encontrado', 404);
    }
  }
}
