import React, { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useTools } from '../context/ToolsContext';
import SearchBar from '../components/common/SearchBar';
import ToolCard from '../components/common/ToolCard';
import { CATEGORIES } from '../utils/constants';
import { getCategoryColor, getCategoryIcon, filterToolsByCategory } from '../utils/helpers';
import { useSearch } from '../hooks/useSearch';

const Home: React.FC = () => {
  const { tools } = useTools();
  const { searchQuery, setSearchQuery, filteredTools } = useSearch(tools);
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get('category') || 'All';
  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl);

  useEffect(() => {
    setSelectedCategory(categoryFromUrl);
    if (categoryFromUrl !== 'All') {
      setTimeout(() => {
        const el = document.getElementById('tools-section');
        if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' });
      }, 100);
    }
  }, [categoryFromUrl]);

  const displayTools = useMemo(() => filterToolsByCategory(filteredTools, selectedCategory), [filteredTools, selectedCategory]);
  const categoryStats = useMemo(() => CATEGORIES.map(cat => ({ name: cat, count: filterToolsByCategory(tools, cat).length })), [tools]);

  return (
    <div className="min-h-screen">
      {/* Hero section with search bar */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-100 via-orange-50 to-yellow-50 opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="text-center space-y-6 animate-fade-in">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-dark-900 leading-tight">
              Your <span className="text-gradient">All-in-One</span> Toolkit<br />for Everyday Tasks
            </h1>
            <p className="text-xl text-dark-600 max-w-3xl mx-auto">
              Access powerful online tools for text processing, file conversion, development, calculations, and creative work. All free, fast, and privacy-focused.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm text-dark-600">
              <span className="flex items-center space-x-1 bg-white px-4 py-2 rounded-full shadow-sm"><span>✓</span><span>100% Client-Side</span></span>
              <span className="flex items-center space-x-1 bg-white px-4 py-2 rounded-full shadow-sm"><span>🔒</span><span>Your Data Stays Private</span></span>
              <span className="flex items-center space-x-1 bg-white px-4 py-2 rounded-full shadow-sm"><span>⚡</span><span>Instant Results</span></span>
              <span className="flex items-center space-x-1 bg-white px-4 py-2 rounded-full shadow-sm"><span>🆓</span><span>Free Forever</span></span>
            </div>
            <div className="pt-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Search for tools... (e.g., 'JSON', 'calculator', 'compress')" />
            </div>
          </div>
        </div>
      </section>

      {/* Category filter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-wrap gap-3 justify-center">
          {categoryStats.map(cat => (
            <button key={cat.name} onClick={() => setSelectedCategory(cat.name)}
              className={`category-badge border-2 transition-all ${selectedCategory===cat.name ? getCategoryColor(cat.name)+' shadow-md scale-105' : 'bg-white text-dark-600 border-dark-200 hover:border-primary-300'}`}>
              <span className="mr-2">{getCategoryIcon(cat.name)}</span>{cat.name} ({cat.count})
            </button>
          ))}
        </div>
      </section>

      {/* Tool grid */}
      <section id="tools-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {displayTools.length > 0 ? (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-display font-bold text-dark-900">
                {searchQuery ? `Search Results (${displayTools.length})` : selectedCategory==='All' ? 'All Tools' : `${selectedCategory} Tools`}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {displayTools.map((tool, index) => (
                <div key={tool.id} className="animate-scale-in" style={{ animationDelay: `${index * 0.05}s` }}>
                  <ToolCard tool={tool} />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-display font-bold text-dark-900 mb-2">No tools found</h3>
            <p className="text-dark-600">Try adjusting your search or browse all categories</p>
            <button onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }} className="btn-secondary mt-6">Show All Tools</button>
          </div>
        )}
      </section>

      <section className="bg-gradient-to-r from-primary-500 to-orange-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Ready to boost your productivity?</h2>
          <p className="text-xl mb-8 opacity-90">Start using our tools now — no sign-up required!</p>
          <Link to="/tools" className="inline-block bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-dark-50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1">
            Browse All Tools →
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
