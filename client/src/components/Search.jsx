import { useEffect, useState } from "react";
import SearchModal from "./SearchModal";
import "../css/Search.css";
import { AiOutlineSearch } from "react-icons/ai";

export default function Search() {
  const [searchText, setSearchText] = useState("");
  const [symbolList, setSymbolList] = useState([]);
  const [clickedSymbol, setClickedSymbol] = useState("GOOGL");
  const [searchListVisibility, setSearchListVisibility] = useState(true);
  const [modalVisibility, setModalVisibility] = useState(false);

  const toggleModalVisibility = () => setModalVisibility(!modalVisibility);
  const handleSearchClick = () => {
    setClickedSymbol(searchText);
    setSearchText("");
    setSymbolList([]);
    toggleModalVisibility();
  };

  const handleEnterKey = (event) => {
    if (event.key === 'Enter') {
        setClickedSymbol(searchText);
        setSearchText("");
        setSymbolList([]);
        toggleModalVisibility();
    }
  };
  const onClickHandler = (e) => {
    setClickedSymbol(e.target.innerText);

    setSearchText("");
    setSymbolList([]);
    toggleModalVisibility();
  };

  const handleInputChange = async (e) => {
    const searchValue = e.target.value
    setSearchText(searchValue);
    setSearchListVisibility(true);


    // Call function to retrieve stock symbols based on the input value
    const symbols = await fetchSymbols(searchValue);
    setSymbolList(symbols);
    console.log(symbols)
  };

  async function fetchSymbols(searchString) {
    // if search string is empty, return empty list
    if (searchString.length === 0) {
      return [];
    }

    try {
      const tradierToken = process.env.REACT_APP_TRADIER_TOKEN;
      console.log(tradierToken[0])
      console.log("TESTTTT")
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

  return (
    <>
      <div className="search-section">
        <div className="search-content">
          <div className="search-box">
            <input
              type="text"
              value={searchText}
              onChange={handleInputChange}
              placeholder="Search for a stock"
              onKeyUp={handleEnterKey}
            />
            <button className="search-button" onClick={handleSearchClick}><AiOutlineSearch /></button>
          </div>
          
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
      <SearchModal
        stockName={clickedSymbol}
        modalVisibility={modalVisibility}
        toggleModalVisibility={toggleModalVisibility}
        setModalVisibility={setModalVisibility}
      />
    </>
  );
}
