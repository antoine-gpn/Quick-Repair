const app = require("./app");
const job = require("./cron.js").job;
const port = 8001;

job.start();
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
