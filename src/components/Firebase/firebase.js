import app from 'firebase/compat/app';

//import * as firebase from 'firebase'
import 'firebase/compat/auth'; // authentification de firebase
import 'firebase/compat/firestore'; // base de données



const config = {
    apiKey: "AIzaSyDB8FkqQo_lHKORHhDjTkMpdgmBcZqyTiM",
    authDomain: "marvel-quiz-f534c.firebaseapp.com",
    projectId: "marvel-quiz-f534c",
    storageBucket: "marvel-quiz-f534c.appspot.com",
    messagingSenderId: "462058194446",
    appId: "1:462058194446:web:9cee6e20e8bbdcb49c9e5f"
  };

  class Firebase {
    constructor() {
        app.initializeApp(config);
        this.auth = app.auth(); // authentification de firebase
        this.db = app.firestore() // base de données de firebase
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
    passwordReset = email => this.auth.sendPasswordResetEmail(email); 
    

    // firestore recupération des données id de l'utilisateur
    user = uid => this.db.doc(`users/${uid}`);
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
