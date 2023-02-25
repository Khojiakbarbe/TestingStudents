import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";


export default function ExamPage2() {


    const { state } = useLocation();
    const { data } = state;

    const [info, setInfo] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:4000/questions/' + data.session.subject + "/" + data.session.theme)
            .then(res => {
                setInfo(res.data);
            })
    }, [])


    const [count, setCount] = useState(0);

    function nextQuestion() {
        if (count < data.session.numberOfQuestions) {
            setCount(count + 1)
        }
    }

    return (
        <>
            {
                info.length > 0 ?
                    <p>{info[count].question}</p>
                    :
                    null
            }
            <button onClick={() => nextQuestion()}>next</button>
        </>
    )
}