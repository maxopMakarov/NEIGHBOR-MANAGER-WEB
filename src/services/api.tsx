import { AuthLogin, AuthNewUser } from "./auth.types";

export const API_URL = 'http://localhost:8000';
const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-XSRF-TOKEN': decodeURIComponent(getCookie('XSRF-TOKEN') || ''),
    "X-Requested-with": "XMLHttpRequest"
};

function getCookie(key: string) {
  var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
  return b ? b.pop() : "";
}

export const postData = async (endpoint: string, data: object, credentials?: boolean) => {
    headers['X-XSRF-TOKEN'] = decodeURIComponent(getCookie('XSRF-TOKEN') || '');
    const response = await fetch(`${API_URL}/${endpoint}`, {
        method: 'POST',
        headers: headers,
        credentials: credentials ? 'include' : 'same-origin',
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        let errorMsg = 'Request failed';
        try {
            const errData = await response.json();
            errorMsg = errData.message || errorMsg;
        } catch (_) {}
        throw new Error(errorMsg);
    }

    return response.json();
};

export const getData = async (endpoint: string, credentials?: boolean) => {
    const response = await fetch(`${API_URL}/${endpoint}`, {
        method: 'Get',
        headers: headers,
        credentials: credentials ? 'include' : 'same-origin',
    });

    return response;
};