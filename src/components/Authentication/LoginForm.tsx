import { Link, useNavigate } from '@tanstack/react-router'
import React, { useState } from 'react'
import styles from './AuthForms.module.scss';
import SVGIcon from '../../assets/MetaMask-icon-fox.svg?react'
import SVGIconLoading from '../../assets/loading-icon.svg?react'
import { useMetamaskLogin } from '../../hooks/useQueryRegister';

interface LoginFormProps {
  onSubmit: (data: any) => void,
  submitting: boolean,
}

export const LoginForm: React.FC<LoginFormProps> = ({onSubmit, submitting}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {mutate: loginUser, status: loginStatus} = useMetamaskLogin();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit({ email, password })
    }

    const handleMetamaskLogin = async () => {
        loginUser(undefined, {
            onSuccess: () => {
                navigate({to: '/dashboard'});
            },
        });
    }


  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
        <div>
            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Email address</label>
            <div className="mt-2">
                <input type="email" 
                name="email" 
                required 
                autoComplete="email" 
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 
                -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 
                focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
            </div>
        </div>

        <div>
            <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Password</label>
                <div className="text-sm">
                    <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300">Forgot password?</a>
                </div>
            </div>
            <div className="mt-2">
                <input 
                type="password" 
                name="password" 
                required 
                autoComplete="current-password" 
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 
                -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 
                focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            </div>
        </div>

        <div>
            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                {!submitting && <span>Sign in</span>}
                {submitting && 
                    <SVGIconLoading className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" />
                }
            </button>
        </div>
        </form>
        <div className={styles.otherLogins}>
            <button className="relative inline-flex items-center justify-center p-0.5 mt-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500
             hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800" 
             onClick={handleMetamaskLogin}>
                <span className="flex  w-100 px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                    <SVGIcon className="ml-auto w-5 h-5 me-2"/>
                    <span className="mr-auto">Metamask Sign in</span>
                </span>
            </button>
        </div>
        <p className="mt-10 text-center text-sm/6 text-gray-400">
            <Link to="/register">Registrate</Link>
        </p>
    </div>
  )
}