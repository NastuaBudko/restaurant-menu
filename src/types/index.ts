export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  allergens: string[];
  vegan: boolean;
  glutenFree: boolean;
  vegetarian: boolean;
  ingredients: string[];
}

export interface CartItem extends MenuItem {
  quantity: number;
}