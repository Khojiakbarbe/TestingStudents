import React, { useState, useEffect } from "react";
import axios, { all } from 'axios'

import { useNavigate } from 'react-router-dom'


export default function AddNewQuestions() {

    const navigate = useNavigate()


    const [allDate, setAllDate] = useState([])
    useEffect(() => {
        axios.get('http://localhost:4000/questions')
            .then(res => {
                setAllDate(res.data)
            })
            .catch(err => console.log(err))
    }, [])



    // For post
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



    let forType = [];
    for (let i = 0; i < allDate.length; i++) {
        if (!forType.includes(allDate[i].type)) {
            forType.push(allDate[i].type)
        }
    }

    let forTheme = [];
    const filterTheme = allDate.filter(post => post.type.toLowerCase().includes(type));
    for (let i = 0; i < filterTheme.length; i++) {
        if (!forTheme.includes(filterTheme[i].theme)) {
            forTheme.push(filterTheme[i].theme)
        }
    }



    return (
        <div className="container mt-5 p-5">
            <h1>Yangi savol qoshish</h1>
            <div className="row mt-5">
                <div className="col-4 answer">
                    <h3>Yo'nalish</h3>
                    <select className="form-select form-select-sm p-2" aria-label=".form-select-sm example" onChange={(e) => setType(e.target.value)} >
                        {forType.map(post => {
                            return (
                                <option value={post}>{post}</option>
                            )
                        })}
                        {/* <input type="text" className="form-control mb-3 mt-3" onChange={(e) => setType(e.target.value)} /> */}
                    </select>
                </div>
                <div className="col-4 answer">
                    <h3>Mavzu kiriting</h3>
                    <select className="form-select form-select-sm p-2" aria-label=".form-select-sm example" onChange={(e) => setTheme(e.target.value)} >
                        {forTheme.map(post => {
                            return (
                                <option value={post}>{post}</option>
                            )
                        })}
                        <input type="text" className="form-control mb-3 mt-3" onChange={(e) => setTheme(e.target.value)} />
                    </select>
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
        </div >
    )
}