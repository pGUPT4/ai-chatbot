import { X } from 'lucide-react';

interface User {
  _id: string;
  fullName: string;
  profilePic?: string;
}

interface Props {
  selectedUser: User;
  setSelectedUser: (user: User | null) => void;
  isOnline: boolean;
}

const ChatHeader = ({ selectedUser, setSelectedUser, isOnline }: Props) => {
  return (
    <div className="p-2.5 border-b border-gray-700">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full relative">
            <img
              src={selectedUser.profilePic || '/avatar.png'}
              alt={selectedUser.fullName}
              className="w-full h-full rounded-full object-cover"
            />
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium text-white">{selectedUser.fullName}</h3>
            <p className="text-sm text-gray-400">
              {isOnline ? 'Online' : 'Offline'}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button onClick={() => setSelectedUser(null)} className="text-gray-400 hover:text-gray-300">
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;