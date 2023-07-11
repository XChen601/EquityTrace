import { useEffect, useState } from "react";
import StockInfoModal from "./StockInfoModal";
import "../css/Search.css";

export default function Search({ setFavorites }) {
  const [searchText, setSearchText] = useState("");
  const [symbolList, setSymbolList] = useState([]);
  const [clickedSymbol, setClickedSymbol] = useState("GOOGL");
  const [searchListVisibility, setSearchListVisibility] = useState(true);
  const [modalVisibility, setModalVisibility] = useState(false);

  const toggleShow = () => setModalVisibility(!modalVisibility);
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
        setClickedSymbol(searchText);
        console.log('test')
        setSearchText("");
        setSymbolList([]);
        toggleShow();
    }
  };
  const onClickHandler = (e) => {
    setClickedSymbol(e.target.innerText);

    setSearchText("");
    setSymbolList([]);
    toggleShow();
  };

  const handleInputChange = async (e) => {
    setSearchText(e.target.value);
    setSearchListVisibility(true);


    // Call function to retrieve stock symbols based on the input value
    const symbols = await fetchSymbols(searchText);
    setSymbolList(symbols);
  };

  async function fetchSymbols(searchString) {
    // if search string is empty, return empty list
    if (searchString.length === 0) {
      return [];
    }

    try {
      const tradierToken = process.env.REACT_APP_TRADIER_TOKEN;
      console.log(tradierToken);
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


  // hides the search list when clicking outside of the search box and shows when clicking on search box
  useEffect(() => {
    const hideList = (e) => {
      console.log(e.target.className)
      if (e.target.className !== "symbol-list" ) {
        setSearchListVisibility(false);
      }
      if (e.target.closest('.search-box') && e.target.tagName === 'INPUT') {
        setSearchListVisibility(true);
      }
    };
    document.addEventListener("click", hideList);
    return () => {
      document.removeEventListener("click", hideList);
    };
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

  };

  return (
    <>
      <div className="search-section">
        <div className="search-box">
          <input
            type="text"
            value={searchText}
            onChange={handleInputChange}
            placeholder="Search for a stock"
            onKeyUp={handleKeyPress}
          />
          <div className="list-container">
            {searchListVisibility && (
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
            )}
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
