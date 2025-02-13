// src/components/UserList.tsx
import React from 'react';
import { User } from '../types';

interface UserListProps {
  users: User[];
  onSelectUser: (user: User) => void;
}

const UserList: React.FC<UserListProps> = ({ users, onSelectUser }) => {
  return (
    <div className="border rounded p-4"> {/* Added some basic styling */}
      <h2 className="text-lg font-bold mb-2">User List</h2>
      <ul>
        {users.map((user) => (
          <li
            key={user.id}
            className="cursor-pointer hover:bg-gray-100 p-2 rounded"
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