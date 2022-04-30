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

  //initialisation de la variable pour la redirection lorsque le formulaire
  const navigate = useNavigate();

  useEffect(() => {
    //verification de la session de l'utilisateur
    let listener = firebase.auth.onAuthStateChanged(user => {
      user ? setUserSession(user) : navigate("/"); //redirection vers la page souhaité si l'utilisateur n'est pas identifié
    })
    return () => {
      listener()
    };
  }, []);

  return userSession === null ? (
    <Fragment>
      <div className="loader"></div>
      <p className="loaderText">Loading ... </p>
    </Fragment>
  ) : (
    <div className="quiz-bg">
      <div className="container">
        <Logout />
        <Quiz />
      </div>
    </div>
  );
};

export default Welcome;
