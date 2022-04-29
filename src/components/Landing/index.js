import React, { useRef, useEffect, useState, Fragment } from "react";

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

  //gestion de l'affichage des boutons de connection et d'inscription 2/2
  //btn && correspond à lorsque btn est true : on affiche les boutons
  //Fragement permet d'eviter de surcharger le dom avec des nodes inutiles
  const displayBtn = btn && (
    <Fragment>
      <div className="leftBox">
        <button className="btn-welcome">Inscription</button>
      </div>
      <div className="rightBox">
        <button className="btn-welcome">Connexion</button>
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
