import React from 'react';
import MenuGrid from '../components/menu/MenuGrid';
import MenuSearch from '../components/menu/MenuSearch';
import { menuItems } from '../data/menuData';
import { useSearch } from '../hooks/useSearch';
import { motion } from 'framer-motion';

const Menu: React.FC = () => {
  const { 
    searchTerm, 
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    filteredItems,
    categories
  } = useSearch(menuItems);

  return (
    <div className="pt-24">
      <div className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold mb-2 font-playfair"
          >
            Our Menu
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-600"
          >
            Explore our delicious selection of Italian specialties
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <MenuSearch 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </motion.div>

        {filteredItems.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <h3 className="text-xl text-gray-600">
              No items found. Try a different search term.
            </h3>
          </motion.div>
        ) : (
          <MenuGrid items={filteredItems} />
        )}
      </div>
    </div>
  );
};

export default Menu;