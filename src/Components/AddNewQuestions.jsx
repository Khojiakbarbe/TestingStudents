import React, { useState } from "react";
import axios from 'axios'

import {useNavigate} from 'react-router-dom'


export default function AddNewQuestions() {

    const navigate = useNavigate()

    const [type, setType] = useState('')
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')
    const [questionImg, setQuestionImg] = useState('')
    const [theme, setTheme] = useState('')

    function sendQuestion() {
        axios.post('http://localhost:4000/questions', {
            type,
            question,
            answer,
            questionImg,
            theme
        })
            .then(res => {
                console.log(res.data, 'data is saved');
                navigate('/')
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="container mt-5 p-5">
            <h1>Yangi savol qoshish</h1>
            <div className="row mt-5">
                <div className="col-4 answer">
                        <h3>Yo'nalish</h3>
                        <input type="text" className="form-control mb-3 mt-3" onChange={(e) => setType(e.target.value)} />
                </div>
                <div className="col-4 answer">
                    <h3>Mavzu kiriting</h3>
                    <input type="text" className="form-control mb-3 mt-3" onChange={(e) => setTheme(e.target.value)} />
                </div>
                <div className="col-4 answer">
                    <h3>Savolni kiriting</h3>
                    <input type="text" className="form-control mb-3 mt-3" onChange={(e) => setQuestion(e.target.value)} />
                </div>
                <div className="col-4 answer">
                    <h3>Javobni kiriting</h3>
                    <input type="text" className="form-control mb-3 mt-3" onChange={(e) => setAnswer(e.target.value)} />
                </div>
                <div className="col-4 answer">
                    <h3>Savol rasmi bolsa tanlang</h3>
                    <input type="text" className="form-control mb-3 mt-3" onChange={(e) => setQuestionImg(e.target.value)} />
                </div>
            </div>
            <button className="btn btn-danger" onClick={sendQuestion}>Joylash</button>
        </div>
    )
}