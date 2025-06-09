import { X } from 'lucide-react';

interface User {
  id: string;
  email: string;
}

interface Props {
  selectedUser: User;
  setSelectedUser: (user: User | null) => void;
}

const ChatHeader = ({ selectedUser, setSelectedUser }: Props) => {
  return (
    <div className="p-2.5 border-b border-gray-700">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">

          {/* User info */}
          <div>
            <h3 className="font-medium text-white">{selectedUser.email}</h3>
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