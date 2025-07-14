import { useState, ChangeEvent, FormEvent } from 'react';
import { toast } from 'react-toastify';
import { useCreateChatMutation } from '../../redux/features/chatApiSlice';
import { useDispatch } from 'react-redux';
import { setAuth, setDeleted } from '../../redux/features/authSlice';
import { useAppSelector } from '@/redux/store';

export default function useChatCreate() {
    const dispatch = useDispatch();
    
    const [createChat] = useCreateChatMutation();

    const [inputValue, setInputValue] = useState({
        message: '',
    });

    const isDeleted = useAppSelector((state) => state.auth.isDeleted);

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
                dispatch(setDeleted(false));
                console.log('isDeleted in Send:', isDeleted);
                setInputValue({ message: '' });
            })
            .catch((error: any) => {
                toast.error('Error sending message: ' + error.message + '');
                console.error('Error:', error);
            });
    };

    return {
        message,
        onChange,
        onSubmit
    };
}