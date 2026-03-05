export enum DocumentStatus {
  PENDENTE = 'PENDENTE',
  ASSINADO = 'ASSINADO',
}

export interface Document {
  id: string;
  titulo: string;
  descricao: string;
  status: DocumentStatus;
  criado_em: Date;
}

export interface CreateDocumentInput {
  titulo: string;
  descricao: string;
}

export interface UpdateDocumentStatusInput {
  id: string;
  status: DocumentStatus;
}

export interface ListDocumentsInput {
  page: number;
  pageSize: number;
  search?: string;
}

export interface PaginationMeta {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PaginatedDocuments {
  items: Document[];
  meta: PaginationMeta;
}

// Definimos tipos claros aqui no centro da cebola.
