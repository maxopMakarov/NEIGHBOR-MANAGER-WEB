import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AuthNewUser } from "../services/auth.types"
import { loginUser, registerUser } from "../services/authApi";
import { logoutUser } from "../services/userApi";

export const useQueryRegister = () => {
    const queryClient = useQueryClient();

    return useMutation({mutationFn: (user: AuthNewUser) => 
        registerUser(user),
        onSettled: () => {
           queryClient.invalidateQueries();
        }
    });
}

export const useQueryLogin = () => {
    
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: loginUser,
        onSuccess: () => {
            queryClient.invalidateQueries();
        },
  });
};

export const useLogout = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: logoutUser,
        onSuccess: () => {
            queryClient.invalidateQueries();
        }
    });
};

