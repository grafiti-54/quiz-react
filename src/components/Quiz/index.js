import React, { Component } from "react";

class Quiz extends Component {
  //console.log(props.userData.pseudo);
  //render obligatoire dans un component de type class
  render() {

    //destructuration des données de l'utilisateur pour ne pas surcharger le code jsx
    const {pseudo} = this.props.userData;

    return (
      <div>
        <h2>Pseudo : {pseudo}</h2>
      </div>
    );
  }
}

export default Quiz;
