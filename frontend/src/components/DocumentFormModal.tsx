'use client';

import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { documentService } from '@/services/documentService';
import toast from 'react-hot-toast';
import { CreateDocumentInput } from '@/types/document';

interface DocumentFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function DocumentFormModal({ isOpen, onClose, onSuccess }: DocumentFormModalProps) {
  const [formData, setFormData] = useState<CreateDocumentInput>({
    titulo: '',
    descricao: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.titulo.trim() || !formData.descricao.trim()) {
      toast.error('Preencha título e descrição');
      return;
    }

    setSubmitting(true);
    try {
      await documentService.create(formData);
      toast.success('Documento criado com sucesso!');
      onSuccess(); // recarrega lista
      onClose();
      setFormData({ titulo: '', descricao: '' });
    } catch (err: any) {
      toast.error('Erro ao criar documento: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex justify-between items-center mb-4">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    Novo Documento
                  </Dialog.Title>
                  <button onClick={onClose}>
                    <XMarkIcon className="h-6 w-6 text-gray-500 hover:text-gray-700" />
                  </button>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="titulo" className="block text-sm font-medium text-gray-700">
                      Título
                    </label>
                      <input
                        type="text"
                        id="titulo"
                        name="titulo"
                        value={formData.titulo}
                        onChange={handleChange}
                        placeholder="Digite o título do documento"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                                  focus:border-indigo-500 focus:ring-indigo-500 focus:ring-2 
                                  sm:text-sm px-3 py-2 text-gray-900 placeholder-gray-400"
                        required
                      />
                  </div>

                  <div className="mb-6">
                    <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">
                      Descrição
                    </label>
                      <textarea
                        id="descricao"
                        name="descricao"
                        rows={4}
                        value={formData.descricao}
                        onChange={handleChange}
                        placeholder="Descreva o documento aqui..."
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                                  focus:border-indigo-500 focus:ring-indigo-500 focus:ring-2 
                                  sm:text-sm px-3 py-2 text-gray-900 placeholder-gray-400 resize-y"
                        required
                      />
                  </div>

                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                    >
                      {submitting ? 'Criando...' : 'Criar'}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}