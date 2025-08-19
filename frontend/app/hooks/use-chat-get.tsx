import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useGetChatsQuery } from '@/redux/features/chatApiSlice';

// GET all chats
export default function useChatGet() {
    // chat set up - https://www.youtube.com/watch?v=wEsPL50Uiyo

    const dispatch = useDispatch();
    const router = useRouter();

    const {data: getChats, isLoading } = useGetChatsQuery('');
    
    return {
        isLoading
    }
};