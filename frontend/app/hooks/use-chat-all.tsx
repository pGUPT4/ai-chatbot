import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useGetChatsQuery } from '@/redux/features/chatApiSlice';

// GET all chats
export default function useChatAll() {

    const dispatch = useDispatch();
    const router = useRouter();

    const {data, isLoading, isError, error } = useGetChatsQuery('');


    // Map API response to match MessageSkeleton's expected Chat interface
    const chats = data?.chats?.map((chat: any, index : any) => ({
        id: `${chat.timestamp}-${index}`, // Generate unique ID (since API doesn't provide one)
        role: chat.role,
        content: chat.message, // Map 'message' to 'content'
    })) || [];

    
    return {
        chats,
        isLoading,
        isError, 
        error
    }
};