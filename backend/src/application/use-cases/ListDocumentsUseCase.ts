import { IDocumentRepository } from '@domain/repositories/IDocumentRepository';
import { Document } from '@domain/entities/Document';

export class ListDocumentsUseCase {
  constructor(private repository: IDocumentRepository) {}

  async execute(): Promise<Document[]> {
    return this.repository.findAll();
  }
}