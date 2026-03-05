import { vi, describe, it, expect } from 'vitest';
import { CreateDocumentUseCase } from '@application/use-cases/CreateDocumentUseCase';
describe('CreateDocumentUseCase', () => {
    it('deve criar um documento válido', async () => {
        const mockRepo = { create: vi.fn().mockResolvedValue({ id: '1', titulo: 'Test', descricao: 'Desc', status: 'PENDENTE', criado_em: new Date() }) };
        const useCase = new CreateDocumentUseCase(mockRepo);
        const dto = { titulo: 'Test', descricao: 'Desc' };
        const result = await useCase.execute(dto);
        expect(result.titulo).toBe('Test');
        expect(mockRepo.create).toHaveBeenCalled();
    });
});
//# sourceMappingURL=CreateDocumentUseCase.test.js.map