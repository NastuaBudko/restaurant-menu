import { Link } from 'react-router-dom';
import { HomeIcon } from 'lucide-react';

const NotFoundPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
            <div className="text-center max-w-lg">
                <h1 className="text-9xl font-bold text-primary-600 mb-4">404</h1>
                <h2 className="text-3xl font-bold mb-6">Page Not Found</h2>
                <p className="text-gray-600 mb-8">
                    Oops! The page you are looking for doesn't exist or has been moved.
                </p>
                <Link to="/">
                    <button className="inline-block w-100 m-auto px-8 py-3 bg-red-600 flex items-center justify-center text-white rounded-full hover:bg-red-700 transition-colors duration-300 shadow-md">
                        <HomeIcon size={18} className="mr-2" />
                        Return to Home
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default NotFoundPage;