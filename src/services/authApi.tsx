import { API_URL, postData } from "./api";
import { AuthLogin, AuthNewUser } from "./auth.types";
import Web3 from 'web3'

export const registerUser = async (user: AuthNewUser) => {
    const response = await postData('api/auth/register', user);
    const json = await response.json();
    
    const { data, errors } = json;

    if (response.ok) {
        return data;
    } else {
        throw new Error(errors ? JSON.stringify(errors) : 'Request failed');
    }
};

export const loginUser = async (user: AuthLogin) => {
    await fetch(`${API_URL}/sanctum/csrf-cookie`, {
        credentials: 'include',
    });

    return await postData('api/auth/login', user, true);
};

export const loginWithMetaMask = async() => {
    if (! window.ethereum) {
        alert('MetaMask not detected. Please try again from a MetaMask enabled browser.');
    }

    const web3 = new Web3(window.ethereum);
    const message = [
        "I have read and accept the terms and conditions (https://example.org/tos) of this app.",
        "Please sign me in!"
    ].join("\n");

    const eth_address = (await web3.eth.requestAccounts())[0];
    const signature = await web3.eth.personal.sign(message, eth_address, '');

    await fetch(`${API_URL}/sanctum/csrf-cookie`, {
        credentials: 'include',
    });

    return  await postData('api/auth/login-web3', { message, eth_address, signature }, true);
  }