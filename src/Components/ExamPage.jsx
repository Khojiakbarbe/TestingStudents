import React, { useContext, useEffect, useState } from "react";
import { answerContext, minutContext, secondsContext } from "./ContextProvider/DataProvider";
import Timer from './Timer'
import { useLocation, useNavigate } from 'react-router-dom'

import axios from "axios";


export default function ExamPage() {

    const navigate = useNavigate();


    const [minutes] = useContext(minutContext)
    const [seconds] = useContext(secondsContext)

    const [answerBtn] = useContext(answerContext)


    const { state } = useLocation();
    const { theme, count } = state;

    const [inputValue, setInputValue] = useState('')

    const [info, setInfo] = useState([]);
    const [questionIndx, setQuestionIndx] = useState(0);



    useEffect(() => {
        axios.get('http://localhost:9000/' + theme)
            .then(res => {
                let usedIndx = [];
                let questions = [];
                for (let i = 0; i < count; i++) {
                    let randomized = Math.floor(Math.random() * res.data.length);
                    while (usedIndx.includes(randomized)) {
                        randomized = Math.floor(Math.random() * res.data.length);
                    }
                    let currIndx = res.data[randomized];
                    usedIndx.push(randomized);
                    questions.push(currIndx);
                }
                setInfo(questions);
            })
            .catch(err => console.log(err));
    }, []);


    const [currect, setCurrect] = useState(0)
    const [mistake, setMistake] = useState(0)


    function topshirishBtn() {
        if (inputValue == info[questionIndx].result && questionIndx < count - 1) {
            setQuestionIndx(questionIndx + 1)
            setCurrect(currect + 1)
        } else if (inputValue !== info[questionIndx].result && questionIndx < count - 1) {
            setQuestionIndx(questionIndx + 1)
            setMistake(mistake + 1)
        } else {
            alert('Your time is ended')
        }
    }




    return (
        <div className="container p-5">
            <div className="examPage">
                <div className="examQuestion">
                    {
                        info[questionIndx] && <p key={info[questionIndx].id}>{info[questionIndx].question}</p>
                    }
                </div>
                <Timer />



                <div className="row">
                    <div className="col-6 answer">
                        <input type="text" placeholder="Natijani kiriting" onChange={(e) => setInputValue(e.target.value)} />
                    </div>
                    <div className="col-6">
                        {
                            answerBtn === '' && inputValue.length > 0 ?
                                <button className="answerBtnActive" onClick={() => topshirishBtn()}>Topshirish</button>
                                :
                                <button className="answerBtnDisable" disabled>Topshirish</button>
                        }
                    </div>
                </div>


                <div className="row mt-5">
                    <div className="col-3" style={{ color: "#18AC00" }}>
                        <h4>To'gri javoblar : {currect}</h4>
                    </div>
                    <div className="col-3" style={{ color: "#FF0000" }}>
                        <h4>Noto'g'ri javoblar : {mistake}</h4>
                    </div>
                </div>
            </div>

        </div>
    )
}