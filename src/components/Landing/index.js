import React, { useRef, useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  //gestion de l'affichage des boutons de connection et d'inscription 1/2
  //useState : variable d'état
  const [btn, setBtn] = useState(false);
  // console.log(btn);

  const refWolverine = useRef(null);

  //fonction qui s'execute seulement au moment du montage du composant ( [])
  useEffect(() => {
    //console.log("je suis dans le useEffect");
    //va faire apparaitre les griffes de wolverine en ajoutant une classe du css a celle deja presente dans le dom
    refWolverine.current.classList.add("startingImg");

    //on retire les griffes après 1 secondes
    setTimeout(() => {
      refWolverine.current.classList.remove("startingImg");
      setBtn(true);
    }, 1000);
  }, []);

  //gestion de l'affichage de la griffe de wolverine du coté gauche lorsque l'on survole le bouton d'inscription
  const setLeftImg = () => {
    //console.log('je suis dans setLeftImg');
    refWolverine.current.classList.add("leftImg");
  }

  //gestion de l'affichage de la griffe de wolverine du coté droit lorsque l'on survole le bouton connexion
  const setRightImg = () => {
    refWolverine.current.classList.add("rightImg");
  }

  // gestion de la suppression de la griffe coté droit et gauche lorsque l'on quitte le bouton d'inscription ou de connexion
  const clearImg = () => {
    //si la griffe est deja presente dans le dom
    if(refWolverine.current.classList.contains("leftImg")){
      //lorsque l'on sort du champ du bouton d'inscription on retire la classe leftImg
      refWolverine.current.classList.remove("leftImg");
      //meme chose pour le bouton de connexion
    } else if (refWolverine.current.classList.contains("rightImg")){
      refWolverine.current.classList.remove("rightImg");
    }
  }

  //gestion de l'affichage des boutons de connection et d'inscription 2/2
  //btn && correspond à lorsque btn est true : on affiche les boutons
  //Fragement permet d'eviter de surcharger le dom avec des nodes inutiles
  //dans le link to indiquer le chemin de la page (uri) donnée dans le lien (href) dans app.js
  const displayBtn = btn && (
    <Fragment>
      <div onMouseOver={setLeftImg} onMouseOut={clearImg} className="leftBox">
        <Link to="/signup" className="btn-welcome">Inscription</Link>
      </div>
      <div onMouseOver={setRightImg} onMouseOut={clearImg} className="rightBox">
        <Link to="/login" className="btn-welcome">Connexion</Link>
      </div>
    </Fragment>
  );

  return (
    <main ref={refWolverine} className="welcomePage">
      {displayBtn}
    </main>
  );
};

export default Landing;
