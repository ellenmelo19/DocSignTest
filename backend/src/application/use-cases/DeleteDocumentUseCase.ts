import { IDocumentRepository } from '@domain/repositories/IDocumentRepository';
import { get } from 'node:http';

export class DeleteDocumentUseCase {
  constructor(private repository: IDocumentRepository) {}

  async execute(id: string): Promise<void> {
    if (!id) throw new Error('ID é obrigatório');
    await this.repository.delete(id);
  }
}

