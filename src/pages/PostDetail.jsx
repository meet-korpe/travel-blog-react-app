"use client";

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Clock,
  Share2,
  BookOpen,
} from "lucide-react";

export function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [author, setAuthor] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      fetchPostAndAuthor(id);
    }
  }, [id]);

  const fetchPostAndAuthor = async (postId) => {
    try {
      const [postResponse, usersResponse, postsResponse] = await Promise.all([
        fetch(`https://sumeetapi.onrender.com/api/posts/${postId}`),
        fetch("https://sumeetapi.onrender.com/api/users"),
        fetch("https://sumeetapi.onrender.com/api/posts"),
      ]);

      if (!postResponse.ok) {
        throw new Error("Post not found");
      }

      const postData = await postResponse.json();
      const usersData = await usersResponse.json();
      const allPosts = await postsResponse.json();

      const postAuthor = usersData.find((user) =>
        user.posts.includes(Number.parseInt(postId))
      );

      // Get related posts by same author
      const authorPosts = postAuthor
        ? allPosts
            .filter(
              (p) =>
                postAuthor.posts.includes(p.id) &&
                p.id !== Number.parseInt(postId)
            )
            .slice(0, 3)
        : [];

      setPost(postData);
      setAuthor(postAuthor);
      setRelatedPosts(authorPosts);
    } catch (err) {
      setError("Failed to load post. Please try again later.");
      console.error("Error fetching post:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-32 mb-8"></div>
            <div className="h-96 bg-gray-200 rounded-xl mb-8"></div>
            <div className="grid gap-8 lg:grid-cols-4">
              <div className="lg:col-span-3 space-y-4">
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="space-y-3">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="h-4 bg-gray-200 rounded"></div>
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <div className="h-64 bg-gray-200 rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <Link to="/">
            <Button variant="ghost" className="mb-8">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <div className="bg-red-50 border border-red-200 rounded-xl p-8 max-w-md mx-auto">
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b">
        <div className="w-full px-6 py-4">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>

      <div className="w-full px-6 py-12">
        <div className="grid gap-12 lg:grid-cols-4">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Hero Image */}
            <div className="h-96 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-8 shadow-lg">
              <MapPin className="h-24 w-24 text-white" />
            </div>

            {/* Article Header */}
            <div className="mb-8">
              <div className="flex items-center space-x-4 mb-4">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  Travel Story
                </span>
                <span className="flex items-center text-gray-500 text-sm">
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span className="flex items-center text-gray-500 text-sm">
                  <Clock className="h-4 w-4 mr-1" />8 min read
                </span>
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {post.title}
              </h1>

              {/* Author Info */}
              {author && (
                <div className="flex items-center justify-between p-6 bg-gray-50 rounded-xl">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="text-lg bg-blue-600 text-white">
                        {author.name?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {author.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Travel Writer • Age {author.age}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              )}
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <div className="text-xl text-gray-700 leading-relaxed space-y-6">
                {post.desc.split("\n").map((paragraph, index) => (
                  <p key={index} className="mb-6">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="mt-16 pt-12 border-t">
                <h3 className="text-2xl font-bold text-gray-900 mb-8">
                  More from {author?.name}
                </h3>
                <div className="grid gap-6 md:grid-cols-3">
                  {relatedPosts.map((relatedPost) => (
                    <Card
                      key={relatedPost.id}
                      className="hover:shadow-lg transition-shadow border-0 shadow-md"
                    >
                      <div className="h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-t-lg flex items-center justify-center">
                        <BookOpen className="h-8 w-8 text-white" />
                      </div>
                      <CardContent className="p-4">
                        <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                          {relatedPost.title}
                        </h4>
                        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                          {relatedPost.desc}
                        </p>
                        <Link to={`/post/${relatedPost.id}`}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full bg-transparent"
                          >
                            Read More
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
              {/* Author Card */}
              {author && (
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg">About the Author</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <Avatar className="h-16 w-16 mx-auto mb-3">
                        <AvatarFallback className="text-xl bg-blue-600 text-white">
                          {author.name?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <h3 className="font-semibold text-gray-900">
                        {author.name}
                      </h3>
                      <p className="text-sm text-gray-600">Age {author.age}</p>
                    </div>

                    <div className="space-y-3 text-sm">
                      <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span className="truncate">{author.email}</span>
                      </div>
                      <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span>{author.phone}</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t text-center">
                      <p className="text-sm text-gray-600 mb-3">
                        <strong>{author.posts.length}</strong> articles
                        published
                      </p>
                      <Link to="/authors">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full bg-transparent"
                        >
                          View Profile
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Newsletter */}
              <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-purple-50">
                <CardHeader>
                  <CardTitle className="text-lg">Never Miss a Story</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Subscribe to get the latest travel stories and tips
                    delivered to your inbox.
                  </p>
                  <div className="space-y-3">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      Subscribe
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
