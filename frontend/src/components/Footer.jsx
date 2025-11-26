import { Link } from "react-router-dom";
import React from "react";

export default function Footer() {
  return (
    <div>
      {/* Floating animations wrapper */}
      <div className="fixed inset-0 pointer-events-none">
        {/* ... same animated background ... */}
      </div>

      <footer className="bg-gray-900 text-white py-8 relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Logo */}
            <div>
              <h2 className="text-2xl font-bold">Task Bite</h2>
              <p className="mt-2 text-gray-400">
                Your all-in-one task management platform to organize, track, and
                collaborate efficiently.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-semibold">Quick Links</h3>
              <ul className="mt-2 space-y-2">
                <li>
                  <Link
                    to="/"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Tasks
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Calendar
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Teams
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="text-xl font-semibold">Follow Us</h3>
              <div className="mt-2 flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  <i className="fab fa-twitter text-xl"></i>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  <i className="fab fa-linkedin text-xl"></i>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  <i className="fab fa-instagram text-xl"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Task Bite. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
