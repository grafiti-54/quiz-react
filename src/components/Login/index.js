import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { FirebaseContext } from "../Firebase";
import { useNavigate } from "react-router-dom"; //pour pouvoir utiliser la navigation entre les pages

const Login = () => {

  //recuperation des methodes de firebase pour s'inscrire se connecter et se deconnecter
  const firebase = useContext(FirebaseContext);

  //initialisation de la variable pour la redirection lorsque le formulaire
  const navigate = useNavigate();

  // contrairement au formulaire d'inscription ici pour l'exemple utilisation de varaible pour récupérer les informations du formulaire
  // les valeurs doivent correspondre aux value des inputs du formulaire
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //gestion de l'affichage du bouton de connexion si false le bouton est désactivé
  const [btn, setBtn] = useState(false);

  //gestion de l'affichage du message d'erreur
  const [error, setError] = useState("");

  //le tableau [password, email] indique que la fonction sera appelée une seule fois au chargement de la page
  useEffect(() => {
    if(password.length > 5 && email !== ''){
      setBtn(true);
    } else if (btn ===true) {
      setBtn(false);
    }
  }, [password, email, btn]);

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(email, password);
    //ici on va utiliser la methode signinUser de firebase pour se connecter
    firebase.loginUser(email, password)
    .then(user => {
      //console.log(user);
      //firebase a verifier dans la base de données si l'utilisateur existe et si le mot de passe est correct
      //ici la connection est réussie
      //on vide les variables email et password pour les nettoyer
      setEmail("");
      setPassword("");
      //redirection vers la page souhaité
      navigate("/welcome");  
    })
    .catch(error => {
      //on affiche l'erreur a l'utilisateur
      setError(error);
      //on vide les variables email et password pour les nettoyer
      setEmail("");
      setPassword("");
    })
  }


  //!voir onChange dans le formulaire d'inscription
  // const handleEmail = (e) => {
  //   //recuperation de la value de l'input email
  //   setEmail(e.target.value);
  // }


  return (
    <div className="signUpLoginBox">
      <div className="slContainer">
        <div className="formBoxLeftLogin"></div>
        <div className="formBoxRight">
          <div className="formContent">

           {error !=='' && <span>{error.message}</span>}
           

            <h2>Connexion</h2>
            <form onSubmit={handleSubmit}>
              <div className="inputBox">
                <input
                  onChange={e => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  autoComplete="off"
                  required
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="inputBox">
                <input
                  onChange={e => setPassword(e.target.value)}
                  value={password}
                  type="password"
                  autoComplete="off"
                  required
                />
                <label htmlFor="password">Mot de passe</label>
              </div>

              { btn ? <button>Connexion</button> : <button disabled>Connexion</button> }

            </form>
            <div className="linkContainer">
              <Link to="/signup" className="simpleLink">
                <pre>Nouveau sur Marvel quiz ?  Inscrivez-vous maintenant! </pre>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
