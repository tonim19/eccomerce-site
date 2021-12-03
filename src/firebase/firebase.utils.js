// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2IvGfb2uqSVw1w_SBbNg6Y23vC9sZd4Q",
  authDomain: "ecommerce-db-113ea.firebaseapp.com",
  databaseURL:
    "https://ecommerce-db-113ea-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "ecommerce-db-113ea",
  storageBucket: "ecommerce-db-113ea.appspot.com",
  messagingSenderId: "372840109922",
  appId: "1:372840109922:web:6d1739c7cd0e4cd0ac3e3b",
};

export const createUserProfileDocument = async (user, additionalData) => {
  if (!user) return;

  try {
    const userRef = doc(db, `users/${user.uid}`);
    const docSnap = await getDoc(userRef);
    if (!docSnap.exists()) {
      const { displayName, email } = user;
      const createdAt = new Date();
      try {
        await setDoc(userRef, {
          displayName,
          email,
          createdAt,
          ...additionalData,
        });
      } catch (error) {
        console.log("error creating user", error.message);
      }
    }
    return userRef;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);
  objectsToAdd.forEach((obj) => {
    const newDocRef = doc(collectionRef);
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();

export const auth = getAuth();

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      GoogleAuthProvider.credentialFromResult(result);
    })
    .catch((error) => {
      console.log(error);
    });
};
