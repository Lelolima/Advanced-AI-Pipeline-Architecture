export interface PipelineNode {
  id: string;
  title: string;
  description: string;
  color: string;
}

export const PIPELINE_NODES: PipelineNode[] = [
  {
    id: 'input',
    title: 'Input Data',
    description: 'Raw images and text data enter the pipeline',
    color: 'bg-blue-500'
  },
  {
    id: 'cnn',
    title: 'CNN',
    description: 'Processes visual data using convolutional neural networks',
    color: 'bg-purple-500'
  },
  {
    id: 'llm',
    title: 'LLM',
    description: 'Analyzes and processes textual data',
    color: 'bg-green-500'
  },
  {
    id: 'rnn',
    title: 'RNN',
    description: 'Processes sequential data and temporal patterns',
    color: 'bg-orange-500'
  },
  {
    id: 'integration',
    title: 'Integration Layer',
    description: 'Combines outputs from all models',
    color: 'bg-red-500'
  },
  {
    id: 'output',
    title: 'Final Output',
    description: 'Generates predictions and insights',
    color: 'bg-indigo-500'
  }
];