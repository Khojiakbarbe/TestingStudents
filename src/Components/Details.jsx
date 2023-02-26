import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";



export default function Details() {
    const { state } = useLocation();
    // const { id, type, theme } = state;
    console.log(state);
    const { ids } = useParams();
    const [detail, setDetail] = useState([]);
    // useEffect(() => {
    //     axios.get(`http://localhost:4000/questions/' + ${type} +"/" + ${theme} + "/" + ${id}`)
    //     .then(res => {

    //     })
    // })
    return (
        <>
            dsda
        </>
    )
}