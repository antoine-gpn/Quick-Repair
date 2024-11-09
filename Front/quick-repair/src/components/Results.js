import { useEffect } from "react";
import "../styles/Results.css";

function Results({ parcours, inputValues, questions, baseUrl }) {
  //Options of POST request for email sending
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      inputs: inputValues,
      parcours: parcours,
      questions: questions,
    }),
  };

  //Call API when displaying the result page (sending the email)
  useEffect(() => {
    fetch(`${baseUrl}mail`, requestOptions);
  }, []);

  return (
    <div className="App results">
      <h1>Récapitulatif de la commande</h1>

      <p>
        Parfait ! L'artisan a été informé de votre demande.
        <br />
        Un email de validation vous a été envoyé
      </p>
      {parcours.map((value, key) => (
        <p key={key}>
          <b>{questions[key]} : </b>
          <br /> {value}
        </p>
      ))}

      <b>Informations personnelles :</b>

      {Object.keys(inputValues).map((value, key) => (
        <p key={key}>
          <b>{value}</b>: {Object.values(inputValues)[key]}
        </p>
      ))}
    </div>
  );
}
export default Results;
