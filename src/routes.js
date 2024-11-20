const { addBookHandler, getAllBooksHandler, getBookDetailHandler, editBookDetailHandler, deleteBookHandler } = require("./handler");

const routes = [
  {
    method: "POST",
    path: "/books",
    handler: addBookHandler,
  },
  {
    method: "GET",
    path: "/books",
    handler: getAllBooksHandler,
  },
  {
    method: "GET",
    path: "/books/{bookId}",
    handler: getBookDetailHandler,
  },
  {
    method:"PUT",
    path:"/books/{bookId}",
    handler: editBookDetailHandler,
  },
  {
    method:"DELETE",
    path:"/books/{bookId}",
    handler: deleteBookHandler,
  },
];

module.exports = routes;
