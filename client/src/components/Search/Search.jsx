import { useState, useEffect } from "react";
import styles from "./Search.module.css";
import * as bookService from "../../services/bookService";

export default function Search() {
  const [searchBook, setSearchBook] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [allBooks, setAllBooks] = useState([]);

  useEffect(() => {
    // Fetch all books initially
    bookService.getAll().then((result) => {
      setAllBooks(result);
    });
  }, []); // Empty dependency array means this effect runs once after the initial render

  const handleSearch = (e) => {
    e.preventDefault();

    const searchBookLower = searchBook.toLowerCase();

    const results = allBooks.filter(
      (book) =>
        book.title.toLowerCase().includes(searchBookLower) ||
        book.author.toLowerCase().includes(searchBookLower)
    );

    setSearchResults(results);
  };

  return (
    <section className={styles.search}>
      <section className={styles["search-form"]}>
        <h2>Search Books</h2>

        <form className={styles.form} onSubmit={handleSearch}>
          <input
            type="text"
            name="search"
            placeholder="Search for books..."
            value={searchBook}
            onChange={(e) => setSearchBook(e.target.value)}
          />
          <button type="submit">SEARCH</button>
        </form>

        <h2>Results:</h2>

        <div id="search-container">
          <ul className={styles["book-wrapper"]}>
            {searchResults.map((book) => (
              <li key={book.id} className={styles.bookCard}>
                <img src={book.imageUrl} height="200px" alt={book.title} />
                <div className={styles.bookDetails}>
                  <h3>{book.title}</h3>
                  <p>
                    <strong>Author: </strong>
                    <span className={styles.author}>{book.author}</span>
                  </p>
                  <a className={styles["details-btn"]} href={`/details/${book.id}`}>
                    Details
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </section>
  );
}
