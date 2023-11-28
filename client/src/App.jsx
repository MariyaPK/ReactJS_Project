import "./App.css";

import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import AuthNav from "./components/Header/AuthNav";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Logout from "./components/Logout/Logout";
import RouteGuard from "./components/RouteGuard/RouteGuard";
import Catalog from "./components/Catalog/Catalog";
import Create from "./components/Create/Create";
import Details from "./components/Details/Details";
import Edit from "./components/Edit/Edit";
import NotFound from "./components/NotFound/NotFound";
import Search from "./components/Search/Search";
import Loading from "./components/Loading/Loading";
import UserProfile from "./components/UserProfile/UserProfile";
import Footer from "./components/Footer/Footer";
import { AuthProvider } from "./contexts/AuthContext";
import { BookProvider } from "./contexts/BookContext";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      <AuthProvider>
        <BookProvider>
          <AuthNav />
          <Header />

          <main>
            {isLoading && <Loading />}

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/details/:bookID" element={<Details />} />

              <Route element={<RouteGuard />}>
                <Route path="/create" element={<Create />} />
                <Route path="/details/:bookID/edit" element={<Edit />} />
                <Route path="/logout" element={<Logout />} />
              </Route>

              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/search" element={<Search />} />
            </Routes>
          </main>
        </BookProvider>
      </AuthProvider>

      <Footer />

      {/* <!-- JAVASCRIPTS --> */}
      <script src="layout/scripts/jquery.min.js"></script>
      <script src="layout/scripts/jquery.backtotop.js"></script>
      <script src="layout/scripts/jquery.mobilemenu.js"></script>
    </>
  );
}

export default App;
