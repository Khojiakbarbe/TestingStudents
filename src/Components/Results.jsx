import React from "react";
import { useLocation } from "react-router-dom";


export default function Results() {

    const { state } = useLocation();
    const { currect, mistake } = state;

    return (
        <div className="container mt-5 p-5">
            <h1 style={{ color: "#18AC00" }}>Tog'ri javoblar soni : {currect}</h1>
            <h1 style={{
                color: '#FF0000'}}>Noto’g’ri javoblar soni : {mistake}</h1>
        </div>
    )
}