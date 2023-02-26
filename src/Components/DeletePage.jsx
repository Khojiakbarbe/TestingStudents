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


    function deleteThis(id) {
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
                            <h4>Savol : {post.question.slice(0,14)}..</h4>
                            <h4>Javob : {post.answer}</h4>
                            {
                                post.questionImg.length > 1 ?
                                    <img src={`http://localhost:4000/${post.questionImg}`} className='img-fluid mb-2' style={{ height: "200px" }} alt="" />
                                    :
                                    null
                            }
                            <button className="btn btn-success" onClick={() => navigate(`/deleteQuestions/${post._id}` , {state : {id: post._id , type: type , theme: theme}})}>See full question</button> <br />
                            <button className="btn btn-danger" onClick={() => deleteThis(post._id)}>Delete</button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}