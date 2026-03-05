import { describe, expect, it, vi } from 'vitest';
import { UpdateDocumentStatusUseCase } from '@application/use-cases/UpdateDocumentStatusUseCase';
import { IDocumentRepository } from '@domain/repositories/IDocumentRepository';
import { DocumentStatus } from '@domain/entities/Document';

describe('UpdateDocumentStatusUseCase', () => {
  it('deve atualizar status via repositorio', async () => {
    const doc = {
      id: 'doc-1',
      titulo: 'Titulo',
      descricao: 'Descricao',
      status: DocumentStatus.ASSINADO,
      criado_em: new Date(),
    };
    const mockRepo = {
      updateStatus: vi.fn().mockResolvedValue(doc),
    } as unknown as IDocumentRepository;

    const useCase = new UpdateDocumentStatusUseCase(mockRepo);
    const result = await useCase.execute({ id: 'doc-1', status: DocumentStatus.ASSINADO });

    expect(mockRepo.updateStatus).toHaveBeenCalledWith({ id: 'doc-1', status: DocumentStatus.ASSINADO });
    expect(result).toEqual(doc);
  });
});
