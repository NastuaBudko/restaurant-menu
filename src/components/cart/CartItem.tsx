import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '../../types';
import { useCart } from '../../context/CartContext';
import { motion } from 'framer-motion';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex items-center py-4 border-b border-gray-200"
    >
      <img
        src={item.image}
        alt={item.name}
        className="w-16 h-16 object-cover rounded-md mr-4"
      />

      <div className="flex-1">
        <h4 className="font-medium font-playfair">{item.name}</h4>
        <p className="text-sm text-gray-600">${item.price.toFixed(2)}</p>
      </div>

      <div className="flex items-center space-x-2">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors duration-300"
          aria-label="Decrease quantity"
        >
          <Minus className="w-4 h-4" />
        </motion.button>

        <span className="w-8 text-center">{item.quantity}</span>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors duration-300"
          aria-label="Increase quantity"
        >
          <Plus className="w-4 h-4" />
        </motion.button>
      </div>

      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => removeFromCart(item.id)}
        className="ml-4 p-1 text-gray-500 hover:text-red-600 transition-colors duration-300"
        aria-label={`Remove ${item.name} from cart`}
      >
        <Trash2 className="w-5 h-5" />
      </motion.button>
    </motion.div>
  );
};

export default CartItem;