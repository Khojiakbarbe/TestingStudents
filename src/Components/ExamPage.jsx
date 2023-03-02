import React, { useContext, useEffect, useState } from "react";
import { answerContext, minutContext, secondsContext } from "./ContextProvider/DataProvider";
import Timer from './Timer'
import { useLocation, useNavigate } from 'react-router-dom'
import timeOver from '../images/modal/timeOver.png'
import closeImg from '../images/modal/close.png'

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
    const [inputValue, setInputValue] = useState('')

    const [info, setInfo] = useState([]);
    const [questionIndx, setQuestionIndx] = useState(0);

    const [countForEnd, setCountForEnd] = useState(0)
    useEffect(() => {
        axios.get('http://localhost:4000/questions/' + type + "/" + theme)
            .then(res => {
                if (count <= res.data.length) {
                    setCountForEnd(count)
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
                } else {
                    setCountForEnd(res.data.length)
                    let usedIndx = [];
                    let questions = [];
                    for (let i = 0; i < res.data.length; i++) {
                        let randomized = Math.floor(Math.random() * res.data.length);
                        while (usedIndx.includes(randomized)) {
                            randomized = Math.floor(Math.random() * res.data.length);
                        }
                        let currIndx = res.data[randomized];
                        usedIndx.push(randomized);
                        questions.push(currIndx);
                    }
                    setInfo(questions);
                }
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
            if (inputValue.toLowerCase() == info[questionIndx].answer.toLowerCase()) {
                setQuestionIndx(questionIndx + 1)
                setCurrect(currect + 1)
            } else if (inputValue.toLowerCase() !== info[questionIndx].answer.toLowerCase()) {
                setQuestionIndx(questionIndx + 1)
                setMistake(mistake + 1);
            }
        }
        setInputValue('')
    }


    // if test over , navigate to other page
    if (countForEnd > 0 && questionIndx > countForEnd - 1) {
        navigate('/results', { state: { id: 1, teacher: '', count: countForEnd, currect: currect, mistake: mistake } })
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
                    <div className="examQuestion row">
                        <div className="col-md-6 p-4 " >
                            {
                                startBtn === '' && info.length > 0 ?
                                    info[questionIndx] && <p key={info[questionIndx].id}>{info[questionIndx].question}</p>
                                    :
                                    <p>Test is here</p>
                            }
                        </div>

                        {
                            startBtn === '' && info[questionIndx].questionImg != 'none' ?
                                <div className="col-md-6 p-4 infoImg">
                                    <img src={`http://localhost:4000/${info[questionIndx].questionImg}`} className='img-fluid w-100 '  alt="" />
                                    
                                </div>
                                :
                                null
                        }


                    </div>

                    <Timer />

                    {/* Modal */}
                    {
                        showModal.length == 0 ?
                            <div className="popUp-modal">
                                <div className="myModal">
                                    <button onClick={() => closeModal()}><img src={closeImg} alt="" /></button>
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