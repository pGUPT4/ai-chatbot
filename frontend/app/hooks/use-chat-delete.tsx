import { useDispatch } from "react-redux";
import { useDeleteChatMutation } from "../../redux/features/chatApiSlice";
import { setDeleted } from "../../redux/features/authSlice";
import { useAppSelector } from "@/redux/store";
import { setAuth } from "../../redux/features/authSlice";

export default function useChatDelete() {

    const dispatch = useDispatch();

    const [deleteChat] = useDeleteChatMutation();
    const isDeleted = useAppSelector((state) => state.auth.isDeleted); 

    const onClick = async () => {
        deleteChat({})
            .unwrap()
            .then(() => {
                dispatch(setAuth());
                dispatch(setDeleted(true));
                console.log('isDeleted in X: ', isDeleted);
            })
            .catch((error: any) => {
                console.error('Error deleting chat:', error);
            });
    }

    return {
        onClick
    }
}