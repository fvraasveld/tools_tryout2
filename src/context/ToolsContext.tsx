import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Tool } from '../types';
import toolsData from '../data/tools.json';

interface ToolsContextType {
  tools: Tool[];
  loading: boolean;
  getToolById: (id: string) => Tool | undefined;
  getToolsByCategory: (category: string) => Tool[];
}

const ToolsContext = createContext<ToolsContextType | undefined>(undefined);

export const useTools = () => {
  const context = useContext(ToolsContext);
  if (!context) {
    throw new Error('useTools must be used within a ToolsProvider');
  }
  return context;
};

interface ToolsProviderProps {
  children: ReactNode;
}

export const ToolsProvider: React.FC<ToolsProviderProps> = ({ children }) => {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading from data source
    const loadTools = () => {
      try {
        setTools(toolsData as Tool[]);
      } catch (error) {
        console.error('Error loading tools:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTools();
  }, []);

  const getToolById = (id: string): Tool | undefined => {
    return tools.find(tool => tool.id === id);
  };

  const getToolsByCategory = (category: string): Tool[] => {
    if (category === 'All') return tools;
    return tools.filter(tool => tool.category === category);
  };

  const value: ToolsContextType = {
    tools,
    loading,
    getToolById,
    getToolsByCategory,
  };

  return (
    <ToolsContext.Provider value={value}>
      {children}
    </ToolsContext.Provider>
  );
};
