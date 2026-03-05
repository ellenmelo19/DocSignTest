import { describe, expect, it, vi } from 'vitest';
import { ListDocumentsUseCase } from '@application/use-cases/ListDocumentsUseCase';
import { IDocumentRepository } from '@domain/repositories/IDocumentRepository';

describe('ListDocumentsUseCase', () => {
  it('deve delegar listagem paginada ao repositorio', async () => {
    const mockedResult = {
      items: [],
      meta: {
        currentPage: 1,
        pageSize: 10,
        totalItems: 0,
        totalPages: 1,
        hasNextPage: false,
        hasPreviousPage: false,
      },
    };
    const mockRepo = {
      list: vi.fn().mockResolvedValue(mockedResult),
    } as unknown as IDocumentRepository;

    const useCase = new ListDocumentsUseCase(mockRepo);
    const result = await useCase.execute({ page: 1, pageSize: 10, search: 'abc' });

    expect(mockRepo.list).toHaveBeenCalledWith({ page: 1, pageSize: 10, search: 'abc' });
    expect(result).toEqual(mockedResult);
  });
});
