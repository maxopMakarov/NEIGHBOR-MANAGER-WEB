import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AuthLogin, AuthNewUser } from "../services/auth.types"
import { loginUser, registerUser } from "../services/authApi";

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
