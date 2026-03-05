import { IDocumentRepository } from '@domain/repositories/IDocumentRepository';
import { ListDocumentsInput, PaginatedDocuments } from '@domain/entities/Document';
import { ListDocumentsQueryDto } from '@application/dtos/document.dto';

export class ListDocumentsUseCase {
  constructor(private repository: IDocumentRepository) {}

  async execute(dto: ListDocumentsQueryDto): Promise<PaginatedDocuments> {
    const input: ListDocumentsInput = {
      page: dto.page,
      pageSize: dto.pageSize,
      search: dto.search,
    };

    return this.repository.list(input);
  }
}
