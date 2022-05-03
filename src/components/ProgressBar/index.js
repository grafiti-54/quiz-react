//gestion de la barre de progeresion des questions dans le quiz
import React, { Fragment } from "react";
//recupération des props renvoyé par le parent dans le component Quiz
const ProgressBar = ({idQuestion, maxQuestions}) => {
  //console.log(idQuestion, maxQuestions);

  //calcul du pourcentage de la progression de la barre de progression
  const getWidth = (totalQuestions, questionId) => {
    return (100 / totalQuestions) * questionId;
  }
  const actualQuestion = idQuestion + 1;
  const progressPercent = getWidth(maxQuestions, actualQuestion);
  //console.log(progressPercent);


  return (
    <Fragment>
      <div className="percentage">
        <div className="progressPercent"> {`Question: ${idQuestion + 1} / ${maxQuestions}`}</div>
        <div className="progressPercent">{`Progression : ${progressPercent}% `}</div>
      </div>
      <div className="progressBar">
        <div className="progressBarChange" style={{width: `${progressPercent}% ` }}></div>
      </div>
    </Fragment>
  );
};

export default React.memo(ProgressBar); // react.memo permet de ne pas re-rendre le component si les props sont identiques
