import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Timer from './Timer'

export default function ExamPage2() {


    const { state } = useLocation();
    const { data } = state;

    const [info, setInfo] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:4000/questions/' + data.session.subject + "/" + data.session.theme)
            .then(res => {
                let usedIndx = [];
                let questions = [];
                for (let i = 0; i < data.session.numberOfQuestions; i++) {
                    let randomized = Math.floor(Math.random() * res.data.length);
                    while (usedIndx.includes(randomized)) {
                        randomized = Math.floor(Math.random() * res.data.length);
                    }
                    let currIndx = res.data[randomized];
                    usedIndx.push(randomized);
                    questions.push(currIndx);
                }
                console.log(res.data);
                setInfo(questions);
            })
    }, [])


    const [count, setCount] = useState(0);

    const [startBtn, setStartBtn] = useState('')
    const [inputValue, setInputValue] = useState('')

    const [currect, setCurrect] = useState(0)
    const [mistake, setMistake] = useState(0)
    function topshirishBtn() {
        if (count < data.session.numberOfQuestions) {
            setCount(count + 1)
            if (inputValue.toLowerCase() == info[count].answer) {
                setCurrect(currect + 1)
            } else {
                setMistake(mistake + 1)
            }
        }
        setInputValue('')
    }
    if ( count == data.session.numberOfQuestions) {
        alert('test ended')
    }

    console.log(currect + "-- currect");
    console.log(mistake + '--mistake');

    return (
        <div className="container p-5">
            <div className="examPage">
                <div className="examQuestion row mb-5">
                    <div className="col-md-6 p-4">
                        {
                            info.length > 0 ?
                                <p>{info[count].question}</p>
                                :
                                null
                        }
                    </div>

                    {
                        info.length > 0 && info[count].questionImg.length > 1 ?
                            <div className="col-md-6 p-3">
                                <img src={`http://localhost:4000/${info[count].questionImg}`} className='img-fluid w-100' alt="" />
                            </div>
                            :
                            null
                    }
                </div>

                <div className="row">
                    <div className="col-6 answer">
                        {
                            startBtn === '' ?
                                <input type="text" placeholder="Natijani kiriting" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                                :
                                <input type="text" placeholder="Natijani kiriting" disabled />

                        }
                    </div>
                    <div className="col-6 answersBtnResponsive">
                        {
                            startBtn === '' && inputValue.length > 0 ?
                                <button className="answerBtnActive " onClick={() => topshirishBtn()}>Topshirish</button>
                                :
                                <button className="answerBtnDisable " disabled>Topshirish</button>
                        }
                    </div>
                </div>

                <Timer />

            </div>
        </div>
    )
}