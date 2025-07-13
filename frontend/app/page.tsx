'use client'

import ChatContainer from "./components/chat/ChatContainer";
import Navbar from "./components/nav/navbar";
import NoChatSelected from "./components/chat/NoChatSelected";
import { useAppSelector } from "@/redux/store";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const isDeleted = useAppSelector((state) => state.auth.isDeleted);

  console.log('isDeleted at home:', isDeleted);

  useEffect(() => {
    if (isAuthenticated == false){
      router.push('/auth/login')
    }
  })

  return (
    <div>
      <Navbar />
      <div className="h-screen bg-base-200">
          <div className="flex items-center justify-center pt-20 px-4">
              <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
                  <div className="flex h-full rounded-lg overflow-hidden">
                      {isDeleted ? <NoChatSelected /> : <ChatContainer />}
                  </div>
              </div>
          </div>
      </div>
    </div> 
  );
}