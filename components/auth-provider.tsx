'use client'

import React, { ReactNode, useContext, useEffect, useState } from "react";

import { AuthContext } from "@/context/authcontext";
import { UserType } from "@/types/user-types";
import { jwtDecode } from "jwt-decode";



const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserType | null>(null);

    useEffect(() => {
        // Check for token and decode user info on mount
        const token = sessionStorage.getItem('auth_token');
        if (token) {
            try {
                const decoded = jwtDecode<UserType>(token);
                setUser(decoded);
            } catch (error) {
                console.error('Failed to decode token:', error);
                sessionStorage.removeItem('auth_token');
            }
        }
    }, []);



    return (
        <AuthContext.Provider value={{ setUser, user }}>
            {children}
        </AuthContext.Provider>
    );
};

export function useUser() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}

export default AuthProvider;