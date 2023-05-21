import React, { createContext, useState } from 'react';
import Login from '../pages/login';
import { useCookies } from 'react-cookie';
import { ApiHelper } from '../utils/api-helper';
import useAPI from '../hooks/useAPI';

interface Props {
    children: any | any[]
}

interface User {
    key: string
    name: string
}

interface AuthContextType {
    loggedIn: boolean
    user: User | null
    handleLogin: (apiKey: string) => Promise<boolean>
    handleLogout: () => void
}

export const AuthContext = createContext<AuthContextType>({
    loggedIn: false,
    user: null,
    handleLogin: () => Promise.resolve(false),
    handleLogout: () => { },
});

export const AuthProvider: React.FC<Props> = ({ children }: Props) => {
    const { callAPI } = useAPI(null)
    const [cookies, setCookie, removeCookie] = useCookies(['API_KEY'])
    const [user, setUser] = useState<any | null>(cookies?.API_KEY ? cookies.API_KEY : null)
    const [loggedIn, setLoggedIn] = useState<boolean>(cookies.API_KEY !== undefined)

    const handleLogin = async (apiKey: string): Promise<boolean> => {
        const res = await callAPI(ApiHelper.status, apiKey)
        const success = res?.response?.subscription?.active !== undefined && res?.response?.subscription?.active
        if (success) {
            const name = res?.response?.account?.firstname + ' ' + res?.response?.account?.lastname
            const user = {
                key: apiKey,
                name: name
            }
            setCookie('API_KEY', user, { path: '/' })
            setUser(user)
            setLoggedIn(true)
        }
        return success
    };

    const handleLogout = () => {
        removeCookie('API_KEY', { path: '/' });
        setLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ loggedIn, user, handleLogin, handleLogout }}>
            {loggedIn ? (
                <>{children}</>
            ) : (
                <Login />
            )}
        </AuthContext.Provider>
    );
};
