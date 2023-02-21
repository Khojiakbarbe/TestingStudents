import React, { useState, useEffect } from "react";
import axios from "axios";



export default function DeletePage() {

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
        axios.delete('http://localhost:4000/questions/', { data: { id }})
            .then(res => {
                console.log('Data is deleted', res);
                setQuestions(questions.filter(p => p._id !== id))
            })
            .catch(err => console.log(err))
    }



    return (
        <div className="container p-5">
            <h1>Delete...</h1>
            <div className="row">
                {questions.map((post, index) => {
                    return (
                        <div className="col-3 mb-5" key={index}>
                            <p >{index + 1} {post.theme}</p>
                            <button className="btn btn-danger" onClick={() => deleteThis(post._id)}>Delete</button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}