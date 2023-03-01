import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";


export default function DeletePage() {

    const navigate = useNavigate();

    const { state } = useLocation();

    const { type, theme } = state;


    const [questions, setQuestions] = useState([])


    useEffect(() => {
        axios.get('http://localhost:4000/questions/' + type + "/" + theme)
            .then(res => {
                setQuestions(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    const [request, setRequest] = useState('')
    const [id, setId] = useState('')
    function deleteInfo(id) {
        setId(id)
        setRequest('giveRquest')
    }

    function deleteThis() {
        axios.delete('http://localhost:4000/questions/', { data: { id } })
            .then(res => {
                console.log('Data is deleted', res);
                setRequest('')
                setQuestions(questions.filter(p => p._id !== id))
            })
            .catch(err => console.log(err))
    }



    return (
        <>
            {
                request.length > 0 ?
                    <div className="adminMalumoti">
                        <div>
                            <h2 style={{ textAlign: 'center' }}>Test haqiqatdan o'chirilsinmi</h2>
                            <button className="btn w-50 p-2 color-white " style={{ background: '#FBC400' }} onClick={() => deleteThis()}><strong>O'chirish</strong></button>

                            <button className="btn btn-primary w-50 p-2" onClick={() => setRequest('')}>Qoldirish</button>
                        </div>
                    </div>
                    :
                    null
            }
            <div className="container p-5">
                <button className="btn btn-danger p-3" onClick={() => navigate(-1)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                    </svg>
                    Orqaga
                </button>
                <h1>Delete...</h1>
                <div className="row">
                    {questions.map((post, index) => {
                        return (
                            <div className="col-3 mb-2  p-2" key={index}>
                                <div className="border bg-dark p-2" style={{ color: 'white' }}>
                                    <p>{index + 1}</p>
                                    <h4>Savol : {post.question.slice(0, 8)}..</h4>
                                    <h4>Javob : {post.answer}</h4>

                                    <div className="deletePageIcons">
                                        <span onClick={() => navigate(`/deleteQuestions/${post._id}`, { state: { id: 1, type: type, theme: theme } })}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                                                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                                            </svg>
                                        </span>
                                        <span onClick={() => deleteInfo(post._id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

            </div>

        </>
    )
}