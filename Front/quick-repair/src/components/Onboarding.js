import line from "../assets/line.png";
import "../styles/Onboarding.css";

//Import of 'pictos' directory (type of problem)
let context = require.context("../assets/pictos");
let images = {};
context.keys().map((item) => {
  images[item.replace("./", "").replace(".", "").replace("png", "")] =
    context(item);
});

function Onbording({ options, parcours, updateParcours, screens, setScreens }) {
  return (
    <div className="App onboarding">
      <h1 className="center-title text-white">Mon problème concerne</h1>
      <img src={line} alt="line" className="line" />
      <div className="container-options-full">
        {/* Loop over the options to display available choices */}
        {options.map((option) => (
          <div
            key={option.Key}
            className="container-options hover"
            onClick={() => {
              //If there is no other step, send to summary
              if (Object.keys(option.Options).length === 0) {
                setScreens({ ...screens, summary: true });
              }
              //Else: display the component NextSteps
              updateParcours([...parcours, option.Key]);
            }}
          >
            <img
              src={images[option.Key]}
              className="img-onboarding"
              alt={option.Key}
            />
            <span className="option-name">{option.Key}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Onbording;
