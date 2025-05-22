'use client';

import { useAppSelector } from '@/redux/store';
import { redirect } from 'next/navigation';

interface Props {
	children: React.ReactNode;
}

export default function RequireAuth({ children }: Props) {
	const { isAuthenticated } = useAppSelector((state) => state.auth);

	if (!isAuthenticated) {
		redirect('/auth/login');
	}

	return <>{children}</>;
}