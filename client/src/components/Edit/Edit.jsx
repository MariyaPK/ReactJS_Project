import styles from "./Edit.module.css";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as bookService from "../../services/bookService";

export default function Edit() {
  const { bookID } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState({
    title: "",
    isbn: "",
    author: "",
    imageUrl: "",
    genre: [],
    publishYear: "",
    description: "",
  });

  console.log(book);

  useEffect(() => {
    // Fetch the existing book details when the component mounts
    bookService.getOne(bookID).then((result) => {
      setBook(result);
    });
  }, [bookID]);

  const onChangeHandler = (e) => {
    const { name, value, type, checked } = e.target;

    // Ensure that book.genre is always an array
    const currentGenres = Array.isArray(book.genre) ? book.genre : [];

    // Handle checkboxes
    if (type === "checkbox") {
      const updatedGenres = checked ? [...currentGenres, value] : currentGenres.filter((genre) => genre !== value);

      setBook((book) => ({
        ...book,
        [name]: updatedGenres,
      }));
    } else {
      setBook((book) => ({
        ...book,
        [name]: type === "number" ? Number(value) : value,
      }));
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    bookService
      .edit(bookID, book)
      .then(() => {
        navigate(`/details/${bookID}`);
      })
      .catch((error) => {
        console.error("Error updating book:", error);
      });

      console.log('Form submitted!', e);
  };

  return (
    <section id="edit" className={styles.edit}>
      <div className={`${styles.form} form`}>
        <h2>EDIT</h2>
        <form className={styles["edit-form"]} onSubmit={onSubmitHandler}>
          <input type="text" name="title" id="title" placeholder="Title" value={book.title} onChange={onChangeHandler} />
          <input type="text" name="isbn" id="isbn" placeholder="ISBN" value={book.isbn} onChange={onChangeHandler} />
          <input type="text" name="author" id="author" placeholder="Author" value={book.author} onChange={onChangeHandler} />
          <input
            type="text"
            name="imageUrl"
            id="cover-image"
            placeholder="Cover"
            value={book.imageUrl}
            onChange={onChangeHandler}
          />
          <div className={styles.genre}>
            <label>
              <input
                type="checkbox"
                name="genre"
                value="Comics"
                checked={book.genre?.includes("Comics") ?? false}
                onChange={onChangeHandler}
              />
              Comics
            </label>
            <label>
              <input
                type="checkbox"
                name="genre"
                value="Cookbooks"
                checked={book.genre?.includes("Cookbooks") ?? false}
                onChange={onChangeHandler}
              />
              Cookbooks
            </label>
            <label>
              <input
                type="checkbox"
                name="genre"
                value="Crime"
                checked={book.genre?.includes("Crime") ?? false}
                onChange={onChangeHandler}
              />
              Crime
            </label>
            <label>
              <input
                type="checkbox"
                name="genre"
                value="Fantasy"
                checked={book.genre?.includes("Fantasy") ?? false}
                onChange={onChangeHandler}
              />
              Fantasy
            </label>
            <label>
              <input
                type="checkbox"
                name="genre"
                value="Fiction"
                checked={book.genre?.includes("Fiction") ?? false}
                onChange={onChangeHandler}
              />
              Fiction
            </label>
            <label>
              <input
                type="checkbox"
                name="genre"
                value="History"
                checked={book.genre?.includes("History") ?? false}
                onChange={onChangeHandler}
              />
              History
            </label>
            <label>
              <input
                type="checkbox"
                name="genre"
                value="Humor and comedy"
                checked={book.genre?.includes("Humor and comedy") ?? false}
                onChange={onChangeHandler}
              />
              Humor and comedy
            </label>
            <label>
              <input
                type="checkbox"
                name="genre"
                value="Mystery"
                checked={book.genre?.includes("Mystery") ?? false}
                onChange={onChangeHandler}
              />
              Mystery
            </label>
            <label>
              <input
                type="checkbox"
                name="genre"
                value="Science fiction"
                checked={book.genre?.includes("Science fiction") ?? false}
                onChange={onChangeHandler}
              />
              Science fiction
            </label>
            <label>
              <input
                type="checkbox"
                name="genre"
                value="Travel"
                checked={book.genre?.includes("Travel") ?? false}
                onChange={onChangeHandler}
              />
              Travel
            </label>
            <label>
              <input
                type="checkbox"
                name="genre"
                value="Other"
                checked={book.genre?.includes("Other") ?? false}
                onChange={onChangeHandler}
              />
              Other
            </label>
          </div>
          <input
            type="text"
            name="publishYear"
            id="publish-year"
            placeholder="Published year"
            value={book.publishYear}
            onChange={onChangeHandler}
          />
          <textarea
            id="book-description"
            name="description"
            placeholder="Description"
            rows="5"
            cols="100"
            value={book.description}
            onChange={onChangeHandler}
          ></textarea>

          <button type="submit" >Edit</button>
        </form>
      </div>
    </section>
  );
}
