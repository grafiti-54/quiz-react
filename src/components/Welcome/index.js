import React, { useState, Fragment, useContext, useEffect } from "react";
import { FirebaseContext } from "../Firebase";
import { useNavigate } from "react-router-dom"; //pour pouvoir utiliser la navigation entre les pages
import Logout from "../Logout";
import Quiz from "../Quiz";

const Welcome = () => {
  //recuperation des methodes de firebase pour s'inscrire se connecter et se deconnecter
  const firebase = useContext(FirebaseContext);

  //gestion de l'acces de l'utilisateur a la page uniquement si il est connecté
  const [userSession, setUserSession] = useState(null);

  //recupération des informations de l'utilisateur
  const [userData, setUserData] = useState({});

  //initialisation de la variable pour la redirection lorsque le formulaire
  const navigate = useNavigate();

  useEffect(() => {
    //verification de la session de l'utilisateur
    let listener = firebase.auth.onAuthStateChanged((user) => {
      user ? setUserSession(user) : navigate("/"); //redirection vers la page souhaité si l'utilisateur n'est pas identifié
    });

    //condition pour recuperer les données de l'utilisateur
    //on ne recupere les données de l'utilisateur que si il est connecté
    if (userSession !== null) {
      //recuperation des données de l'utilisateur
      firebase
        .user(userSession.uid)
        .get()
        .then((doc) => {
          if (doc && doc.exists) {
            const myData = doc.data();
            setUserData(myData);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }

    return () => {
      listener();
    };
  }, [userSession]);

  return userSession === null ? (
    <Fragment>
      <div className="loader"></div>
      <p className="loaderText">Loading ... </p>
    </Fragment>
  ) : (
    <div className="quiz-bg">
      <div className="container">
        <Logout />
        <Quiz userData={userData} />
      </div>
    </div>
  );
};

export default Welcome;
