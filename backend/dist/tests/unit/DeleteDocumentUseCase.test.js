import { describe, expect, it, vi } from 'vitest';
import { DeleteDocumentUseCase } from '@application/use-cases/DeleteDocumentUseCase';
describe('DeleteDocumentUseCase', () => {
    it('deve chamar delete do repositorio com id valido', async () => {
        const mockRepo = {
            delete: vi.fn().mockResolvedValue(undefined),
        };
        const useCase = new DeleteDocumentUseCase(mockRepo);
        await useCase.execute('doc-1');
        expect(mockRepo.delete).toHaveBeenCalledWith('doc-1');
    });
    it('deve falhar se id estiver vazio', async () => {
        const mockRepo = {
            delete: vi.fn(),
        };
        const useCase = new DeleteDocumentUseCase(mockRepo);
        await expect(useCase.execute('')).rejects.toThrow('ID e obrigatorio');
        expect(mockRepo.delete).not.toHaveBeenCalled();
    });
});
//# sourceMappingURL=DeleteDocumentUseCase.test.js.map