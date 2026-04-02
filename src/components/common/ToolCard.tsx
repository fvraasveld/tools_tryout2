import React from 'react';
import { Link } from 'react-router-dom';
import { Tool } from '../../types';
import { getCategoryColor } from '../../utils/helpers';
import ToolIcon from './ToolIcon';

interface ToolCardProps { tool: Tool; }

const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  // Show all categories this tool belongs to
  const allCategories = tool.categories && tool.categories.length > 0
    ? tool.categories
    : [tool.category];

  return (
    <Link to={tool.pagePath} className="block">
      <div className="tool-card group relative">
        <div className="mb-4 group-hover:scale-105 transition-transform duration-300 inline-block">
          <ToolIcon toolId={tool.id} size="md" />
        </div>
        <div className="space-y-2">
          <h3 className="font-display font-semibold text-lg text-dark-900 group-hover:text-primary-600 transition-colors">
            {tool.name}
          </h3>
          <p className="text-dark-600 text-sm line-clamp-2">{tool.description}</p>
          <div className="flex flex-wrap items-center gap-1.5 pt-2">
            {allCategories.map(cat => (
              <span key={cat} className={`category-badge border text-xs ${getCategoryColor(cat)}`}>
                {cat}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ToolCard;
