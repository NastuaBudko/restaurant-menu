import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { useCart } from '../context/CartContext';
import emailjs from 'emailjs-com';

interface CheckoutFormData {
    name: string;
    email: string;
    phone: string;
    address: string;
    notes: string;
}

const calculateSummary = (subtotal: number) => {
    const vat = subtotal * 0.2;
    const delivery = subtotal * 0.1;
    const total = subtotal + vat + delivery;
    return { subtotal, vat, delivery, total };
};


const CheckoutPage = () => {
    const { cartItems, totalPrice, clearCart } = useCart();
    const navigate = useNavigate();
    const formRef = useRef<HTMLFormElement>(null);

    const { subtotal, vat, delivery, total } = calculateSummary(totalPrice);

    const [formData, setFormData] = useState<CheckoutFormData>({
        name: '',
        email: '',
        phone: '',
        address: '',
        notes: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [orderStatus, setOrderStatus] = useState<'submitting' | 'success' | 'error' | null>(null);

    if (cartItems.length === 0 && orderStatus !== 'success') {
        navigate('/cart');
        return null;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        // Clear error when user types
        if (errors[name]) {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^\d{10,15}$/.test(formData.phone.replace(/[^0-9]/g, ''))) {
            newErrors.phone = 'Phone number is invalid';
        }
        if (!formData.address.trim()) newErrors.address = 'Address is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmitOrder = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);
        setOrderStatus('submitting');

        const orderData = {
            customer_name: formData.name,
            customer_email: formData.email,
            customer_phone: formData.phone,
            customer_address: formData.address,
            order_notes: formData.notes || '—',
            order_items: cartItems
                .map(item => `${item.quantity} × ${item.name} — $${(item.price * item.quantity).toFixed(2)}`)
                .join('\n'),
            order_total: `$${totalPrice.toFixed(2)}`,
            order_date: new Date().toLocaleString(),
        };

        emailjs.send(
            'service_xcq79sx',
            'template_p8a5cvb',
            orderData,
            'ZotnsZdQLiHPx-Jgu'
        )
            .then(() => {
                setIsSubmitting(false);
                setOrderStatus('success');
                clearCart();
            })
            .catch(() => {
                setIsSubmitting(false);
                setOrderStatus('error');
            });

        setTimeout(() => {
            setIsSubmitting(false);
            setOrderStatus('success');
            clearCart();
        }, 2000);
    };

    const formatPrice = (price: number) => {
        return `$${price.toFixed(2)}`;
    };

    if (orderStatus === 'success') {
        return (
            <div className="py-16 mt-12">
                <div className="container mx-auto px-4 max-w-2xl">
                    <div className="bg-white rounded-lg shadow-md p-8 text-center" style={{
                        boxShadow: '0 4px 10px 1px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)'
                    }}>
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-full mb-6">
                            <CheckCircle size={32} />
                        </div>

                        <h1 className="text-3xl font-bold mb-4">Order Placed Successfully!</h1>

                        <p className="text-gray-600 mb-8">
                            Thank you for your order. We have received your order and will process it right away.
                            A confirmation email has been sent to {formData.email}.
                        </p>

                        <div className="bg-gray-50 p-4 rounded-lg mb-8">
                            <div className="flex items-center mb-4">
                                <Clock className="text-primary-600 mr-2" />
                                <span className="font-medium">Estimated Delivery Time</span>
                            </div>
                            <p className="text-xl font-bold">30-45 minutes</p>
                        </div>

                        <button
                            onClick={() => navigate('/')}
                            className="px-5 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300 shadow-md"
                        >
                            Return to Home
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="py-12">
            <div className="container mx-auto px-4">

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8 mt-12" style={{
                            boxShadow: '0 4px 10px 1px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)'
                        }}>
                            <div className="p-6">
                                <h2 className="text-xl font-bold mb-6">Delivery Information</h2>

                                {orderStatus === 'error' && (
                                    <div className="bg-red-50 text-red-800 p-4 rounded-lg mb-6 flex items-start">
                                        <AlertTriangle className="mr-3 mt-0.5 text-red-600" />
                                        <div>
                                            <h4 className="font-bold">Order could not be processed</h4>
                                            <p>Please try again or contact our customer service.</p>
                                        </div>
                                    </div>
                                )}

                                <form ref={formRef} onSubmit={handleSubmitOrder}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                        <div className="form-control">
                                            <label htmlFor="name" className="form-label">Full Name</label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all duration-300"
                                            />
                                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                                        </div>

                                        <div className="form-control">
                                            <label htmlFor="email" className="form-label">Email Address</label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all duration-300"
                                            />
                                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                        <div className="form-control">
                                            <label htmlFor="phone" className="form-label">Phone Number</label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all duration-300"
                                            />
                                            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                                        </div>

                                        <div className="form-control">
                                            <label htmlFor="address" className="form-label">Delivery Address</label>
                                            <input
                                                type="text"
                                                id="address"
                                                name="address"
                                                value={formData.address}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all duration-300"
                                            />
                                            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                                        </div>
                                    </div>

                                    <div className="form-control mb-8">
                                        <label htmlFor="notes" className="form-label">Special Instructions (Optional)</label>
                                        <textarea
                                            id="notes"
                                            name="notes"
                                            rows={3}
                                            value={formData.notes}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all duration-300"
                                            placeholder="Allergies, special requests, delivery instructions, etc."
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="px-5 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300 shadow-md"
                                    >
                                        {isSubmitting ? 'Processing Order...' : 'Place Order'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-1 mt-12">
                        <div className="bg-white rounded-lg shadow-md p-6 sticky top-25" style={{
                            boxShadow: '0 4px 10px 1px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)'
                        }}>
                            <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                            <div className="max-h-60 overflow-y-auto mb-6">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex justify-between items-center py-3 border-b border-gray-100">
                                        <div className="flex items-center">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-12 h-12 object-cover rounded mr-3"
                                            />
                                            <div>
                                                <p className="font-medium">{item.name}</p>
                                                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                            </div>
                                        </div>
                                        <span className="font-medium">
                                            {formatPrice(item.price * item.quantity)}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4 mb-6 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span>{formatPrice(subtotal)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">VAT (20%)</span>
                                    <span>{formatPrice(vat)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Delivery Fee (10%)</span>
                                    <span>{formatPrice(delivery)}</span>
                                </div>
                                <div className="border-t pt-4 flex justify-between font-bold text-base">
                                    <span>Total</span>
                                    <span className="text-primary-600">{formatPrice(total)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;