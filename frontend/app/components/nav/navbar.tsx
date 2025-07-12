'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { toast } from 'react-toastify';
import { useAppSelector } from '@/redux/store';
import { useLogoutMutation } from '@/redux/features/authApiSlice';
import { useDispatch } from 'react-redux';
import { setLogout } from '@/redux/features/authSlice';


const Navbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const isAuthenticated = useAppSelector( (state) => state.auth.isAuthenticated )
  const [logout] = useLogoutMutation();

  const handleLogout = () => {
    logout(undefined)
      .unwrap()
      .then(() => {
        dispatch(setLogout());
        toast.success('Logged out successfully');
        router.push('/auth/login');
      })
      .catch(() => {
        toast.error('Failed to log out');
      });
  }

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
                  onClick={handleLogout}
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