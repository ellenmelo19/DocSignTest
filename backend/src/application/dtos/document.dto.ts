import { z } from 'zod';
import { DocumentStatus } from '@domain/entities/Document';

export const CreateDocumentSchema = z.object({
  titulo: z.string().trim().min(1, 'Titulo e obrigatorio'),
  descricao: z.string().trim().min(1, 'Descricao e obrigatoria'),
});

export type CreateDocumentDto = z.infer<typeof CreateDocumentSchema>;

const SearchSchema = z.string().trim().min(1).max(120);

export const ListDocumentsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(50).default(10),
  search: z.union([SearchSchema, z.literal('')]).optional().transform((value) => value || undefined),
});

export type ListDocumentsQueryDto = z.infer<typeof ListDocumentsQuerySchema>;

export const UpdateDocumentStatusSchema = z.object({
  id: z.string().uuid('ID invalido'),
  status: z.nativeEnum(DocumentStatus, { message: 'Status invalido' }),
});

export type UpdateDocumentStatusDto = z.infer<typeof UpdateDocumentStatusSchema>;
