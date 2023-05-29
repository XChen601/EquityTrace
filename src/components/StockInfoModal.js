import { useEffect, useState } from "react";


export default function StockInfoModal({ stockName, setFavorites }) {
    const [stockInfo, setStockInfo] = useState({});

    function addToFavorites() {
        setFavorites(prevFavorites => [...prevFavorites, stockName])
    }

    useEffect(() => {
        async function fetchStockInfo(symbol) {
            const tradierToken = process.env.REACT_APP_TRADIER_TOKEN
            const response = await fetch(`https://api.tradier.com/v1/markets/quotes?symbols=${symbol}&greeks=false`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${tradierToken}`,
                    'Accept': 'application/json'
                }
            })
            const stocksData = await response.json();
            console.log(stocksData.quotes.quote)
            setStockInfo(stocksData.quotes.quote)
            return stocksData.quotes.quote
        }
        fetchStockInfo(stockName);

    }, [stockName]);
    return (
        <div>
            <h1>Stock Information:</h1>
            <h4>Ticker: {stockInfo.symbol}</h4>
            <div>Price: {stockInfo.ask}</div>
            <div>Day Change: {stockInfo.change_percentage}%</div>
            <div>Description: {stockInfo.description}</div>
            <button onClick={addToFavorites}>Favorite!</button>
            <button>Close Modal</button>
        </div>
    )

}