import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="text-2xl font-bold mb-4 block font-playfair">
              <span className="text-red-500">F</span>oody
            </Link>
            <p className="text-gray-400 mb-4">
              Bringing authentic Italian flavors to your table since 2010.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <Instagram />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <Facebook />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <Twitter />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 font-playfair">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors duration-300">Home</Link>
              </li>
              <li>
                <Link to="/menu" className="text-gray-400 hover:text-white transition-colors duration-300">Menu</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors duration-300">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors duration-300">Contact</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 font-playfair">Opening Hours</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Monday - Friday: 11:00 AM - 10:00 PM</li>
              <li>Saturday - Sunday: 10:00 AM - 11:00 PM</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 font-playfair">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for updates and special offers.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 bg-gray-800 text-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button
                type="submit"
                className="bg-red-600 text-white px-4 py-2 rounded-r-lg hover:bg-red-700 transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Foody. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;