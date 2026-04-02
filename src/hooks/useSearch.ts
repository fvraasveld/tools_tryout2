import { useState, useMemo } from 'react';
import { Tool } from '../types';
import { searchTools } from '../utils/helpers';

/**
 * Custom hook for searching tools
 */
export function useSearch(tools: Tool[]) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTools = useMemo(() => {
    return searchTools(tools, searchQuery);
  }, [tools, searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    filteredTools,
  };
}
