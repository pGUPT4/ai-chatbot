import { useRef } from "react";

interface Chat {
  id: string;
  role: 'user' | 'assistant';
  content?: string;
}

interface Props {
  chats: Chat[];
  messageEndRef: React.RefObject<null>;
}

const MessageSkeleton = ({chats, messageEndRef}: Props) => {

    return (
        <>
            {chats.map((chat) => (
            <div
                key={chat.id}
                className={`flex ${chat.role === "user" ? 'justify-end' : 'justify-start'} mb-4`}
                ref={messageEndRef}
            >
                <div className="flex items-start gap-2">
                {chat.role !== "user" && (
                    <div className="w-10 h-10 rounded-full border">
                    <img
                        src={'/user-avatar.png'}
                        alt="profile pic"
                        className="w-full h-full rounded-full object-cover"
                    />
                    </div>
                )}
                <div className="max-w-[70%]">
                    <div
                    className={`p-3 rounded-lg ${
                        chat.role === "user"
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-600 text-white'
                    }`}
                    >
                    {chat.content && <p>{chat.content}</p>}
                    </div>
                </div>
                {chat.role === "user" && (
                    <div className="w-10 h-10 rounded-full border">
                    <img
                        src={'/user-avatar.png'}
                        alt="profile pic"
                        className="w-full h-full rounded-full object-cover"
                    />
                    </div>
                )}
                </div>
            </div>
            ))}
        </>
    );
    };

export default MessageSkeleton;