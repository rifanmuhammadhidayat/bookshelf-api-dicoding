const { nanoid } = require("nanoid");
const { books } = require("./bookshelf");

const addBookHandler = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

  const bookId = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = pageCount === readPage;

  const requiredFields = ["name", "year", "author", "summary", "publisher", "pageCount", "readPage", "reading"];

  for (const field of requiredFields) {
    if (!request.payload[field]) {
      return h
        .response({
          status: "fail",
          message: "Gagal menambahkan buku. Mohon isi nama buku",
        })
        .code(400);
    }
  }

  if (readPage > pageCount) {
    return h
      .response({
        status: "fail",
        message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
      })
      .code(400);
  }

  const book = {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    bookId,
    insertedAt,
    updatedAt,
    finished,
  };

  books.push(book);

  return h
    .response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: {
        bookId
      },
    })
    .code(201);
};

const getAllBooksHandler = (request, h) => {
  return h
    .response({
      status: "success",
      data: {
        books: books.map((book) => ({
          id: book.bookId,
          name: book.name,
          publisher: book.publisher,
        })),
      },
    })
    .code(200);

};

const getBookDetailHandler = (request, h) => {
  const { bookId } = request.params;

  const book = books.find((b) => b.bookId === bookId);

  if (book) {
    return h
      .response({
        status: "success",
        data: {
          book,
          id: book.bookId,
        },
      })
      .code(200);
  }

  return h
    .response({
      status: "fail",
      message: "Buku tidak ditemukan",
    })
    .code(404);
};


const editBookDetailHandler = (request, h) => {
  const { bookId } = request.params;
  const index = books.findIndex((book) => book.bookId === bookId);
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
  const updatedAt = new Date().toISOString();
  const finished = pageCount === readPage;

  const requiredFields = ["name", "year", "author", "summary", "publisher", "pageCount", "readPage", "reading"];

  for (const field of requiredFields) {
    if (!request.payload[field]) {
      return h
        .response({
          status: "fail",
          message: `Gagal memperbaruhi buku. Mohon isi bagian ${field}`,
        })
        .code(400);
    }
  }

  if (readPage > pageCount) {
    return h
      .response({
        status: "fail",
        message: "Gagal memperbaruhi buku. readPage tidak boleh lebih besar dari pageCount",
      })
      .code(400);
  }

  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      updatedAt,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
    };

    return h
      .response({
        status: "success",
        message: "Buku berhasil diperbarui",
      })
      .code(200);
  }

  return h
    .response({
      status: "fail",
      message: "Gagal memperbarui buku. Id tidak ditemukan",
    })
    .code(404);
};

const deleteBookHandler = (request, h) => {
  const {bookId} = request.params;
  const index = books.findIndex((book) => book.bookId === bookId)

  if (index !== -1) {
    books.splice(index, 1)

    return h.response({
      status:"success",
      message:"buku berhasil di hapus",
    }).code(200);
  }

  return h.response({
    status: "fail",
    message: "buku gagal di hapus. bookId tidak di temukan",
  }).code(404);
};

module.exports = { addBookHandler, getAllBooksHandler, getBookDetailHandler, editBookDetailHandler, deleteBookHandler};
