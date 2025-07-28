"use client";

import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Home, Users, Menu, Search } from "lucide-react";
import { useState } from "react";

export function Navigation() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-blue-600 text-white py-2 hidden lg:block">
        <div className="w-full px-6 flex justify-between items-center text-sm">
          <div>Welcome to TravelBlog - Discover Amazing Stories</div>
          <div className="flex items-center space-x-4">
            <span>📧 contact@travelblog.com</span>
            <span>📞 +1 (555) 123-4567</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="w-full px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <MapPin className="h-8 w-8 text-white" />
            </div>
            <div>
              <h2 className="text-lg lg:text-2xl font-bold text-gray-900">
                TravelBlog
              </h2>
              <p className="text-sm text-gray-500 ">Explore the World</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link
              to="/"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                location.pathname === "/"
                  ? "bg-blue-100 text-blue-700 shadow-sm"
                  : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
              }`}
            >
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Link>
            <Link
              to="/authors"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                location.pathname === "/authors"
                  ? "bg-blue-100 text-blue-700 shadow-sm"
                  : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
              }`}
            >
              <Users className="h-5 w-5" />
              <span>Authors</span>
            </Link>
          </div>

          {/* Desktop Search */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64 bg-gray-50 border-gray-200 focus:bg-white"
              />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden text-white">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Menu className="h-6 w-6 text-white" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t bg-white">
            <div className="flex flex-col space-y-3">
              <div className="px-4 pb-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Search articles..."
                    className="pl-10 w-full"
                  />
                </div>
              </div>
              <Link
                to="/"
                className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                <Home className="h-5 w-5" />
                <span className="font-medium">Home</span>
              </Link>
              <Link
                to="/authors"
                className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                <Users className="h-5 w-5" />
                <span className="font-medium">Authors</span>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
