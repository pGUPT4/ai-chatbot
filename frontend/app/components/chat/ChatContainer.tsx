'use client';

import { useEffect, useRef, useState } from 'react';
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import MessageSkeleton from './skeleton/MessageSkeleton';
import { toast } from 'react-toastify';
import {useChatCreate} from '../../hooks';
import { useAppSelector } from '@/redux/store';
import { useRouter } from 'next/navigation';

interface Message {
  _id: string;
  senderId: string;
  text?: string;
  image?: string;
  createdAt: string;
}

interface User {
  id: string;
  email: string;
}

const ChatContainer = () => {
  const router = useRouter();

  const {message, onChange, onSubmit} = useChatCreate();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [isMessagesLoading, setIsMessagesLoading] = useState(true);
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [selectedUser, setSelectedUser] = useState<User>({
    id: 'user2',
    email: 'Jane Doe'
  }); // Mocked selected user
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
		if (isAuthenticated == false) {
			router.push('/auth/login');
		}
	}, [isAuthenticated, router]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader selectedUser={selectedUser} setSelectedUser={() => {}} />
        <MessageSkeleton />
        <MessageInput value = {message} onChange={onChange} onSubmit={onSubmit} />
      </div>
    );
  }

  // Format message time (copied from the original formatMessageTime utility)
  const formatMessageTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader selectedUser={selectedUser} setSelectedUser={() => {}} />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`flex ${message.senderId === authUser?._id ? 'justify-end' : 'justify-start'} mb-4`}
            ref={messageEndRef}
          >
            <div className="flex items-start gap-2">
              {message.senderId !== authUser?._id && (
                <div className="w-10 h-10 rounded-full border">
                  <img
                    src={selectedUser.profilePic || '/avatar.png'}
                    alt="profile pic"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              )}
              <div className="max-w-[70%]">
                <div className="text-xs text-gray-400 mb-1">
                  <time>{formatMessageTime(message.createdAt)}</time>
                </div>
                <div
                  className={`p-3 rounded-lg ${
                    message.senderId === authUser?._id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-600 text-white'
                  }`}
                >
                  {message.text && <p>{message.text}</p>}
                </div>
              </div>
              {message.senderId === authUser?._id && (
                <div className="w-10 h-10 rounded-full border">
                  <img
                    src={authUser?.profilePic || '/avatar.png'}
                    alt="profile pic"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <MessageInput value = {message} onChange={onChange} onSubmit={onSubmit} />
    </div>
  );
};

export default ChatContainer;