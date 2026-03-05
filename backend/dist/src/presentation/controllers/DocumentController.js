import { ZodError } from 'zod';
import { CreateDocumentSchema, UpdateDocumentStatusSchema, ListDocumentsQuerySchema, } from '@application/dtos/document.dto';
import { success, created, noContent, error } from '../utils/httpResponses';
export class DocumentController {
    createUseCase;
    listUseCase;
    updateStatusUseCase;
    deleteUseCase;
    constructor(createUseCase, listUseCase, updateStatusUseCase, deleteUseCase) {
        this.createUseCase = createUseCase;
        this.listUseCase = listUseCase;
        this.updateStatusUseCase = updateStatusUseCase;
        this.deleteUseCase = deleteUseCase;
    }
    async create(req, reply) {
        try {
            const dto = CreateDocumentSchema.parse(req.body);
            const document = await this.createUseCase.execute(dto);
            created(reply, document);
        }
        catch (err) {
            if (err instanceof ZodError) {
                return error(reply, err.issues.map((issue) => issue.message).join('; '), 400);
            }
            error(reply, err.message || 'Erro interno do servidor', 500);
        }
    }
    async list(req, reply) {
        try {
            const query = ListDocumentsQuerySchema.parse(req.query);
            const documents = await this.listUseCase.execute(query);
            success(reply, documents);
        }
        catch (err) {
            if (err instanceof ZodError) {
                return error(reply, err.issues.map((issue) => issue.message).join('; '), 400);
            }
            error(reply, err.message || 'Erro interno do servidor', 500);
        }
    }
    async updateStatus(req, reply) {
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
        }
        catch (err) {
            if (err instanceof ZodError) {
                return error(reply, err.issues.map((issue) => issue.message).join('; '), 400);
            }
            error(reply, err.message || 'Erro interno do servidor', 500);
        }
    }
    async delete(req, reply) {
        try {
            await this.deleteUseCase.execute(req.params.id);
            noContent(reply);
        }
        catch (err) {
            error(reply, err.message || 'Documento nao encontrado', 404);
        }
    }
}
//# sourceMappingURL=DocumentController.js.map