import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function DeletePage() {

    const navigate = useNavigate();

    const [questions, setQuestions] = useState([])

    useEffect(() => {
        axios.get('http://localhost:4000/questions')
            .then(res => {
                console.log(res.data);
                setQuestions(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    function deleteThis(id) {
        console.log(id);
        axios.delete('http://localhost:4000/questions/', { data: { id } })
            .then(res => {
                console.log('Data is deleted', res);
                setQuestions(questions.filter(p => p._id !== id))
            })
            .catch(err => console.log(err))
    }



    return (
        <div className="container p-5">
            <button className="btn btn-danger" onClick={() => navigate(-1)}>Orqaga</button>
            <h1>Delete...</h1>
            <div className="row">
                {questions.map((post, index) => {
                    return (
                        <div className="col-3 mb-5 border p-3" key={index}>
                            <h4>Fan : {post.type}</h4>
                            <h5>Mavzu : {post.theme}</h5>
                            <h6>Savol : {post.question}</h6>
                            <h6>Javob : {post.answer}</h6>
                            <button className="btn btn-danger" onClick={() => deleteThis(post._id)}>Delete</button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}