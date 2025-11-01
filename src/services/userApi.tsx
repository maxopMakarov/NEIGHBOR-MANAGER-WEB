import { getData, postData } from "./api";

export const getLoggedUser = async () => {
    const response = await getData('api/user', true);
    return response;
};

export const logoutUser = async () => {
    const response = await postData('api/auth/logout', {}, true);
    return response;
};