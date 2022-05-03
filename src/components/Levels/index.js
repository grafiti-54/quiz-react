import React, {useEffect, useState} from "react";
import Stepper from 'react-stepper-horizontal';

const Levels = ({levelNames, quizLevel}) => {

    const [levels, setLevels] = useState([]);

    //recupérations des niveaux de difficulté du quiz 
    useEffect(() => {
        const quizSteps = levelNames.map( level => ({title: level.toUpperCase()})); //talbeau des niveaux de difficulté
        setLevels(quizSteps);
    }, [levelNames]);

    //console.log(levels);

  return (
    <div className="levelsContainer" style={{background: 'transparent'}}>
        <Stepper
          steps={ levels }
          activeStep={ quizLevel }
          circleTop={0} // marge du cercle en haut
          activeTitleColor={'#d31017'} // couleur du titre du niveau actif
          activeColor={'#d31017'} // couleur des cercles
          completeTitleColor={'#e0e0e0'}
          defaultTitleColor={'#e0e0e0'}
          completeColor={'#e0e0e0'}
          completeBarColor = {'#e0e0e0'}
          barStyle = {'dashed'}
          size = {45}
          circleFontSize = {20}
        />
    </div>
  );
};

export default React.memo(Levels); // React.memo permet de ne pas re-rendre le composant si les données sont inchangées
