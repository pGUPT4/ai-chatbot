import { LoginForm } from '@/app/components/forms';
import Navbar from '@/app/components/nav/navbar';
import React from 'react'

const LoginPage = () => {
    return (
        <div>
            <Navbar/>
            <LoginForm/>
        </div>
    )
}

export default LoginPage;
