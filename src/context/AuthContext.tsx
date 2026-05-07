import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login, AuthUser } from '../services/AuthService';
interface AuthContextType {
    isAuthenticated: boolean;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
    user: AuthUser | null;
    loginError: string | null;
    loginLoading: boolean;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<AuthUser | null>(null);
    const [loginError, setLoginError] = useState<string | null>(null);
    const [loginLoading, setLoginLoading] = useState(false);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        loadSession();
    }, []);

    const loadSession = async () => {
        try {
            const savedUser = await AsyncStorage.getItem('authUser');
            if (savedUser) {
                const parsed = JSON.parse(savedUser);
                setUser(parsed);
                setIsAuthenticated(true);
            }
        } catch (e) {
            console.error('Error loading session:', e);
        } finally {
            setLoaded(true);
        }
    };

    const doLogin = async (username: string, password: string): Promise<boolean> => {
        setLoginLoading(true);
        setLoginError(null);
        try {
            const loggedUser = await login({ username, password });
            setUser(loggedUser);
            setIsAuthenticated(true);
            await AsyncStorage.setItem('authUser', JSON.stringify(loggedUser));
            setLoginLoading(false);
            return true;
        } catch (e: any) {
            setLoginError(e.message || 'Error de conexión. Intenta de nuevo.');
            setLoginLoading(false);
            return false;
        }
    };

    const logout = async () => {
        setIsAuthenticated(false);
        setUser(null);
        setLoginError(null);
        try {
            await AsyncStorage.removeItem('authUser');
        } catch (e) {
            console.error('Error clearing session:', e);
        }
    };

    if (!loaded) return null;

    return (
        <AuthContext.Provider value={{ isAuthenticated, login: doLogin, logout, user, loginError, loginLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
};
