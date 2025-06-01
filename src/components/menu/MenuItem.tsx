import React, { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { MenuItem as MenuItemType } from '../../types';
import { useCart } from '../../context/CartContext';
import { motion } from 'framer-motion';
import DishDetailsDialog from './DishDetailsDialog';

interface MenuItemProps {
  item: MenuItemType;
}

const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
  const { addToCart } = useCart();

  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const toggleOpenDetails = () => setIsDetailsOpen((prev) => !prev)

  const openDetails = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest('button')) return;
    toggleOpenDetails();
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        onClick={openDetails}
        className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
      >
        <div className="relative h-48 overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
          />
          <button
            onClick={() => addToCart(item)}
            className="absolute top-4 right-4 bg-black bg-opacity-70 p-2 rounded-full hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105"
            aria-label={`Add ${item.name} to cart`}
          >
            <ShoppingCart className="w-5 h-5 text-white" />
          </button>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-medium text-gray-900 font-playfair">{item.name}</h3>
          <p className="text-sm text-gray-600 font-light">{item.description}</p>
          <div className="mt-2 font-semibold">${item.price.toFixed(2)}</div>
        </div>
      </motion.div>
      {isDetailsOpen && <DishDetailsDialog dish={item} closeDishDialog={toggleOpenDetails} />}
    </>
  );
};

export default MenuItem;