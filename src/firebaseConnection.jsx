import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'



const firebaseConfig = {
    apiKey: "AIzaSyDV-yc8t0ziVROc7Lm7WU2qSeVCihmCqgw",
    authDomain: "curso-c6ca3.firebaseapp.com",
    projectId: "curso-c6ca3",
    storageBucket: "curso-c6ca3.firebasestorage.app",
    messagingSenderId: "729263326408",
    appId: "1:729263326408:web:86e6a6c3243c12c26211fd",
    measurementId: "G-2EY5G861W1"
  };


  const firebaseApp = initializeApp(firebaseConfig);


  const db = getFirestore(firebaseApp);
  const auth = getAuth(firebaseApp);

  export {db, auth} ;