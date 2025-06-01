import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import MenuGrid from '../components/menu/MenuGrid';
import { menuItems } from '../data/menuData';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
  const featuredDishes = menuItems.slice(0, 4);

  return (
    <div className="pt-24">
      <section className="container mx-auto px-4 py-16 md:py-24 flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 mb-10 lg:mb-0">
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="absolute -top-10 -left-10 bg-white py-2 px-4 rounded-lg shadow-md z-10"
            >
              <div className="text-xs text-gray-800">5%</div>
              <div className="text-xs text-gray-800">Discount for 2 orders</div>
            </motion.div>
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl md:text-6xl font-bold leading-tight mb-6 font-playfair"
          >
            it's not just <br />
            Food, It's an <br />
            Experience.
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap gap-4 mb-8"
          >
            <Link
              to="/menu"
              className="bg-red-600 text-white px-8 py-3 rounded-full hover:bg-red-700 transition-colors duration-300 shadow-md"
            >
              View Menu
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <p className="text-sm text-gray-600 mb-2">Reviews</p>
            <div className="flex space-x-2 mb-3">
              {[1, 2, 3, 4].map((_, index) => (
                <div
                  key={index}
                  className={`w-8 h-8 rounded-full bg-gray-300 overflow-hidden border-2 border-white ${index > 0 ? '-ml-2' : ''}`}
                >
                  <img
                    src={`https://randomuser.me/api/portraits/women/${index + 10}.jpg`}
                    alt="User avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="flex text-yellow-400">
              {[1, 2, 3, 4, 5].map((_, index) => (
                <Star key={index} className="w-5 h-5 fill-current" />
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="lg:w-1/2 relative"
        >
          <img
            src="https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg"
            alt="Delicious Pasta"
            className="w-full h-auto rounded-full object-cover shadow-xl"
          />
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="absolute -top-10 -right-10 w-20 h-20 text-green-500"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M6.05 8.05a7 7 0 0 0-2.04 5.08A7 7 0 0 0 6.05 16A7 7 0 0 0 13 19.07V4.93A7 7 0 0 0 6.05 8.05z" />
            </svg>
          </motion.div>
          <motion.div
            animate={{
              y: [0, 10, 0],
              rotate: [0, -5, 0]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="absolute -bottom-10 -left-10 w-20 h-20 text-green-500"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M6.05 8.05a7 7 0 0 0-2.04 5.08A7 7 0 0 0 6.05 16A7 7 0 0 0 13 19.07V4.93A7 7 0 0 0 6.05 8.05z" />
            </svg>
          </motion.div>
        </motion.div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-center font-playfair">Our Featured Dishes</h2>
          <div className="relative">
            <MenuGrid items={featuredDishes} />
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/menu"
              className="inline-block px-8 py-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors duration-300 shadow-md"
            >
              View All Menu
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;