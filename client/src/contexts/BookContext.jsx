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
  }, [bookService]);

  const onCreateBookSubmit = async (data) => {
    const newBook = await bookService.createBook(data);

    setBooks((state) => [...state, newBook]);

    navigate("/catalog");
  };

  const onBookEditSubmit = async (bookValues) => {
    const result = await bookService.editBook(bookValues._id, bookValues);

    setBooks((state) => state.map((x) => (x._id === bookValues._id ? result : x)));

    navigate(`/catalog/${bookValues._id}`);
  };

  const deleteBook = (bookID) => {
    setBooks((state) => state.filter((book) => book._id !== bookID));
  };

  const getBook = (bookID) => {
    return books.find((book) => book._id === bookID);
  };

  const getBooksByUserId = (userId) => {
    return books.filter((book) => book.userId === userId);
  };

  const getLikedBooksByUserId = (userId) => {
    return books.filter((book) => book.likes.includes(userId));
  };

  const getCommentedBooksByUserId = (userId) => {
    return books.filter((book) => book.comments.some((comment) => comment.userId === userId));
  };

  const contextValues = {
    books,
    onCreateBookSubmit,
    onBookEditSubmit,
    deleteBook,
    getBook,
    getBooksByUserId,
    getLikedBooksByUserId,
    getCommentedBooksByUserId,
  };

  return <BookContext.Provider value={contextValues}>{children}</BookContext.Provider>;
};

export const useBookContext = () => {
  const context = useContext(BookContext);

  return context;
};
