const cron = require("cron");
const https = require("https");
const backendUrl = "https://goweb-back.onrender.com/";

const job = new cron.CronJob("*/14****", function () {
  console.log("restart");

  https
    .get(backendUrl, (res) => {
      if (res.statusCode == 200) {
        console.log("restarted");
      } else {
        console.error("failed restart");
      }
    })
    .on("error", (err) => {
      console.error("Error during restart", err);
    });
});

module.exports = {
  job: job,
};
