import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@/components/auth-provider';
import { authApi } from '@/lib/login';

export function useAuth() {
    const router = useRouter();
    const { user, setUser } = useUser();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = () => {
            const token = sessionStorage.getItem('auth_token');
            const isAuth = !!token;
            setIsAuthenticated(!!token);

            if (isAuth && !user) {
                // If we have a token but no user, try to decode the token
                const currentUser = authApi.getCurrentUser();
                if (currentUser) {
                    setUser(currentUser);
                } else {
                    // Invalid token
                    sessionStorage.removeItem('auth_token');
                    setIsAuthenticated(false);
                }
            }
            setIsLoading(false);

            if (!token && !router.pathname.startsWith('/auth')) {
                router.push('/auth');
            }
        };

        checkAuth();
    }, [router]);

    return { isAuthenticated, isLoading };
}