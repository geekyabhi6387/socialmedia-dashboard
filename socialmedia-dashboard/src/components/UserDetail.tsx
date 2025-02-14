// src/components/UserDetail.tsx
import React, { useState, useEffect } from 'react';
import { User, Post } from '../types';

interface UserDetailProps {
  user: User;
}

const UserDetail: React.FC<UserDetailProps> = ({ user }) => {
  const [posts, setPosts] = useState<Post[] | null>(null); // Allow posts to be null
  const [postsError, setPostsError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`); // Throw error for non-2xx responses
        }
        const data: Post[] = await res.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setPostsError("Error fetching posts. Please try again later."); // Set error message
        setPosts(null); // Clear any previously fetched data
      }
    }
    fetchPosts();
  }, [user]);

  if (posts === null) {  // Check for null to indicate loading state
    return (
      <div className="border rounded p-4 mt-4 shadow-md bg-gray-900">
        <h2 className="text-lg font-bold mb-2 text-gray-100">{user.username}</h2>
        <p className="text-gray-400">{user.email}</p>
        <h3 className="text-md font-semibold mt-4 mb-2 text-gray-100">Posts</h3>
        {postsError && <p className="text-red-500">{postsError}</p>} {/* Display error message */}
        <p className="text-gray-400">Loading posts...</p>
      </div>
    );
  }

  return (
    <div className="border rounded p-4 mt-4 shadow-md bg-gray-900">
      <h2 className="text-lg font-bold mb-2 text-gray-100">{user.username}</h2>
      <p className="text-gray-400">{user.email}</p>
      <h3 className="text-md font-semibold mt-4 mb-2 text-gray-100">Posts</h3>
      <ul>
        {posts.map((post) => (
          <li key={post.id} className="border rounded p-2 mb-2 shadow-sm bg-gray-800 hover:bg-gray-700">
            <h4 className="font-semibold text-gray-100">{post.title}</h4>
            <p className="text-gray-400">{post.body.slice(0, 100)}...</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserDetail;