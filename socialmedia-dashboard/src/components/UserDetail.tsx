// src/components/UserDetail.tsx
import React, { useState, useEffect } from 'react';
import { User, Post } from '../types';

interface UserDetailProps {
  user: User;
}

const UserDetail: React.FC<UserDetailProps> = ({ user }) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`);
      const data: Post[] = await res.json();
      setPosts(data);
    }
    fetchPosts();
  }, [user]);

  return (
    <div className="border rounded p-4 mt-4 shadow-md bg-gray-900"> {/* Dark background */}
    <h2 className="text-lg font-bold mb-2 text-gray-100">{user.name}</h2> {/* Light text */}
    <p className="text-gray-400">{user.email}</p>

    <h3 className="text-md font-semibold mt-4 mb-2 text-gray-100">Posts</h3> {/* Light text */}
    <ul>
      {posts.map((post) => (
        <li key={post.id} className="border rounded p-2 mb-2 shadow-sm bg-gray-800 hover:bg-gray-700"> {/* Slightly lighter background for posts */}
          <h4 className="font-semibold text-gray-100">{post.title}</h4> {/* Light text */}
          <p className="text-gray-400">{post.body.slice(0, 100)}...</p> {/* Light text */}
        </li>
      ))}
    </ul>
  </div>
  );
};

export default UserDetail;