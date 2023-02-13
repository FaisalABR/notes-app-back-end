const { nanoid } = require("nanoid");
const notes = require("./notes");

const addNotesHandler = (request, h) => {
  const { title, tags, body } = request.payload;

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNotes = { id, title, tags, createdAt, updatedAt, body };

  notes.push(newNotes);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: "success",
      message: "Catatan berhasil ditambahkan",
      data: {
        noteId: id,
      },
    });

    response.code(201);
    return response;
  }

  const response = h.response({
    status: "failed",
    message: "Catatan gagal ditambahkan",
  });
  response.code(500);
  return response;
};

const getAllNotesHandler = () => ({
  status: "success",
  data: {
    notes,
  },
});

const getNotesByIdHanlder = (request, h) => {
  const { id } = request.params;
  const note = notes.filter((n) => n.id === id)[0];

  if (note !== undefined) {
    return {
      status: "success",
      data: {
        note,
      },
    };
  }

  const response = h.response({
    status: "failed",
    message: "Data tidak ditemukan",
  });
  response.code(404);
  return response;
};

const editNotesById = (request, h) => {
  const { id } = request.params;
  const { title, tags, body } = request.payload;

  const updatedAt = new Date().toISOString();

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };

    const response = h.response({
      status: "success",
      message: "Data berhasil diubah",
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: "failed",
    message: "Gagal memperbarui catatan, id tidak ditemukan.",
  });

  response.code(404);
  return response;
};

const deleteNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes.splice(index, 1);

    const response = h.response({
      status: "success",
      message: "Catatan berhasil dihapus",
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: "failed",
    message: "Catatan gagal dihapus, id tidak ditemukan",
  });
  response.code(404);
  return response;
};

module.exports = {
  addNotesHandler,
  getAllNotesHandler,
  getNotesByIdHanlder,
  editNotesById,
  deleteNoteByIdHandler,
};
