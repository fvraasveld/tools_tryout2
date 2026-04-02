import React, { useEffect } from 'react';
import { useUser } from '../../context/UserContext';

interface ToolPlaceholderProps {
  toolId: string;
  toolName: string;
  description: string;
  exampleInput?: string;
}

const ToolPlaceholder: React.FC<ToolPlaceholderProps> = ({
  toolId,
  toolName,
  description,
  exampleInput,
}) => {
  const { addToolToHistory } = useUser();

  useEffect(() => {
    addToolToHistory(toolId);
  }, [toolId]);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-primary-50 to-orange-50 rounded-2xl p-8 border-2 border-dashed border-primary-200">
        <div className="text-center">
          <div className="text-6xl mb-4">🚧</div>
          <h3 className="font-display font-bold text-2xl text-dark-900 mb-2">
            {toolName}
          </h3>
          <p className="text-dark-600 mb-4 max-w-md mx-auto">
            {description}
          </p>
          <div className="inline-block px-6 py-3 bg-white rounded-xl shadow-sm border border-primary-200">
            <p className="text-sm text-dark-700">
              <span className="font-semibold">Coming Soon!</span>
              <br />
              This tool is currently under development.
            </p>
          </div>
          {exampleInput && (
            <div className="mt-6 p-4 bg-white rounded-xl text-left">
              <p className="text-xs text-dark-500 mb-2">Example Input:</p>
              <p className="font-mono text-sm text-dark-700">{exampleInput}</p>
            </div>
          )}
        </div>
      </div>

      {/* Instructions on how to add this tool */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-dark-100">
        <h3 className="font-display font-semibold text-lg text-dark-900 mb-3">
          🔧 Developer Note: How to Implement This Tool
        </h3>
        <div className="space-y-3 text-sm text-dark-700">
          <p>To implement this tool, follow these steps:</p>
          <ol className="list-decimal list-inside space-y-2 ml-2">
            <li>
              Create a new component file in <code className="bg-dark-100 px-2 py-1 rounded">src/components/tools/[Category]/{toolName.replace(/\s+/g, '')}.tsx</code>
            </li>
            <li>
              Implement the tool's core logic (client-side processing)
            </li>
            <li>
              Add input/output sections similar to the JSON to CSV example
            </li>
            <li>
              Update the route in <code className="bg-dark-100 px-2 py-1 rounded">App.tsx</code> to import and render your component
            </li>
            <li>
              Test thoroughly and ensure responsive design
            </li>
          </ol>
          <p className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            💡 <strong>Tip:</strong> Reference the JSONToCSV component at{' '}
            <code className="bg-white px-2 py-1 rounded">src/components/tools/DeveloperTools/JSONToCSV.tsx</code>{' '}
            for a complete implementation example.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ToolPlaceholder;
