'use client'

import React, { ReactNode, useState } from "react";

import { AuthContext } from "@/context/authcontext";
import { UserType } from "@/types/user-types";



const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserType | null>(null);




    return (
        <AuthContext.Provider value={{ setUser, user }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;