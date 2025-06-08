'use client';

import { useEffect, useRef, useState } from 'react';
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import MessageSkeleton from './skeleton/MessageSkeleton';
import { toast } from 'react-toastify';

interface Message {
  _id: string;
  senderId: string;
  text?: string;
  image?: string;
  createdAt: string;
}

interface User {
  _id: string;
  fullName: string;
  profilePic?: string;
}

const ChatContainer = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isMessagesLoading, setIsMessagesLoading] = useState(true);
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [selectedUser, setSelectedUser] = useState<User>({
    _id: 'user2',
    fullName: 'Jane Doe',
    profilePic: '/avatar.png',
  }); // Mocked selected user
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  // Fetch authenticated user (mocked for simplicity)
  useEffect(() => {
    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('jwt='))
      ?.split('=')[1];
    if (token) {
      setAuthUser({
        _id: 'user1',
        fullName: 'John Doe',
        profilePic: '/avatar.png',
      });
    }
  }, []);

  // Fetch messages
  useEffect(() => {
    if (!selectedUser._id) return;

    const fetchMessages = async () => {
      setIsMessagesLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/chat/all-chats', {
          method: 'GET',
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error('Failed to fetch messages');
        }
        const data = await response.json();
        setMessages(data.chats || []);
      } catch (err) {
        console.error(err);
        toast.error('Error fetching messages');
      } finally {
        setIsMessagesLoading(false);
      }
    };

    fetchMessages();
  }, [selectedUser._id]);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Mocked online status (since we don't have onlineUsers)
  const isOnline = true;

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader selectedUser={selectedUser} setSelectedUser={() => {}} isOnline={isOnline} />
        <MessageSkeleton />
        <MessageInput setMessages={setMessages} />
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
      <ChatHeader selectedUser={selectedUser} setSelectedUser={() => {}} isOnline={isOnline} />

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
                  {message.image && (
                    <img
                      src={message.image}
                      alt="Attachment"
                      className="sm:max-w-[200px] rounded-md mb-2"
                    />
                  )}
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

      <MessageInput setMessages={setMessages} />
    </div>
  );
};

export default ChatContainer;