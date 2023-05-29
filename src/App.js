import React, { useState, useEffect } from 'react';
import FavoriteSection from './components/FavoriteSection';
import Search from './components/Search';
import SignIn from './components/SignIn';
import './App.css'
import Navbar from './components/Navbar';

function App() {
    const [favorites, setFavorites] = useState(["AMZN", "TSLA", "GOOG"])
    return (
        <>
        <Navbar setFavorites={setFavorites}/>
        <Search setFavorites={setFavorites}/>
        <FavoriteSection favorites={favorites} setFavorites={setFavorites} />
        
        </>
    );
}

export default App;
