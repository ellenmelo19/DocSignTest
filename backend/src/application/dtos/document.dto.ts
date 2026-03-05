import { DocumentStatus } from '@domain/entities/Document';

export interface CreateDocumentDto {
  titulo: string;
  descricao: string;
}

export interface UpdateDocumentStatusDto {
  id: string;
  status: DocumentStatus;
}

// Validação simples 
export function validateCreateDto(dto: CreateDocumentDto): void {
  if (!dto.titulo?.trim()) throw new Error('Título é obrigatório');
  if (!dto.descricao?.trim()) throw new Error('Descrição é obrigatória');
}

export function validateUpdateStatusDto(dto: UpdateDocumentStatusDto): void {
  if (!dto.id) throw new Error('ID é obrigatório');
  if (!Object.values(DocumentStatus).includes(dto.status)) {
    throw new Error('Status inválido');
  }
}