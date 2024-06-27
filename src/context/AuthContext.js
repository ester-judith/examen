import { createContext, useEffect, useState } from 'react';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged 
} from 'firebase/auth';
import { authApp } from '../config/firebase';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const register = (email, password) => {
        return createUserWithEmailAndPassword(authApp, email, password);
    };

    const login = (email, password) => {
        return signInWithEmailAndPassword(authApp, email, password);
    };

    const logout = () => {
        return signOut(authApp);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(authApp, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    return (
        <AuthContext.Provider value={{currentUser, register, login, logout}}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
