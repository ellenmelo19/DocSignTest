import { IDocumentRepository } from '@domain/repositories/IDocumentRepository';
import { Document, CreateDocumentInput } from '@domain/entities/Document';
import { CreateDocumentDto, validateCreateDto } from '../dtos/document.dto';

export class CreateDocumentUseCase {
  constructor(private repository: IDocumentRepository) {}

  async execute(dto: CreateDocumentDto): Promise<Document> {
    validateCreateDto(dto);  // Validação de input

    const input: CreateDocumentInput = {
      titulo: dto.titulo.trim(),
      descricao: dto.descricao.trim(),
    };

    return this.repository.create(input);
  }
}