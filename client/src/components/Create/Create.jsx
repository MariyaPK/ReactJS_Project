import { useState } from "react";
import * as bookService from "../../services/bookService";
import { useNavigate } from "react-router-dom";

const formInitialState = {
  title: "",
  isbn: "",
  author: "",
  imageUrl: "",
  genre: "",
  publishYear: "",
  description: "",
};

export default function Create() {
  const navigate = useNavigate();
  const [book, setBook] = useState(formInitialState);

  const onChangeHandler = (e) => {
    let { name, value, type } = e.target;
    setBook((state) => ({ ...state, [name]: type === "number" ? Number(value) : value }));
  };

  // const resetHandler = () => {
  //     console.log('reset')
  //     setProductDetails(formInitialState);

  // }

  const onSubmit = (e) => {
    e.preventDefault();
    onCreateBookSubmit(book);
    // resetHandler();
  };
  const onCreateBookSubmit = () => {
    bookService
      .create(book)
      .then((result) => {
        setBook(result);
        navigate("/catalog");
      })
      .catch((error) => console.log(error("Error creating book:", error)));
  };

  return (
    <section id="create">
      <div className="form">
        <h2>ADD NEW BOOK</h2>
        <form className="create-form" onSubmit={onSubmit}>
          <input value={book.name} onChange={onChangeHandler} type="text" name="title" id="title" placeholder="Title" />
          <input value={book.isbn} onChange={onChangeHandler} type="text" name="isbn" id="isbn" placeholder="ISBN" />
          <input value={book.author} onChange={onChangeHandler} type="text" name="author" id="author" placeholder="Author" />

          <input
            value={book.imageUrl}
            onChange={onChangeHandler}
            type="text"
            name="imageUrl"
            id="cover-image"
            placeholder="Image"
          />
          <div className="genre">
            <select placeholder="Genre" name="genre">
              <option value="">Genre</option>
              <option value="Comics">Comics</option>
              <option value="Cookbooks">Cookbooks</option>
              <option value="Crime">Crime</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Fiction">Fiction</option>
              <option value="History">History</option>
              <option value="Humor and comedy">Humor and comedy</option>
              <option value="Mystery">Mystery</option>
              <option value="Science fiction">Science fiction</option>
              <option value="Travel">Travel</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <input
            value={book.publishYear}
            onChange={onChangeHandler}
            type="text"
            name="publishYear"
            id="publish-year"
            placeholder="Published year"
          />
          <textarea
            value={book.description}
            onChange={onChangeHandler}
            id="book-description"
            name="description"
            placeholder="Description"
            rows="5"
            cols="100"
          ></textarea>

          <button type="submit">Add book</button>
        </form>
      </div>
    </section>
  );
}
