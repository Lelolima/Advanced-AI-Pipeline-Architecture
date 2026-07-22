import { PipelineNodeWithIcon } from '../constants/pipeline';
import { ArrowRight } from 'lucide-react';

interface PipelineCardProps {
  node: PipelineNodeWithIcon;
  isActive: boolean;
  isSelected: boolean;
  onHover: (id: string | null) => void;
  onClick: (id: string) => void;
  index: number;
}

export function PipelineCard({ node, isActive, isSelected, onHover, onClick, index }: PipelineCardProps) {
  const Icon = node.icon;

  return (
    <div
      className={`relative p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer group
        ${isSelected
          ? 'border-white scale-105 shadow-2xl shadow-purple-500/20'
          : isActive
            ? 'border-gray-400 scale-102 shadow-lg'
            : 'border-gray-700 hover:border-gray-500'}
        ${node.color} bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm`}
      onMouseEnter={() => onHover(node.id)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onClick(node.id)}
    >
      {/* Badge de ordem */}
      <div className="absolute -top-3 -right-3 w-8 h-8 bg-gray-900 border-2 border-gray-600 rounded-full flex items-center justify-center text-sm font-bold text-gray-300">
        {index + 1}
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-4">
          <div className={`p-3 rounded-lg ${node.color} bg-opacity-30`}>
            <Icon className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold">{node.title}</h2>
        </div>

        <p className="text-gray-300 text-sm">{node.description}</p>

        <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
          <span>Clique para detalhes</span>
          <ArrowRight className="w-3 h-3" />
        </div>
      </div>
    </div>
  );
}