import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useGetChatsQuery } from '@/redux/features/chatApiSlice';

// GET all chats
export default function useChatGet() {
    const dispatch = useDispatch();
    const router = useRouter();

    const {data: getChats, isLoading } = useGetChatsQuery('');
    
    return {
        isLoading
    }
};