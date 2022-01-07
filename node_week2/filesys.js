const fs = require("fs");

const addNote = (title, body) => {
  const notes = listNotes();
  notes.push({
    title,
    body,
  });
  saveNote(notes);
};

const listNotes = () => {
  const data = JSON.parse(fs.readFileSync("./notes.json").toString());
  return data;
};

const saveNote = (notes) => {
  fs.writeFileSync("./notes.json", JSON.stringify(notes));
};
////////////////////getNote/////////////////////
const getNote = (noteTitle) => {
  const notes = listNotes();
  for (var i = 0; i < notes.length; i++) {
    if (notes[i].title == noteTitle) {
      return notes[i];
    }
  }
};
////////////////////updateNote/////////////////////
const updateNote = (noteTitle, newBody) => {
  const notes = listNotes();
  for (var i = 0; i < notes.length; i++) {
    if (notes[i].title == noteTitle) {
      notes[i].body = newBody;
      saveNote(notes);
      break;
    }
  }
  if (i == notes.length - 1)
    console.log(`\n there is on node with the title ${noteTitle}\n`);
};
///////////////////deletNote///////////////////
const deletNote = (noteTitle) => {
  const notes = listNotes();
  for (var i = 0; i < notes.length; i++) {
    if (notes[i].title == noteTitle) {
      for (n = i; n < notes.length - 1; n++) {
        notes[n] = notes[n + 1];
      }
      notes.pop();
      break;
    }
    if (i == notes.length - 1)
      console.log(`\n there is on node with the title ${noteTitle}\n`);
  }
  saveNote(notes);
};

// addNote("note2", "hello there!");
module.exports = {
  addNote,
  listNotes,
  deletNote,
  getNote,
  updateNote,
};
