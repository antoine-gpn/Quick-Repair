import { useEffect, useState } from "react";

import line from "../assets/line-red.png";
import "../styles/NextSteps.css";

function NextSteps({
  options,
  parcours,
  updateParcours,
  questions,
  updateQuestions,
  setScreens,
  screens,
}) {
  //ops : array containing the choices available according to the selected choices
  const [ops, setOps] = useState(
    options.find((option) => option.Key === parcours[0]).Options
  );

  //Function to update choices based on selections
  function updateOps() {
    let currentOps = []; //Array of choices initialized to empty
    //Loop over the options array (JSON via API) to advance in the tree
    parcours.forEach((value, key) => {
      if (key === 0) {
        currentOps = options.find((option) => option.Key === value).Options;
      } else {
        currentOps = currentOps[value].Options;
      }
    });

    //Update of question history array
    updateQuestions([...questions, ops.Key]);

    if (currentOps !== undefined) {
      //Update of available choices
      setOps(currentOps);
    } else {
      //If there are no more steps to choose from, display the summary
      setScreens({ ...screens, summary: true });
    }
  }

  //Call the options update function when 'parcours' array change
  useEffect(() => {
    updateOps();
  }, [parcours]);

  return (
    <div className="App">
      <h1 className="center-title">{ops.Key}</h1>
      <img src={line} className="line" alt="line" />
      <div className="nextStep-container">
        {/* Loop over the options array to display choices*/}
        {Object.entries(ops).map(
          ([key, value]) =>
            key !== "Key" && (
              <div
                key={key}
                className="next-step-elem hover"
                onClick={() => {
                  //Update the 'parcours' array by clicking
                  updateParcours([...parcours, key]);
                }}
              >
                <p>{key}</p>
                <p className="arrow">▶</p>
              </div>
            )
        )}
      </div>
      <button
        className="btn-back btn-back-next hover"
        onClick={() => {
          //Deleting the last element of 'parcours' array to go back
          updateParcours(parcours.slice(0, -1));
        }}
      >
        <span className="left-arrow">◁</span> Etape précédente
      </button>

      <div className="nextStep-footer">
        <p>
          ✓ Plus de <b>1500 professionnels qualifiés</b>, recrutés selon des
          critères et un processus stricts
        </p>
        <p>
          ✓ Fourchette tarifaire <b>connue à l'avance</b>, incluant le
          déplacement ainsi qu'un devis gratuit
        </p>
        <p>
          ✓ Intervention <b>7j/7 24h/24</b> pour les dépannages d'urgence
        </p>
      </div>
    </div>
  );
}

export default NextSteps;
