import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { useState, useEffect } from 'react';
import UserList from '../components/UserList'; 
import UserDetail from '../components/UserDetail';
import { User } from '../types';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const [users, setUsers] = useState<User[] | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [usersError, setUsersError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`); // Throw error for non-2xx responses
        }
        const data: User[] = await res.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
        setUsersError("Error fetching users. Please try again later."); // Set error message
        setUsers(null); // Clear any previously fetched data
      }
    }

    fetchUsers();
  }, []);

  const filteredUsers = users?.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div className="flex h-screen bg-gray-900">
    <aside className="w-64 bg-gray-800 p-4 overflow-y-auto h-screen"> {/* Fixed height for sidebar */}
      <input
        type="text"
        placeholder="Search users..."
        className="w-full bg-gray-700 text-white rounded p-2 mb-4"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      {usersError && <p className="text-red-500">{usersError}</p>}
      <UserList users={filteredUsers} onSelectUser={setSelectedUser} />
    </aside>
    <main className="flex-1 p-6 bg-gray-900 overflow-y-auto flex-col h-screen"> {/* Scrollable main content */}
    {!selectedUser && ( // Conditional rendering for placeholder
        <div className="flex items-center justify-center h-full"> {/* Center the message */}
          <p className="text-gray-400 text-lg">Select a user to view details.</p>
        </div>
      )}
      {selectedUser && <UserDetail user={selectedUser} />}
    </main>
  </div>
  );
}
