import React, { useState, useEffect } from 'react';
import FavoriteSection from './components/FavoriteSection';
import StockInfo from './components/StockInfoModal';
import Search from './components/Search';

function App() {
    const [favorites, setFavorites] = useState(["AMZN", "TSLA", "GOOG"])
    return (
        <>
        <Search setFavorites={setFavorites}/>
        <FavoriteSection favorites={favorites} setFavorites={setFavorites} />
        
        </>
    );
}

export default App;
