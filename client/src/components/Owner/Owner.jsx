import { useEffect, useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { useService } from "../../hooks/useService";
import { bookServiceFactory } from "../../services/bookService";
import CatalogItem from "../../components/Catalog/CatalogItem";

export default function Owner() {
  const bookService = useService(bookServiceFactory);
  const { userId } = useAuthContext();
  const [userBooks, setUserBooks] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    bookService
      .getUserBooks(userId)
      .then((photos) => {
        setUserBooks(photos);
      })
      // .finally(setIsLoading(false));
  }, [userId]);

  return (
    <div className="portfolio-text">
      <div className="container-fluid pt-10">
        <div className="row justify-content-md-center ">
          <div className="col-md-10 col-sm-12">
            {/* {isLoading ? (
              <p>Loading...</p>
            ) : ( */}
              <div className="card-columns">
                {userBooks.map((book) => (
                  <CatalogItem key={book._id} {...book} />
                ))}
              </div>
            {/* )} */}
          </div>
        </div>
      </div>
    </div>
  );
}