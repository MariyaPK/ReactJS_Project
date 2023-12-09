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

  const {
    values: book,
    errors,
    changeHandler,
    onSubmit,
    changeValues,
    handleCheckboxChange,
  } = useForm(
    {
      title: "",
      isbn: "",
      author: "",
      imageUrl: "",
      genre: [],
      publishYear: "",
      summary: "",
    },
    onBookEditSubmit,
    "book"
  );

  useEffect(() => {
    bookService.getBook(bookID).then((result) => {
      changeValues(result);
    });
  }, [bookID]);

  return (
    <section id="edit" className={styles.edit}>
      <div className={`${styles.form}`}>
        <h2>EDIT</h2>
        <form className={styles["edit-form"]} onSubmit={onSubmit}>
          <div className={styles["form-group"]}>
            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title" placeholder="Title" value={book.title} onChange={changeHandler} />
            {errors.title && <span className={styles.error}>{errors.title}</span>}
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="isbn">ISBN</label>
            <input type="text" name="isbn" id="isbn" placeholder="ISBN" value={book.isbn} onChange={changeHandler} />
            {errors.isbn && <span className={styles.error}>{errors.isbn}</span>}
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="author">Author</label>
            <input type="text" name="author" id="author" placeholder="Author" value={book.author} onChange={changeHandler} />
            {errors.author && <span className={styles.error}>{errors.author}</span>}
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="genre">Genres</label>
            <div className={styles.genre}>
              {[
                "Biography ",
                "Classics ",
                "Comics ",
                "Cookbooks ",
                "Crime ",
                "Fantasy ",
                "Fiction ",
                "History ",
                "Horror ",
                "Humor/comedy ",
                "Mystery ",
                "Poetry ",
                "Romance ",
                "Science fiction ",
                "Travel ",
                "Thriller ",
                "Other ",
              ].map((genre) => (
                <label key={genre}>
                  <input
                    type="checkbox"
                    name="genre"
                    value={genre}
                    checked={book.genre?.includes(genre)}
                    onChange={() => handleCheckboxChange(genre)}
                  />
                  <span>{genre}</span>
                </label>
              ))}
            </div>
            {errors.genre && <span className={styles.error}>{errors.genre}</span>}
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="publishYear">Published Year</label>
            <input
              type="text"
              name="publishYear"
              id="publish-year"
              placeholder="Published year"
              value={book.publishYear}
              onChange={changeHandler}
            />
            {errors.publishYear && <span className={styles.error}>{errors.publishYear}</span>}
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="summary">Summary</label>
            <textarea
              name="summary"
              id="book-summary"
              placeholder="Summary"
              rows="10"
              cols="100"
              value={book.summary}
              onChange={changeHandler}
            ></textarea>
            {errors.summary && <span className={styles.error}>{errors.summary}</span>}
          </div>

          <button type="submit">Edit</button>
        </form>
      </div>
    </section>
  );
}
