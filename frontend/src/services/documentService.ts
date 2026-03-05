import axios from 'axios';
import { Document, CreateDocumentInput, DocumentStatus } from '@/types/document';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  // error?: string;  
}

const api = axios.create({
  baseURL: 'http://localhost:3000',  
  headers: { 'Content-Type': 'application/json' },
});

export const documentService = {
  create: async (data: CreateDocumentInput): Promise<Document> => {
    const res = await api.post<ApiResponse<Document>>('/documents', data);
    return res.data.data;
  },

  list: async (): Promise<Document[]> => {
    const res = await api.get<ApiResponse<Document[]>>('/documents');
    return res.data.data;
  },

  updateStatus: async (id: string, status: DocumentStatus): Promise<Document> => {
    const res = await api.patch<ApiResponse<Document>>(`/documents/${id}`, { status });
    return res.data.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/documents/${id}`);

  },
};