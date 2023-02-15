import React, { createContext, useState } from "react";


// LogIn
export const loginContext = createContext();
export function LoginProvider(props) {
    const [login, setLogin] = useState(false)
    
    return(
        <loginContext.Provider value={[login , setLogin]}>
            {props.children}
        </loginContext.Provider>
    )
}

// GivenTime
export const timeContext = createContext();
export function TimeProvider(props) {
    const [time, setTime] = useState(1);

    const changeTime = async (time) => {
        setTime(time)
    }

    return (
        <timeContext.Provider value={[time, changeTime]}>
            {props.children}
        </timeContext.Provider>
    )
}


// Minut
export const minutContext = createContext();
export function TimeMinutProvider(props) {
    const [time, setTime] = useState()

    const changeTime = async (minut) => {
        setTime(minut)
    }

    return (
        <minutContext.Provider value={[time, changeTime]}>
            {props.children}
        </minutContext.Provider>
    )
}


// Second
export const secondsContext = createContext();
export function TimeSecondsProvider(props) {
    const [time, setTime] = useState()

    const changeTime = async (word) => {
        setTime(word)
    }

    return (
        <secondsContext.Provider value={[time, changeTime]}>
            {props.children}
        </secondsContext.Provider>
    )
}

// Topshirish
export const answerContext = createContext();
export function AnswerProvider(props) {
    const [answer, setAnswer] = useState()

    const changeAnswer = async (word) => {
        setAnswer(word)
    }

    return (
        <answerContext.Provider value={[answer, changeAnswer]}>
            {props.children}
        </answerContext.Provider>
    )
}


// Right
export const rightContext = createContext()
export function RightProvider() {
    const [right, setRight] = useState();

    return (
        <rightContext.Provider>
        </rightContext.Provider>
    )
}