import React from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

interface MenuSearchProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  categories: string[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

const MenuSearch: React.FC<MenuSearchProps> = ({
  searchTerm,
  onSearchChange,
  categories,
  selectedCategory,
  onCategoryChange
}) => {
  return (
    <div className="mb-8">
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search our menu..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all duration-300 shadow-sm"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => onCategoryChange(null)}
          className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${selectedCategory === null
              ? 'bg-red-600 text-white shadow-md'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
        >
          All
        </motion.button>

        {categories.map(category => (
          <motion.button
            key={category}
            whileTap={{ scale: 0.95 }}
            onClick={() => onCategoryChange(category)}
            className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${selectedCategory === category
                ? 'bg-red-600 text-white shadow-md'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
          >
            {category}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default MenuSearch;