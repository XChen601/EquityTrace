import React, { useState, useEffect } from 'react';
import FavoriteSection from './components/FavoriteSection';

function App() {
    const [favorites, setFavorites] = useState(["AMZN", "TSLA", "GOOG"])
    return (
        <>
        <FavoriteSection favorites={favorites} setFavorites={setFavorites} />
        </>
    );
}

export default App;
