import { ChangeEvent, useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';

interface Props {
  labelId: string;
  type: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  children: React.ReactNode;
  link?: {
    linkText: string;
    linkUrl: string;
  };
  required?: boolean;
  isPassword?: boolean;
  icon?: React.ReactNode;
}

export default function Input({
  labelId,
  type,
  onChange,
  value,
  children,
  link,
  required = false,
  isPassword,
  icon,
}: Props) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-2">
      {/* Label and Link */}
      <div className="flex justify-between items-center">
        <label htmlFor={labelId} className="text-sm font-medium text-white">
          {children}
        </label>
        {link && (
          <div className="text-sm">
            <Link href={link.linkUrl} className="text-blue-400 hover:text-blue-300">
              {link.linkText}
            </Link>
          </div>
        )}
      </div>

      {/* Input Field with Icon */}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          id={labelId}
          name={labelId}
          type={isPassword && !showPassword ? 'password' : 'text'}
          onChange={onChange}
          value={value}
          required={required}
          className={`w-full px-4 py-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-gray-400 ${
            icon ? 'pl-10' : ''
          }`}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}