'use client';

import { useEffect, useState } from 'react';
import { Users } from 'lucide-react';
import SidebarSkeleton from './skeleton/SidebarSkeleton';
import { toast } from 'react-toastify';

interface User {
  _id: string;
  fullName: string;
  profilePic?: string;
}

interface Props {
  selectedUser: User | null;
  setSelectedUser: (user: User | null) => void;
}

const Sidebar = ({ selectedUser, setSelectedUser }: Props) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isUsersLoading, setIsUsersLoading] = useState(true);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]); // Mocked online users

  // Fetch users (mocked for this example; replace with actual API call)
  useEffect(() => {
    const fetchUsers = async () => {
      setIsUsersLoading(true);
      try {
        // Replace this with an actual API call to fetch users
        // For now, we'll mock the users
        const mockUsers: User[] = [
          { _id: 'user2', fullName: 'Jane Doe', profilePic: '/avatar.png' },
          { _id: 'user3', fullName: 'Alice Smith', profilePic: '/avatar.png' },
          { _id: 'user4', fullName: 'Bob Johnson', profilePic: '/avatar.png' },
        ];
        setUsers(mockUsers);

        // Mock online users (in a real app, this would come from a WebSocket or API)
        setOnlineUsers(['user2', 'user3']);
      } catch (err) {
        console.error(err);
        toast.error('Error fetching users');
      } finally {
        setIsUsersLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users; // Online filter is commented out, so use all users

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-gray-700 flex flex-col transition-all duration-200">
      <div className="border-b border-gray-700 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="h-6 w-6 text-white" />
          <span className="font-medium text-white hidden lg:block">Contacts</span>
        </div>
      </div>

      <div className="overflow-y-auto w-full py-3">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              w-full p-3 flex items-center gap-3
              hover:bg-gray-600 transition-colors
              ${selectedUser?._id === user._id ? 'bg-gray-600 ring-1 ring-gray-600' : ''}
            `}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilePic || '/avatar.png'}
                alt={user.fullName}
                className="w-12 h-12 object-cover rounded-full"
              />
              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-gray-900" />
              )}
            </div>

            {/* User info - only visible on larger screens */}
            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium text-white truncate">{user.fullName}</div>
              <div className="text-sm text-gray-400">
                {onlineUsers.includes(user._id) ? 'Online' : 'Offline'}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-gray-400 py-4">No users found</div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;