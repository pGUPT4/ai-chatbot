import { Send } from 'lucide-react';
import { ChangeEvent, FormEvent } from 'react';

interface Props {
  value?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

const MessageInput = ({
  value,
  onChange,
  onSubmit
 }: Props) => {

  return (
    <div className="p-4 w-full">

      <form onSubmit={onSubmit} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-gray-400"
            placeholder="ChatGPT here..."
            value={value}
            onChange={onChange}
          />

        </div>
        <button
          type="submit"
          className="p-2 text-white bg-blue-600 rounded-full hover:bg-blue-500"
        >
          <Send className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;