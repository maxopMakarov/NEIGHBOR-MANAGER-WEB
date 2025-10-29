import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Form } from '../components/Authentication/LoginForm'

const logoUrl = new URL('../assets/TramuntanaLogo.jpg', import.meta.url).href

export const Route = createFileRoute('/login')({
  component: LoginComponent,
})

function LoginComponent() {
  const handleLogin = async (data: { email: string; password: string }) => {
      console.log('Login form submitted', data)
      // You can call your Laravel API here, e.g.:
      // await fetch('https://your-api.com/api/auth/login', { ... })/
    }

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img src={logoUrl} alt="Your Company" className="mx-auto h-auto w-auto" />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-black">Sign in to your account</h2>
        </div>

        <Form onSubmit={handleLogin} />
      </div>
    </>
  )
}

export default LoginComponent
