import { useRef, useState } from 'react';
import { Image, Send, X } from 'lucide-react';
import { toast } from 'react-toastify';

interface Message {
  _id: string;
  senderId: string;
  text?: string;
  image?: string;
  createdAt: string;
}

interface Props {
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

const MessageInput = ({ setMessages }: Props) => {
  const [text, setText] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && !file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      const newMessage = {
        _id: Date.now().toString(), // Temporary ID
        senderId: 'user1', // Mocked user ID
        text: text.trim() || undefined,
        image: imagePreview || undefined,
        createdAt: new Date().toISOString(),
      };

      // Optimistic update
      setMessages((prev) => [...prev, newMessage]);

      const response = await fetch('http://localhost:3000/api/chat/new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text.trim(), image: imagePreview }),
        credentials: 'include',
      });

      if (!response.ok) {
        if (response.status === 429) {
          toast.error('Rate limit exceeded, please try again later');
          return;
        }
        if (response.status === 401) {
          toast.error('Unauthorized, please log in');
          return;
        }
        throw new Error('Failed to send message');
      }

      const data = await response.json();
      setMessages(data.chats || []);
      toast.success('Message sent');

      // Clear form
      setText('');
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (error) {
      console.error('Failed to send message:', error);
      toast.error('Failed to send message');
    }
  };

  return (
    <div className="p-4 w-full">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-gray-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gray-600 flex items-center justify-center"
              type="button"
            >
              <X className="h-3 w-3 text-white" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-gray-400"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
        </div>
        <button
          type="submit"
          className="p-2 text-white bg-blue-600 rounded-full hover:bg-blue-500"
          disabled={!text.trim() && !imagePreview}
        >
          <Send className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;