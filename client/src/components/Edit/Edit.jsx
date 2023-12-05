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
    onBookEditSubmit
  );

  // console.log(book);

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
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="isbn">ISBN</label>
            <input type="text" name="isbn" id="isbn" placeholder="ISBN" value={book.isbn} onChange={changeHandler} />
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="author">Author</label>
            <input type="text" name="author" id="author" placeholder="Author" value={book.author} onChange={changeHandler} />
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="genre">Genres</label>
            <div className={styles.genre}>
              <label>
                <input
                  type="checkbox"
                  name="genre"
                  value="Comics"
                  checked={book.genre?.includes("Biography") ?? false}
                  onChange={handleCheckboxChange}
                />
                <span>Biography </span>
              </label>
              <label>
                <input
                  type="checkbox"
                  name="genre"
                  value="Comics"
                  checked={book.genre?.includes("Classics") ?? false}
                  onChange={handleCheckboxChange}
                />
                <span>Classics</span>
              </label>
              <label>
                <input
                  type="checkbox"
                  name="genre"
                  value="Comics"
                  checked={book.genre?.includes("Comics") ?? false}
                  onChange={handleCheckboxChange}
                />
                <span>Comics</span>
              </label>
              <label>
                <input
                  type="checkbox"
                  name="genre"
                  value="Cookbooks"
                  checked={book.genre?.includes("Cookbooks") ?? false}
                  onChange={handleCheckboxChange}
                />
                <span>Cookbooks</span>
              </label>
              <label>
                <input
                  type="checkbox"
                  name="genre"
                  value="Crime"
                  checked={book.genre?.includes("Crime") ?? false}
                  onChange={handleCheckboxChange}
                />
                <span>Crime</span>
              </label>
              <label>
                <input
                  type="checkbox"
                  name="genre"
                  value="Fantasy"
                  checked={book.genre?.includes("Fantasy") ?? false}
                  onChange={handleCheckboxChange}
                />
                <span>Fantasy</span>
              </label>
              <label>
                <input
                  type="checkbox"
                  name="genre"
                  value="Fiction"
                  checked={book.genre?.includes("Fiction") ?? false}
                  onChange={handleCheckboxChange}
                />
                <span>Fiction</span>
              </label>
              <label>
                <input
                  type="checkbox"
                  name="genre"
                  value="History"
                  checked={book.genre?.includes("History") ?? false}
                  onChange={handleCheckboxChange}
                />
                <span>History</span>
              </label>
              <label>
                <input
                  type="checkbox"
                  name="genre"
                  value="Comics"
                  checked={book.genre?.includes("Horror") ?? false}
                  onChange={handleCheckboxChange}
                />
                <span>Horror</span>
              </label>
              <label>
                <input
                  type="checkbox"
                  name="genre"
                  value="Humor and comedy"
                  checked={book.genre?.includes("Humor and comedy") ?? false}
                  onChange={handleCheckboxChange}
                />
                <span>Humor/Comedy</span>
              </label>
              <label>
                <input
                  type="checkbox"
                  name="genre"
                  value="Mystery"
                  checked={book.genre?.includes("Mystery") ?? false}
                  onChange={handleCheckboxChange}
                />
                <span>Mystery</span>
              </label>
              <label>
                <input
                  type="checkbox"
                  name="genre"
                  value="Comics"
                  checked={book.genre?.includes("Poetry") ?? false}
                  onChange={handleCheckboxChange}
                />
                <span>Poetry</span>
              </label>
              <label>
                <input
                  type="checkbox"
                  name="genre"
                  value="Comics"
                  checked={book.genre?.includes("Romance") ?? false}
                  onChange={handleCheckboxChange}
                />
                <span>Romance</span>
              </label>
              <label>
                <input
                  type="checkbox"
                  name="genre"
                  value="Science fiction"
                  checked={book.genre?.includes("Science fiction") ?? false}
                  onChange={handleCheckboxChange}
                />
                <span>Science fiction</span>
              </label>
              <label>
                <input
                  type="checkbox"
                  name="genre"
                  value="Travel"
                  checked={book.genre?.includes("Travel") ?? false}
                  onChange={handleCheckboxChange}
                />
                <span>Travel</span>
              </label>
              <label>
                <input
                  type="checkbox"
                  name="genre"
                  value="Comics"
                  checked={book.genre?.includes("Thriller") ?? false}
                  onChange={handleCheckboxChange}
                />
                <span>Thriller</span>
              </label>
              <label>
                <input
                  type="checkbox"
                  name="genre"
                  value="Other"
                  checked={book.genre?.includes("Other") ?? false}
                  onChange={handleCheckboxChange}
                />
                <span>Other</span>
              </label>
            </div>
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
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="summary">Summary</label>
            <textarea
              name="summary"
              id="book-summary"
              placeholder="summary"
              rows="10"
              cols="100"
              value={book.summary}
              onChange={changeHandler}
            ></textarea>
          </div>

          <button type="submit">Edit</button>
        </form>
      </div>
    </section>
  );
}
