//gestion lors de la fin de serie de question selon le niveau de difficulté
//import { Fragment } from "react";
import React, { Fragment, useEffect, useState } from "react";
import { GiTrophyCup } from "react-icons/gi";
import Loader from "../Loader";
import Modal from "../Modal"; // modal d'informations sur les infos aux reponses du quiz
import Axios from "axios"; // module pour faire des requetes http pour les api
import axios from "axios";

//dans un component de ,pe function on ne peut pas envoyer de props directement il faut passer par un forwardRef
const QuizOver = React.forwardRef((props, ref) => {
  //console.log(props);
  //console.log(ref);
  //recuperations des props passées dans le component quiz : return !this.state.quizEnd ?
  const {
    levelNames,
    score,
    maxQuestions,
    quizLevel,
    percent,
    loadLevelQuestions,
  } = props;

  const API_PUBLIC_KEY = process.env.REACT_APP_MARVEL_API_KEY;
  //test recupération des données renvoyées par l'API
  console.log(API_PUBLIC_KEY);

  // const hash = 'db3b82ddadf3b1ed43eaa13dcb87676f'
  const hash = "f66990bf045030b3fe9f720694db430a";

  const [asked, setAsked] = useState([]);
  //gestion de l'ouverte du modal
  const [openModal, setOpenModal] = useState(false);

  //variable d'etat permettant de recupérer les informations renvoyées par l'API sur les personnages(characters)
  const [characterInfos, setCharacterInfos] = useState([]);

  //variable d'etat pour charger les données renvoyées par l'API true = en cours de cargement (on affihe pas encore les données)
  const [loading, setLoading] = useState(true);

  //useEffect va jouer le role de componentDidMount et componentDidUpdate
  //recupération de toute les questions et des options
  useEffect(() => {
    setAsked(ref.current);
    //verifiacation au moment du montage du composent pour remettre a jour les données de l'API tout les 15 jours
    //recupereration de la date
    if (localStorage.getItem("marvelStorageDate")) {
      const date = localStorage.getItem("marvelStorageDate");
      checkDataAge(date);
    }
  }, [ref]);

  //fonction qui va verifier la date de derniere mise a jour des données
  const checkDataAge = (date) => {
    const today = Date.now; // recupération de la date du jour
    const timeDifference = today - date; //différence entre la date du jour et la date de derniere mise a jour

    const daysDifference = timeDifference / (1000 * 3600 * 24); //conversion en jour
    //si les données sont plus anciennes que 15 jours on les met a jour
    if (daysDifference > 15) {
      localStorage.clear(); // on vide le localStorage
      localStorage.setItem("marvelStorageDate", today); // on met a jour la date de la nouvelle mise a jour
    }
  };

  // gestions des informations dans la modal lors du clic sur le bouton info a la fin du quiz
  //id relative au personnage en question dans la question
  const showModal = (id) => {
    setOpenModal(true);
    //si les information sont déjà chargées dans le localstorageon on ne fait pas appel à l'api
    if (localStorage.getItem(id)) {
      setCharacterInfos(JSON.parse(localStorage.getItem(id))); // recupérations des données du localstorage
      setLoading(false); // on charge les données
    } else {
      //si les information ne sont pas déjà chargées dans le localstorage on fait appel à l'api
      //recuperation des informations grace a l'api (url hhtp request)
      axios
        .get(
          `https://gateway.marvel.com/v1/public/characters/${id}?ts=1&apikey=${API_PUBLIC_KEY}&hash=${hash}`
        )
        //https://gateway.marvel.com/v1/public/characters/${id}?ts=1&apikey=${API_PUBLIC_KEY}&hash=${hash}
        .then((response) => {
          //console.log(response);
          //on stock la data de l'api dans la variable characterInfos
          setCharacterInfos(response.data); // .data est l'objet renvoyé par l'api
          setLoading(false);
          //sauvegadge de la data dans le local storage (copie de l'objet)
          localStorage.setItem(id, JSON.stringify(response.data));
          //ajout de la date de la sauvegarde dans le local storage
          if (!localStorage.getItem("marvelStorageDate")) {
            // si la date de sauvegarde des données n'existe pas
            localStorage.setItem("marvelStorageDate", Date.now()); // on crée la date de sauvegarde
          }
        })
        .catch((error) => console.log(error));
    }
  };

  //gestion de la fermeture de la modal
  const hideModal = () => {
    setOpenModal(false);
    setLoading(true);
  };

  // function pour mettre en majuscule la premiere lettre d'une chaine de caractere
  const capitalizeFirstletter = string => { 
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


  //gestions des différents cas de figure selon le score obtenu par l'utilisateur sur le quiz

  //variable permettant de recupérer la moyne de score obtenu par l'utilisateur sur le quiz
  const averageGrade = maxQuestions / 2;

  //gestion du cas ou l'utiisateur n'obttient pas la moyenne au quiz
  if (score < averageGrade) {
    //setTimeout (() => loadLevelQuestions(0), 5000); //on attend 5 secondes avant de recharger sur la page de niveau 0
    setTimeout(() => loadLevelQuestions(quizLevel), 5000); //on attend 5 secondes avant de recharger sur la page au niveau du quiz ou l'echec est survenu
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
                <p className="successMsg">
                  {" "}
                  <GiTrophyCup size="50px" /> Bravo, vous êtes un expert !
                </p>
                <button
                  className="btnResult success gameOver"
                  onClick={
                    () => loadLevelQuestions(0) // on recharge le 1er niveau de difficulté du quiz
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
              <button
                className="btnInfo"
                onClick={() => showModal(question.heroId)}
              >
                Info
              </button>
            </td>
          </tr>
        );
      })
    ) : (
      //si le score est inférieur a 50% on n'affiche pas la liste des bonnes réponses
      <tr>
        <td colSpan="3">
          <Loader
            loadingMsg={"Pas de réponses"}
            styling={{ textAlign: "center", color: "red" }}
          />
        </td>
      </tr>
    );

  // mise en place de la recupération des données de l'api dans la modale
  const resultInModal = !loading ? (
    <Fragment>
      <div className="modalHeader">
        <h2>{characterInfos.data.results[0].name}</h2>
      </div>
      <div className="modalBody">
        <div className="comicImage">
          <img
            src={
              characterInfos.data.results[0].thumbnail.path +
              "." +
              characterInfos.data.results[0].thumbnail.extension
            }
            alt={characterInfos.data.results[0].name}
          />

          <p>{characterInfos.attributionText}</p>
        </div>
        <div className="comicDetails">
          <h3>Description</h3>
          {characterInfos.data.results[0].description ? (
            <p> {characterInfos.data.results[0].description} </p>
          ) : (
            <p> Pas de description disponible </p>
          )}
          <h3>Plus d'infos</h3>
          {
            // si le heros possède une url d'infos on affiche le(s) lien(s)
            characterInfos.data.results[0].urls &&
              characterInfos.data.results[0].urls.map((url, index) => {
                return (
                  <a
                    key={index}
                    href={url.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {capitalizeFirstletter(url.type)}
                  </a>
                );
              })
          }
        </div>
      </div>
      <div className="modalFooter">
        <button className="modalBtn" onClick={hideModal}>
          Fermer
        </button>
      </div>
    </Fragment>
  ) : (
    <Fragment>
      <div className="modalHeader">
        <h2>Réponse de Marvel</h2>
      </div>
      <div className="modalBody">
        <Loader />
      </div>
    </Fragment>
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

      <Modal showModal={openModal} hideModal={hideModal}>
        {resultInModal}
      </Modal>
    </Fragment>
  );
});

export default React.memo(QuizOver); // on utilise memo pour ne pas re-rendre le component si les props sont identiques
