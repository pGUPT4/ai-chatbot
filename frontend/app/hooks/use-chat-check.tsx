import { useEffect, useState } from 'react';
import { useCheckEmptyChatQuery } from "@/redux/features/chatApiSlice";

export default function useChatCheck() {
    const [isEmpty, setIsEmpty] = useState(null);
    const [skip, setSkip] = useState(true);

    const {data: checkEmpty} = useCheckEmptyChatQuery('', {
        skip,
    });

    useEffect(() => {
        if (checkEmpty) {
            setIsEmpty(checkEmpty.isEmpty);
            console.log('isEmpty updated:', checkEmpty.isEmpty, 'at', new Date().toLocaleTimeString());
        }
    }, [checkEmpty]);

    const checkTable = () => {
        setSkip(false);
    }

    return {
        isEmpty, 
        checkTable
    };
}