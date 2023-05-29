import { useEffect, useState } from "react";
import { addToDatabase, getUserFavorites, getUserName } from "../Firebase";
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
  } from 'mdb-react-ui-kit';

export default function StockInfoModal({ stockName, setFavorites, modalVisibility, toggleShow, setModalVisibility }) {
    const [stockInfo, setStockInfo] = useState({});

    async function addToFavorites() {
        await addToDatabase(stockName, getUserName());
        const userFavoriteList = await getUserFavorites(getUserName());
        setFavorites(userFavoriteList);
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
            <MDBModal show={modalVisibility} setShow={setModalVisibility} tabIndex='-1'>
                <MDBModalDialog centered>
                    <MDBModalContent >
                        <MDBModalHeader>
                        <MDBModalTitle>Stock Information:</MDBModalTitle>
                        <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <h4>Ticker: {stockInfo.symbol}</h4>
                            <div>Price: {stockInfo.ask}</div>
                            <div>Day Change: {stockInfo.change_percentage}%</div>
                            <div>Description: {stockInfo.description}</div>
                        </MDBModalBody>

                        <MDBModalFooter>
                        <button onClick={addToFavorites}>Favorite!</button>
                        <button color='secondary' onClick={toggleShow}>
                            Close
                        </button>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </div>
    )

}