import React, { useState } from 'react';
import { Brain, Image as ImageIcon, MessageSquare, Network, ArrowRight, Eye, FileText, Zap } from 'lucide-react';

function App() {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const nodes = [
    {
      id: 'input',
      title: 'Input Data',
      description: 'Raw images and text data enter the pipeline',
      icon: FileText,
      color: 'bg-blue-500'
    },
    {
      id: 'cnn',
      title: 'CNN',
      description: 'Processes visual data using convolutional neural networks',
      icon: Eye,
      color: 'bg-purple-500'
    },
    {
      id: 'llm',
      title: 'LLM',
      description: 'Analyzes and processes textual data',
      icon: MessageSquare,
      color: 'bg-green-500'
    },
    {
      id: 'rnn',
      title: 'RNN',
      description: 'Processes sequential data and temporal patterns',
      icon: Network,
      color: 'bg-orange-500'
    },
    {
      id: 'integration',
      title: 'Integration Layer',
      description: 'Combines outputs from all models',
      icon: Brain,
      color: 'bg-red-500'
    },
    {
      id: 'output',
      title: 'Final Output',
      description: 'Generates predictions and insights',
      icon: Zap,
      color: 'bg-indigo-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Advanced AI Pipeline Architecture</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {nodes.map((node) => (
            <div
              key={node.id}
              className={`p-6 rounded-lg border-2 transition-all duration-300 cursor-pointer
                ${activeNode === node.id ? 'border-white scale-105' : 'border-gray-700 hover:border-gray-500'}
                ${node.color} bg-opacity-20 hover:bg-opacity-30`}
              onMouseEnter={() => setActiveNode(node.id)}
              onMouseLeave={() => setActiveNode(null)}
            >
              <div className="flex items-center space-x-4 mb-4">
                <node.icon className="w-8 h-8" />
                <h2 className="text-xl font-semibold">{node.title}</h2>
              </div>
              <p className="text-gray-300">{node.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-gray-800 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">How It Works</h2>
          <div className="space-y-4">
            <p className="text-gray-300">
              This advanced AI pipeline combines multiple neural network architectures to process both visual and textual data:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>CNN processes images to extract visual features</li>
              <li>LLM handles natural language understanding and generation</li>
              <li>RNN processes sequential data and temporal patterns</li>
              <li>Integration layer combines all outputs for final predictions</li>
            </ul>
            <div className="mt-6 p-4 bg-gray-700 rounded-lg">
              <p className="text-sm text-gray-300">
                Note: This is a visualization of the architecture. In a production environment, 
                this would be implemented using frameworks like TensorFlow or PyTorch, with 
                actual model training and inference capabilities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;