import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../API";



export default function Details() {
    const navigate = useNavigate();
    const { id } = useParams();

    const { state } = useLocation();
    const { type, theme } = state;

    const [detail, setDetail] = useState([]);

    useEffect(() => {
        axios.get(API_URL + '/questions/' + type + "/" + theme)
            .then(res => {
                setDetail(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    function deleteThis(id) {
        axios.delete(API_URL + '/questions/', { data: { id } })
            .then(res => {
                console.log('Data is deleted', res);
            })
            .catch(err => console.log(err))
    }



    const filter = detail.filter(post => post._id == id)
    return (
        <div className="container p-5">
            <button className="btn btn-danger mb-3 p-3" onClick={() => navigate(-1)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                </svg>
                 Orqaga
            </button>
            <div className="bg-dark p-5" style={{ color: 'white' }}>

                {
                    filter.length > 0 ?

                        <>
                            <h3>Savol : {filter[0].question}</h3>
                            <h3>Savob : {filter[0].answer}</h3>
                            {
                                filter[0].questionImg !== 'none' ?
                                    <div className="w-50">
                                        <img src={`${API_URL}/${filter[0].questionImg}`} className='img-fluid' alt="" />
                                    </div>
                                    :
                                    null
                            }
                            <div className="deletePageIcons">
                                <span onClick={() => deleteThis(filter[0]._id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                                    </svg>
                                </span>
                            </div>
                        </>
                        :
                        <h1>Iltimos kuting</h1>
                }
            </div>
        </div>
    )
}