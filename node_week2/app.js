const { argv } = require("process");
const yargs = require("yargs");
const {
  addNote,
  listNotes,
  deletNote,
  getNote,
  updateNote,
} = require("./filesys");

yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Note body",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    addNote(argv.title, argv.body);
  },
});

yargs.command({
  command: "list",
  describe: "list a new note",
  builder: {},
  handler() {
    console.log(listNotes());
  },
});

yargs.command({
  command: "del",
  describe: "delet a new note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    deletNote(argv.title);
  },
});

yargs.command({
  command: "get",
  describe: "get a new note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    console.log(getNote(argv.title));
  },
});

yargs.command({
  command: "update",
  describe: "update a new note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Note body",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    updateNote(argv.title, argv.body);
  },
});
yargs.parse();
