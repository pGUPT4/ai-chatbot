'use client'

import { useDispatch } from "react-redux";
// import { logout as setLogout } from "@/redux/features/authSlice";
import { useLogoutMutation } from "@/redux/features/authApiSlice";
import ChatContainer from "./components/chat/ChatContainer";
import Navbar from "./components/nav/navbar";
import Sidebar from "./components/chat/Sidebar";
import NoChatSelected from "./components/chat/NoChatSelected";

export default function Home() {
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();

  const selectedUser = true;

  // const handleLogout = () => {
	// 	logout(undefined)
	// 		.unwrap()
	// 		.then(() => {
	// 			dispatch(setLogout());
	// 		});
	// };

  return (
    <div>
      <Navbar />
      <div className="h-screen bg-base-200">
          <div className="flex items-center justify-center pt-20 px-4">
              <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
                  <div className="flex h-full rounded-lg overflow-hidden">
                      <Sidebar selectedUser={null} setSelectedUser={() => {}} />

                      {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
                  </div>
              </div>
          </div>
      </div>
    </div> 
      

  );
}