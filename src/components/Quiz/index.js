import React, { Component, Fragment } from "react";
import { QuizMarvel } from "../quizMarvel"; // importation des questions du quiz
import Levels from "../Levels";
import ProgressBar from "../ProgressBar";
import { ToastContainer, toast } from "react-toastify"; // toast notification
import "react-toastify/dist/ReactToastify.css"; //css toast notification
import QuizOver from "../QuizOver"; // importation de la gestion de la fin de serie de questions selon le niveau de difficulté
import { FaChevronRight } from "react-icons/fa";

toast.configure();

 //recuperation des questions du quiz
//utiliser les nom des levels present dans le fichier quizMarvel/index.js
const initialState = {
  levelNames: ["debutant", "confirme", "expert"],
  quizLevel: 0, // permet de savoir quel niveau de difficulté on est
  maxQuestions: 10, // nombre de question max du quiz sur le niveau de difficulté
  storedQuestions: [], // enregistrements des 10 questions necessaires au quiz
  question: null, // les questions
  options: [], // les reponses possibles
  idQuestion: 0, // id de la question
  btnDisabled: true, // bouton validation désactivé par défaut lorsque le quiz commence et que l'utilisateur n'as pas choisi de reponse
  userAnswer: null, // reonse selectionné par l'utilisateur
  score: 0, // score de l'utilisateur
  showWelcomeMsg: false, // affichage du message de bienvenue
  quizEnd: false, // gestion de la fin de quiz selon le niveau de difficulté
};

class Quiz extends Component {
  //constructeur
  constructor(props) {
    super(props);

    this.state = initialState;
    this.storedDataRef = React.createRef();
  }

  //fonction qui va charger les questions du quiz selon le niveau des questions
  loadQuestions = (quizz) => {
    const fetchedArrayQuiz = QuizMarvel[0].quizz[quizz];
    //console.log(fetchedArrayQuiz);

    // on crée un nouveau tableau qui va contenir uniquement les 10 questions du quiz sans les bonnes reponses qui sont renvoyées dans la const fetchedArrayQuiz
    if (fetchedArrayQuiz.length >= this.state.maxQuestions) {
      this.storedDataRef.current = fetchedArrayQuiz; // recuperation des données du quiz avec les réponses
      //console.log(this.storedDataRef.current);

      const newArray = fetchedArrayQuiz.map(
        ({ answer, ...keepRest }) => keepRest
      );
      // on mets a jour le nouveau tableau sans les bonnes reponses dans le state
      this.setState({
        storedQuestions: newArray,
      });
    } else {
      console.log("Pas assez de questions");
    }
  };

  showToastMsg = (pseudo) => {
    //eviter le rechargement du message de bienvenue a chaque rafraichissement de la page
    if (!this.state.showWelcomeMsg) {
      //on bloc le message de bienvenue une fois affiché
      this.setState({
        showWelcomeMsg: true,
      });
      toast.warn(`Bienvenue ${pseudo} bonne chance`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });
    }
  };

  componentDidMount() {
    // incrémentation du niveau de la question
    this.loadQuestions(this.state.levelNames[this.state.quizLevel]);
  }

  //gestion lors de la validation de la question pour passer a la question suivante
  nextQuestion = () => {
    //verification qu'on est pas a la derniere question du quiz (10eme question)
    if (this.state.idQuestion === this.state.maxQuestions - 1) {
      //this.gameOver(); // on est a la derniere question du quiz on appel la fonction gameOver
      this.setState({
        quizEnd: true, // on indique que le quiz est fini
      });
    } else {
      //si on est pas a la derniere question
      this.setState((prevState) => ({
        //incrementation de l'id de la question pour passer a la question suivante
        idQuestion: prevState.idQuestion + 1,
      }));
    }

    //gestion du score de l'utilisateur
    const goodAnswer = this.storedDataRef.current[this.state.idQuestion].answer; // recuperation de la bonne reponse
    if (this.state.userAnswer === goodAnswer) {
      // si la reponse seletionné est la bonne reponse
      this.setState((prevState) => ({
        score: prevState.score + 1, //prevstate permet de garder le score actuel de l'utilisateur on lui rajoute +1
        //! voir componentDidUpdate pour passer a la question suivante
      }));

      //Bonne reponse toast notification
      toast.success("Bravo +1", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        bodyClassName: "toastity-color",
      });
    } else {
      //mauvaise reponse toast notification
      toast.error("Mauvaise réponse", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        bodyClassName: "toastity-color",
      });
    }
  };

  //grace a setState on a acces a componentDidUpdate
  componentDidUpdate(prevProps, prevState) {
    // verifications des données avant la mise a jours du nouveau tableau
    if (
      this.state.storedQuestions !== prevState.storedQuestions &&
      this.state.storedQuestions.length > 0
    ) {
      //console.log(this.state.storedQuestions[0]);
      this.setState({
        question: this.state.storedQuestions[this.state.idQuestion].question, // recupération des questions
        options: this.state.storedQuestions[this.state.idQuestion].options, // recupération des options (reponses)
      });
    }
    // on passe a la question suivante
    if (
      this.state.idQuestion !== prevState.idQuestion &&
      this.state.storedQuestions.length > 0
    ) {
      this.setState({
        question: this.state.storedQuestions[this.state.idQuestion].question, // recupération de la nouvelles question
        options: this.state.storedQuestions[this.state.idQuestion].options, // recupération des options (reponses)
        userAnswer: null, // on remet a null la reponse de l'utilisateur lors du passage à la question suivante
        btnDisabled: true, // on remet le bouton en disabled
      });
    }

    if (this.state.quizEnd !== prevState.quizEnd) {
      //console.log(this.state.score);
      //recuperation du pourcentage de bonne reponse obtenu par l'utilisateur
      const gradepercent = this.getPercentage(
        this.state.maxQuestions,
        this.state.score
      );
      this.gameOver(gradepercent);
    }

    //geston des messages renvoyé par le toast à l'utilisateur
    // affichage du pseudo de l'utilisateur seulement si le pseudo est différent de celui deja enregistré lors d'un changement de "page"
    // uniquement au moment du montage pas au moment de la mise a jour
    if (this.props.userData.pseudo !== prevProps.userData.pseudo) {
      this.showToastMsg(this.props.userData.pseudo);
    }
  }

  //fonction qui va permettre de passer a la question suivante lors de la validation de la reponse a la question
  submitAnswer = (selectedAnswer) => {
    this.setState({
      userAnswer: selectedAnswer, // on stock la reponse de l'utilisateur
      btnDisabled: false, // on active le bouton pour passer a la question suivante
    });
  };

  //function permettant de calculer le pourcentage de bonne reponse obtenu par l'utilisateur sur le quiz
  getPercentage = (maxQuest, ourScore) => (ourScore / maxQuest) * 100; // on divise le score de l'utilisateur par le nombre de question du quiz

  gameOver = (percent) => {
    //console.log(this.state.score);

    //on donne l'accès au niveau suivant si le pourcentage de bonnes reponses est superieur a 50%
    if (percent >= 50) {
      //mise a jour des differents states
      this.setState({
        quizLevel: this.state.quizLevel + 1,
        percent: percent,
      });
      //si le pourcentage est inferieur a 50% on ne donne pas l'accès au niveau supérieur
    } else {
      this.setState({
        percent: percent,
      });
    }
  };

  //fonction qui va permettre de passer au niveau de difficulté suivant
  loadLevelQuestions = (param) => {
    this.setState({ ...this.initialState, quizLevel: param }); // recuperation de l'ensemble des données

    this.loadQuestions(this.state.levelNames[param]); // on appel la fonction qui va permettre de charger les questions
  };

  //console.log(props.userData.pseudo);
  //render obligatoire dans un component de type class
  render() {
    //destructuration des données de l'utilisateur pour ne pas surcharger le code jsx
    //const {pseudo} = this.props.userData;

    //recupération des reponses pour le questionnaire a choix multiple (boucle)
    const displayOptions = this.state.options.map((option, index) => {
      return (
        <p
          key={index}
          className={`answerOptions ${
            this.state.userAnswer === option ? "selected" : null
          }`}
          onClick={() => this.submitAnswer(option)}
        >
          <FaChevronRight />
          {option}
        </p>
      );
    });

    //lorsque le niveau de difficulté est atteint on affiche le composant de fin de quiz
    return this.state.quizEnd ? (
      <QuizOver
        ref={this.storedDataRef} // passage en ref pour pouvoir recuperer les données du quiz dans le component QuizOver
        levelNames={this.state.levelNames} // passage en ref pour pouvoir recuperer les noms des niveaux dans le component QuizOver
        score={this.state.score} // passage en ref pour pouvoir recuperer le score de l'utilisateur dans le component QuizOver
        maxQuestions={this.state.maxQuestions} // passage en ref pour pouvoir recuperer le nombre de question du quiz dans le component QuizOver
        quizLevel={this.state.quizLevel} // passage en ref pour pouvoir recuperer le niveau de difficulté du quiz dans le component QuizOver
        percent={this.state.percent} // passage en ref pour pouvoir recuperer le pourcentage de bonne reponse de l'utilisateur dans le component QuizOver
        loadLevelQuestions={this.loadLevelQuestions} // passage en ref pour pouvoir recuperer la fonction loadLevelQuestions dans le component QuizOver et passer au niveau suivant de difficulté du quiz
      />
    ) : (
      //sinon on affiche la question suivante
      <Fragment>
        {/* <h2>Pseudo : {pseudo}</h2> */}
        <Levels
          levelNames={this.state.levelNames} // passage en ref pour pouvoir recuperer les noms des niveaux dans le component Levels
          quizLevel={this.state.quizLevel} // passage en ref pour pouvoir recuperer le niveau de difficulté du quiz dans le component Levels
        />
        <ProgressBar
          idQuestion={this.state.idQuestion}
          maxQuestions={this.state.maxQuestions}
        />

        <h2> {this.state.question}</h2>
        {displayOptions}

        <button
          disabled={this.state.btnDisabled}
          className="btnSubmit"
          onClick={this.nextQuestion}
        >
          {this.stateidQuestion === this.state.maxQuestions - 1
            ? "Terminer"
            : "Suivant"}
        </button>
      </Fragment>
    );
  }
}

export default Quiz;
