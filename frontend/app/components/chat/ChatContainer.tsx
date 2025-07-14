'use client';

import { useEffect, useState } from 'react';
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import EmptyMessageSkeleton from './skeleton/EmptyMessageSkeleton';
import MessageSkeleton from './skeleton/MessageSkeleton';
import { toast } from 'react-toastify';
import { useChatCreate, useChatGet } from '../../hooks';
import { useAppSelector } from '@/redux/store';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

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
  const {isLoading} = useChatGet();
  const messageRef = useRef(null);

  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const isDeleted = useAppSelector((state) => state.auth.isDeleted);

  useEffect(() => {
    if (isAuthenticated == false){
      router.push('/auth/login')
    }
  })

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {isLoading ? <EmptyMessageSkeleton/> : <MessageSkeleton chats={[]} messageEndRef={messageRef} />}
      </div>

      <MessageInput value = {message} onChange={onChange} onSubmit={onSubmit} />
    </div>
  );
};

export default ChatContainer;