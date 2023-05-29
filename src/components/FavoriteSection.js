import React, { useState, useEffect } from 'react';
import { deleteFromDatabase, isUserSignedIn, getUserName , getUserFavorites} from '../Firebase';
import '../css/FavoriteSection.css'
import 'bootstrap/dist/css/bootstrap.css';

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
        <div className='favorited-section'>
            <h2 className='section-title'>Favorited Stocks</h2>
            {!isUserSignedIn() ? (
                <div>Sign in to save favorites!</div>
            ): stocksData.length === 0 && 
                <div>No favorites yet!</div>
            }
            
            <div className='card-section'>

                {stocksData.map(stock => (
                <div className='stock-card'>
                    <h4>{stock.symbol}</h4>
                    <div>{stock.description}</div>
                    <br></br>
                    <div>Price: ${stock.ask}</div>
                    <div>Day Change: {stock.change_percentage}%</div>
                    <button onClick={() => handleRemoveFavorite(stock.symbol)}>Remove Favorite</button>
                </div>
                ))} 

               
            </div>
            

        </div>
    );
}
