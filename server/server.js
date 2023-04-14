const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.set("view engine", "hbs");

/*app.get("/", function(request, response){
  response.sendFile(__dirname + "/view/index.html");
});*/

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const userRoutes = require("./app/routes/userRoutes.js");
const helpRoutes = require("./app/routes/helpRoutes.js")

app.use("/api", userRoutes);
app.use("/help", helpRoutes)

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const db = require("./app/models");
db.sequelize.sync();

