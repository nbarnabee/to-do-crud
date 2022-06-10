//set up express
const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//temporary solution, so we can play and test without having it connected to a DB
let toDoList = [];

//set express to serve static files from the public folder
app.use(express.static("public"));

//routing for the index page
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// when a request is made for the list
app.get("/notes", (request, response) => {
  // what to do if the list is empty
  if (toDoList.length < 1) {
    response.json(`You have nothing on your To Do list.`);
  } else {
    response.json(toDoList);
  }
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

// I am trying to separate the functions from the server code.
// There is probably a way to make an entirely separate .js file and then import it as a module or something, but I'm taking the simple route for now.
function addNote(body) {
  const note = {
    content: body.content,
  };
  toDoList = toDoList.concat(note);
}
