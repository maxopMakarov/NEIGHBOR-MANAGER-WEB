import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { RegisterForm } from '../components/Authentication/RegisterForm'
import { AuthNewUser } from '../services/auth.types'
import { useQueryRegister } from '../hooks/useQueryRegister'

const logoUrl = new URL('../assets/TramuntanaLogo.jpg', import.meta.url).href

export const Route = createFileRoute('/register')({
  component: RegisterComponent,
})

function RegisterComponent() {
    const {mutate: registerUser, status: registerStatus} = useQueryRegister();

    const handleLogin = async (data: AuthNewUser) => {
        registerUser(data, {
            onSuccess: () => {
                console.log('User registered successfully')
            },
        });
    }

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img src={logoUrl} alt="Your Company" className="mx-auto h-auto w-auto" />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-black">Sign in to your account</h2>
        </div>

        <RegisterForm onSubmit={handleLogin} />
      </div>
    </>
  )
}

export default RegisterComponent