
// import { useRouter } from "next/navigation";
// import { ToastContainer, toast } from "react-toastify";
import { useCheckQuery } from "@/redux/features/authApiSlice";
import { useEffect } from "react";

interface Props {
    id: String
}

const useHome = ({id}: Props) => {
    const { data } = useCheckQuery({id});
    // const router = useRouter();

    useEffect(()=>{
        
    })

    return data.email
}

export default useHome;