import styles from "./Owner.module.css";

import { useEffect, useState } from "react";

import { useAuthContext } from "../../contexts/AuthContext";
import { useService } from "../../hooks/useService";
import { bookServiceFactory } from "../../services/bookService";

import CatalogItem from "../../components/Catalog/CatalogItem";

export default function Owner() {
  const bookService = useService(bookServiceFactory);
  const { userId } = useAuthContext();
  const [userBooks, setUserBooks] = useState([]);

  useEffect(() => {
    bookService.getUserBooks(userId).then((books) => {
      setUserBooks(books);
    });
  }, [userId]);

  return (
    <div className={styles["owner-books"]}>
      <div className={styles["book-card"]}>
        <span>
        {userBooks.map((book) => (
          <CatalogItem key={book._id} {...book} />
        ))}
        </span>
      </div>
    </div>
  );
}
