import { useEffect, useState } from "react"
import "./App.css"
import { moneyPyramid, data } from "./data"
import Quiz from "./Components/Quiz"
import Timer from "./Components/Timer"

function App() {
  const [question, setQuestion] = useState(1)
  const [timeOut, setTimeOut] = useState(false);
  const [earned, setEarned] = useState("$ 0");
  const [startTimer, setStartTimer] = useState(false);
  
  useEffect(() => {
    question > 1 && setEarned(moneyPyramid.find(eachItem => eachItem.id === question - 1).amount)
  }, [moneyPyramid, question])
  return (
    <div className="app">
      <div className="main">
        {timeOut ? <h1 className="end-text">You Earned :{earned}</h1> : (
          <>
            <div className="top">
              <div className="timer">
                <Timer 
                setTimeOut={setTimeOut} 
                question={question}
                startTimer={startTimer}

                />
                </div>
            </div>
            <div className="bottom">
              <Quiz
                data={data}
                setTimeOut={setTimeOut}
                question={question}
                setQuestion={setQuestion}
                setStartTimer={setStartTimer}
              />
            </div>
          </>
        )}

      </div>
      <div className="pyramid">
        <ul className="moneyList">
          {
            moneyPyramid.map(item => (
              <li key={item.id} className={question === item.id ? "moneyListItem active" : "moneyListItem"}>
                <span className="moneyListItemNumber">{item.id}</span>
                <span className="moneyListItemAmount">{item.amount}</span>
              </li>

            ))
          }

        </ul>
      </div>
    </div>
  )
}

export default App
