import { useState, useMemo } from 'react';
import { MenuItem } from '../types';

export const useSearch = (items: MenuItem[]) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = selectedCategory ? item.category === selectedCategory : true;

      return matchesSearch && matchesCategory;
    });
  }, [items, searchTerm, selectedCategory]);

  const categories = useMemo(() => {
    const categorySet = new Set<string>();
    items.forEach(item => categorySet.add(item.category));
    return Array.from(categorySet);
  }, [items]);

  return {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    filteredItems,
    categories,
  };
};