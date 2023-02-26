import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";



export default function Details() {
    const navigate = useNavigate();
    const { id } = useParams();

    const { state } = useLocation();
    const { type, theme } = state;

    const [detail, setDetail] = useState([]);
    
    useEffect(() => {
        axios.get('http://localhost:4000/questions/' + type + "/" + theme)
            .then(res => {
                setDetail(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    const filter = detail.filter(post => post._id == id)
    return (
        <div className="container p-5">
            <button className="btn btn-danger mb-3" onClick={() => navigate(-1)}>Orqaga</button>
            <div className="bg-dark p-5" style={{color: 'white'}}>

                {
                    filter.length > 0 ?

                        <>
                            <h3>Question : {filter[0].question}</h3>
                            <h3>Answer : {filter[0].answer}</h3>
                            {
                                filter[0].questionImg !== 'none' ?
                                    <div className="w-50">
                                        <img src={`http://localhost:4000/${filter[0].questionImg}`} className='img-fluid' alt="" />
                                    </div>
                                    :
                                    null
                            }
                        </>
                        :
                        <h1>Iltimos kuting</h1>
                }
            </div>
        </div>
    )
}