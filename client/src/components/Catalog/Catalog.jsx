import styles from "./Catalog.module.css";

import { useState, useEffect } from "react";

import { useBookContext } from "../../contexts/BookContext";
import CatalogItem from "./CatalogItem";
import Loading from "../Loading/Loading";

export default function Catalog() {
  const { books } = useBookContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {setIsLoading(false)}, []);

  return (
    <section className={styles.catalog}>
      <h2>CATALOG</h2>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {books?.length > 0 ? (
            <ul>
              {books.map((b) => (
                <CatalogItem key={b._id} {...b} />
              ))}
            </ul>
          ) : (
            <h3 className="no-articles">No books added yet</h3>
          )}
        </>
      )}
    </section>
  );
}
