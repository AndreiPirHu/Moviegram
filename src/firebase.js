import { initializeApp } from 'firebase/app';
import { getFirestore, doc, collection, addDoc, query, getDocs, setDoc } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword} from 'firebase/auth';



const firebaseConfig = {
  apiKey: "AIzaSyAwffaq4AsACKNfp_0DWXS-dNOcj8wQTc4",
  authDomain: "moviegram-884cc.firebaseapp.com",
  projectId: "moviegram-884cc",
  storageBucket: "moviegram-884cc.appspot.com",
  messagingSenderId: "548929251026",
  appId: "1:548929251026:web:9410da7618ef0bc738ef0b"
};


// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Get a reference to the Firestore database
const db = getFirestore(app);

// Get a reference to the Firebase authentication service
const auth = getAuth(app);



export { db, auth, signInWithEmailAndPassword, doc, collection, addDoc, query, getDocs, setDoc};