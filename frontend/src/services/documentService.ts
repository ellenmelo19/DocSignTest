import axios from 'axios';
import { Document, CreateDocumentInput, DocumentStatus, ListDocumentsParams, PaginatedDocumentsResponse } from '@/types/document';

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

  list: async (params: ListDocumentsParams): Promise<PaginatedDocumentsResponse> => {
    const res = await api.get<ApiResponse<PaginatedDocumentsResponse | Document[]>>('/documents', { params });
    const payload = res.data.data;
    const normalizedSearch = params.search?.trim().toLowerCase();
    const safePageSize = Math.max(1, params.pageSize);

    if (Array.isArray(payload)) {
      const filtered = normalizedSearch
        ? payload.filter((doc) =>
            doc.titulo.toLowerCase().includes(normalizedSearch) ||
            doc.descricao.toLowerCase().includes(normalizedSearch)
          )
        : payload;
      const totalItems = filtered.length;
      const totalPages = Math.max(1, Math.ceil(totalItems / safePageSize));
      const currentPage = Math.min(Math.max(1, params.page), totalPages);
      const startIndex = (currentPage - 1) * safePageSize;
      const items = filtered.slice(startIndex, startIndex + safePageSize);

      return {
        items,
        meta: {
          currentPage,
          pageSize: safePageSize,
          totalItems,
          totalPages,
          hasNextPage: currentPage < totalPages,
          hasPreviousPage: currentPage > 1,
        },
      };
    }

    return {
      items: Array.isArray(payload?.items) ? payload.items : [],
      meta: payload?.meta ?? {
        currentPage: params.page,
        pageSize: params.pageSize,
        totalItems: 0,
        totalPages: 1,
        hasNextPage: false,
        hasPreviousPage: params.page > 1,
      },
    };
  },

  updateStatus: async (id: string, status: DocumentStatus): Promise<Document> => {
    const res = await api.patch<ApiResponse<Document>>(`/documents/${id}`, { status });
    return res.data.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/documents/${id}`);

  },
};
