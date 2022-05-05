import app from "firebase/compat/app";

//import * as firebase from 'firebase'
import "firebase/compat/auth"; // authentification de firebase
import "firebase/compat/firestore"; // base de données

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth(); // authentification de firebase
    this.db = app.firestore(); // base de données de firebase
  }

  // inscription
  signupUser = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  // Connexion
  loginUser = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  // Déconnexion
  signoutUser = () => this.auth.signOut();

  // Récupérer le mot de passe
  passwordReset = (email) => this.auth.sendPasswordResetEmail(email);

  // firestore recupération des données id de l'utilisateur
  user = (uid) => this.db.doc(`users/${uid}`);
}

export default Firebase;

// class Firebase {
//     constructor() {
//         app.initializeApp(config);
//     }
//     //inscription
// signupUser = (email, password) =>
// auth.createUserWithEmailAndPassword(email, password);

// //connexion
// loginUser = (email, password) =>
// auth.signInWithEmailAndPassword(email, password);

// //deconnexion
// logoutUser = () => this.auth.signOut();
// }
