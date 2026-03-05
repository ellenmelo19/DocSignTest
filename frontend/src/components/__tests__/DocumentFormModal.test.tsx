import { act, render, screen } from '@testing-library/react';
import DocumentFormModal from '../DocumentFormModal';

describe('DocumentFormModal', () => {
  it('renderiza o modal corretamente', async () => {
    await act(async () => {
      render(<DocumentFormModal isOpen={true} onClose={() => {}} onSuccess={() => {}} />);
    });
    expect(screen.getByText('Novo Documento')).toBeInTheDocument();
  });
});
