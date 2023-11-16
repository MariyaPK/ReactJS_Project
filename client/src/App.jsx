import "./App.css";

import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import AuthNav from "./components/Header/AuthNav";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Catalog from "./components/Catalog/Catalog";
import Create from "./components/Create/Create";
import Details from "./components/Details/Details";
import Edit from "./components/Edit/Edit";
import Loading from "./components/Loading/Loading";
import Footer from "./components/Footer/Footer";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      <AuthNav />
      <Header />

      <main>
        {isLoading && <Loading />}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/create" element={<Create />} />
          <Route path="/details/:bookID" element={<Details />} />
          <Route path="/details/:bookID/edit" element={<Edit />} />

          {/* <Route path='/contact-us' element={<ContactUs/>} />
         <Route path='/about' element={<About />} />
         <Route path='/not-found' element={<NotFound />} />
         <Route path='/search' element={<Search />} />
         <Route path='*' element={<NotFound />} />    */}
        </Routes>
      </main>

      <Footer />

      {/* <!-- JAVASCRIPTS --> */}
      <script src="layout/scripts/jquery.min.js"></script>
      <script src="layout/scripts/jquery.backtotop.js"></script>
      <script src="layout/scripts/jquery.mobilemenu.js"></script>
    </>
  );
}

export default App;
