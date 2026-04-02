import React, { useState, useCallback } from 'react';

interface FoodItem {
  fdcId: number;
  description: string;
  brandOwner?: string;
  foodCategory?: string;
  foodNutrients: { nutrientName: string; value: number; unitName: string }[];
}

interface NutrientRow { label: string; key: string; unit: string; color: string; }

const NUTRIENTS: NutrientRow[] = [
  { label: 'Calories',       key: 'Energy',                  unit: 'kcal', color: 'text-orange-600' },
  { label: 'Protein',        key: 'Protein',                 unit: 'g',    color: 'text-blue-600'   },
  { label: 'Total Fat',      key: 'Total lipid (fat)',        unit: 'g',    color: 'text-yellow-600' },
  { label: 'Carbohydrates',  key: 'Carbohydrate, by difference', unit: 'g', color: 'text-green-600' },
  { label: 'Fiber',          key: 'Fiber, total dietary',    unit: 'g',    color: 'text-emerald-600'},
  { label: 'Sugars',         key: 'Sugars, total including NLEA', unit: 'g', color: 'text-pink-600' },
  { label: 'Sodium',         key: 'Sodium, Na',              unit: 'mg',   color: 'text-red-600'    },
  { label: 'Cholesterol',    key: 'Cholesterol',             unit: 'mg',   color: 'text-purple-600' },
  { label: 'Saturated Fat',  key: 'Fatty acids, total saturated', unit: 'g', color: 'text-red-500' },
  { label: 'Vitamin C',      key: 'Vitamin C, total ascorbic acid', unit: 'mg', color: 'text-yellow-500' },
  { label: 'Calcium',        key: 'Calcium, Ca',             unit: 'mg',   color: 'text-teal-600'   },
  { label: 'Iron',           key: 'Iron, Fe',                unit: 'mg',   color: 'text-brown-600'  },
];

const getNutrient = (food: FoodItem, key: string): number | null => {
  const n = food.foodNutrients?.find(n =>
    n.nutrientName?.toLowerCase().includes(key.toLowerCase().split(',')[0].toLowerCase())
    && (n.value !== undefined)
  );
  return n ? n.value : null;
};

const getCalories = (food: FoodItem): number | null => {
  const n = food.foodNutrients?.find(n =>
    n.nutrientName === 'Energy' || n.nutrientName === 'energy'
  );
  return n ? n.value : null;
};

const FoodCalorieLookup: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<FoodItem[]>([]);
  const [selected, setSelected] = useState<FoodItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [servingG, setServingG] = useState(100);

  // USDA FoodData Central API — free, no API key required for demo tier
  const search = useCallback(async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError('');
    setResults([]);
    setSelected(null);
    try {
      const res = await fetch(
        `https://api.nal.usda.gov/fdc/v1/foods/search?query=${encodeURIComponent(query)}&pageSize=10&api_key=DEMO_KEY`,
        { signal: AbortSignal.timeout(10000) }
      );
      if (!res.ok) throw new Error('Search failed. Try again.');
      const data = await res.json();
      const foods: FoodItem[] = (data.foods || []).map((f: any) => ({
        fdcId: f.fdcId,
        description: f.description,
        brandOwner: f.brandOwner,
        foodCategory: f.foodCategory,
        foodNutrients: f.foodNutrients || [],
      }));
      if (foods.length === 0) setError('No results found. Try a different search term.');
      setResults(foods);
    } catch (e: any) {
      setError(e.message || 'Search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [query]);

  const scale = servingG / 100;

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-6 border border-rose-100">
        <h2 className="font-display font-semibold text-xl text-dark-900 mb-2">Food Calorie & Nutrition Lookup</h2>
        <p className="text-dark-600">Search 300,000+ foods from the USDA FoodData Central database — calories, macros, vitamins and minerals per 100g.</p>
        <p className="text-xs text-dark-400 mt-1">Powered by the USDA FoodData Central database (the most authoritative nutrition source available).</p>
      </div>

      {/* Search */}
      <div>
        <label className="block text-sm font-semibold mb-2 text-dark-700">Search food</label>
        <div className="flex gap-2">
          <input
            type="text" value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && query.trim() && search()}
            placeholder="e.g. chicken breast, banana, whole milk..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            disabled={loading}
          />
          <button onClick={search} disabled={loading || !query.trim()}
            className="px-6 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 disabled:opacity-50 font-semibold whitespace-nowrap">
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </div>

      {error && <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">{error}</div>}

      {/* Results list */}
      {results.length > 0 && !selected && (
        <div className="space-y-2">
          <p className="text-sm font-semibold text-dark-700">Select a food ({results.length} results)</p>
          {results.map(food => (
            <button key={food.fdcId} onClick={() => setSelected(food)}
              className="w-full text-left px-4 py-3 bg-white border border-gray-200 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-colors">
              <div className="font-semibold text-sm text-dark-800 capitalize">{food.description.toLowerCase()}</div>
              <div className="text-xs text-dark-500 mt-0.5 flex gap-3">
                {food.brandOwner && <span>{food.brandOwner}</span>}
                {food.foodCategory && <span className="text-primary-600">{food.foodCategory}</span>}
                {getCalories(food) !== null && (
                  <span className="font-semibold text-orange-600">{Math.round((getCalories(food) || 0))} kcal/100g</span>
                )}
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Detail panel */}
      {selected && (
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-display font-bold text-xl text-dark-900 capitalize">{selected.description.toLowerCase()}</h3>
              {selected.brandOwner && <p className="text-sm text-dark-500">{selected.brandOwner}</p>}
              {selected.foodCategory && <p className="text-xs text-primary-600 font-medium mt-0.5">{selected.foodCategory}</p>}
            </div>
            <button onClick={() => { setSelected(null); }} className="text-sm text-gray-400 hover:text-gray-600 shrink-0">← Back</button>
          </div>

          {/* Serving size adjuster */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <label className="block text-sm font-semibold mb-2 text-dark-700">Serving size: <span className="text-primary-600">{servingG}g</span></label>
            <input type="range" min="10" max="500" step="5" value={servingG} onChange={e => setServingG(+e.target.value)} className="w-full accent-primary-500" />
            <div className="flex justify-between text-xs text-gray-400 mt-1"><span>10g</span><span>250g</span><span>500g</span></div>
          </div>

          {/* Calorie highlight */}
          {getCalories(selected) !== null && (
            <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5 text-center">
              <div className="text-5xl font-bold text-orange-500">{Math.round((getCalories(selected) || 0) * scale)}</div>
              <div className="text-dark-600 font-semibold mt-1">kcal per {servingG}g</div>
            </div>
          )}

          {/* Macro grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Protein', key: 'Protein', color: 'blue' },
              { label: 'Fat', key: 'Total lipid (fat)', color: 'yellow' },
              { label: 'Carbs', key: 'Carbohydrate, by difference', color: 'green' },
              { label: 'Fiber', key: 'Fiber, total dietary', color: 'emerald' },
            ].map(m => {
              const val = selected.foodNutrients?.find(n => n.nutrientName?.includes(m.key.split(' ')[0]))?.value;
              return (
                <div key={m.key} className={`bg-${m.color}-50 border border-${m.color}-100 rounded-xl p-3 text-center`}>
                  <div className={`text-2xl font-bold text-${m.color}-600`}>{val != null ? (val * scale).toFixed(1) : '—'}g</div>
                  <div className="text-xs text-dark-500 mt-0.5">{m.label}</div>
                </div>
              );
            })}
          </div>

          {/* Full nutrients table */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
              <span className="text-sm font-semibold text-dark-700">Full Nutrition Facts — per {servingG}g</span>
            </div>
            <div className="divide-y divide-gray-100">
              {selected.foodNutrients
                ?.filter(n => n.value != null && n.value > 0)
                .slice(0, 20)
                .map((n, i) => (
                  <div key={i} className="flex justify-between items-center px-4 py-2.5">
                    <span className="text-sm text-dark-700">{n.nutrientName}</span>
                    <span className="text-sm font-semibold text-dark-800">
                      {(n.value * scale).toFixed(n.unitName === 'KCAL' ? 0 : n.value < 1 ? 3 : 1)} {n.unitName?.toLowerCase()}
                    </span>
                  </div>
                ))}
            </div>
          </div>

          <div className="text-xs text-gray-400 text-center">
            Source: USDA FoodData Central · Values are per {servingG}g serving · FDC ID: {selected.fdcId}
          </div>
        </div>
      )}

      <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-6 border border-orange-100">
        <h3 className="font-display font-semibold text-lg text-dark-900 mb-3">How to Use</h3>
        <ol className="space-y-2 text-dark-700 text-sm list-decimal list-inside">
          <li>Type any food name and click Search</li>
          <li>Select the matching item from the list</li>
          <li>Adjust the serving size slider to your portion</li>
          <li>See full nutritional breakdown scaled to your serving</li>
        </ol>
      </div>
    </div>
  );
};

export default FoodCalorieLookup;
