// src/components/Navbar.tsx
import { Link } from "@tanstack/react-router";

export function Navbar() {
    return (
        <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-md">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <div className="text-xl font-bold text-blue-600">My App</div>
                <div className="flex space-x-4">
                    <Link
                        to="/"
                        className="text-gray-800 hover:text-blue-600 transition-colors 
                       [&.active]:font-bold [&.active]:text-blue-700"
                    >
                        Home
                    </Link>
                    <Link
                        to="/about"
                        className="text-gray-800 hover:text-blue-600 transition-colors 
                       [&.active]:font-bold [&.active]:text-blue-700"
                    >
                        About
                    </Link>
                </div>
            </div>
        </nav>
    );
}
