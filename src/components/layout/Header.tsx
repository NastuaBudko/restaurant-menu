import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

const Header: React.FC = () => {
  const { totalItems, setIsCartOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold font-playfair">
          <span className="text-red-600">F</span>oody
        </Link>

        <nav className="hidden md:flex space-x-8">
          <Link to="/" className="text-gray-800 hover:text-red-600 transition-colors duration-300">Home</Link>
          <Link to="/menu" className="text-gray-800 hover:text-red-600 transition-colors duration-300">Menu</Link>
          <Link to="/about" className="text-gray-800 hover:text-red-600 transition-colors duration-300">About Us</Link>
          <Link to="/contact" className="text-gray-800 hover:text-red-600 transition-colors duration-300">Contact</Link>
        </nav>

        <div className="flex items-center space-x-2 sm:space-x-4">
          <button
            className="relative p-2"
            onClick={() => setIsCartOpen(true)}
            aria-label="Open shopping cart"
          >
            <ShoppingCart className="w-6 h-6" />
            {totalItems > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full"
              >
                {totalItems}
              </motion.span>
            )}
          </button>

          <button
            className="block md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white shadow-md overflow-hidden"
          >
            <nav className="flex flex-col px-4 py-4">
              <Link to="/" className="py-3 text-gray-800 hover:text-red-600 border-b border-gray-100">Home</Link>
              <Link to="/menu" className="py-3 text-gray-800 hover:text-red-600 border-b border-gray-100">Menu</Link>
              <Link to="/about" className="py-3 text-gray-800 hover:text-red-600 border-b border-gray-100">About Us</Link>
              <Link to="/contact" className="py-3 text-gray-800 hover:text-red-600">Contact</Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;