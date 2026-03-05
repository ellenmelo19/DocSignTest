import { FastifyRequest, FastifyReply } from 'fastify';
import { CreateDocumentUseCase } from '@application/use-cases/CreateDocumentUseCase';
import { ListDocumentsUseCase } from '@application/use-cases/ListDocumentsUseCase';
import { UpdateDocumentStatusUseCase } from '@application/use-cases/UpdateDocumentStatusUseCase';
import { DeleteDocumentUseCase } from '@application/use-cases/DeleteDocumentUseCase';
import { CreateDocumentDto, UpdateDocumentStatusDto } from '@application/dtos/document.dto';
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
      const dto = req.body;
      const document = await this.createUseCase.execute(dto);
      created(reply, document);
    } catch (err: any) {
      error(reply, err.message);
    }
  }

  async list(req: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const documents = await this.listUseCase.execute();
      success(reply, documents);
    } catch (err: any) {
      error(reply, err.message, 500);
    }
  }

  async updateStatus(req: FastifyRequest<{ Params: { id: string }, Body: { status: string } }>, reply: FastifyReply): Promise<void> {
    try {
      const dto: UpdateDocumentStatusDto = {
        id: req.params.id,
        status: req.body.status as any, 
      };
      const document = await this.updateStatusUseCase.execute(dto);
      if (!document) return error(reply, 'Documento não encontrado', 404);
      success(reply, document);
    } catch (err: any) {
      error(reply, err.message);
    }
  }

  async delete(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply): Promise<void> {
    try {
      await this.deleteUseCase.execute(req.params.id);
      noContent(reply);
    } catch (err: any) {
      error(reply, err.message, 404);
    }
  }
}