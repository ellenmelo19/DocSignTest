export enum DocumentStatus {
  PENDENTE = 'PENDENTE',
  ASSINADO = 'ASSINADO',
}

export interface Document {
  id: string;
  titulo: string;
  descricao: string;
  status: DocumentStatus;
  criado_em: string;  
}

export interface CreateDocumentInput {
  titulo: string;
  descricao: string;
}

export interface ListDocumentsParams {
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

export interface PaginatedDocumentsResponse {
  items: Document[];
  meta: PaginationMeta;
}

//manter a consistencia dos tipos entre o front e o back
