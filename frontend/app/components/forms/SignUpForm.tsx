'use client';

import Form from './Form';
import { useSignUp } from '@/app/hooks';
import Link from 'next/link';
import { ToastContainer } from 'react-toastify';

export default function RegisterForm() {
  const { email, password, re_password, onChange, onSubmit } = useSignUp();

  const config = [
    {
      labelText: 'Email',
      labelId: 'email',
      type: 'email',
      value: email,
      required: true,
    },
    {
      labelText: 'Password',
      labelId: 'password',
      type: 'password',
      value: password,
      required: true,
      isPassword: true,
    },
    {
      labelText: 'Confirm password',
      labelId: 're_password',
      type: 'password',
      value: re_password,
      required: true,
      isPassword: true,
    },
  ];

  return (
    <div>
      <Form
        config={config}
        formHeader="Register"
        formSubtext="Create your account to get started"
        btnText="Sign up"
        onChange={onChange}
        onSubmit={onSubmit}
      >
        <p className="text-white text-center mt-4">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-blue-400 hover:underline">
            Login here
          </Link>
        </p>
      </Form>
      <ToastContainer />
    </div>
  );
}