'use client'

import { useDispatch } from "react-redux";
import { useHome } from "./hooks";
import { logout as setLogout } from "@/redux/features/authSlice";
import { useLogoutMutation } from "@/redux/features/authApiSlice";

export default function Home() {
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();

  const handleLogout = () => {
		logout(undefined)
			.unwrap()
			.then(() => {
				dispatch(setLogout());
			});
	};

  // const {data} = useHome()
    // console.log(data)
  return (
    <div>
		<p>App</p>
    <button>
      
    </button>

	</div>
  );
}
