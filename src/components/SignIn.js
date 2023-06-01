import { useEffect, useState } from "react";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

import { getUserName, getProfilePicUrl } from "../Firebase";

export default function SignIn({ setFavorites }) {
  const [user, setUser] = useState(null);

  async function getUserFavorites(userName) {
    const querySnapshot = await getDocs(
      query(
        collection(getFirestore(), "user-favorites"),
        where("name", "==", userName)
      )
    );
    // return stockName
    return querySnapshot.docs.map((doc) => doc.data().stockName);
  }

  const handleFavorites = async () => {
    const userFavoriteList = await getUserFavorites(getUserName());
    setFavorites(userFavoriteList);
  };
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
  };

  return (
    <div className="sign-in">
      {user ? (
        <>
          <div className="user-info">
            <img src={getProfilePicUrl()} />
            <div>{getUserName()}</div>
          </div>

          <button onClick={handleSignOut}>SIGN OUT</button>
        </>
      ) : (
        <button onClick={handleSignIn}>SIGN IN</button>
      )}
    </div>
  );
}
