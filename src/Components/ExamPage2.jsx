import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { timeContext, minutContext, secondsContext, answerContext } from "./ContextProvider/DataProvider";
import Timer from './Timer'
import timeOver from '../images/modal/timeOver.png'
import closeImg from '../images/modal/close.png'



export default function ExamPage2() {

    const navigate = useNavigate();

    const { state } = useLocation();
    const { data, user, password } = state;

    const [timeCon, setTimeCon] = useContext(timeContext);
    setTimeCon(data.session.givenTime)


    const [minut, setMinut] = useContext(minutContext)
    const [seconds, setSeconds] = useContext(secondsContext)






    const [info, setInfo] = useState([]);

    const [testCount, setTestCount] = useState(0)

    const [forDelete, setForDelete] = useState([])
    useEffect(() => {
        axios.get('http://localhost:4000/questions/' + data.session.subject + "/" + data.session.theme)
            .then(res => {
                if (data.session.numberOfQuestions <= res.data.length) {
                    setTestCount(data.session.numberOfQuestions)
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
                    setInfo(questions);
                } else {
                    setTestCount(res.data.length)
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




        // for delete user and password
        axios.get('http://localhost:4000/students')
            .then(res => {
                setForDelete(res.data)
            })
            .catch(err => console.log(err))

    }, [])

    const [count, setCount] = useState(0);

    const [startBtn, setStartBtn] = useContext(answerContext)



    const [inputValue, setInputValue] = useState('')

    const [forModal, setForModal] = useState('modal')
    const [currect, setCurrect] = useState(0)
    const [mistake, setMistake] = useState(0)


    function topshirishBtn() {
        setForModal('')
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

    // if question over student's login password will delete and go to result page
    const id = forDelete.filter(post => post.user == user && post.password == password);
    if (testCount > 0 && count > testCount - 1) {
        axios.delete('http://localhost:4000/students/', { data: { id } })
            .then(res => {
                console.log('Data is deleted', res);
            })
            .catch(err => console.log(err))
        navigate('/results', { state: { id: 1, teacher: data.session.manager, count: testCount, currect: currect, mistake: mistake } })
    }


    const [showModal, setShowModal] = useState('modal');
    useEffect(() => {
        if (forModal.length == 0 && minut < 1 && seconds < 1) {
            setShowModal('')
        }
    })

    function closeModal() {
        axios.delete('http://localhost:4000/students/', { data: { id } })
            .then(res => {
                console.log('Data is deleted', res);
            })
            .catch(err => console.log(err))
        setForModal('close')
        setShowModal('close')
        setCurrect(0)
        setMistake(0)
        navigate('/')
        window.location.reload();
    }


    return (
        <div className="container p-5">
            <div className="examPage">
                <div className="examQuestion row mb-5">
                    <div className="col-md-6 p-4">
                        {
                            startBtn === '' && info.length > 0 ?
                                <p>{info[count].question}</p>
                                :
                                null
                        }
                    </div>

                    {
                        startBtn === '' && info.length > 0 && info[count].questionImg.length > 1 ?
                            <div className="col-md-6 p-3">
                                <img src={`http://localhost:4000/${info[count].questionImg}`} className='img-fluid w-100' alt="" />
                            </div>
                            :
                            null
                    }

                </div>

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