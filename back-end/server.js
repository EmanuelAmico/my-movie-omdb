const express = require("express");
const morgan = require("morgan");
const https = require("https");
const fs = require("fs");
const db = require("./db");
const routes = require("./routes");
const cors = require("cors")
const app = express();
const { connection } = require("./db")


// Configs
app.use(morgan("dev"));
app.use(express.json()); //Para los GET no hace falta pero para los POST sí :)
app.use(express.urlencoded({ extended: false })); //Para que funcionen los formularios del front
app.use(cors())
const port = 3000


// Https
const key = fs.readFileSync(__dirname + "/certs/privkey.pem");
const cert = fs.readFileSync(__dirname + "/certs/fullchain.pem");
const httpsOptions = { key, cert };
const server = https.createServer(httpsOptions, app)

//Routes
app.use("/api", routes);

// Error Middleware
app.use((error, req, res, next) => {
  console.log("Ha ocurrido un error y entré al error middleware:");
  console.log(error);
  res.sendStatus(500);
});

connection.on("error", console.error.bind(console, "connection error:"))

connection.once("open", () => {
  console.log("Connectado a la DB")
  server.listen(port, () => console.log(`Server escuchando en https://localhost:${port} y DB escuchando en Cluster`))
})
