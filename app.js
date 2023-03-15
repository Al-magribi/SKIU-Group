const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");

const bodyParser = require("body-parser");
const ErrMiddleware = require("./handler/ErrMiddleware");

app.use(express.json({ limit: 100000 }));
app.use(bodyParser.json({ limit: 100000 }));
app.use(
  bodyParser.urlencoded({
    limit: "70mb",
    extended: true,
    parameterLimit: 70000,
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// ROUTES
const teamRoutes = require("./routes/teamRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");
const equipmentRoutes = require("./routes/equipRoutes");
const projectRoutes = require("./routes/projectRoutes");
const userRoutes = require("./routes/userRoutes");
const reportRoutes = require("./routes/reportRoutes");
const homeRoutes = require("./routes/homeRoutes");

app.use("/api/team", teamRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/equip", equipmentRoutes);
app.use("/api/project", projectRoutes);
app.use("/api/user", userRoutes);
app.use("/api/worker", reportRoutes);
app.use("/api/public/web", homeRoutes);

if (process.env.NODE_ENV === "PRODUCTION") {
  app.use(express.static(path.join(__dirname, "./build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./build/index.html"));
  });
}

app.use(ErrMiddleware);
app.use(cors());

module.exports = app;
