import { getFirebaseConfig } from "./Firebase.config";
import { initializeApp } from 'firebase/app';
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
  deleteDoc,
  where,
  getDocs,
  serverTimestamp,
} from 'firebase/firestore';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { getPerformance } from 'firebase/performance';


async function signIn() {
    // Sign in Firebase using popup auth and Google as the identity provider.
    var provider = new GoogleAuthProvider();
    await signInWithPopup(getAuth(), provider);
  }
  

function signOutUser() {
    // Sign out of Firebase.
    signOut(getAuth());
}

  // Returns the signed-in user's profile Pic URL.
function getProfilePicUrl() {
    return getAuth().currentUser.photoURL || '/images/profile_placeholder.png';
  }
  
  // Returns the signed-in user's display name.
function getUserName() {
    return getAuth().currentUser.displayName;
}
  
// Returns true if a user is signed-in.
function isUserSignedIn() {
    return !!getAuth().currentUser;
}

async function addToDatabase(stockName, stockPrice) {
    const querySnapshot = await getDocs(query(collection(getFirestore(), 'user-favorites'), where('name', '==', getUserName()), where('stockName', '==', stockName)));
    // Add a new message entry to the Firebase database.
    if (!querySnapshot.empty) {
        console.log('Document already exists');
        // Document with the same name and stockName combination already exists
        return;
    }
    try {
        await addDoc(collection(getFirestore(), 'user-favorites'), {
            name: getUserName(),
            stockName: stockName,
            stockPrice: stockPrice,
            timestamp: serverTimestamp()
        });
    }
    catch(error) {
      console.error('Error writing new message to Firebase Database', error);
    }
}

async function deleteFromDatabase(stockName) {
    const querySnapshot = await getDocs(query(collection(getFirestore(), 'user-favorites'), where('name', '==', getUserName()), where('stockName', '==', stockName)));
    // Add a new message entry to the Firebase database.
    if (querySnapshot.empty) {
        console.log('Document does not exist');
        // Document with the same name and stockName combination already exists
        return;
    }
    querySnapshot.forEach((doc) => {
        deleteDoc(doc.ref);
    });
}

async function getUserFavorites(userName) {
    const querySnapshot = await getDocs(query(collection(getFirestore(), 'user-favorites'), where('name', '==', userName)));
    // return stockName
    return querySnapshot.docs.map(doc => doc.data().stockName);
}

const firebaseAppConfig = getFirebaseConfig();
initializeApp(firebaseAppConfig);

export {signIn, signOutUser, getProfilePicUrl, getUserName, isUserSignedIn, addToDatabase, deleteFromDatabase,
    getUserFavorites}