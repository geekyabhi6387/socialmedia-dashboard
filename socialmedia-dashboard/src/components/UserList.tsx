// src/components/UserList.tsx
import React from 'react';
import { User } from '../types';

interface UserListProps {
  users: User[];
  onSelectUser: (user: User) => void;
}

const UserList: React.FC<UserListProps> = ({ users, onSelectUser }) => {
  return (
    <div className="border rounded p-4 shadow-md bg-white">
  <h2 className="text-lg font-bold mb-2 text-gray-800">User List</h2> {/* Darker text */}
  <ul>
    {users.map((user) => (
      <li
        key={user.id}
        className="cursor-pointer hover:bg-gray-100 p-2 rounded border-b border-gray-200 last:border-b-0 text-gray-700"  
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