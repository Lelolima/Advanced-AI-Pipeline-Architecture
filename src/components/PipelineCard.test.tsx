import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PipelineCard } from '../components/PipelineCard';
import { FileText } from 'lucide-react';

describe('PipelineCard', () => {
  const mockNode = {
    id: 'input',
    title: 'Input Data',
    description: 'Raw images and text data enter the pipeline',
    color: 'bg-blue-500',
    icon: FileText,
  };

  it('renderiza o título do node corretamente', () => {
    render(
      <PipelineCard
        node={mockNode}
        isActive={false}
        isSelected={false}
        onHover={() => {}}
        onClick={() => {}}
        index={0}
      />
    );

    expect(screen.getByText('Input Data')).toBeInTheDocument();
  });

  it('renderiza a descrição do node corretamente', () => {
    render(
      <PipelineCard
        node={mockNode}
        isActive={false}
        isSelected={false}
        onHover={() => {}}
        onClick={() => {}}
        index={0}
      />
    );

    expect(screen.getByText('Raw images and text data enter the pipeline')).toBeInTheDocument();
  });

  it('renderiza o badge de ordem corretamente', () => {
    render(
      <PipelineCard
        node={mockNode}
        isActive={false}
        isSelected={false}
        onHover={() => {}}
        onClick={() => {}}
        index={2}
      />
    );

    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('renderiza o ícone do node', () => {
    render(
      <PipelineCard
        node={mockNode}
        isActive={false}
        isSelected={false}
        onHover={() => {}}
        onClick={() => {}}
        index={0}
      />
    );

    // Verifica se o ícone está presente (Lucide icons usam svg)
    expect(document.querySelector('svg')).toBeInTheDocument();
  });

  it('aplica classes CSS quando ativo', () => {
    const { container } = render(
      <PipelineCard
        node={mockNode}
        isActive={true}
        isSelected={false}
        onHover={() => {}}
        onClick={() => {}}
        index={0}
      />
    );

    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass('border-gray-400');
  });

  it('aplica classes CSS quando selecionado', () => {
    const { container } = render(
      <PipelineCard
        node={mockNode}
        isActive={false}
        isSelected={true}
        onHover={() => {}}
        onClick={() => {}}
        index={0}
      />
    );

    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass('border-white');
    expect(card).toHaveClass('shadow-2xl');
  });
});