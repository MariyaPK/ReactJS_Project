import styles from "./Catalog.module.css";

import { useState, useEffect } from "react";

import { useBookContext } from "../../contexts/BookContext";
import CatalogItem from "./CatalogItem";
import Loading from "../Loading/Loading";

export default function Catalog() {
  const { books } = useBookContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <section className={styles.catalog}>
      <div className={styles["catalog-header"]}>
        <h2>CATALOG</h2>
        {isLoading ? (
          <Loading />
        ) : (
          <div className={styles["catalog-items"]}>
            {books?.length > 0 ? (
              <ul>
                {books.map((b) => (
                  <CatalogItem key={b._id} {...b} />
                ))}
              </ul>
            ) : (
              <span>
                <h3 className="no-books">No books added yet</h3>
              </span>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
