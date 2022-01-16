const express = require("express");
const router = require("express").Router();
const fs = require("fs");
const bodyParser = require("body-parser");

const app = express();

//get, post, put, delete

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(router);

router.get("/", (req, res) => {
  res.send("hello there!");
});

router.get("/notes", (req, res) => {
  const notes = JSON.parse(fs.readFileSync("notes.json"));
  res.send(notes);
});
router.get("/notes/:title", (req, res) => {
  const notes = JSON.parse(fs.readFileSync("notes.json"));
  res.send(notes.find((c) => c.title == req.params.title) || "not found");
});

router.post("/api/notes", (req, res) => {
  console.log(req.body);
  const data = { ...req.body }; //??
  const notes = JSON.parse(fs.readFileSync("./notes.json"));
  notes.push(data);
  fs.writeFileSync("./notes.json", JSON.stringify(notes));
  res.send({ message: "recived successfully" });
});

router.put("/api/notes", (req, res) => {
  const notes = JSON.parse(fs.readFileSync("./notes.json"));
  for (var i = 0; i < notes.length; i++) {
    if (notes[i].title == req.body.title) {
      notes[i].body = req.body;
      fs.writeFileSync("./notes.json", JSON.stringify(notes));
      res.send({ message: "update successfully" });
      return;
    }
  }
  res.status(404).send({ message: "not found" });
});
router.delete("/api/notes", (req, res) => {
  const notes = JSON.parse(fs.readFileSync("./notes.json"));
  for (var i = 0; i < notes.length; i++) {
    if (notes[i].title == req.body.title) {
      notes.splice(i, 1);
      fs.writeFileSync("./notes.json", JSON.stringify(notes));
      res.send({ message: "delet successfully" });
      return;
    }
  }
  res.status(404).send({ message: "not found" });
});
app.listen(3000, () => {
  console.log("the server is running.");
});
