import React from "react";
import { useState } from "react";
import * as bookService from "../../services/bookService";
import { useNavigate } from "react-router-dom";
import styles from "./Create.module.css";

const formInitialState = {
  title: "",
  isbn: "",
  author: "",
  imageUrl: "",
  genres: [],
  publishYear: "",
  description: "",
};

const Create = () => {
  const navigate = useNavigate();
  const [book, setBook] = useState(formInitialState);

  const handleCheckboxChange = (genre) => {
    setBook((book) => {
      const isSelected = book.genres.includes(genre);
      if (isSelected) {
        return { ...book, genres: book.genres.filter((selectedGenre) => selectedGenre !== genre) };
      } else {
        return { ...book, genres: [...book.genres, genre] };
      }
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    onCreateBookSubmit();
  };

  const onCreateBookSubmit = () => {
    bookService
      .create(book)
      .then((result) => {
        setBook(formInitialState); // Reset the form after successful creation
        navigate("/catalog");
      })
      .catch((error) => console.error("Error creating book:", error));
  };

  return (
    <section className={styles.create}>
      <div className={styles.form}>
        <h2>ADD NEW BOOK</h2>
        <form className={styles["create-form"]} onSubmit={onSubmit}>
          <div className={styles["form-group"]}>
            <label htmlFor="title">Title</label>
            <input
              value={book.title}
              onChange={(e) => setBook((book) => ({ ...book, title: e.target.value }))}
              type="text"
              name="title"
              id="title"
              placeholder="Title"
            />
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="isbn">ISBN</label>
            <input
              value={book.isbn}
              onChange={(e) => setBook((book) => ({ ...book, isbn: e.target.value }))}
              type="text"
              name="isbn"
              id="isbn"
              placeholder="ISBN"
            />
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="author">Author</label>
            <input
              value={book.author}
              onChange={(e) => setBook((book) => ({ ...book, author: e.target.value }))}
              type="text"
              name="author"
              id="author"
              placeholder="Author"
            />
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="cover-image">Cover</label>
            <input
              value={book.imageUrl}
              onChange={(e) => setBook((book) => ({ ...book, imageUrl: e.target.value }))}
              type="text"
              name="imageUrl"
              id="cover-image"
              placeholder="Cover"
            />
          </div>
          <div className={styles["form-group"]}>
            <label>Genres</label>
            <div className={styles["checkbox-group"]}>
              {["Comics", "Cookbooks", "Crime", "Fantasy", "Fiction", "History", "Humor and comedy", "Mystery", "Science fiction", "Travel", "Other"].map((genre) => (
                <label key={genre} className={styles["checkbox-label"]}>
                  <input
                    type="checkbox"
                    value={genre}
                    checked={book.genres.includes(genre)}
                    onChange={() => handleCheckboxChange(genre)}
                  />
                  {genre}
                </label>
              ))}
            </div>
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="publish-year">Published Year</label>
            <input
              value={book.publishYear}
              onChange={(e) => setBook((book) => ({ ...book, publishYear: e.target.value }))}
              type="text"
              name="publishYear"
              id="publish-year"
              placeholder="Published year"
            />
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="book-description">Description</label>
            <textarea
              value={book.description}
              onChange={(e) => setBook((book) => ({ ...book, description: e.target.value }))}
              id="book-description"
              name="description"
              placeholder="Description"
              rows="5"
              cols="100"
            ></textarea>
          </div>

          <button type="submit">Add book</button>
        </form>
      </div>
    </section>
  );
};

export default Create;

