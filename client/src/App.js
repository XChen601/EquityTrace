import React, { useState, useEffect } from "react";
import FavoriteSection from "./components/FavoriteSection";
import Search from "./components/Search";
import "./App.css";
import Navbar from "./components/Navbar";
import PopularSection from "./components/PopularSection";
import Footer from "./components/Footer";

function App() {
  const [favorites, setFavorites] = useState([]);

  async function addToFavorites(stockName, stockPrice) {}

  return (
    <>
      <Navbar setFavorites={setFavorites} />
      <Search setFavorites={setFavorites} />
      <FavoriteSection favorites={favorites} setFavorites={setFavorites} />
      <PopularSection addToFavorites={addToFavorites} />
      <Footer />
    </>
  );
}

export default App;
