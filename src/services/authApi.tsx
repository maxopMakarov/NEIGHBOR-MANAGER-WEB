import { API_URL, postData } from "./api";
import { AuthLogin, AuthNewUser } from "./auth.types";

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