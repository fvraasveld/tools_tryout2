import { useState, useMemo } from 'react';
import { Tool } from '../types';
import { filterToolsByCategory } from '../utils/helpers';

/**
 * Custom hook for filtering tools by category
 */
export function useFilter(tools: Tool[]) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredTools = useMemo(() => {
    return filterToolsByCategory(tools, selectedCategory);
  }, [tools, selectedCategory]);

  return {
    selectedCategory,
    setSelectedCategory,
    filteredTools,
  };
}
