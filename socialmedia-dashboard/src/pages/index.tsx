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
  const [selectedUser, setSelectedUser] = useState<User | null>(null); // State for selected user

  useEffect(() => {
    async function fetchUsers() {
      const res = await fetch('https://jsonplaceholder.typicode.com/users');
      const data: User[] = await res.json();
      setUsers(data);
    }

    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <UserList users={users} onSelectUser={setSelectedUser} />
      {selectedUser && <UserDetail user={selectedUser} />} {/* Pass selectedUser here! */}
    </div>
  );
}
