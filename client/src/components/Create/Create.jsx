import styles from "./Create.module.css";

import { useBookContext } from "../../contexts/BookContext";
import { useForm } from "../../hooks/useForm";

export default function Create() {
  const { onCreateBookSubmit } = useBookContext();

  const {
    values: book,
    changeHandler,
    onSubmit,
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
    onCreateBookSubmit
  );

  return (
    <section className={styles.create}>
      <div className={styles.form}>
        <h2>Add book to the shelf</h2>
        <form className={styles["create-form"]} method="POST" onSubmit={onSubmit}>
          <div className={styles["form-group"]}>
            <label htmlFor="title">Title</label>
            <input value={book.title} onChange={changeHandler} type="text" name="title" id="title" placeholder="Title" />
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="isbn">ISBN</label>
            <input value={book.isbn} onChange={changeHandler} type="text" name="isbn" id="isbn" placeholder="ISBN" />
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="author">Author</label>
            <input value={book.author} onChange={changeHandler} type="text" name="author" id="author" placeholder="Author" />
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="cover-image">Cover</label>
            <input
              value={book.imageUrl}
              onChange={changeHandler}
              type="text"
              name="imageUrl"
              id="cover-image"
              placeholder="Cover"
            />
          </div>
          <div className={styles["form-group"]}>
            <label>Genres</label>
            <div className={styles["checkbox-group"]}>
              {[
                "Biography",
                "Classics",
                "Comics",
                "Cookbooks",
                "Crime",
                "Fantasy",
                "Fiction",
                "History",
                "Horror",
                "Humor/Comedy",
                "Mystery",
                "Poetry",
                "Romance",
                "Science fiction",
                "Thriller",
                "Travel",
                "Other",
              ].map((genre) => (
                <label key={genre} className={styles["checkbox-label"]}>
                  <input
                    type="checkbox"
                    value={genre}
                    checked={book.genre.includes(genre)}
                    onChange={() => handleCheckboxChange(genre)}
                  />
                  <span>{genre}</span>
                </label>
              ))}
            </div>
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="publish-year">Published Year</label>
            <input
              value={book.publishYear}
              onChange={changeHandler}
              type="text"
              name="publishYear"
              id="publish-year"
              placeholder="Published year"
            />
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="book-summary">Summary</label>
            <textarea
              value={book.summary}
              onChange={changeHandler}
              name="summary"
              id="book-summary"
              placeholder="Summary"
              rows="10"
              cols="100"
            ></textarea>
          </div>

          <button type="submit">Add book</button>
        </form>
      </div>
    </section>
  );
}
