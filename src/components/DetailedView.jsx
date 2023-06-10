import { useState } from "react";

export default function DetailedView ({stockInfo}) {
  const [buttonText, setButtonText] = useState("Show More");
  const [showDetailed, setShowDetailed] = useState(false);

  const handleClick = () => {
    setShowDetailed(!showDetailed);
    if (buttonText === "Show More") {
      setButtonText("Show Less");
    } else {
      setButtonText("Show More");
    }
  };
  
  return (
    <>
    {showDetailed && (
      <>
        <div>Volume: {stockInfo.volume}</div>
        <div>52 Week High: {stockInfo.week_52_high}</div>
        <div>52 Week Low: {stockInfo.week_52_low}</div>
      </>
      
    )}
    <button className="detailed-btn" onClick={handleClick}>{buttonText}</button>
    </>
    
  );
}