import { useEffect, useState } from "react"
import "./Quiz.css"
import { useSound } from "use-sound"
import play from "../assets/src_sounds_play.mp3"
import correct from "../assets/src_sounds_correct.mp3"
import wrong from "../assets/src_sounds_wrong.mp3"

function Quiz({ data, setTimeOut, question, setQuestion, setStartTimer }) {

    const [questionNumber, setQuestionNumber] = useState(null)
    const [selectedAnswer, setSelectedAnswer] = useState(null)
    const [className, setClassName] = useState("answer")
    const [showButton, setShowButton] = useState(true);
    // Sound State
    const [startSound] = useSound(play)
    const [correctSound] = useSound(correct)
    const [wrongSound] = useSound(wrong)

    useEffect(() => {
        startSound()
    }, [startSound])

    useEffect(() => {
        setQuestionNumber(data[question - 1])  
    }, [data, question])

    function deley(deleyTime, callBack) {
        setTimeout(() => {
            callBack()
        }, deleyTime)
    }

    function handleClick(a) {

        setSelectedAnswer(a)
        setClassName("answer active")

        deley(400, () => setClassName(a.correct ? "answer correct" : "answer wrong"))

        deley(3000, () => {
            if (a.correct) {
                correctSound()
                deley(1000, () => {
                    setQuestion(prev => prev + 1)
                    setSelectedAnswer(null)
                })
            } else {
                wrongSound()
                deley(1000, () => {
                    setTimeOut(true)
                })
            }
        })

    }
    function handleButtonClick() {
        setShowButton(false); // Hide the button when clicked
        setStartTimer(true);  // Start the timer when click
    }


    return (
        <div className={`quiz ${showButton ? "quize " : ""}`}>
            <div className="question">{questionNumber?.question}</div>

            <div className="answers">
                {questionNumber?.answers.map((answer, index) => (
                    <div
                        key={index}
                        className={selectedAnswer === answer ? className : "answer"}
                        onClick={() => handleClick(answer)}
                    >
                        {answer.text}
                    </div>

                ))}
            </div>
            {showButton && <button className="start-button" onClick={handleButtonClick}>Play The Game</button>}
        </div>
    )
}
export default Quiz
