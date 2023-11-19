import { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { bookServiceFactory } from '../services/bookService';

export const BookContext = createContext();

export const BookProvider = ({
    children,
}) => {
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const bookService = bookServiceFactory();

    useEffect(() => {
        bookService.getAll()
            .then(result => {
                setBooks(result)
            })
    }, []);

    const onCreateBookSubmit = async (data) => {
        const newBook = await bookService.create(data);

        setBooks(state => [...state, newBook]);

        navigate('/catalog');
    };

    const onBookEditSubmit = async (book) => {
        const result = await bookService.edit(book._id, book);

        setBooks(state => state.map(x => x._id === book._id ? result : x))

        navigate(`/catalog/${book._id}`);
    };

    const deleteBook = (bookID) => {
        setBooks(state => state.filter(book => book._id !== bookID));
    };

    const getBook = (bookID) => {
        return books.find(book => book._id === bookID);
    };

    const contextValues = {
        books,
        onCreateBookSubmit,
        onBookEditSubmit,
        deleteBook,
        getBook,
    };

    return (
        <BookContext.Provider value={contextValues}>
            {children}
        </BookContext.Provider>
    );
};

export const useBookContext = () => {
    const context = useContext(BookContext);

    return context;
};