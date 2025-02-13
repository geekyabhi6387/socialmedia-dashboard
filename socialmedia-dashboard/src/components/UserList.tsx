// src/components/UserList.tsx
import React from 'react';
import { User } from '../types';

interface UserListProps {
  users: User[];
  onSelectUser: (user: User) => void;
}

const UserList: React.FC<UserListProps> = ({ users, onSelectUser }) => {
  return (
    <div className="border rounded p-4 shadow-md bg-gray-900"> {/* Dark background */}
    <h2 className="text-lg font-bold mb-2 text-gray-100">User List</h2> {/* Light text */}
    <ul>
      {users.map((user) => (
        <li
          key={user.id}
          className="cursor-pointer hover:bg-gray-700 p-2 rounded border-b border-gray-700 last:border-b-0 text-gray-300" /* Light text */
          onClick={() => onSelectUser(user)}
        >
          {user.name}
        </li>
      ))}
    </ul>
  </div>
  );
};

export default UserList;