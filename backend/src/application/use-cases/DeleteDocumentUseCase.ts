import { IDocumentRepository } from '@domain/repositories/IDocumentRepository';

export class DeleteDocumentUseCase {
  constructor(private repository: IDocumentRepository) {}

  async execute(id: string): Promise<void> {
    if (!id) throw new Error('ID e obrigatorio');
    await this.repository.delete(id);
  }
}
