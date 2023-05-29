import { useEffect, useState } from "react";
import StockInfoModal from "./StockInfoModal";

export default function Search({setFavorites}) {
    const [inputValue, setInputValue] = useState('');
    const [symbolList, setSymbolList] = useState([]);
    const [clickedSymbol, setClickedSymbol] = useState('GOOGL');
    
    const onClickHandler = (e) => {
        setClickedSymbol(e.target.innerText)
    }

    const handleInputChange = async (e) => {
        const value = e.target.value;
        setInputValue(value);
    
        // Call your function to retrieve stock symbols based on the input value
        const symbols = await fetchSymbols(value);
        console.log(symbols)
        setSymbolList(symbols);
        
    };

    async function fetchSymbols(string) {
        const alphaToken = process.env.REACT_APP_ALPHA_TOKEN;
        try {
            const response = await fetch(
                `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${string}&apikey=${alphaToken}`
            );
            
            const stocksData = await response.json();
            console.log(stocksData);
            const matches = stocksData.bestMatches
            
            if (matches === undefined && string.length !== 0) {
                return ["RATE LIMITED"]
            }
            const symbols = matches.map(match => match['1. symbol'])
            console.log(symbols)

            return symbols
        } catch (error) {
            console.log('error')
        }
        
    }


    return (
        <div>
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Search for a stock"
            />
            <ul>
            {symbolList && symbolList.map((symbol) => (
                <div onClick={onClickHandler} key={symbol}>{symbol}</div>
            ))}
            </ul>
            <StockInfoModal stockName={clickedSymbol} setFavorites={setFavorites}/>
        </div>
            
        
    );
}