import { useCart } from '../../context/CartContext';
import { X, ShoppingCart, AlertTriangle } from 'lucide-react';
import { MenuItem } from '../../types';


interface DishDetailsDialogProps {
    dish: MenuItem;
    closeDishDialog: () => void
}

const DishDetailsDialog: React.FC<DishDetailsDialogProps> = ({ dish, closeDishDialog }) => {
    const { addToCart } = useCart();

    if (!dish) {
        return null;
    }

    const handleAddToCart = () => {
        addToCart(dish);
        closeDishDialog();
    };

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            closeDishDialog();
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={handleBackdropClick}
        >
            <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-hidden animate-slide-up">
                <div className="relative">
                    <img
                        src={dish.image}
                        alt={dish.name}
                        className="w-full h-64 object-cover"
                    />
                    <button
                        onClick={closeDishDialog}
                        className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
                        aria-label="Close dialog"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto max-h-[calc(90vh-16rem)]">
                    <div className="flex justify-between items-start mb-4">
                        <h2 className="text-2xl font-bold">{dish.name}</h2>
                        <span className="text-xl font-bold text-primary-600">${dish.price.toFixed(2)}</span>
                    </div>

                    <p className="text-gray-700 mb-6">{dish.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Ingredients</h3>
                            <ul className="list-disc pl-5 text-gray-700">
                                {dish.ingredients.map((ingredient, index) => (
                                    <li key={index}>{ingredient}</li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-2">Dietary Information</h3>
                            <div className="space-y-2">
                                <p>
                                    <span className="font-medium">Vegetarian:</span> {dish.vegetarian ? 'Yes' : 'No'}
                                </p>
                                <p>
                                    <span className="font-medium">Vegan:</span> {dish.vegan ? 'Yes' : 'No'}
                                </p>
                                <p>
                                    <span className="font-medium">Gluten-Free:</span> {dish.glutenFree ? 'Yes' : 'No'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {dish.allergens.length > 0 && (
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-2 flex items-center">
                                <AlertTriangle size={20} className="text-amber-500 mr-2" />
                                Allergens
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {dish.allergens.map((allergen) => (
                                    <span
                                        key={allergen}
                                        className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm"
                                    >
                                        {allergen}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    <button
                        onClick={handleAddToCart}
                        className="inline-block w-100 m-auto px-8 py-3 bg-red-600 flex items-center justify-center text-white rounded-full hover:bg-red-700 transition-colors duration-300 shadow-md"
                    >
                        <ShoppingCart size={20} className="mr-2" />
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DishDetailsDialog;