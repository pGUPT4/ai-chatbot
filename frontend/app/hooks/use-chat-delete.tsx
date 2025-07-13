import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useDeleteChatMutation } from "../../redux/features/chatApiSlice";
import {setDeleteChats} from "../../redux/features/authSlice";
import { useAppSelector } from "@/redux/store";

export default function useChatDelete() {

    const dispatch = useDispatch();
    const router = useRouter();

    const isDeleted = useAppSelector((state) => state.auth.isDeleted);

    const [deleteChat] = useDeleteChatMutation();

    const onClick = async () => {
        deleteChat({})
            .unwrap()
            .then(() => {
                dispatch(setDeleteChats(true));
                console.log('isDeleted in useChatDelete:', isDeleted);
            })
            .catch((error: any) => {
                console.error('Error deleting chat:', error);
            });

        console.log('Chat deleted');
    }

    return {
        onClick
    }
}