import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import supertest from 'supertest';
import { app } from '../../src/index';
import { DocumentStatus } from '../../src/domain/entities/Document';
const createdIds = [];
const createPayload = () => ({
    titulo: `Integration ${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
    descricao: 'Documento de teste',
});
describe('Document Endpoints', () => {
    beforeAll(async () => {
        await app.ready();
    });
    afterAll(async () => {
        for (const id of createdIds) {
            await supertest(app.server).delete(`/documents/${id}`);
        }
        await app.close();
    });
    it('deve criar documento (POST /documents)', async () => {
        const response = await supertest(app.server).post('/documents').send(createPayload());
        expect(response.status).toBe(201);
        expect(response.body.success).toBe(true);
        expect(response.body.data.id).toBeDefined();
        expect(response.body.data.status).toBe(DocumentStatus.PENDENTE);
        createdIds.push(response.body.data.id);
    });
    it('deve listar documentos paginados (GET /documents)', async () => {
        const created = await supertest(app.server).post('/documents').send(createPayload());
        createdIds.push(created.body.data.id);
        const response = await supertest(app.server).get('/documents?page=1&pageSize=10');
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(Array.isArray(response.body.data.items)).toBe(true);
        expect(response.body.data.meta.currentPage).toBe(1);
        expect(response.body.data.items.some((doc) => doc.id === created.body.data.id)).toBe(true);
    });
    it('deve atualizar status (PATCH /documents/:id)', async () => {
        const created = await supertest(app.server).post('/documents').send(createPayload());
        createdIds.push(created.body.data.id);
        const response = await supertest(app.server)
            .patch(`/documents/${created.body.data.id}`)
            .send({ status: DocumentStatus.ASSINADO });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data.status).toBe(DocumentStatus.ASSINADO);
    });
    it('deve deletar documento (DELETE /documents/:id)', async () => {
        const created = await supertest(app.server).post('/documents').send(createPayload());
        const response = await supertest(app.server).delete(`/documents/${created.body.data.id}`);
        expect(response.status).toBe(204);
    });
    it('deve retornar 400 para payload invalido', async () => {
        const response = await supertest(app.server).post('/documents').send({ titulo: '', descricao: '' });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });
    it('deve retornar 404 ao atualizar documento inexistente', async () => {
        const response = await supertest(app.server)
            .patch('/documents/550e8400-e29b-41d4-a716-446655440000')
            .send({ status: DocumentStatus.ASSINADO });
        expect(response.status).toBe(404);
        expect(response.body.success).toBe(false);
    });
});
//# sourceMappingURL=documentEndpoints.test.js.map