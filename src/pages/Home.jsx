"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar, MapPin, Search, User, Clock, ArrowRight } from "lucide-react"

export function Home() {
  const [posts, setPosts] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [postsResponse, usersResponse] = await Promise.all([
        fetch("https://sumeetapi.onrender.com/api/posts"),
        fetch("https://sumeetapi.onrender.com/api/users"),
      ])

      if (!postsResponse.ok || !usersResponse.ok) {
        throw new Error("Failed to fetch data")
      }

      const postsData = await postsResponse.json()
      const usersData = await usersResponse.json()

      const postAuthorMap = {}
      usersData.forEach((user) => {
        user.posts.forEach((postId) => {
          postAuthorMap[postId] = user.name
        })
      })

      const postsWithAuthors = postsData.map((post) => ({
        ...post,
        author: postAuthorMap[post.id] || "Unknown Author",
      }))

      setPosts(postsWithAuthors)
      setUsers(usersData)
    } catch (err) {
      setError("Failed to load posts. Please try again later.")
      console.error("Error fetching data:", err)
    } finally {
      setLoading(false)
    }
  }

  const filteredPosts = posts.filter(
    (post) =>
      post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.desc?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const featuredPost = filteredPosts[0]
  const regularPosts = filteredPosts.slice(1)

  if (loading) {
    return (
      <div className="bg-white">
        {/* Hero Section Skeleton */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
          <div className="w-full px-6 py-20">
            <div className="text-center animate-pulse">
              <div className="h-12 bg-white/20 rounded w-96 mx-auto mb-6"></div>
              <div className="h-6 bg-white/20 rounded w-64 mx-auto mb-8"></div>
              <div className="h-12 bg-white/20 rounded w-80 mx-auto"></div>
            </div>
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="w-full px-6 py-16">
          <div className="grid gap-8 lg:grid-cols-4">
            <div className="lg:col-span-3">
              <div className="h-96 bg-gray-200 rounded-xl animate-pulse mb-8"></div>
              <div className="grid gap-6 md:grid-cols-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-80 bg-gray-200 rounded-xl animate-pulse"></div>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded-xl animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white min-h-screen">
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
          <div className="w-full px-6 py-20 text-center">
            <h1 className="text-5xl font-bold mb-6">Welcome to TravelBlog</h1>
            <p className="text-xl mb-8 opacity-90">Discover amazing stories from around the world</p>
          </div>
        </div>
        <div className="w-full px-6 py-16 text-center">
          <div className="bg-red-50 border border-red-200 rounded-xl p-8 max-w-md mx-auto">
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={fetchData} className="bg-blue-600 hover:bg-blue-700">
              Try Again
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="w-full px-6 py-20">
          <div className="text-center">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">Welcome to TravelBlog</h1>
            <p className="text-xl lg:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
              Discover amazing stories, travel guides, and insights from around the world
            </p>

            {/* Hero Search */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search for travel stories, destinations, authors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-14 text-lg bg-white/10 border-white/20 text-white placeholder:text-white/70 focus:bg-white/20"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full px-6 py-16">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">No posts found</h3>
            <p className="text-gray-600">Try adjusting your search terms</p>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-4">
            {/* Main Content Area */}
            <div className="lg:col-span-3">
              {/* Featured Post */}
              {featuredPost && (
                <div className="mb-12">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-3xl font-bold text-gray-900">Featured Story</h2>
                    <div className="h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex-1 ml-6"></div>
                  </div>

                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                    <div className="md:flex">
                      <div className="md:w-1/2">
                        <div className="h-64 md:h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                          <MapPin className="h-20 w-20 text-white" />
                        </div>
                      </div>
                      <div className="md:w-1/2 p-8">
                        <div className="flex items-center space-x-4 mb-4">
                          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                            Featured
                          </span>
                          <span className="flex items-center text-gray-500 text-sm">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(featuredPost.date).toLocaleDateString()}
                          </span>
                        </div>
                        <CardTitle className="text-2xl mb-4 leading-tight">{featuredPost.title}</CardTitle>
                        <p className="text-gray-600 mb-6 line-clamp-3">{featuredPost.desc}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <User className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-700 font-medium">{featuredPost.author}</span>
                          </div>
                          <Link to={`/post/${featuredPost.id}`}>
                            <Button className="bg-blue-600 hover:bg-blue-700">
                              Read More <ArrowRight className="h-4 w-4 ml-2" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              )}

              {/* Regular Posts Grid */}
              {regularPosts.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">Latest Stories</h2>
                    <div className="h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex-1 ml-6"></div>
                  </div>

                  <div className="grid gap-8 md:grid-cols-2">
                    {regularPosts.map((post) => (
                      <Card
                        key={post.id}
                        className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-md group"
                      >
                        <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                          <MapPin className="h-12 w-12 text-white" />
                        </div>
                        <CardHeader className="pb-3">
                          <div className="flex items-center space-x-4 mb-2">
                            <span className="flex items-center text-gray-500 text-sm">
                              <Calendar className="h-3 w-3 mr-1" />
                              {new Date(post.date).toLocaleDateString()}
                            </span>
                            <span className="flex items-center text-gray-500 text-sm">
                              <Clock className="h-3 w-3 mr-1" />5 min read
                            </span>
                          </div>
                          <CardTitle className="text-xl leading-tight group-hover:text-blue-600 transition-colors">
                            {post.title}
                          </CardTitle>
                          <CardDescription className="flex items-center space-x-2">
                            <User className="h-3 w-3" />
                            <span className="font-medium">{post.author}</span>
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <p className="text-gray-600 line-clamp-3 mb-4">{post.desc}</p>
                          <Link to={`/post/${post.id}`}>
                            <Button
                              variant="outline"
                              className="w-full group-hover:bg-blue-50 group-hover:border-blue-200 bg-transparent"
                            >
                              Read Full Story
                            </Button>
                          </Link>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-8">
                {/* Popular Authors */}
                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle className="text-xl">Popular Authors</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {users.slice(0, 5).map((user) => (
                      <div
                        key={user.name}
                        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                          {user.name?.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 truncate">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.posts.length} posts</p>
                        </div>
                      </div>
                    ))}
                    <Link to="/authors">
                      <Button variant="outline" size="sm" className="w-full mt-4 bg-transparent">
                        View All Authors
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                {/* Newsletter */}
                <Card className="border-0 shadow-md bg-gradient-to-br from-blue-50 to-purple-50">
                  <CardHeader>
                    <CardTitle className="text-xl">Stay Updated</CardTitle>
                    <CardDescription>Get the latest travel stories delivered to your inbox</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Input placeholder="Enter your email" className="bg-white" />
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">Subscribe</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
