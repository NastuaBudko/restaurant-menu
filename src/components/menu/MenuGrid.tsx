import React from 'react';
import MenuItem from './MenuItem';
import { MenuItem as MenuItemType } from '../../types';

interface MenuGridProps {
  items: MenuItemType[];
}

const MenuGrid: React.FC<MenuGridProps> = ({ items }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {items.map(item => (
        <MenuItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default MenuGrid;