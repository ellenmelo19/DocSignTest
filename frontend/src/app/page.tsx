'use client';

import { useEffect, useState } from 'react';
import { documentService } from '@/services/documentService';
import { Document, DocumentStatus } from '@/types/document';
import toast from 'react-hot-toast';
import { PlusIcon } from '@heroicons/react/24/outline';
import DocumentFormModal from '@/components/DocumentFormModal';
import DeleteConfirmModal from '@/components/DeleteConfirmModal';

export default function Home() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const data = await documentService.list();
      setDocuments(data);
    } catch (err: any) {
      toast.error('Erro ao carregar documentos: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleStatusChange = async (id: string, newStatus: DocumentStatus) => {
    try {
      await documentService.updateStatus(id, newStatus);
      toast.success('Status atualizado com sucesso!');
      fetchDocuments(); // recarrega a lista
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
  };

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Gerenciamento de Documentos</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Novo Documento
          </button>
        </div>

        {loading ? (
          <div className="text-center py-10">
            <p className="text-gray-500">Carregando documentos...</p>
          </div>
        ) : documents.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-lg shadow">
            <p className="text-gray-500">Nenhum documento encontrado. Crie o primeiro!</p>
          </div>
        ) : (
          <div className="overflow-x-auto shadow ring-1 ring-black ring-opacity-5 rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                    Título
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Descrição
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Status
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Criado em
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span className="sr-only">Ações</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {documents.map((doc) => (
                  <tr key={doc.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                      {doc.titulo}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {doc.descricao}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                      <select
                        value={doc.status}
                        onChange={(e) => handleStatusChange(doc.id, e.target.value as DocumentStatus)}
                        className={`rounded-md border-gray-300 text-sm font-medium ${
                          doc.status === DocumentStatus.PENDENTE ? 'text-yellow-600' : 'text-green-600'
                        }`}
                      >
                        <option value={DocumentStatus.PENDENTE}>Pendente</option>
                        <option value={DocumentStatus.ASSINADO}>Assinado</option>
                      </select>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {new Date(doc.criado_em).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <button onClick={() => handleDelete(doc.id)} className="text-red-600 hover:text-red-900">Deletar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <DocumentFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={fetchDocuments}
        />
        <DeleteConfirmModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={confirmDelete}
        />
      </div>
    </main>
  );
}