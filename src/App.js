import './App.css';

import { useState } from "react"

import wordList from "./dictionary_compact.json"




function App() {

  const wordRoot = "gress".toLowerCase();
  const rootMeaning = "to step"

  const [rows, setRows] = useState([
    {number: 6, correct: false},
    {number: 8, correct: false},
    {number: 9, correct: false},
    {number: 10, correct: false},
  ])

  const [oldGuesses, setOldGuesses] = useState([])

  const [hintCreds, setHintCreds] = useState(0)

  const [currentGuessLength, setCurrentGuessLength] = useState(Math.min(...rows.map(row => row.number)))

  // console.log(currentGuessLength)
  
  const correctWords = Object.keys(wordList).filter(key => key.toLowerCase().includes(wordRoot.toLowerCase())); // Get the first key

  const checkWordExists = (word) => {
    return correctWords.includes(word.toLowerCase());
  };


  const [guess, setGuess] = useState("");
  const [guessNumber, setGuessNumber] = useState(1);

  const [win, setWin] = useState(false)
  const [lose, setLose] = useState(false)

  
  const handleType = (newGuess) => {
    setGuess(newGuess);
  }

  const handleGuess = () => {
    if (checkWordExists(guess)) {


      if (guess.length < rows[guessNumber - 1].number) {
        setHintCreds(curr => curr + 1)
      } else if (guess.length > rows[guessNumber - 1].number) {

      } else {

        setRows(curr=>{
          return curr.map((row, index) => {
            return index === guessNumber + 1 ? {...row, correct: true} : row
          })
        })
  
        setGuess("");
        setGuessNumber(curr => {
          if (curr === rows.length) setWin(true);
          return curr + 1});
        setOldGuesses(curr => [...curr, guess])

      }



    }
    // console.log(wordList[guess])
  }

  return (
    <div className="App">

      <div className="result-overlay" style={{display: win || lose ? "" : "none"}}>
          {<h1>{win ? "You win!" : "You lose!"}</h1>}
          <button className="play-again" onClick={()=>{window.location.reload()}}>
            Play Again!
          </button>
        </div>
      <div className="home-body">
        <div className="date-header">
        <h4 style={{width: "fit-content", padding: "10px"}}>
          {new Date().toLocaleDateString('en-US',{ year: 'numeric', month: 'long', day: 'numeric' })}
        </h4>
        </div>
        <div className="root-title">
            <h1>
              {wordRoot}
            </h1>
            <h4>
              {rootMeaning}
            </h4>
        </div>
        {hintCreds}

        <div className="main-body">
        <div className="word-rows-container">
          {rows.map((row, rowIndex) => {
            return (
              <div style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "15px"
              }}
              
              key={rowIndex}>

              <div style={{
                display: "flex",
                justifyContent: rowIndex !== guessNumber - 1 ? "center" : "flex-end",
                alignItems: "center",
                width: "100%",
                backgroundColor: rowIndex === guessNumber - 1 ? "" : rowIndex < guessNumber - 1 ? "green" : "gray",
                padding: rowIndex !== guessNumber - 1 ? "20px 0px" : ""
              }}>

                    {
                      rowIndex < guessNumber - 1 ? 
                      <div style={{
                        color: "white"
                      }}>
                        {oldGuesses[rowIndex].toUpperCase()}
                      </div> :
                      <div style={{
                        color: "white",
                        height: "40px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                      }}>
                        {`${rows[rowIndex].number} LETTERS`}
                      </div>
                    }

                    {rowIndex <= guessNumber - 1 && <div style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          backgroundColor: guessNumber >= rowIndex + 2 ? "green" : "rgb(209,209,209)",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          marginRight: "15px",
                          color: guessNumber >= rowIndex + 2 ? "white" : "",
                        }}>
                          {rows[rowIndex].number}
                          </div>
                      }
              </div>

                 { rowIndex >= guessNumber - 1 && <div className="word-row" style={{
                  display: rowIndex >= guessNumber ? "none" : ""
                 }}>
                      {Array.from({ length: row.number }, (_, colIndex) => (
                        <div key={colIndex} className="letter-box"
                        style={{
                          backgroundColor: guessNumber === rowIndex + 1 ? "white" : guessNumber > rowIndex + 1 ? "green" : "rgb(209,209,209)",
                          color: guessNumber >= rowIndex + 2 ? "white" : "",
                        }}>
                          {guessNumber === rowIndex + 1 ? guess[colIndex] : guessNumber > rowIndex + 1 ? oldGuesses[rowIndex][colIndex] : ""}
                        </div>
                      ))}
              </div> 
              }


              </div>

            )
          
          })}
        </div>

        </div>
        <div className="search-bar">
          <input
          value={guess}
          onChange={(e)=>{handleType(e.target.value)}}>
          </input>
        </div>
        <div className="submit-container">
          <button onClick={()=>{handleGuess()}}>
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
