import { Document, CreateDocumentInput, UpdateDocumentStatusInput, DocumentStatus } from '../entities/Document';

export interface IDocumentRepository {
  create(input: CreateDocumentInput): Promise<Document>;
  findAll(): Promise<Document[]>;
  findById(id: string): Promise<Document | null>;
  updateStatus(input: UpdateDocumentStatusInput): Promise<Document | null>;
  delete(id: string): Promise<void>;
}

//Essa interface define o contrato que qualquer repositório real (Prisma, Mongo, memória, etc.) precisa cumprir.
