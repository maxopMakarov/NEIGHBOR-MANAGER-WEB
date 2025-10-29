import { AuthNewUser } from "./auth.types";

const API_URL = 'http://localhost:8000/api';

export const registerUser = async (user: AuthNewUser) => {
    const response = await postData('auth/register', user);
    const json = await response.json();
    
    const { data, errors } = json;
    if (response.ok) {
        return data;
    } else {
        throw new Error(errors ? JSON.stringify(errors) : 'Request failed');
    }
};

export const postData = async (endpoint: string, data: object) => {
    const response = await fetch(`${API_URL}/${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(data),
    });

    return response;
};