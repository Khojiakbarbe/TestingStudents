import React, { useContext, useEffect, useState } from "react";
import { answerContext, minutContext, secondsContext } from "./ContextProvider/DataProvider";
import Timer from './Timer'
import { useLocation, useNavigate } from 'react-router-dom'


export default function ExamPage() {

    const navigate = useNavigate();


    const [minutes] = useContext(minutContext)
    const [seconds] = useContext(secondsContext)

    const [answerBtn] = useContext(answerContext)

    const { state } = useLocation();
    const { theme, count, time } = state;



    const [inputValue, setInputValue] = useState('')
    return (
        <div className="container p-5">

            <div className="examPage">
                <div className="examQuestion">
                    <h1>Your theme is : {theme}</h1>
                    <h1>Your test count is : {count}</h1>
                </div>
                <Timer />



                <div className="row">
                    <div className="col-6 answer">
                        <input type="text" placeholder="Natijani kiriting" onChange={(e) => setInputValue(e.target.value)} />
                    </div>
                    <div className="col-6">
                        {
                            answerBtn === '' && inputValue.length > 0 ?
                                <button className="answerBtnActive">Topshirish</button>
                                :
                                <button className="answerBtnDisable" disabled>Topshirish</button>
                        }
                    </div>
                </div>


                <div className="row mt-5">
                    <div className="col-3" style={{ color: "#18AC00" }}>
                        <h4>To'gri javoblar : ?</h4>
                    </div>
                    <div className="col-3" style={{ color: "#FF0000" }}>
                        <h4>Noto'g'ri javoblar : ?</h4>
                    </div>
                </div>
            </div>

        </div>
    )
}