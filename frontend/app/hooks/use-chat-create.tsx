import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useCreateChatMutation } from '../../redux/features/chatApiSlice';
import { useDispatch } from 'react-redux';
import { setAuth } from '../../redux/features/authSlice';

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

        createChat({ message })
            .unwrap()
            .then(() => {
                dispatch(setAuth());
                router.push('/');
            })
            .catch(() => {
                toast.error('Error in sending message');
            });
    };

    return {
        message,
        onChange,
        onSubmit,
    };
}