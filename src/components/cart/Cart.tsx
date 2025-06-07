// Cart.tsx

import React from 'react';
import { X } from 'lucide-react';
import CartItem from './CartItem';
import { useCart } from '../../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const calculateCartSummary = (totalPrice: number) => {
  const vat = totalPrice * 0.2;
  const delivery = totalPrice * 0.1;
  const totalWithExtras = totalPrice + vat + delivery;

  return {
    subtotal: totalPrice,
    vat,
    delivery,
    total: totalWithExtras,
  };
};

const Cart: React.FC = () => {
  const { cartItems, totalPrice, clearCart, isCartOpen, setIsCartOpen } = useCart();

  const { subtotal, vat, delivery, total } = calculateCartSummary(totalPrice);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsCartOpen(false)}
          ></motion.div>

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="relative w-full max-w-md bg-white h-full overflow-y-auto shadow-xl"
          >
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold font-playfair">Your Cart</h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1 rounded-full hover:bg-gray-200 transition-colors duration-300"
                aria-label="Close cart"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {cartItems.length === 0 ? (
              <div className="py-20 text-center text-gray-500">
                <p>Your cart is empty</p>
              </div>
            ) : (
              <>
                <div className="px-6 py-4">
                  <AnimatePresence>
                    {cartItems.map(item => (
                      <CartItem key={item.id} item={item} />
                    ))}
                  </AnimatePresence>
                </div>

                <div className="px-6 py-4 border-t border-gray-200 space-y-2 text-sm text-gray-700">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>VAT (20%):</span>
                    <span>${vat.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery (10%):</span>
                    <span>${delivery.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-semibold border-t pt-2 border-gray-300">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>

                  <Link to="/cart">
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors duration-300 shadow-md mt-4"
                    >
                      Checkout
                    </button>
                  </Link>

                  <button
                    onClick={clearCart}
                    className="w-full mt-2 text-gray-600 py-2 hover:underline"
                  >
                    Clear Cart
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Cart;