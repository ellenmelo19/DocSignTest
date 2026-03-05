import { z } from 'zod';
import { DocumentStatus } from '@domain/entities/Document';

export const CreateDocumentSchema = z.object({
  titulo: z.string().trim().min(1, 'Título é obrigatório'),
  descricao: z.string().trim().min(1, 'Descrição é obrigatória'),
});

export type CreateDocumentDto = z.infer<typeof CreateDocumentSchema>;

export const UpdateDocumentStatusSchema = z.object({
  id: z.string().uuid('ID inválido'),
  status: z.nativeEnum(DocumentStatus, { message: 'Status inválido' }),
});

export type UpdateDocumentStatusDto = z.infer<typeof UpdateDocumentStatusSchema>;