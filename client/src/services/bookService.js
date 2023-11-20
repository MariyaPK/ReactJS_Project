import { requestFactory } from "./requester";

const baseUrl = "http://localhost:3030/jsonstore/books";

export const bookServiceFactory = (token) => {
  const request = requestFactory(token);

  const getAll = async () => {
    try {
      const result = await request.get(baseUrl);
      const books = Object.values(result);
      // console.log(books)

      return books;
    } catch (error) {
      console.log(error);
    }
  };

  const createBook = async (bookData) => {
    const result = await request.post(baseUrl, bookData);

    // console.log(result);

    return result;
  };

  const getBook = async (bookID) => {
    const result = await request.get(`${baseUrl}/${bookID}`);

    // console.log(result);

    return result;
  };

  const editBook = (bookID, bookData) => request.put(`${baseUrl}/${bookID}`, bookData);

  const deleteBook = (bookID) => request.delete(`${baseUrl}/${bookID}`);

  const getUserBooks = async (userId) => {
    const books = await request.get(`${baseUrl}?where=_ownerId%3D%22${userId}%22`);
    return books;
};

return {
  getAll,
    getBook,
    createBook,
    editBook,
    deleteBook,
    getUserBooks
};
};
