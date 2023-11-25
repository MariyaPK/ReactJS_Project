import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { bookServiceFactory } from "../services/bookService";

export const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const bookService = bookServiceFactory();

  useEffect(() => {
    bookService.getAll().then((result) => {
      setBooks(result);
    });
  }, []);

  const onCreateBookSubmit = async (data) => {
    const newBook = await bookService.createBook(data);

    setBooks((state) => [...state, newBook]);
    console.log(setBooks(newBook));

    navigate("/catalog");
  };

  const onBookEditSubmit = async (bookValues) => {
    const result = await bookService.editBook(bookValues._id, bookValues);

    setBooks((state) => state.map((x) => (x._id === bookValues._id ? result : x)));
    console.log("onBookEditSubmit - BookContext")

    navigate(`/catalog/${bookValues._id}`);
  };

  const deleteBook = (bookID) => {
    setBooks((state) => state.filter((book) => book._id !== bookID));
  };

  const getBook = (bookID) => {
    return books.find((book) => book._id === bookID);
  };

  const getRecentlyAddedBooks = (limit) => {
    const sortedBooks = [...books].sort((a, b) => new Date(b._createdOn) - new Date(a._createdOn));
    return sortedBooks.slice(0, limit);
  };


  const contextValues = {
    books,
    onCreateBookSubmit,
    onBookEditSubmit,
    deleteBook,
    getBook,
    recentlyAddedBooks: getRecentlyAddedBooks(5),
  };

  return <BookContext.Provider value={contextValues}>{children}</BookContext.Provider>;
};

export const useBookContext = () => {
  const context = useContext(BookContext);

  return context;
};
