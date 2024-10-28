
import { UserType } from "@/types/user-types";
import { createContext, useContext } from "react";


type AuthContextType = {

    setUser: (user: UserType | null) => void;
    user?: UserType | null;
};

export const AuthContext = createContext<AuthContextType>({

    setUser: () => { },
    user: null,
});

// This hook is used to access the user info.
export function useAuth() {
    return useContext(AuthContext);
}
