import { FastifyInstance } from 'fastify';
import { DocumentController } from '../controllers/DocumentController';

export async function documentRoutes(app: FastifyInstance, controller: DocumentController): Promise<void> {
  app.post('/documents', controller.create.bind(controller));
  app.get('/documents', controller.list.bind(controller));
  app.patch('/documents/:id', controller.updateStatus.bind(controller));
  app.delete('/documents/:id', controller.delete.bind(controller));
}

//Separa rotas dos controllers neah