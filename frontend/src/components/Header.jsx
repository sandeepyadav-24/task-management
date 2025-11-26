import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();

  const isActive = (path) => {
    return pathname === path ? "text-blue-600" : "text-gray-700";
  };

  const handleWriteToUs = () => {
    window.location.href =
      "https://docs.google.com/forms/d/e/1FAIpQLSf3naZeKzP-4_mt1T-Bj-kq-_eVrGBOmxzFGxE3CNw4ACoJpA/viewform";
  };

  return (
    <header className="sticky top-0 z-50 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-100/30 rounded-full blur-[80px]" />
        <div className="absolute -top-8 right-0 w-72 h-72 bg-blue-100/20 rounded-full blur-[80px]" />

        {/* Animated Dots */}
        <div className="absolute inset-0">
          <div className="absolute top-2 left-8 w-1 h-1 bg-blue-400 rounded-full animate-pulse" />
          <div className="absolute top-6 right-12 w-1 h-1 bg-blue-400 rounded-full animate-pulse delay-150" />
          <div className="absolute bottom-4 left-1/4 w-1 h-1 bg-blue-400 rounded-full animate-pulse delay-300" />
          <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-blue-400 rounded-full animate-pulse delay-500" />
        </div>
      </div>

      <div className="relative backdrop-blur-sm border-b border-gray-200/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="group flex items-center">
                <div className="flex items-center space-x-2">
                  {/* Desktop */}
                  <div className="hidden md:flex items-center">
                    <div className="relative">
                      <span className="text-gray-800 text-xl font-light tracking-tight">
                        Task
                        <span className="font-bold text-blue-600">Bite</span>
                      </span>
                      <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600 transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></div>
                    </div>
                  </div>

                  {/* Mobile */}
                  <div className="md:hidden flex items-center">
                    <div className="relative">
                      <span className="text-gray-800 text-lg font-light tracking-tight">
                        cr
                        <span className="font-bold text-blue-600">24</span>
                      </span>
                      <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600 transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                to="/login"
                className={`${isActive("/login")} 
                px-6 py-2.5 rounded-lg text-blue-600 hover:text-blue-500
                transition-all duration-300 animate-text-glow font-bold`}
              >
                Login
              </Link>

              <Link
                to="/signup"
                className={`${isActive("/dashboard")} 
                px-6 py-2.5 rounded-lg text-blue-600 hover:text-blue-500
                transition-all duration-300 animate-text-glow font-bold`}
              >
                Sign up
              </Link>
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-gray-100/50 focus:outline-none transition-colors duration-200"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200/20 backdrop-blur-sm bg-white/5">
            <div className="container mx-auto px-4 py-3 space-y-3">
              <Link
                to="/login"
                className="block px-6 py-2.5 rounded-lg text-base font-medium 
                text-blue-600 hover:text-blue-500 transition-all duration-300 animate-text-glow"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>

              <Link
                to="/dashboard"
                className="block px-6 py-2.5 rounded-lg text-base font-medium 
                text-blue-600 hover:text-blue-500 transition-all duration-300 animate-text-glow"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign up
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
