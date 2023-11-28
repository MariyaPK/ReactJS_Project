import { requestFactory } from "./requester";

const baseUrl = "http://localhost:3030/data/books";

export const bookServiceFactory = (token) => {
  const request = requestFactory(token);

  const getAll = async () => {
    try {
      const result = await request.get(baseUrl);
      const books = Object.values(result);

      return books;
    } catch (error) {
      console.log(error);
    }
  };

  const createBook = async (bookData) => {
    const result = await request.post(baseUrl, bookData);

    return result;
  };

  const getBook = async (bookID) => {
    const result = await request.get(`${baseUrl}/${bookID}`);

    return result;
  };

  const editBook = (bookID, bookData) => request.put(`${baseUrl}/${bookID}`, bookData);

  const deleteBook = (bookID) => request.delete(`${baseUrl}/${bookID}`);

  const getUserBooks = async (userId) => {
    try {
      const books = await request.get(`${baseUrl}?where=_ownerId%3D%22${userId}%22`);
      return books;
    } catch (error) {
      console.error("Error fetching user books:", error);
    }
  };

  return {
    getAll,
    getBook,
    createBook,
    editBook,
    deleteBook,
    getUserBooks,
  };
};
