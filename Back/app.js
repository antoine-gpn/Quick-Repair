//Utilisation d'Express pour l'API
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();
const port = "8001";
app.use(cors());
app.use(express.json());

//Import du fichier JSON (Excel reformatté)
const datas = require("./dataset.json");

//Gestion des erreurs
function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

//Gestion des erreurs
if (process.env.NODE_ENV !== "test") {
  app.on("error", onError);
}

//Récupération du JSON contenant l'abrorescence des choix
app.get("/", (req, res) => {
  res.json(datas);
});

//Envoi d'un mail après validation de formulaire
app.post("/mail", (req, res) => {
  if (req.body) {
    let html =
      '<b style="text-align: center">Récapitulatif de votre demande</b><br/><br/>';
    let text = "Récapitulatif de votre demande\n\n";

    req.body.parcours.map((value, key) => {
      html += `<b>${req.body.questions[key]} : </b><br /> ${value}<br />`;

      text += `${req.body.questions[key]} :\n${value}`;
    });

    html += `<br/>`;
    text += `\n`;

    Object.entries(req.body.inputs).map((value) => {
      text += `${value[0]}: ${value[1]}\n`;
      html += `<b>${value[0]}</b>: ${value[1]}<br/>`;
    });

    //Configuration pour utiliser une adresse Gmail
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "goweb.technical.test@gmail.com",
        pass: "sdzt wejr cuwp rnvk",
      },
    });

    //Envoi de l'email à l'adresse saisie dans le front + adresse de l'artisan (mon adresse personnelle ici)
    transporter.sendMail({
      from: 'noreply - GoWeb Test" <agrappin1@gmail.com>',
      to: [req.body.inputs["Email"], "agrappin1@gmail.com"],
      subject: "[Goweb Test Technique] Email Récapitulatif",
      text: text,
      html: html,
    });

    res.json("Sending Email");
  }
  res.json("Cannot send Email");
});

module.exports = app;
