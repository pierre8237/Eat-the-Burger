const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5005;

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Parse application body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const exphbs = require("express-handlebars");
//Set the view folder here

////////////////////////////////////////////////////
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//TODO: Define your routes
const routes = require("./controllers/burgersController");

app.use(routes);

app.listen(PORT, function () {
  console.log(`Listening on port: ${PORT}`);
});
