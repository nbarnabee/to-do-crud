//set up express
const { response } = require("express");
const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

let db,
  dbConnectionStr = process.env.DB_STRING;

MongoClient.connect(
  `mongodb+srv://${dbConnectionStr}@cluster0.rfqhbna.mongodb.net/?retryWrites=true&w=majority`,
  { useUnifiedTopology: true }
).then((client) => {
  console.log("Connected to database");
  db = client.db("toDoCrud");
});

//routing for the index page
app.get("/", (req, res) => {
  db.collection("toDos")
    .find()
    .toArray()
    .then((data) => {
      res.render("index.ejs", { toDoList: data });
    });
});

// when a new note is added
app.post("/notes", (request, response) => {
  console.log("Post request made");
  const body = request.body;
  console.log(body);
  addNote(body);
  response.redirect("/");
});

//set the server to listen
app.listen(process.env.PORT || PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
