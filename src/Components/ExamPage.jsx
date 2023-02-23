import React, { useContext, useEffect, useState } from "react";
import { answerContext, minutContext, secondsContext } from "./ContextProvider/DataProvider";
import Timer from './Timer'
import { useLocation, useNavigate } from 'react-router-dom'
import timeOver from '../images/modal/timeOver.png'
import close from '../images/modal/close.png'

import axios from "axios";
import Navbar from "./Navbar";


export default function ExamPage() {

    const navigate = useNavigate();

    const [minutes] = useContext(minutContext)
    const [seconds] = useContext(secondsContext)
    const [startBtn, setStartBtn] = useContext(answerContext)
    if (minutes < 1 && seconds < 1) {
        setStartBtn('stop')
    } else {
        setStartBtn('')
    }


    const { state } = useLocation();
    const { type, theme, count } = state;
    const countToResultPage = count;
    const [inputValue, setInputValue] = useState('')

    const [info, setInfo] = useState([]);
    const [questionIndx, setQuestionIndx] = useState(0);


    useEffect(() => {
        axios.get('http://localhost:4000/questions/' + type + "/" + theme)
            .then(res => {
                console.log(res.data);
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



    // Modal and answers
    const [forModal, setForModal] = useState('modal')
    const [currect, setCurrect] = useState(0)
    const [mistake, setMistake] = useState(0)


    function topshirishBtn() {
        setForModal('')
        if (questionIndx < count) {
            if (inputValue == info[questionIndx].answer) {
                setQuestionIndx(questionIndx + 1)
                setCurrect(currect + 1)
            } else if (inputValue !== info[questionIndx].answer) {
                setQuestionIndx(questionIndx + 1)
                setMistake(mistake + 1);
            }
        }
        setInputValue('')
    }


    // if test over , navigate to other page
    if (questionIndx > count - 1) {
        navigate('/results', { state: { id: 1, count: countToResultPage, currect: currect, mistake: mistake } })
    }

    const [showModal, setShowModal] = useState('modal')

    useEffect(() => {
        if (forModal.length == 0 && minutes < 1 && seconds < 1) {
            setShowModal('')
        }
    })



    function closeModal() {
        setForModal('close')
        setShowModal('close')
        setCurrect(0)
        setMistake(0)
        navigate('/')
        window.location.reload();
    }



    return (
        <>
            <Navbar />
            <div className="container p-5">
                <div className="examPage">
                    <div className="examQuestion">
                        {
                            startBtn === '' ?
                                info[questionIndx] && <p key={info[questionIndx].id}>{info[questionIndx].question} = ?</p>
                                :
                                <p>Test is here</p>
                        }
                    </div>
                    {/* <img src={info[questionIndx].questionImg} alt="" /> */}
                   
                   {/* <img src={`https://localhost:4000/${uploads.questionImg}`} alt="" />  */}
                    <Timer />

                    {/* Modal */}
                    {
                        showModal.length == 0 ?
                            <div className="popUp-modal">
                                <div className="myModal">
                                    <button onClick={() => closeModal()}><img src={close} alt="" /></button>
                                    <br />
                                    <img src={timeOver} />
                                    <h5>Testlar soni: {count} </h5>
                                    <h5 style={{ color: '#18AC00' }}>Tog'ri javoblar : {currect}</h5>
                                    <h5 style={{ color: '#FF0000' }}>Noto'g'ri javoblar : {mistake}</h5>
                                </div>
                            </div>
                            :
                            null
                    }

                    <div className="row">
                        <div className="col-6 answer">
                            {/* Answer input */}
                            {
                                startBtn === '' ?
                                    <input type="text" placeholder="Natijani kiriting" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                                    :
                                    <input type="text" placeholder="Natijani kiriting" disabled />

                            }
                        </div>
                        <div className="col-6 answersBtnResponsive">
                            {/* Send answer btn */}
                            {
                                startBtn === '' && inputValue.length > 0 ?
                                    <button className="answerBtnActive " onClick={() => topshirishBtn()}>Topshirish</button>
                                    :
                                    <button className="answerBtnDisable " disabled>Topshirish</button>
                            }
                        </div>
                    </div>

                    <div className="row mt-5">
                        <div className="col-3 answersText" style={{ color: "#18AC00" }}>
                            <h4>To'gri javoblar : {currect}</h4>
                        </div>
                        <div className="col-3 answersText" style={{ color: "#FF0000" }}>
                            <h4>Noto'g'ri javoblar : {mistake}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}