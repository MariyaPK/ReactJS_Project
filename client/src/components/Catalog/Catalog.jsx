import styles from "./Catalog.module.css";
import { useState, useEffect } from "react";
import * as bookService from "../../services/bookService";
import CatalogItem from "./CatalogItem";


export default function Catalog() {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    bookService.getAll().then((result) => {
      // console.log(result);
      setBooks(result);
    });
  }, []);

  return (
    <section className={styles.catalog}>
      <h2>CATALOG</h2>
      <ul>
        {books.map((b) => (
          <CatalogItem key={b._id} {...b} />
        ))}
      </ul>
      {books.length === 0 && <h3>No added books!</h3>}
    </section>
  );
}