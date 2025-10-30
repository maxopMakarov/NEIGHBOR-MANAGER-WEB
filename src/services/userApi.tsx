import { getData } from "./api";

export const getLoggedUser = async () => {
    const response = await getData('api/user', true);
    return response;
};