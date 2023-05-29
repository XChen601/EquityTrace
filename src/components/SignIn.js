import { useEffect, useState } from "react";
import {
    getAuth,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
} from 'firebase/auth';
import {
    getFirestore,
    collection,
    addDoc,
    query,
    orderBy,
    limit,
    onSnapshot,
    setDoc,
    updateDoc,
    doc,
    where,
    getDoc,
    serverTimestamp,
    getDocs,
  } from 'firebase/firestore';

import { getUserName } from "../Firebase";

export default function SignIn({setFavorites}) {
    const [user, setUser] = useState(null)

    async function getUserFavorites(userName) {
        const querySnapshot = await getDocs(query(collection(getFirestore(), 'user-favorites'), where('name', '==', userName)));
        // return stockName
        return querySnapshot.docs.map(doc => doc.data().stockName);
    }

    const handleFavorites = async () => {
        const userFavoriteList = await getUserFavorites(getUserName());
        setFavorites(userFavoriteList);
    }
    useEffect(() => {
        // Check if user is signed in on component mount
        const auth = getAuth();
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
            if (user) {
                handleFavorites();
              } else {
                setFavorites([]);
              }
        });

        // Clean up the subscription on component unmount
        return () => unsubscribe();
    }, []);
        
    const handleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(getAuth(), provider);
        const userFavoriteList = await getUserFavorites(getUserName());
        setFavorites(userFavoriteList);
    };
    
    const handleSignOut = () => {
        signOut(getAuth());
        setFavorites([]);
        console.log('signed out')
        console.log(getUserName())
    };

    return (
        <div className="sign-in">
            {user ? (
                <>
                    <div>{getUserName()}</div>
                    <button onClick={handleSignOut}>Sign Out</button>
                </>
                
            ) : (
                <button onClick={handleSignIn}>Sign In</button>
            )}
        </div>
    )
}