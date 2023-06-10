import { useEffect, useState } from "react";
import StockInfoModal from "./StockInfoModal";
import "../css/Search.css";

export default function Search({ setFavorites }) {
  const [inputValue, setInputValue] = useState("");
  const [symbolList, setSymbolList] = useState([]);
  const [clickedSymbol, setClickedSymbol] = useState("GOOGL");
  const [modalVisibility, setModalVisibility] = useState(false);

  const toggleShow = () => setModalVisibility(!modalVisibility);
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
        setClickedSymbol(inputValue);
        console.log('test')
        setInputValue("");
        setSymbolList([]);
        toggleShow();
    }
  };
  const onClickHandler = (e) => {
    setClickedSymbol(e.target.innerText);

    setInputValue("");
    setSymbolList([]);
    toggleShow();
  };

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setInputValue(value);

    // Call your function to retrieve stock symbols based on the input value
    const symbols = await fetchSymbols(value);
    setSymbolList(symbols);
  };

  async function fetchSymbols(searchString) {
    const alphaToken = process.env.REACT_APP_ALPHA_TOKEN;
    // if search string is empty, return empty list
    if (searchString.length === 0) {
      return [];
    }

    try {
      const tradierToken = process.env.REACT_APP_TRADIER_TOKEN;

      const response = await fetch(
        `https://api.tradier.com/v1/markets/lookup?q=${searchString}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${tradierToken}`,
            Accept: "application/json",
          },
        }
      );

      const json = await response.json();
      const stocksData = json.securities.security;

      if (stocksData === undefined && searchString.length !== 0) {
        return ["RATE LIMITED"];
      }

      const symbols = stocksData.map((stock) => stock["symbol"]).slice(0, 10);

      return symbols;
    } catch (error) {
      console.log("error");
    }
  }


  // hides the search list when clicking outside of the search box
    useEffect(() => {
        const hideList = (e) => {
            if (e.target.className !== "symbol-list") {
                setSymbolList([]);
            }
        };
        document.addEventListener("click", hideList);
        return () => {
            document.removeEventListener("click", hideList);
        };
    }, []);

  return (
    <>
      <div className="search-section">
        <div className="search-box">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Search for a stock"
            onKeyUp={handleKeyPress}
          />
          <div className="list-container">
            <div className="symbol-list">
              {symbolList &&
                symbolList.map((symbol) => (
                  <div
                    className="symbol-item"
                    onClick={onClickHandler}
                    key={symbol}
                  >
                    {symbol}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <StockInfoModal
        stockName={clickedSymbol}
        setFavorites={setFavorites}
        modalVisibility={modalVisibility}
        toggleShow={toggleShow}
        setModalVisibility={setModalVisibility}
      />
    </>
  );
}
