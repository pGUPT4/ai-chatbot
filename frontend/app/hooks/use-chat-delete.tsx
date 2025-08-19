import { useDispatch } from "react-redux";
import { useCheckEmptyChatQuery, useDeleteChatMutation } from "../../redux/features/chatApiSlice";
import { setAuth } from "../../redux/features/authSlice";
import { useEffect, useState } from "react";
import useCheckEmpty from "../hooks/use-chat-check";

export default function useChatDelete() {

    const dispatch = useDispatch();

    const [deleteChat] = useDeleteChatMutation();

    const onClick = async () => {
        deleteChat({})
            .unwrap()
            .then(() => {
                dispatch(setAuth());
            })
            .catch((error: any) => {
                console.error('Error deleting chat:', error);
            });
        
        console.log('Chat deleted successfully');
    }

    return {
        onClick
    }
}