import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import img from '../images/bg/testTugadi.png'

export default function Results() {

    const navigate = useNavigate();

    const { state } = useLocation();
    const { teacher, count, currect, mistake } = state;

    function navigateReload(){
        window.location.reload();
        navigate('/')
    }

    return (
        <div className="container mt-5 p-5 text-center">
            <div>
                <h1><strong>Test muvaffaqiyatli yakunlandi!</strong></h1>
                <img src={img} className='img-fluid mt-3 mb-5' />
                <h2>O'qituvchi : {teacher}</h2>
                <h3>Umumiy testlar soni : {count}</h3>
                <h3 style={{ color: "#18AC00" }}>Tog'ri javoblar soni : {currect}</h3>
                <h3 style={{ color: '#FF0000' }}>Noto’g’ri javoblar soni : {mistake}</h3>
                <button onClick={() => navigateReload()} className='btn btn-warning ' style={{ width: "10%" }}><strong>OK</strong></button>
            </div>
        </div>
    )
}