import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { bookServiceFactory } from "../services/bookService";

export const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const bookService = bookServiceFactory();

  useEffect(() => {
    const sendBooks = async () => {
      try {
        const result = await bookService.getAll();
        if (Array.isArray(result)) {
          setBooks(result);
        } else {
          setBooks([]);
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    sendBooks();
  }, []);

  // triggers on books changes
  useEffect(() => {
    // console.log("Books:", books);
  }, [books]);

  const onCreateBookSubmit = async (data) => {
    try {
      const newBook = await bookService.createBook(data);

     setBooks((state) => {
        const updatedBooks = [...state, newBook];
        navigate("/catalog");
        return updatedBooks;
      });
    } catch (error) {
      console.error("Error creating book:", error);
    }
  };

  const onBookEditSubmit = async (bookValues) => {
    const result = await bookService.editBook(bookValues._id, bookValues);

    setBooks((state) => state.map((x) => (x._id === bookValues._id ? result : x)));

    navigate(`/details/${bookValues._id}`);
  };

  const deleteBook = (bookID) => {
    setBooks((state) => state.filter((book) => book._id !== bookID));
  };

  const getBook = (bookID) => {
    return books.find((book) => book._id === bookID);
  };
  const getRecentlyAddedBooks = (limit) => {
    const sortedBooks = [...books].sort((a, b) => new Date(b._createdOn) - new Date(a._createdOn));
    const booksToShow = sortedBooks.slice(0, limit);

    return booksToShow;
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
