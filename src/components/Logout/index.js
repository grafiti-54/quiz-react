import React, { useEffect, useState, useContext } from "react";
import { FirebaseContext } from "../Firebase";
import { useNavigate } from "react-router-dom"; //pour pouvoir utiliser la navigation entre les pages

const Logout = () => {

  //recuperation des methodes de firebase pour s'inscrire se connecter et se deconnecter
  const firebase = useContext(FirebaseContext);

  //gestion du bouton de deconnexion
  const [checked, setChecked] = useState(false);
  //console.log(checked);

  //initialisation de la variable pour la redirection lorsque le formulaire
  const navigate = useNavigate();

  useEffect(() => {
    if (checked === true) {
      console.log("deconnexion");
      firebase.signoutUser();
      navigate("/login"); //redirection vers la page souhaité
    }
  }, [checked, firebase]);

  const handleChange = (event) => {
    //console.log(event.target.checked);
    setChecked(event.target.checked);
  };

  return (
    <div className="logoutContainer">
      <label className="switch">
        <input onChange={handleChange} type="checkbox" checked={checked} />
        <span className="slider round"></span>
      </label>
    </div>
  );
};

export default Logout;
