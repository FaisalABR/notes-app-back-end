const {
  addNotesHandler,
  getAllNotesHandler,
  getNotesByIdHanlder,
  editNotesById,
  deleteNoteByIdHandler,
} = require("./handler");

const routes = [
  {
    method: "POST",
    path: "/notes",
    handler: addNotesHandler,
  },
  {
    method: "GET",
    path: "/notes",
    handler: getAllNotesHandler,
  },
  {
    method: "GET",
    path: "/notes/{id}",
    handler: getNotesByIdHanlder,
  },
  {
    method: "PUT",
    path: "/notes/{id}",
    handler: editNotesById,
  },
  {
    method: "DELETE",
    path: "/notes/{id}",
    handler: deleteNoteByIdHandler,
  },
];

module.exports = routes;
