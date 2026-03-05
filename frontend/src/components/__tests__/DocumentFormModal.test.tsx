import { render, screen, fireEvent } from '@testing-library/react';
import DocumentFormModal from '../DocumentFormModal';

describe('DocumentFormModal', () => {
  it('renderiza o modal corretamente', () => {
    render(<DocumentFormModal isOpen={true} onClose={() => {}} onSuccess={() => {}} />);
    expect(screen.getByText('Novo Documento')).toBeInTheDocument();
  });
});