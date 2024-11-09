import picture from "../assets/summary.png";
import RightCorner from "./RightCorner";
import Contact from "./Contact";
import "../styles/Summary.css";

function Summary({ setScreens, screens }) {
  return (
    <div className="final-steps App">
      <div className="summary-blocks">
        <img src={picture} className="summary-pic" alt="plomberie" />
        <br />
        <br />
        <span className="text-start">Bon à savoir</span>
        <p className="lorem-ipsum">
          Vous vous interrogez sur les solutions pour remédier à votre problème
          ? Faites appel à un plombier de QuickRepair.fr pour un débouchage
          efficace et rapide !<br />
          <br /> Le coût du débouchage dépend de l'ampleur de l'engorgement et
          de la complexité à éliminer le bouchon. Votre cas comprend les
          prestations suivantes :<br />
          <br /> - Les frais de déplacement et de main-d'œuvre,
          <br /> - La fourniture du matériel (pompe manuelle, acides, furet
          électrique, etc)
          <br /> - Le nettoyage du chantier. Dans les cas les plus complexes, où
          le dégorgement dure plus de deux heures, le coût total pourrait
          excéder le devis initial (si l'usage d'un furet électrique sur
          différents niveaux est requis par exemple). <br />
          <br />
          Néanmoins, sachez que le plombier vous préviendra en amont de toute
          modification des frais si cette situation se produit.
        </p>
      </div>
      <div className="summary-blocks">
        <RightCorner>
          <button
            className="btn-intervention red-btn hover"
            onClick={() => {
              //Send to order page
              setScreens({ ...screens, summary: false, order: true });
            }}
          >
            Demander une intervention
          </button>
        </RightCorner>
        <Contact />
      </div>
    </div>
  );
}

export default Summary;
