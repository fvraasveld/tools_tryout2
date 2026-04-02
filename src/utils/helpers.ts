import { Tool } from '../types';

/**
 * Copy text to clipboard
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy:', err);
    return false;
  }
};

/**
 * Download text as a file
 */
export const downloadAsFile = (content: string, filename: string, type: string = 'text/plain') => {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Format number with commas
 */
export const formatNumber = (num: number): string => {
  return num.toLocaleString('en-US');
};

/**
 * Debounce function
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout>;
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Get tool by ID
 */
export const getToolById = (tools: Tool[], id: string): Tool | undefined => {
  return tools.find(tool => tool.id === id);
};

/**
 * Filter tools by category - NOW SUPPORTS MULTIPLE CATEGORIES
 */
export const filterToolsByCategory = (tools: Tool[], category: string): Tool[] => {
  if (category === 'All') return tools;
  return tools.filter(tool => {
    // Check primary category
    if (tool.category === category) return true;
    // Check additional categories
    if (tool.categories && tool.categories.includes(category as any)) return true;
    return false;
  });
};

/**
 * Search tools by query - NOW SEARCHES MULTIPLE CATEGORIES
 */
export const searchTools = (tools: Tool[], query: string): Tool[] => {
  const lowerQuery = query.toLowerCase().trim();
  if (!lowerQuery) return tools;
  
  return tools.filter(tool => {
    // Search in name, description, tags
    const matchesBasic = 
      tool.name.toLowerCase().includes(lowerQuery) ||
      tool.description.toLowerCase().includes(lowerQuery) ||
      tool.category.toLowerCase().includes(lowerQuery) ||
      tool.tags?.some(tag => tag.toLowerCase().includes(lowerQuery));
    
    // Also search in additional categories
    const matchesCategories = tool.categories?.some(cat => 
      cat.toLowerCase().includes(lowerQuery)
    );
    
    return matchesBasic || matchesCategories;
  });
};

/**
 * Get category color - UPDATED WITH ALL CATEGORIES
 */
export const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    'Text': 'bg-blue-100 text-blue-700 border-blue-200',
    'Developer': 'bg-green-100 text-green-700 border-green-200',
    'Calculator': 'bg-orange-100 text-orange-700 border-orange-200',
    'Converter': 'bg-purple-100 text-purple-700 border-purple-200',
    'Creative': 'bg-pink-100 text-pink-700 border-pink-200',
    'Productivity': 'bg-indigo-100 text-indigo-700 border-indigo-200',
    'Financial': 'bg-emerald-100 text-emerald-700 border-emerald-200',
    'Health': 'bg-rose-100 text-rose-700 border-rose-200',
    'All': 'bg-gray-100 text-gray-700 border-gray-200',
  };
  return colors[category] || 'bg-gray-100 text-gray-700 border-gray-200';
};

/**
 * Get category icon - UPDATED WITH ALL CATEGORIES
 */
export const getCategoryIcon = (category: string): string => {
  const icons: Record<string, string> = {
    'Text': '📝',
    'Developer': '💻',
    'Calculator': '🧮',
    'Converter': '🔄',
    'Creative': '🎨',
    'Productivity': '⚡',
    'Financial': '💰',
    'Health': '🩺',
    'All': '🔧',
  };
  return icons[category] || '🔧';
};
