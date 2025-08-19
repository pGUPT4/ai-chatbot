import { useState, ChangeEvent, FormEvent } from 'react';
import { toast } from 'react-toastify';
import { useCreateChatMutation } from '../../redux/features/chatApiSlice';
import { useDispatch } from 'react-redux';
import { setAuth } from '../../redux/features/authSlice';

export default function useChatCreate() {
    const dispatch = useDispatch();
    
    const [createChat] = useCreateChatMutation();

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