import axios from "axios";
import React, { useState, useEffect } from "react";




export default function ExamPage2() {

    const [info, setInfo] = useState([])
    useEffect(() => {
        axios.get('http://localhost:4000/sessions')
            .then(res => {
                setInfo(res.data)
                console.log(res.data);
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <>
            Exam page 2
        </>
    )
}