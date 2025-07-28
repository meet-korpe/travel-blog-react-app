"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Mail, Phone, FileText, MapPin } from "lucide-react";

export function Authors() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("https://sumeetapi.onrender.com/api/users");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError("Failed to load authors. Please try again later.");
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="bg-white min-h-screen">
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
          <div className="w-full px-6 py-20 text-center">
            <div className="animate-pulse">
              <div className="h-12 bg-white/20 rounded w-64 mx-auto mb-4"></div>
              <div className="h-6 bg-white/20 rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
        <div className="w-full px-6 py-16">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="h-80 bg-gray-200 rounded-xl animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white min-h-screen">
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
          <div className="max-w-7xl mx-auto px-6 py-20 text-center">
            <h1 className="text-5xl font-bold mb-4">Our Authors</h1>
            <p className="text-xl opacity-90">
              Meet the talented writers behind our stories
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <div className="bg-red-50 border border-red-200 rounded-xl p-8 max-w-md mx-auto">
            <p className="text-red-600 mb-4">{error}</p>
            <Button
              onClick={fetchUsers}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="w-full px-6 py-20">
          <div className="text-center">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">Our Authors</h1>
            <p className="text-xl lg:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
              Meet the talented writers and storytellers who bring you amazing
              content from around the world
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search authors by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-14 text-lg bg-white/10 border-white/20 text-white placeholder:text-white/70 focus:bg-white/20"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Authors Grid */}
      <div className="w-full px-6 py-16">
        {filteredUsers.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              No authors found
            </h3>
            <p className="text-gray-600">Try adjusting your search terms</p>
          </div>
        ) : (
          <>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {filteredUsers.length} Talented{" "}
                {filteredUsers.length === 1 ? "Author" : "Authors"}
              </h2>
              <div className="h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded w-24 mx-auto"></div>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredUsers.map((user) => (
                <Card
                  key={user.name}
                  className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg group"
                >
                  <CardHeader className="text-center pb-4">
                    <div className="relative">
                      <Avatar className="w-20 h-20 mx-auto mb-4 ring-4 ring-blue-100 group-hover:ring-blue-200 transition-all">
                        <AvatarFallback className="text-2xl bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                          {user.name
                            ?.split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-2 py-1 rounded-full text-xs">
                        Age {user.age}
                      </div>
                    </div>
                    <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                      {user.name}
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      Travel Writer & Storyteller
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                        <Mail className="h-4 w-4 text-blue-600" />
                        <span className="text-sm truncate">{user.email}</span>
                      </div>

                      <div className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                        <Phone className="h-4 w-4 text-blue-600" />
                        <span className="text-sm">{user.phone}</span>
                      </div>

                      <div className="flex items-center space-x-3 p-2 bg-blue-50 rounded-lg">
                        <FileText className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-800">
                          {user.posts.length} articles published
                        </span>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <div className="text-xs text-gray-500 mb-3">
                        <span className="font-medium">Recent Articles:</span>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {user.posts.slice(0, 4).map((postId, index) => (
                            <span
                              key={postId}
                              className="bg-gray-100 px-2 py-1 rounded text-xs"
                            >
                              #{postId}
                            </span>
                          ))}
                          {user.posts.length > 4 && (
                            <span className="text-gray-400">
                              +{user.posts.length - 4} more
                            </span>
                          )}
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        className="w-full group-hover:bg-blue-50 group-hover:border-blue-200 group-hover:text-blue-600 bg-transparent"
                      >
                        <MapPin className="h-4 w-4 mr-2" />
                        View Articles
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
