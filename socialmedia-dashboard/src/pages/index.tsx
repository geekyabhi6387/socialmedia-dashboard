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

  return (
    <div className="container mx-auto p-4">
      {usersError && <p className="text-red-500">{usersError}</p>} {/* Display error message */}
      <UserList users={users || []} onSelectUser={setSelectedUser} />
      {selectedUser && <UserDetail user={selectedUser} />}
    </div>
  );
}
