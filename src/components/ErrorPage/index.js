import React from "react";
import batman from "../../images/batman.png"//batman sera le nom a utiliser dans la source de l'image

//en css in-line les - sont supprimés et la 1er lettre du mot suivant est en majuscule 
//(ex: background-color) devient backgroundColor
const centerH2 = {
  textAlign: "center",
  marginTop: "50px",
}

const centerImg ={
  display: "block",
  margin: "40px auto",
}

const ErrorPage = () => {
  return (
    <div className="quiz-bg">
      <div className="container">
      <h2 style={centerH2}>Oups, la page n'existe pas</h2>
      <img style={centerImg} src={batman} alt="error-page" />
      </div>
    </div>
  );
};

export default ErrorPage;
