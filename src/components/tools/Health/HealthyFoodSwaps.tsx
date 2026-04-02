import React, { useState } from 'react';

interface Swap {
  original: string;
  swap: string;
  why: string;
  category: string;
}

const SWAPS: Swap[] = [
  // Dairy & fats
  { original: 'Heavy cream',       swap: 'Unsweetened coconut milk or light cream',             why: 'Same richness, less saturated fat',          category: 'Dairy & Fats' },
  { original: 'Full-fat cheese',   swap: 'Reduced-fat ricotta or nutritional yeast',             why: 'Lower calories, similar creaminess',          category: 'Dairy & Fats' },
  { original: 'Sour cream',        swap: 'Plain Greek yogurt (2%)',                              why: 'Higher protein, probiotic benefits',          category: 'Dairy & Fats' },
  { original: 'Mayonnaise',        swap: 'Mashed avocado or plain Greek yogurt',                 why: 'Healthy fats, fewer empty calories',          category: 'Dairy & Fats' },
  { original: 'Butter (baking)',   swap: 'Unsweetened applesauce or mashed banana',              why: 'Reduces fat, adds natural sweetness',         category: 'Dairy & Fats' },
  { original: 'Cream cheese',      swap: 'Blended cottage cheese',                               why: 'Much higher protein, lower fat',             category: 'Dairy & Fats' },
  { original: 'Cow\'s milk',       swap: 'Unsweetened almond or oat milk',                       why: 'Lower calories, lactose-free',               category: 'Dairy & Fats' },
  // Flour & carbs
  { original: 'White flour',       swap: 'Almond flour or oat flour',                           why: 'More fibre, lower glycemic index',           category: 'Flour & Carbs' },
  { original: 'White rice',        swap: 'Cauliflower rice or brown rice',                       why: 'Fewer carbs or more fibre',                 category: 'Flour & Carbs' },
  { original: 'Pasta',             swap: 'Chickpea pasta, lentil pasta, or zucchini noodles',    why: 'More protein and fibre',                    category: 'Flour & Carbs' },
  { original: 'Breadcrumbs',       swap: 'Rolled oats or almond meal',                          why: 'More nutrients, gluten-free option',         category: 'Flour & Carbs' },
  { original: 'Mashed potatoes',   swap: 'Mashed cauliflower or white bean mash',               why: 'Far fewer carbs, more fibre',               category: 'Flour & Carbs' },
  { original: 'Tortilla wraps',    swap: 'Lettuce wraps or whole grain tortillas',               why: 'Less refined carbs',                        category: 'Flour & Carbs' },
  // Condiments & sauces
  { original: 'Ketchup',           swap: 'Tomato salsa or Dijon mustard',                       why: 'Less sugar, more flavour variety',           category: 'Condiments' },
  { original: 'Ranch dressing',    swap: 'Hummus or olive oil + lemon',                         why: 'Healthier fats, no hidden additives',        category: 'Condiments' },
  { original: 'Sugary BBQ sauce',  swap: 'Chipotle-spiced tomato purée',                        why: 'Less added sugar, same smoky flavour',       category: 'Condiments' },
  { original: 'Soy sauce',         swap: 'Coconut aminos or low-sodium tamari',                  why: 'Same umami, much less sodium',              category: 'Condiments' },
  // Sweeteners
  { original: 'White sugar',       swap: 'Medjool dates (blended) or raw honey',                why: 'Fibre-rich, slower glucose spike',           category: 'Sweeteners' },
  { original: 'Chocolate chips',   swap: '70%+ dark chocolate, chopped',                        why: 'More antioxidants, less sugar',              category: 'Sweeteners' },
  { original: 'Jam / jelly',       swap: 'Mashed fresh berries with chia seeds',                why: 'Natural sugars, omega-3s, fibre',           category: 'Sweeteners' },
  // Snacks
  { original: 'Potato chips',      swap: 'Roasted chickpeas or edamame',                        why: 'Protein + fibre, similar crunch',            category: 'Snacks' },
  { original: 'Crackers',          swap: 'Rice cakes or cucumber slices',                       why: 'Lower calories, no refined grains',          category: 'Snacks' },
  { original: 'Ice cream',         swap: 'Frozen banana "nice cream" or coconut yogurt',         why: 'No added sugar option, real fruit',          category: 'Snacks' },
  { original: 'Candy bar',         swap: 'Medjool date + nut butter',                           why: 'Natural sweetness, healthy fats, protein',   category: 'Snacks' },
  // Protein
  { original: 'Ground beef (80%)', swap: 'Ground turkey or extra-lean ground beef',             why: 'Fewer saturated fats',                      category: 'Protein' },
  { original: 'Fried chicken',     swap: 'Air-fried or baked with almond crust',                why: 'Same crunch, fraction of the oil',           category: 'Protein' },
  { original: 'Processed deli meat',swap:'Shredded rotisserie chicken or hard-boiled eggs',     why: 'No nitrates, whole food protein',           category: 'Protein' },
];

const CATEGORIES = ['All', ...Array.from(new Set(SWAPS.map(s => s.category)))];

const FOOD_GROUPS = [
  { name: 'High Protein',         emoji: '💪', color: 'blue',    foods: ['Chicken breast','Greek yogurt','Eggs','Lentils','Tuna','Edamame','Cottage cheese','Tempeh','Black beans','Tofu'] },
  { name: 'Plant Protein',        emoji: '🌱', color: 'green',   foods: ['Edamame','Lentils','Chickpeas','Black beans','Tofu','Tempeh','Pea protein','Hemp seeds','Quinoa','Peanut butter'] },
  { name: 'High Fibre',           emoji: '🫘', color: 'amber',   foods: ['Chia seeds','Black beans','Lentils','Avocado','Oats','Broccoli','Artichoke','Pear','Raspberries','Flaxseed'] },
  { name: 'Healthy Fats',         emoji: '🥑', color: 'yellow',  foods: ['Avocado','Olive oil','Walnuts','Salmon','Chia seeds','Flaxseed','Almonds','Sardines','Hemp seeds','Dark chocolate 70%+'] },
  { name: 'Probiotics',           emoji: '🦠', color: 'purple',  foods: ['Greek yogurt','Kefir','Kimchi','Sauerkraut','Miso','Tempeh','Kombucha','Pickles (fermented)','Natto','Yogurt'] },
  { name: 'Prebiotics',           emoji: '🧄', color: 'indigo',  foods: ['Garlic','Onions','Leeks','Asparagus','Oats','Bananas (unripe)','Apples','Chicory root','Jerusalem artichoke','Flaxseed'] },
  { name: 'High Antioxidants',    emoji: '🫐', color: 'rose',    foods: ['Blueberries','Dark chocolate','Pecans','Artichokes','Goji berries','Raspberries','Kale','Red cabbage','Beets','Pomegranate'] },
  { name: 'Avoid / Limit',        emoji: '⚠️', color: 'red',     foods: ['Ultra-processed snacks','Sugary drinks','Refined white bread','Deli meats with nitrates','Margarine','Fast food oils','Candy','Sweetened yogurt','White rice (excess)','Alcohol'] },
];

const colorMap: Record<string, string> = {
  blue: 'bg-blue-50 border-blue-100 text-blue-700',
  green: 'bg-green-50 border-green-100 text-green-700',
  amber: 'bg-amber-50 border-amber-100 text-amber-700',
  yellow: 'bg-yellow-50 border-yellow-100 text-yellow-700',
  purple: 'bg-purple-50 border-purple-100 text-purple-700',
  indigo: 'bg-indigo-50 border-indigo-100 text-indigo-700',
  rose: 'bg-rose-50 border-rose-100 text-rose-700',
  red: 'bg-red-50 border-red-200 text-red-700',
};

const HealthyFoodSwaps: React.FC = () => {
  const [tab, setTab] = useState<'swaps'|'groups'>('swaps');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const filtered = SWAPS.filter(s =>
    (category === 'All' || s.category === category) &&
    (search === '' || s.original.toLowerCase().includes(search.toLowerCase()) || s.swap.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
        <h2 className="font-display font-semibold text-xl text-dark-900 mb-2">Healthy Food Swaps & Nutrition Guide</h2>
        <p className="text-dark-600">Find healthier alternatives to common ingredients, or browse foods by nutritional category.</p>
      </div>

      <div className="flex gap-2">
        {(['swaps','groups'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-5 py-2 rounded-xl font-semibold text-sm transition-colors ${tab===t?'bg-primary-500 text-white':'bg-gray-100 text-dark-600 hover:bg-gray-200'}`}>
            {t === 'swaps' ? '🔄 Food Swaps' : '📋 Food Groups'}
          </button>
        ))}
      </div>

      {tab === 'swaps' && (
        <div className="space-y-4">
          <div className="flex gap-3 flex-wrap">
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search ingredient (e.g. mayonnaise)…"
              className="flex-1 min-w-48 px-4 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent" />
            <select value={category} onChange={e => setCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-xl text-sm">
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="space-y-2">
            {filtered.map((s, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="flex gap-4 items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-bold text-dark-800">{s.original}</span>
                      <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full text-gray-500">{s.category}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-primary-500 font-bold mt-0.5 shrink-0">→</span>
                      <span className="text-sm font-semibold text-primary-700">{s.swap}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0 max-w-48">
                    <span className="text-xs text-gray-500 italic">{s.why}</span>
                  </div>
                </div>
              </div>
            ))}
            {filtered.length === 0 && <p className="text-center text-gray-400 py-8">No swaps found. Try a different search.</p>}
          </div>
        </div>
      )}

      {tab === 'groups' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {FOOD_GROUPS.map(g => (
            <div key={g.name} className={`rounded-2xl border p-5 ${colorMap[g.color]}`}>
              <h3 className="font-display font-bold text-base mb-3">{g.emoji} {g.name}</h3>
              <div className="flex flex-wrap gap-1.5">
                {g.foods.map(f => (
                  <span key={f} className="text-xs px-2.5 py-1 bg-white bg-opacity-60 rounded-full font-medium">{f}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HealthyFoodSwaps;
