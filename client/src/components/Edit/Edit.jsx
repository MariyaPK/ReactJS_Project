import styles from "./Edit.module.css";

import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useBookContext } from "../../contexts/BookContext";

import { useForm } from "../../hooks/useForm";
import { useService } from "../../hooks/useService";
import { bookServiceFactory } from "../../services/bookService";

export default function Edit() {
  const { onBookEditSubmit } = useBookContext();
  const { bookID } = useParams();
  const bookService = useService(bookServiceFactory);

  const { values: book, changeHandler, onSubmit, changeValues, handleCheckboxChange } = useForm({
    title: "",
    isbn: "",
    author: "",
    imageUrl: "",
    genre: [],
    publishYear: "",
    description: "",
  }, onBookEditSubmit);

  // console.log(book);

  useEffect(() => {
    bookService.getBook(bookID)
    .then(result => { 
      changeValues(result)
    });
  }, [bookID]);

  return (
    <section id="edit" className={styles.edit}>
      <div className={`${styles.form} form`}>
        <h2>EDIT</h2>
        <form className={styles["edit-form"]} onSubmit={onSubmit}>
          <input type="text" name="title" id="title" placeholder="Title" value={book.title} onChange={changeHandler} />
          <input type="text" name="isbn" id="isbn" placeholder="ISBN" value={book.isbn} onChange={changeHandler} />
          <input type="text" name="author" id="author" placeholder="Author" value={book.author} onChange={changeHandler} />
          <input
            type="text"
            name="imageUrl"
            id="cover-image"
            placeholder="Cover"
            value={book.imageUrl}
            onChange={changeHandler}
          />
          <div className={styles.genre}>
            <label>
              <input
                type="checkbox"
                name="genre"
                value="Comics"
                checked={book.genre?.includes("Comics") ?? false}
                onChange={handleCheckboxChange}
              />
              Comics
            </label>
            <label>
              <input
                type="checkbox"
                name="genre"
                value="Cookbooks"
                checked={book.genre?.includes("Cookbooks") ?? false}
                onChange={handleCheckboxChange}
              />
              Cookbooks
            </label>
            <label>
              <input
                type="checkbox"
                name="genre"
                value="Crime"
                checked={book.genre?.includes("Crime") ?? false}
                onChange={handleCheckboxChange}
              />
              Crime
            </label>
            <label>
              <input
                type="checkbox"
                name="genre"
                value="Fantasy"
                checked={book.genre?.includes("Fantasy") ?? false}
                onChange={handleCheckboxChange}
              />
              Fantasy
            </label>
            <label>
              <input
                type="checkbox"
                name="genre"
                value="Fiction"
                checked={book.genre?.includes("Fiction") ?? false}
                onChange={handleCheckboxChange}
              />
              Fiction
            </label>
            <label>
              <input
                type="checkbox"
                name="genre"
                value="History"
                checked={book.genre?.includes("History") ?? false}
                onChange={handleCheckboxChange}
              />
              History
            </label>
            <label>
              <input
                type="checkbox"
                name="genre"
                value="Humor and comedy"
                checked={book.genre?.includes("Humor and comedy") ?? false}
                onChange={handleCheckboxChange}
              />
              Humor and comedy
            </label>
            <label>
              <input
                type="checkbox"
                name="genre"
                value="Mystery"
                checked={book.genre?.includes("Mystery") ?? false}
                onChange={handleCheckboxChange}
              />
              Mystery
            </label>
            <label>
              <input
                type="checkbox"
                name="genre"
                value="Science fiction"
                checked={book.genre?.includes("Science fiction") ?? false}
                onChange={handleCheckboxChange}
              />
              Science fiction
            </label>
            <label>
              <input
                type="checkbox"
                name="genre"
                value="Travel"
                checked={book.genre?.includes("Travel") ?? false}
                onChange={handleCheckboxChange}
              />
              Travel
            </label>
            <label>
              <input
                type="checkbox"
                name="genre"
                value="Other"
                checked={book.genre?.includes("Other") ?? false}
                onChange={handleCheckboxChange}
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
            onChange={changeHandler}
          />
          <textarea
            id="book-description"
            name="description"
            placeholder="Description"
            rows="5"
            cols="100"
            value={book.description}
            onChange={changeHandler}
          ></textarea>

          <button type="submit">Edit</button>
        </form>
      </div>
    </section>
  );
}
