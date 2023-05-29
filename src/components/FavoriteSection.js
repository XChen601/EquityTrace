import React, { useState, useEffect } from 'react';
import { deleteFromDatabase, isUserSignedIn, getUserName , getUserFavorites} from '../Firebase';

export default function FavoriteSection({ favorites, setFavorites}) {
    const [stocksData, setStocksData] = useState([]);
    
    const handleRemoveFavorite = async (symbol) => {

        deleteFromDatabase(symbol, getUserName());
        const userFavoriteList = await getUserFavorites(getUserName());
        setFavorites(userFavoriteList)
    }

    
    useEffect(() => {
        console.log(favorites)
        async function fetchStocksData() {
            if (favorites.length === 0) {
                setStocksData([])
                return
            }
            const tradierToken = process.env.REACT_APP_TRADIER_TOKEN
            const symbolList = favorites.join(',')
            
            const response = await fetch(`https://api.tradier.com/v1/markets/quotes?symbols=${symbolList}&greeks=false`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${tradierToken}`,
                    'Accept': 'application/json'
                }
            })
            const stockInfo = await response.json();
            let stockList = stockInfo.quotes.quote
            // sometimes will return dictionary if only one stock is searched
            // if stockList is not a list, make it a list
            if (!Array.isArray(stockList)) {
                stockList = [stockList];
            }
            setStocksData(stockList)
            return stockInfo.quotes.quote
        }
        fetchStocksData();
    }, [favorites]);

    return (
        <div>
            <h2>Favorited Stocks:</h2>
            {!isUserSignedIn() ? (
                <div>Sign in to save favorites!</div>
            ): stocksData.length === 0 && 
                <div>No favorites yet!</div>
            }
            
            {stocksData.map(stock => (
                <div>
                    <h4>Ticker: {stock.symbol}</h4>
                    <div>Price: {stock.ask}</div>
                    <div>Day Change: {stock.change_percentage}%</div>
                    <div>Description: {stock.description}</div>
                    <button onClick={() => handleRemoveFavorite(stock.symbol)}>Remove Favorite</button>
                </div>
            ))}

        </div>
    );
}
