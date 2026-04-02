import React, { useState } from 'react';

const HashtagGenerator: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [hashtags, setHashtags] = useState<string[]>([]);

  const hashtagTemplates = {
    general: ['Daily', 'Life', 'Vibes', 'Mood', 'Goals', 'Inspo', 'Love', 'Happy', 'Fun', 'Style'],
    business: ['Business', 'Entrepreneur', 'Startup', 'Success', 'Growth', 'Marketing', 'Brand', 'Sales'],
    fitness: ['Fitness', 'Workout', 'Gym', 'Health', 'Training', 'Motivation', 'FitLife', 'GymLife'],
    food: ['Food', 'Foodie', 'Yummy', 'Delicious', 'Cooking', 'Recipe', 'FoodPorn', 'Eats'],
    travel: ['Travel', 'Adventure', 'Wanderlust', 'Explore', 'Vacation', 'TravelGram', 'Traveler'],
    tech: ['Tech', 'Technology', 'Innovation', 'Digital', 'Startup', 'Coding', 'AI', 'Software'],
    fashion: ['Fashion', 'Style', 'OOTD', 'Outfit', 'Trendy', 'Fashionista', 'Look', 'Streetwear'],
    art: ['Art', 'Artist', 'Creative', 'Design', 'Artwork', 'Drawing', 'Painting', 'Illustration']
  };

  const generate = () => {
    if (!topic.trim()) return;
    
    const words = topic.toLowerCase().split(/\s+/);
    const generated: string[] = [];
    
    // Add main topic hashtags
    generated.push('#' + words.join(''));
    words.forEach(word => {
      if (word.length > 2) {
        generated.push('#' + word);
      }
    });
    
    // Add trending formats
    generated.push('#' + words.join('') + 'daily');
    generated.push('#' + words.join('') + 'life');
    generated.push('#insta' + words.join(''));
    
    // Add random templates
    const randomCategory = Object.values(hashtagTemplates)[Math.floor(Math.random() * Object.values(hashtagTemplates).length)];
    randomCategory.slice(0, 5).forEach(template => {
      generated.push('#' + template.toLowerCase());
    });
    
    // Add combination hashtags
    if (words.length > 1) {
      generated.push('#' + words[0] + 'and' + words[1]);
    }
    
    setHashtags([...new Set(generated)].slice(0, 30));
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-semibold mb-2">Enter your topic or keywords</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && generate()}
            placeholder="e.g., fitness motivation, food blog, travel photography"
            className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={generate}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
          >
            Generate
          </button>
        </div>
      </div>

      {hashtags.length > 0 && (
        <>
          <div>
            <label className="block text-sm font-semibold mb-2">Generated Hashtags ({hashtags.length})</label>
            <div className="p-4 bg-gray-50 border rounded-lg min-h-32">
              <div className="flex flex-wrap gap-2">
                {hashtags.map((tag, i) => (
                  <span
                    key={i}
                    onClick={() => navigator.clipboard.writeText(tag)}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold cursor-pointer hover:bg-blue-200"
                    title="Click to copy"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => navigator.clipboard.writeText(hashtags.join(' '))}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
            >
              Copy All Hashtags
            </button>
            <button
              onClick={() => { setTopic(''); setHashtags([]); }}
              className="px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 font-semibold"
            >
              Clear
            </button>
          </div>

          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm">
            <strong>Tip:</strong> Click any hashtag to copy it individually, or use "Copy All" to get all hashtags at once!
          </div>
        </>
      )}
    </div>
  );
};

export default HashtagGenerator;
