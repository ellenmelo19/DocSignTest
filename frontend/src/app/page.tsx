'use client';

import { useCallback, useEffect, useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

import DocumentFormModal from '@/components/DocumentFormModal';
import DeleteConfirmModal from '@/components/DeleteConfirmModal';
import { documentService } from '@/services/documentService';
import { Document, DocumentStatus, PaginationMeta } from '@/types/document';

const DEFAULT_PAGE_SIZE = 10;

const EMPTY_PAGINATION: PaginationMeta = {
  currentPage: 1,
  pageSize: DEFAULT_PAGE_SIZE,
  totalItems: 0,
  totalPages: 1,
  hasNextPage: false,
  hasPreviousPage: false,
};

export default function Home() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationMeta>(EMPTY_PAGINATION);
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState<string | undefined>(undefined);

  const fetchDocuments = useCallback(async () => {
    try {
      setLoading(true);
      const data = await documentService.list({
        page,
        pageSize: DEFAULT_PAGE_SIZE,
        search,
      });
      setDocuments(Array.isArray(data.items) ? data.items : []);
      setPagination(data.meta);
    } catch (err: any) {
      toast.error('Erro ao carregar documentos: ' + err.message);
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  useEffect(() => {
    const debounceId = window.setTimeout(() => {
      const normalized = searchInput.trim();
      setPage(1);
      setSearch(normalized ? normalized : undefined);
    }, 400);

    return () => window.clearTimeout(debounceId);
  }, [searchInput]);

  const handleStatusChange = async (id: string, newStatus: DocumentStatus) => {
    try {
      await documentService.updateStatus(id, newStatus);
      toast.success('Status atualizado com sucesso!');
      fetchDocuments();
    } catch (err: any) {
      toast.error('Erro ao atualizar status: ' + err.message);
    }
  };

  const handleDelete = (id: string) => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await documentService.delete(deleteId);
      toast.success('Documento deletado!');
      fetchDocuments();
    } catch (err: any) {
      toast.error('Erro ao deletar: ' + err.message);
    }
    setIsDeleteModalOpen(false);
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Gerenciamento de Documentos</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Novo Documento
          </button>
        </div>

        <div className="mb-4">
          <input
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            placeholder="Buscar por titulo ou descricao"
            className="w-full sm:max-w-md rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {loading ? (
          <div className="text-center py-10">
            <p className="text-gray-500 dark:text-gray-400">Carregando documentos...</p>
          </div>
        ) : documents.length === 0 ? (
          <div className="text-center py-10 bg-white dark:bg-gray-800 rounded-lg shadow">
            <p className="text-gray-500 dark:text-gray-400">Nenhum documento encontrado.</p>
          </div>
        ) : (
          <div className="overflow-x-auto shadow ring-1 ring-black ring-opacity-5 rounded-lg">
            <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100 sm:pl-6">
                    Titulo
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                    Descricao
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                    Status
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                    Criado em
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span className="sr-only">Acoes</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
                {documents.map((doc) => (
                  <tr key={doc.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-gray-100 sm:pl-6">
                      {doc.titulo}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {doc.descricao}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                      <select
                        value={doc.status}
                        onChange={(event) => handleStatusChange(doc.id, event.target.value as DocumentStatus)}
                        className={`rounded-md border-gray-300 dark:border-gray-600 text-sm font-medium bg-white dark:bg-gray-800 ${
                          doc.status === DocumentStatus.PENDENTE ? 'text-yellow-600 dark:text-yellow-400' : 'text-green-600 dark:text-green-400'
                        }`}
                      >
                        <option value={DocumentStatus.PENDENTE}>Pendente</option>
                        <option value={DocumentStatus.ASSINADO}>Assinado</option>
                      </select>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {new Date(doc.criado_em).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <button
                        onClick={() => handleDelete(doc.id)}
                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                      >
                        Deletar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Pagina {pagination.currentPage} de {pagination.totalPages} - {pagination.totalItems} documentos
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              disabled={!pagination.hasPreviousPage || loading}
              className="px-3 py-1.5 text-sm rounded-md border border-gray-300 dark:border-gray-600 disabled:opacity-50"
            >
              Anterior
            </button>
            <button
              onClick={() => setPage((current) => current + 1)}
              disabled={!pagination.hasNextPage || loading}
              className="px-3 py-1.5 text-sm rounded-md border border-gray-300 dark:border-gray-600 disabled:opacity-50"
            >
              Proxima
            </button>
          </div>
        </div>
      </div>

      <DocumentFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSuccess={fetchDocuments} />

      {isDeleteModalOpen && (
        <DeleteConfirmModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={confirmDelete}
        />
      )}
    </main>
  );
}
