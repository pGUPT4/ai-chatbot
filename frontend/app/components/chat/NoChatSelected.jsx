import { useChatCreate } from "@/app/hooks";
import MessageInput from "./MessageInput";

const NoChatSelected = () => {
  const {message, onChange, onSubmit} = useChatCreate();
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50">
      <div className="max-w-md text-center space-y-6">
        {/* Icon Display */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-2xl font-bold">Welcome to AI ChatBot!</h2>
      </div>
      <MessageInput value = {message} onChange={onChange} onSubmit={onSubmit} />
    </div>
    
  );
};

export default NoChatSelected;