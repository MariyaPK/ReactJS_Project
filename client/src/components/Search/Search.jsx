import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';

import { bookServiceFactory } from "../../services/bookService.js";

export default function Search () {
  const bookService = bookServiceFactory();
  
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const searchRef = useRef(null);

  const filteredSuggestions = books?.filter((book) => {
    const isTitleString = book.title && typeof book.title === "string";
    const includesQuery = isTitleString && book.title.toLowerCase().includes(query.trim().toLowerCase());
  
    return includesQuery;
  });

  const handleQuery = (e) => {
    const inputValue = e.target.value;
    setQuery(inputValue);
    setShowSuggestions(inputValue.length > 0);
  };

  const onSearch = () => {
  };

  const onSuggestionClick = (value, book) => {
    setQuery(value);
    setShowSuggestions(false);
    setSelectedBook(book);
    if (searchRef.current) {
      searchRef.current.blur();
    }
  };

  useEffect(() => {
    bookService.getAll().then((data) => setBooks(data));
  }, []);

  return (
    <form onSubmit={handleSubmit(onSearch)}>
      <input
        type="text"
        {...register("query")}
        className="search-form"
        placeholder="Search"
        value={query}
        autoComplete="off"
        onChange={handleQuery}
        ref={searchRef}
      />
      {showSuggestions && filteredSuggestions.length > 0 && (
        <div className="suggestions">
          {filteredSuggestions.map((suggestion) => (
            <div
              className="suggestion"
              key={suggestion._id}
              onClick={() => onSuggestionClick(suggestion.title, suggestion)}
            >
              {suggestion.title}
            </div>
          ))}
        </div>
      )}
      {selectedBook && (
        <div className="selected-book-card">
          <h2>{selectedBook.title}</h2>
          <img src={selectedBook.imageUrl} alt={selectedBook.title} />
          <button onClick={() => navigate(`/details/${selectedBook._id}`)}>Details</button>
        </div>
      )}
    </form>
  );
}

