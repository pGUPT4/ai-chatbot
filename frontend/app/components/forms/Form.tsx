// frontend/src/components/Form.tsx
import { ChangeEvent, FormEvent, ReactNode } from 'react';
import Input from './input';

interface Config {
  labelText: string;
  labelId: string;
  type: string;
  value: string;
  required?: boolean;
  isPassword?: boolean;
  icon?: React.ReactNode;
}

interface Props {
  config: Config[];
  formHeader: string;
  formSubtext: string;
  btnText: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  children?: ReactNode;
}

export default function Form({
  config,
  formHeader,
  formSubtext,
  btnText,
  onChange,
  onSubmit,
  children,
}: Props) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 sm:p-12 bg-gray-900">
      <div className="w-full max-w-md space-y-8">
        {/* Header and Subtext */}
        <div className="text-center mb-8">
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-2xl font-bold text-white">{formHeader}</h1>
            <p className="text-gray-400">{formSubtext}</p>
          </div>
        </div>

        {/* Form without Box */}
        <form onSubmit={onSubmit} className="space-y-6">
          {config.map((input) => (
            <Input
              key={input.labelId}
              labelId={input.labelId}
              type={input.type}
              onChange={onChange}
              value={input.value}
              required={input.required}
              isPassword={input.isPassword}
              icon={input.icon}
            >
              {input.labelText}
            </Input>
          ))}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
          >
            {btnText}
          </button>
        </form>

        {/* Link Section */}
        {children}
      </div>
    </div>
  );
}