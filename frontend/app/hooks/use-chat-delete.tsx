import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useDeleteChatMutation } from "../../redux/features/chatApiSlice";
import { deleteChats } from "../../redux/features/authSlice";

export default function useChatDelete() {

    const dispatch = useDispatch();
    const router = useRouter();

    const [deleteChat] = useDeleteChatMutation();

    const onClick = async () => {
        deleteChat({})
            .unwrap()
            .then(() => {
                dispatch(deleteChats());
            })
            .catch((error: any) => {
                console.error('Error deleting chat:', error);
            });
    }

    return {
        onClick,
    }
}