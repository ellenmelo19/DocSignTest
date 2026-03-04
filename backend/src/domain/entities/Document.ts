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

// Definimos tipos claros aqui no centro da cebola.