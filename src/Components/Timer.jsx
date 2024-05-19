import { useEffect, useState } from "react";

function Timer({setTimeOut,question,startTimer}) {
    const [timer, setTimer] = useState(30);

    useEffect(() => {
        if(timer === 0) return setTimeOut(true)
        const interval = setInterval(() => {
            if (startTimer){
                setTimer((prev) => prev - 1);
            }
        }, 1000);

        return () => clearInterval(interval); // Cleanup function to clear the interval on component unmount
    }, [setTimeOut,timer,startTimer]);
    useEffect(()=>{
        setTimer(30)
    },[question])

    return <div>{timer}</div>;
}

export default Timer;
