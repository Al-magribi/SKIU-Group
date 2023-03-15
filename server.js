const app = require("./app");
const dbConnection = require("./config/dbConnection");

// .env file Configuration
const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, "config", ".env"),
});

dbConnection();

// app.get("/", (req, res) => {
//   res.send("Server is running");
// });

const PORT = 12121;

app.listen(process.env.PORT || PORT, (req, res) => {
  console.log(`active port: ${PORT} di mode ${process.env.NODE_ENV}`);
});
