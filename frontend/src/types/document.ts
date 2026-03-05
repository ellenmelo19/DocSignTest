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

//manter a consistencia dos tipos entre o front e o back
