import "../styles/RightCorner.css";

function RightCorner({ children }) {
  return (
    <div className="summary-right-bloc">
      <h1 className="summary-title">
        Réparation d’une fuite de la vanne principale ou avant la vanne
      </h1>

      <ul className="summary-list">
        <li>
          <span className="summary-icon">$</span> Entre 150€ et 300€ TTC
        </li>
        <li>
          <span className="summary-icon">✓</span> Gros Matériel
        </li>
        <li>
          <span className="summary-icon">✓</span>Déplacement
        </li>
        <li>
          <span className="summary-icon">✓</span>Petites fournitures
        </li>
        <li>
          <span className="summary-icon">✓</span>Nettoyage du chantier
        </li>
        <li>
          <span className="summary-icon">✓</span>Main d'oeuvre
        </li>
      </ul>

      {children}
    </div>
  );
}

export default RightCorner;
