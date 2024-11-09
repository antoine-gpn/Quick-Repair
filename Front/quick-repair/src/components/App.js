import "../styles/App.css";
import { useState, useEffect } from "react";
import Onbording from "./Onboarding";
import NextSteps from "./NextSteps";
import Summary from "./Summary";
import Order from "./Order";
import React from "react";
import Results from "./Results";

function App() {
  //options: array containing all possible choices (retrieved via the Back API)
  const [options, setOptions] = useState([]);

  //parcours: array containing selected choices (used in NextSteps)
  const [parcours, updateParcours] = useState([]);

  //screens: array of booleans conditioning the display of components
  const [screens, setScreens] = useState({
    summary: false,
    order: false,
    results: false,
  });
  //questions: array containing the history of questions asked for the recap
  const [questions, updateQuestions] = useState(["Mon problème concerne"]);

  //inputValues: object containing the responses of the info fields initialized to empty
  const [inputValues, setInputValues] = useState({
    Prénom: "",
    Nom: "",
    Adresse: "",
    "Code Postal": "",
    Téléphone: "",
    Email: "",
  });

  //Url pointing to the Back API
  const baseUrl = "https://goweb-back.onrender.com/";

  //Call API to retrieve question/answer tree
  useEffect(() => {
    fetch(baseUrl)
      .then((response) => response.json())
      .then((data) => {
        setOptions(data);
      })
      .catch((error) => console.log(error));
  }, []);

  //Conditional display of components (Onboarding, NextSteps, Summary, Order, Result)
  return (
    <div className="app-container">
      {parcours.length === 0 && (
        <Onbording
          options={options}
          parcours={parcours}
          updateParcours={updateParcours}
          screens={screens}
          setScreens={setScreens}
        />
      )}
      {parcours.length > 0 &&
        !screens["summary"] &&
        !screens["order"] &&
        !screens["results"] && (
          <NextSteps
            options={options}
            parcours={parcours}
            updateParcours={updateParcours}
            questions={questions}
            updateQuestions={updateQuestions}
            setScreens={setScreens}
            screens={screens}
          />
        )}
      {screens["summary"] && !screens["results"] && (
        <Summary setScreens={setScreens} screens={screens} />
      )}
      {screens["order"] && (
        <Order
          inputValues={inputValues}
          setInputValues={setInputValues}
          setScreens={setScreens}
          screens={screens}
        />
      )}
      {screens["results"] && (
        <Results
          parcours={parcours}
          inputValues={inputValues}
          questions={questions}
          baseUrl={baseUrl}
        />
      )}
      <footer>Quick Repair</footer>
    </div>
  );
}

export default App;
