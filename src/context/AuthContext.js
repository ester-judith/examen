import { createContext, useEffect, useState } from 'react';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged 
} from 'firebase/auth';
import { authApp, firestore } from '../config/firebase';
import { doc, deleteDoc, updateDoc, getDoc } from 'firebase/firestore';

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

    const bidAuction = (itemId, curPrice) => {
        console.log(`Bidding on item ${itemId} with current price ${curPrice}`)
    };

    const endAuction = async (itemId) => {
        console.log(`Ending auction for item ${itemId}`);
        try {
            const auctionDoc = doc(firestore, 'auctions', itemId);
            await deleteDoc(auctionDoc);
        } catch (error) {
            console.error('Error ending auction:', error);
        }
    };

    const increaseBid = async (auctionId, increment) => {
        try {
            const auctionRef = doc(firestore, 'auctions', auctionId);
            const auctionSnap = await getDoc(auctionRef);
            if (auctionSnap.exists()) {
                const newPrice = auctionSnap.data().curPrice + increment;
                await updateDoc(auctionRef, {
                    curPrice: newPrice
                });
            } else {
                console.log("No such document!");
            }
        } catch (error) {
            console.error('Error increasing bid:', error);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(authApp, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    return (
        <AuthContext.Provider value={{currentUser, register, login, logout, bidAuction, endAuction, increaseBid}}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
