import { MenuItem } from '../types';

export const menuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Pappardelle',
    description: 'With vegetable',
    price: 35.00,
    image: 'https://images.pexels.com/photos/1487511/pexels-photo-1487511.jpeg',
    category: 'Pasta',
    allergens: ['Wheat', 'Egg'],
    vegan: false,
    glutenFree: false,
    vegetarian: true,
    ingredients: ['Pappardelle pasta', 'Zucchini', 'Carrots', 'Olive oil', 'Parmesan']
  },
  {
    id: '2',
    name: 'Ravioli Stuffed',
    description: 'With Pesto Sauce',
    price: 35.00,
    image: 'https://images.pexels.com/photos/5589050/pexels-photo-5589050.jpeg',
    category: 'Pasta',
    allergens: ['Wheat', 'Dairy', 'Nuts'],
    vegan: false,
    glutenFree: false,
    vegetarian: true,
    ingredients: ['Ravioli', 'Ricotta', 'Spinach', 'Pesto', 'Parmesan']
  },
  {
    id: '3',
    name: 'Fettuccine Alfredo',
    description: 'Creamy garlic sauce',
    price: 32.00,
    image: 'https://images.pexels.com/photos/4518839/pexels-photo-4518839.jpeg',
    category: 'Pasta',
    allergens: ['Wheat', 'Dairy'],
    vegan: false,
    glutenFree: false,
    vegetarian: true,
    ingredients: ['Fettuccine', 'Butter', 'Cream', 'Parmesan', 'Garlic']
  },
  {
    id: '4',
    name: 'Margherita Pizza',
    description: 'Fresh tomato and basil',
    price: 28.00,
    image: 'https://images.pexels.com/photos/2714722/pexels-photo-2714722.jpeg',
    category: 'Pizza',
    allergens: ['Wheat', 'Dairy'],
    vegan: false,
    glutenFree: false,
    vegetarian: true,
    ingredients: ['Pizza dough', 'Tomato sauce', 'Mozzarella', 'Basil']
  },
  {
    id: '5',
    name: 'Prosciutto Pizza',
    description: 'With arugula and parmesan',
    price: 34.00,
    image: 'https://images.pexels.com/photos/905847/pexels-photo-905847.jpeg',
    category: 'Pizza',
    allergens: ['Wheat', 'Dairy'],
    vegan: false,
    glutenFree: false,
    vegetarian: false,
    ingredients: ['Pizza dough', 'Tomato sauce', 'Mozzarella', 'Prosciutto', 'Arugula', 'Parmesan']
  },
  {
    id: '6',
    name: 'Risotto ai Funghi',
    description: 'Wild mushroom and truffle',
    price: 38.00,
    image: 'https://images.pexels.com/photos/5638268/pexels-photo-5638268.jpeg',
    category: 'Risotto',
    allergens: ['Dairy'],
    vegan: false,
    glutenFree: true,
    vegetarian: true,
    ingredients: ['Arborio rice', 'Mushrooms', 'Truffle oil', 'Parmesan', 'Butter']
  },
  {
    id: '7',
    name: 'Caprese Salad',
    description: 'Buffalo mozzarella and tomato',
    price: 24.00,
    image: 'https://images.pexels.com/photos/1211887/pexels-photo-1211887.jpeg',
    category: 'Salad',
    allergens: ['Dairy'],
    vegan: false,
    glutenFree: true,
    vegetarian: true,
    ingredients: ['Tomatoes', 'Buffalo mozzarella', 'Basil', 'Olive oil']
  },
  {
    id: '8',
    name: 'Tiramisu',
    description: 'Classic coffee dessert',
    price: 18.00,
    image: 'https://images.pexels.com/photos/6899073/pexels-photo-6899073.jpeg',
    category: 'Dessert',
    allergens: ['Dairy', 'Egg', 'Wheat'],
    vegan: false,
    glutenFree: false,
    vegetarian: true,
    ingredients: ['Mascarpone', 'Eggs', 'Ladyfingers', 'Coffee', 'Cocoa powder']
  }
];
