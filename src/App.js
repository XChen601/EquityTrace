import React, { useState, useEffect } from 'react';
import FavoriteSection from './components/FavoriteSection';
import StockInfo from './components/StockInfoModal';
import Search from './components/Search';
import SignIn from './components/SignIn';

function App() {
    const [favorites, setFavorites] = useState(["AMZN", "TSLA", "GOOG"])
    return (
        <>
        <SignIn setFavorites={setFavorites}/>
        <Search setFavorites={setFavorites}/>
        <FavoriteSection favorites={favorites} setFavorites={setFavorites} />
        
        </>
    );
}

export default App;
