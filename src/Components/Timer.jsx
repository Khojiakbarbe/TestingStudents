import React, { useContext, useState } from 'react';
import { useTimer } from 'react-timer-hook';
import { timeContext, minutContext, secondsContext, answerContext } from './ContextProvider/DataProvider';

import { useNavigate } from 'react-router-dom'

function Timer({ expiryTimestamp }) {
    const {
        seconds,
        minutes,
        isRunning,
        restart,
    } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called ') });

    const navigate = useNavigate();


    const [testTime] = useContext(timeContext)

    const [minutesTime, setMinutesTime] = useContext(minutContext)
    const [secondsTime, setSecondsTime] = useContext(secondsContext)

    setMinutesTime(minutes)
    setSecondsTime(seconds)

    const [topshirish, setTopshirish] = useContext(answerContext)

    return (


        <div style={{ textAlign: 'center' }}>
            {
                isRunning ?
                    <button onClick={() => {
                        const time = new Date();
                        time.setSeconds(time.getSeconds() + testTime * 60);
                        restart(time)
                        setTopshirish('disable')
                    }} className="startBtnCLicked startBtn" disabled>Boshlash</button>
                    :
                    <button onClick={() => {
                        const time = new Date();
                        time.setSeconds(time.getSeconds() + testTime * 60);
                        restart(time)
                        setTopshirish('')
                    }} className="startBtn">Boshlash</button>
            }
            <div style={{ fontSize: '200%' }}>
                <span>{minutes}</span>:<span>{seconds}</span>
            </div>


        </div>
    );
}

export default function App() {
    const time = new Date();
    time.setSeconds(time.getSeconds() + '');
    return (
        <div className='container mt-5 mb-5 w-100'>
            <Timer expiryTimestamp={time} />
        </div>
    );
}