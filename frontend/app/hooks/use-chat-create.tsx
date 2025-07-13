import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useCreateChatMutation } from '../../redux/features/chatApiSlice';
import { useDispatch } from 'react-redux';
import { setAuth, setDeleteChats } from '../../redux/features/authSlice';
export default function useChatCreate() {
    const dispatch = useDispatch();
    const router = useRouter();
    
    const [createChat, {isLoading}] = useCreateChatMutation();

    const [inputValue, setInputValue] = useState({
        message: '',
    });

    const { message } = inputValue;

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const message = event.target.value;

        setInputValue({ ...inputValue, message });
    };

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // error reason
        createChat({ message })
            .unwrap() // unwrap gets the response from mutation then decides to either resolve or reject the promise
            .then(() => {
                dispatch(setAuth());
                dispatch(setDeleteChats(false));
                setInputValue({ message: '' });
            })
            .catch((error: any) => {
                toast.error('Error sending message: ' + error.message + '');
                console.error('Error:', error);
            });

        console.log('Button pressed');
    };

    return {
        message,
        onChange,
        onSubmit,
    };
}