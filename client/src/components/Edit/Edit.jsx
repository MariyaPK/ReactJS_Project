import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    bookService.getOne(bookID).then((result) => {
      setBook(result);
    });
  }, [bookID]);

  const onChangeHandler = (e) => {
    const { name, value, type, checked } = e.target;

    // Handle checkboxes
    if (type === "checkbox") {
      const updatedGenres = checked ? [...book.genre, value] : book.genre.filter((genre) => genre !== value);

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
      .update(bookID, book)
      .then(() => {
        navigate(`/details/${bookID}`);
      })
      .catch((error) => {
        console.error("Error updating book:", error);
      });
  };

  return (
    <section id="edit">
      <div className="form">
        <h2>EDIT</h2>
        <form className="edit-form" onSubmit={onSubmitHandler}>
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
          <div className="genre">
            <label>
              <input
                type="checkbox"
                name="genre"
                value="Comics"
                checked={book.genre.includes("Comics")}
                onChange={onChangeHandler}
              />
              Comics
            </label>
            <label>
              <input
                type="checkbox"
                name="genre"
                value="Cookbooks"
                checked={book.genre.includes("Cookbooks")}
                onChange={onChangeHandler}
              />
              Cookbooks
            </label>
            <label>
              <input
                type="checkbox"
                name="genre"
                value="Crime"
                checked={book.genre.includes("Crime")}
                onChange={onChangeHandler}
              />
              Crime
            </label>
            <label>
              <input
                type="checkbox"
                name="genre"
                value="Fantasy"
                checked={book.genre.includes("Fantasy")}
                onChange={onChangeHandler}
              />
              Fantasy
            </label>
            <label>
              <input
                type="checkbox"
                name="genre"
                value="Fiction"
                checked={book.genre.includes("Fiction")}
                onChange={onChangeHandler}
              />
              Fiction
            </label>
            <label>
              <input
                type="checkbox"
                name="genre"
                value="History"
                checked={book.genre.includes("History")}
                onChange={onChangeHandler}
              />
              History
            </label>
            <label>
              <input
                type="checkbox"
                name="genre"
                value="Humor and comedy"
                checked={book.genre.includes("Humor and comedy")}
                onChange={onChangeHandler}
              />
              Humor and comedy
            </label>
            <label>
              <input
                type="checkbox"
                name="genre"
                value="Mystery"
                checked={book.genre.includes("Mystery")}
                onChange={onChangeHandler}
              />
              Mystery
            </label>
            <label>
              <input
                type="checkbox"
                name="genre"
                value="Science fiction"
                checked={book.genre.includes("Science fiction")}
                onChange={onChangeHandler}
              />
              Science fiction
            </label>
            <label>
              <input
                type="checkbox"
                name="genre"
                value="Travel"
                checked={book.genre.includes("Travel")}
                onChange={onChangeHandler}
              />
              Travel
            </label>
            <label>
              <input
                type="checkbox"
                name="genre"
                value="Other"
                checked={book.genre.includes("Other")}
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

          <button type="submit">Edit</button>
        </form>
      </div>
    </section>
  );
}
