import React, { useState, useContext } from "react";
import {Link} from 'react-router-dom';
import { FirebaseContext } from '../Firebase'; 
import {useNavigate} from "react-router-dom" //pour pouvoir utiliser la navigation entre les pages

const Signup = () => {

  //initialisation de la variable pour la redirection lorsque le formulaire
  const navigate = useNavigate();

  //recuperation des methodes de firebase pour s'inscrire se connecter et se deconnecter
  const firebase = useContext(FirebaseContext);
  //console.log(firebase);

  //recuperation des données du formulaire via onChange dans les inputs du formulaire
  const data = {
    pseudo: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [loginData, setloginData] = useState(data);
  //console.log(loginData);

  const handleChange = (e) => {
    setloginData({...loginData, [e.target.id]: e.target.value});
  };

  //liste des value 'onChange' que l'on va recuperer
  const { pseudo, email, password, confirmPassword } = loginData;

  //verification des données du formulaire
  const btn = pseudo === ''|| email ==='' || password === '' || password !== confirmPassword 
  ? <button disabled> Inscription </button> : <button> Inscription </button>

  //function lors de la validation du formulaire
  const handleSubmit = (e) => {
    e.preventDefault(); // on empeche le rechargement de la page
    const  { email, password, pseudo } = loginData; //destructuration des données que l'on souhaite recuperer du formulaire
    firebase.signupUser(email, password) // recupération des données du formulaire depuis la variable data
    //recupération des données du formulaire pour creer un utilisateur dans la base de données de firebase
    .then(authUser => {
      return firebase.user(authUser.user.uid).set({
        pseudo: pseudo,
        email: email,
      }) //recuperation de l'id de l'utilisateur
    })
    .then(() => {
      //ici l'inscription est réussie
      setloginData({...data}); // on réinitialise les données du formulaire pour les vider
      //redirection vers la page souhaité 
      navigate("/welcome"); 
      
    })
    .catch(error => {
      setError(error)
      setloginData({...data}); // on réinitialise les données du formulaire pour les vider
    })
  }

  //gestion des messages d'erreur renvoyés a l'utilisateur en cas de mauvaise saisie
  const [error, setError] = useState('')

  const errorMsg =  error !== '' && <span>{error.message}</span>

  return (
    <div className="signUpLoginBox">
      <div className="slContainer">
        <div className="formBoxLeftSignup"></div>
        <div className="formBoxRight">
          <div className="formContent">
            {errorMsg}
            <h2>Inscription</h2>
            <form onSubmit={handleSubmit}>
              <div className="inputBox">
                <input
                  onChange={handleChange}
                  value={pseudo}
                  type="text"
                  id="pseudo"
                  autoComplete="off"
                  required
                />
                <label htmlFor="pseudo">Pseudo</label>
              </div>
              <div className="inputBox">
                <input
                  onChange={handleChange}
                  value={email}
                  type="email"
                  id="email"
                  autoComplete="off"
                  required
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="inputBox">
                <input
                  onChange={handleChange}
                  value={password}
                  type="password"
                  id="password"
                  autoComplete="off"
                  required
                />
                <label htmlFor="password">Mot de passe</label>
              </div>
              <div className="inputBox">
                <input
                  onChange={handleChange}
                  value={confirmPassword}
                  type="password"
                  id="confirmPassword"
                  autoComplete="off"
                  required
                />
                <label htmlFor="confirmPassword">
                  Confirmer le mot de passe
                </label>
              </div>

              {btn}
            </form>
            <div className="linkContainer">
              <Link to="/login" className="simpleLink">Déjà inscrit? Connectez-vous.</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
