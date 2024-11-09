import RightCorner from "./RightCorner";
import Contact from "./Contact";
import $ from "jquery";
import { useState } from "react";
import "../styles/Order.css";

function Order({ inputValues, setInputValues, setScreens, screens }) {
  //Managing of displaying the helpline number
  const [number, showNumber] = useState(false);

  //Array of Regex associated with fields
  const regexs = {
    Prénom: /^[A-Za-zÀ-ÖØ-öø-ÿ\- ]+$/,
    Nom: /^[A-Za-zÀ-ÖØ-öø-ÿ\- ]+$/,
    Adresse: /^.+$/,
    "Code Postal": /^\d{5}$/,
    Téléphone: /^\d{10}$/,
    Email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  };

  //Function to check the accordance of entered values
  function validateInputs() {
    let res = true; //Initialized to true

    //Loop over fields to apply the Regex validation
    Object.entries(inputValues).forEach((value) => {
      //value[0] => Field | value[1] => Value
      let isValid = regexs[value[0]].test(value[1]);

      //If one of the fields does not meet the conditions, the summary is blocked.
      //Retrieving HTML elements to be altered
      let errorText = $(`#${value[0].replace(" ", "")}`);
      let errorField = $(`fieldset#fieldset-${value[0].replace(" ", "")}`);
      let errorLegend = errorField.children("legend");

      if (!isValid) {
        //If the field is entered incorrectly: a message is displayed and the field turns red
        errorText.css("display", "block");
        errorField.css("border", "red 1px solid");
        errorLegend.css("color", "red");
        res = false;
      } else {
        //Else: back to normal
        errorText.css("display", "none");
        errorField.css("border", "black 1px solid");
        errorLegend.css("color", "black");
      }
    });
    //Same process for mandatory checkbox
    for (let i = 1; i < 3; i++) {
      if ($(`#checkbox${i}`).is(":checked")) {
        $(`#checkbox${i}-text`).css("display", "none");
      } else {
        $(`#checkbox${i}-text`).css("display", "block");
        res = false;
      }
    }

    return res;
  }

  return (
    <div className="App final-steps">
      <div className="summary-blocks order-left">
        <h2>
          <span className="order-number">1</span> Informations
        </h2>

        <div className="inputsContainer">
          <div className="input-line">
            <div>
              <fieldset id={`fieldset-Prénom`} type="text">
                <legend>
                  Prénom<sup>*</sup>
                </legend>
                <input
                  type="text"
                  value={inputValues.Prénom}
                  onChange={(e) => {
                    setInputValues({
                      ...inputValues,
                      Prénom: e.target.value,
                    });
                  }}
                />
              </fieldset>
              <p id="Prénom" className="error-text">
                Valeur saisie non valide
              </p>
            </div>

            <div>
              <fieldset id={`fieldset-Nom`} type="text">
                <legend>
                  Nom<sup>*</sup>
                </legend>
                <input
                  type="text"
                  value={inputValues.Nom}
                  onChange={(e) => {
                    setInputValues({
                      ...inputValues,
                      Nom: e.target.value,
                    });
                  }}
                />
              </fieldset>
              <p id="Nom" className="error-text">
                Valeur saisie non valide
              </p>
            </div>
          </div>

          <div className="input-line">
            <div>
              <fieldset id={`fieldset-Adresse`} type="text">
                <legend>
                  Adresse<sup>*</sup>
                </legend>
                <input
                  type="text"
                  value={inputValues.Adresse}
                  onChange={(e) => {
                    setInputValues({
                      ...inputValues,
                      Adresse: e.target.value,
                    });
                  }}
                />
              </fieldset>
              <p id="Adresse" className="error-text">
                Valeur saisie non valide
              </p>
            </div>
            <div>
              <fieldset id={`fieldset-CodePostal`} type="text">
                <legend>
                  Code Postal<sup>*</sup>
                </legend>
                <input
                  type="text"
                  value={inputValues["Code Postal"]}
                  onChange={(e) => {
                    setInputValues({
                      ...inputValues,
                      "Code Postal": e.target.value,
                    });
                  }}
                />
              </fieldset>
              <p id="CodePostal" className="error-text">
                Valeur saisie non valide
              </p>
            </div>
          </div>
          <div className="input-line">
            <div>
              <fieldset id={`fieldset-Téléphone`} type="text">
                <legend>
                  Téléphone<sup>*</sup>
                </legend>
                <input
                  type="text"
                  value={inputValues.Téléphone}
                  onChange={(e) => {
                    setInputValues({
                      ...inputValues,
                      Téléphone: e.target.value,
                    });
                  }}
                />
              </fieldset>
              <p id="Téléphone" className="error-text">
                Valeur saisie non valide
              </p>
            </div>
            <div>
              <fieldset id={`fieldset-Email`} type="text">
                <legend>
                  Adresse email<sup>*</sup>
                </legend>
                <input
                  type="text"
                  value={inputValues.Email}
                  onChange={(e) => {
                    setInputValues({
                      ...inputValues,
                      Email: e.target.value,
                    });
                  }}
                />
              </fieldset>
              <p id="Email" className="error-text">
                Valeur saisie non valide
              </p>
            </div>
          </div>
          <p className="mail-confirm">
            L'adresse saisie reçevera un mail de confirmation
          </p>
        </div>

        <h2>
          <span className="order-number">2</span> Modes de paiement
        </h2>

        <div className="paybox-line">
          <b>Payer sur place</b>
          <input
            type="radio"
            name="payment"
            value="sur place"
            className="radio"
          />
        </div>
        <div className="paybox-line">
          <b>Payer en ligne</b>
          <input type="radio" name="payment" value="en ligne" />
        </div>

        <div className="paragraph-bloc">
          <div className="flex">
            <input id="checkbox1" type="checkbox" />
            <p>
              J'accepte les
              <span className="blue-text">
                {" "}
                conditions générales d'utilisation du service*
              </span>
            </p>
          </div>
          <p id="checkbox1-text" className="error-text">
            Veuillez cocher la case pour valider
          </p>
          <div className="flex">
            <input id="checkbox2" type="checkbox" />
            <p>
              J'ai bien pris connaissance des{" "}
              <span className="blue-text">
                dispositions relatives au droit de rétractation*
              </span>
            </p>
          </div>
          <p id="checkbox2-text" className="error-text">
            Veuillez cocher la case pour valider
          </p>
          <div className="flex">
            <input type="checkbox" />
            <p>
              Je souhaite recevoir par voie électronique des offres commerciales
              personnalisées
            </p>
          </div>
        </div>

        <div className="order-btns order-btns">
          <button
            className="order-btn btn-back hover"
            onClick={() => {
              //Go back
              setScreens({ ...screens, summary: true, order: false });
            }}
          >
            <span className="left-arrow">◁</span> Etape précédente
          </button>

          <button
            className="order-btn red-btn hover"
            onClick={() => {
              //If every field is ok, display the final page + send an email
              if (validateInputs()) {
                setScreens({ ...screens, order: false, results: true });
              }
            }}
          >
            Passer commande et payer en ligne
          </button>
        </div>
      </div>
      <div className="summary-blocks">
        <RightCorner />

        <div className="summary-right-bloc">
          <h1 className="summary-title">
            Besoin d'une assistance téléphonique ?
          </h1>
          <button
            className="number-btn red-btn hover"
            onClick={() => {
              showNumber(!number);
            }}
          >
            {number ? "Masquer" : "Afficher"} le numéro
          </button>
          <br />
          {number && <b>06 29 02 07 35</b>}
        </div>

        <Contact />
      </div>
    </div>
  );
}

export default Order;
