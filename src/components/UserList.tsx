// src/components/UserList.tsx
import React from 'react';
import { User } from '../types';

interface UserListProps {
  users: User[] | null; // Allow users to be null initially
  onSelectUser: (user: User) => void;
}

const UserList: React.FC<UserListProps> = ({ users, onSelectUser }) => {
  if (users === null) {  // Check for null to indicate loading state
    return (
      <div className="border rounded p-4 shadow-md bg-gray-900">
        <h2 className="text-lg font-bold mb-2 text-gray-100">User List</h2>
        <p className="text-gray-400">Loading users...</p> {/* Loading message */}
      </div>
    );
  }

  return (
    <div className="border rounded p-4 shadow-md bg-gray-900">
      <h2 className="text-lg font-bold mb-2 text-gray-100">User List</h2>
      <ul>
        {users.map((user) => (
          <li
            key={user.id}
            className="cursor-pointer hover:bg-gray-700 p-2 rounded border-b border-gray-700 last:border-b-0 text-gray-300"
            onClick={() => onSelectUser(user)}
          >
            {user.username}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;