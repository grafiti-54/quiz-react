//gestion lors de la fin de serie de question selon le niveau de difficulté
//import { Fragment } from "react";
import React, { Fragment, useEffect, useState } from "react";
import { GiTrophyCup } from "react-icons/gi";

//dans un component de ,pe function on ne peut pas envoyer de props directement il faut passer par un forwardRef
const QuizOver = React.forwardRef((props, ref) => {
  //console.log(props);
  //console.log(ref);
  //recuperations des props passées dans le component quiz : return !this.state.quizEnd ?
  const { levelNames, score, maxQuestions, quizLevel, percent, loadLevelQuestions } = props;

  const [asked, setAsked] = useState([]);
  //console.log(asked);

  //useEffect va jouer le role de componentDidMount et componentDidUpdate
  //recupération de toute les questions et des options
  useEffect(() => {
    setAsked(ref.current);
  }, [ref]);

  //gestions des différents cas de figure selon le score obtenu par l'utilisateur sur le quiz

  //variable permettant de recupérer la moyne de score obtenu par l'utilisateur sur le quiz
  const averageGrade = maxQuestions / 2;

  //gestion du cas ou l'utiisateur n'obttient pas la moyenne au quiz 
  if(score < averageGrade) {
      //setTimeout (() => loadLevelQuestions(0), 5000); //on attend 5 secondes avant de recharger sur la page de niveau 0
      setTimeout (() => loadLevelQuestions(quizLevel), 5000); //on attend 5 secondes avant de recharger sur la page au niveau du quiz ou l'echec est survenu
  }


  //cas de figure 1 : si le score est superieur ou egal a 50%
  const decision =
    score >= averageGrade ? (
      <Fragment>
        <div className="stepsBtnContainer">
          {
            // on as obtenue la moyenne sur le quiz mais il reste des questions à faire (niveau de difficulté supérieur)
            quizLevel < levelNames.length ? (
              <Fragment>
                <p className="successMsg">Bravo, passez au niveau suivant!</p>
                <button 
                    className="btnResult success"
                    onClick={() => loadLevelQuestions(quizLevel)}
                    >
                    Niveau Suivant
                </button>
              </Fragment>
            ) : (
              //cas de figure 2 : on a obtenue la moyenne sur le quiz et il n'y a pas de niveau de difficulté supérieur
              <Fragment>
                <p className="successMsg"> <GiTrophyCup size='50px' /> Bravo, vous êtes un expert !</p>
                <button 
                    className="btnResult success gameOver"
                    onClick={() => loadLevelQuestions(0) // on recharge le 1er niveau de difficulté du quiz
                    }
                    >
                    Accueil
                </button>
              </Fragment>
            )
            //div d'affihage du pourcentage de reussite et du score obtenu par rapport au nombre de question
          }
        </div>
        <div className="percentage">
          <div className="progressPercent">Réussite: {percent} %</div>
          <div className="progressPercent">
            Note: {score}/{maxQuestions}
          </div>
        </div>
      </Fragment>
    ) : (
      //cas de figure 2 : si le score est inferieur a 50% l'utilisateur n'as pas accès au niveau supérieur du quiz
      <Fragment>
        <div className="stepsBtnContainer">
          <p className="failureMsg">Vous avez échoué !</p>
        </div>

        <div className="percentage">
          <div className="progressPercent">Réussite: {percent} %</div>
          <div className="progressPercent">
            Note: {score}/{maxQuestions}
          </div>
        </div>
      </Fragment>
    );

  //si le score est superieur ou egal a 50% on affiche la liste des bonnes réponses a l'utilisateur
  const questionAnswer =
    score >= averageGrade ? (
      //boucle permettant de recupérer les questions et les reponses
      asked.map((question) => {
        return (
          <tr key={question.id}>
            <td>{question.question}</td>
            <td>{question.answer}</td>
            <td>
              {" "}
              <button className="btnInfo">Info</button>
            </td>
          </tr>
        );
      })
    ) : (
      //si le score est inférieur a 50% on n'affiche pas la liste des bonnes réponses
      <tr>
        <td colSpan="3">
            <div className="loader"></div>
          <p style={{ textAlign: 'center', color: 'red'}}> Pas de réponses !</p>
        </td>
      </tr>
    );

  return (
    <Fragment>
      {decision}

      <hr />
      <p>Les réponses aux questions posées :</p>
      <div className="answerContainer">
        <table className="answers">
          <thead>
            <tr>
              <th>Question</th>
              <th>Réponse</th>
              <th>Infos</th>
            </tr>
          </thead>
          <tbody>{questionAnswer}</tbody>
        </table>
      </div>
    </Fragment>
  );
});

export default React.memo(QuizOver); // on utilise memo pour ne pas re-rendre le component si les props sont identiques
