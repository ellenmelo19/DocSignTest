import { describe, it, expect } from 'vitest';
import supertest from 'supertest';
import { app } from '../../src/index';

describe('Document Endpoints', () => {
  it('deve criar um documento', async () => {
    const response = await supertest(app.server)
      .post('/documents')
      .send({ titulo: 'Test Integration', descricao: 'Desc' });
    expect(response.status).toBe(201);
    expect(response.body.data.titulo).toBe('Test Integration');
  });
});