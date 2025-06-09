
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useGetChatsMutation } from '../../redux/features/chatApiSlice';

// GET all chats
export default function useChatAll() {
    const dispatch = useDispatch();
    const router = useRouter();

    const [getChats, { isLoading }] = useGetChatsMutation();

    // cowboy moment


};