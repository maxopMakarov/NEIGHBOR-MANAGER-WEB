import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AuthNewUser } from "../services/auth.types"
import { registerUser } from "../services/api";

export const useQueryRegister = () => {
    const queryClient = useQueryClient();

    return useMutation({mutationFn: (user: AuthNewUser) => 
        registerUser(user),
        onSettled: () => {
           queryClient.invalidateQueries();
        }
    });
}