'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { LogOut } from 'lucide-react';
import { toast } from 'react-toastify';
import { useAppSelector } from '@/redux/store';
import { useLogout } from '@/app/hooks';

const Navbar = () => {
  const router = useRouter();
  const [authUser, setAuthUser] = useState<boolean>(false);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  
  const {onClick} = useLogout();

  // const handleLogout = async () => {
  //   try {
  //     const response = await fetch('http://localhost:3000/api/auth/logout', {
  //       method: 'POST',
  //       credentials: 'include',
  //     });

  //     if (!response.ok) {
  //       throw new Error('Logout failed');
  //     }

  //     // Clear the cookie (client-side)
  //     document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
  //     setAuthUser(false);
  //     toast.success('Logged out successfully');
  //     router.push('/login');
  //   } catch (err) {
  //     console.error(err);
  //     toast.error('Error logging out');
  //   }
  // };

  return (
    <header className="bg-gray-800 border-b border-gray-700 fixed w-full top-0 z-40 backdrop-blur-lg bg-opacity-80">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          {/* Logo/Title */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
              <h1 className="text-lg font-bold text-white">AI ChatBot</h1>
            </Link>
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <>
                <button
                  onClick={onClick}
                  className="flex items-center gap-2 px-3 py-1.5 text-white bg-gray-700 rounded-lg hover:bg-gray-600"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            ) : (<></>)}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;