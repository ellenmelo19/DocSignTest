import { IDocumentRepository } from '@domain/repositories/IDocumentRepository';
import { Document, UpdateDocumentStatusInput } from '@domain/entities/Document';
import { UpdateDocumentStatusDto } from '../dtos/document.dto';

export class UpdateDocumentStatusUseCase {
  constructor(private repository: IDocumentRepository) {}

  async execute(dto: UpdateDocumentStatusDto): Promise<Document | null> {
    const input: UpdateDocumentStatusInput = {
      id: dto.id,
      status: dto.status,
    };

    return this.repository.updateStatus(input);
  }
}