import React, { useState, useEffect } from 'react';

export default function FavoriteSection({ favorites, setFavorites}) {
    const [stocksData, setStocksData] = useState([]);
    

    useEffect(() => {
        async function fetchStocksData() {
            const tradierToken = process.env.REACT_APP_TRADIER_TOKEN
            const symbolList = favorites.join(',')
            
            const response = await fetch(`https://api.tradier.com/v1/markets/quotes?symbols=${symbolList}&greeks=false`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${tradierToken}`,
                    'Accept': 'application/json'
                }
            })
            const stocksData = await response.json();
            console.log(stocksData.quotes.quote)
            setStocksData(stocksData.quotes.quote)
            return stocksData.quotes.quote
        }
        fetchStocksData();
    }, [favorites]);

    return (
        <div>
            <h2>Favorited Stocks:</h2>
            {stocksData.map(stock => (
                <div>
                    <h4>Ticker: {stock.symbol}</h4>
                    <div>Price: {stock.ask}</div>
                    <div>Day Change: {stock.change_percentage}%</div>
                    <div>Description: {stock.description}</div>
                    <button>Remove Favorite</button>
                </div>
            ))}

        </div>
    );
}
