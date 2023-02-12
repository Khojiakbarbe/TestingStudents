import { Modal } from "bootstrap";
import React, { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom'

import { timeContext } from "./ContextProvider/DataProvider";
import Navbar from "./Navbar";


export default function Home() {

    const navigate = useNavigate();

    const [theme, setTheme] = useState('forLoop')
    const [count, setCount] = useState('5')

    const [time, setTime] = useContext(timeContext)

    const [direction, setDirection] = useState('dasturlash')

    return (
        <>
            <div className="home">
                <Navbar />
                <h2 className="text-center">Bilmingizni biz bilan mustahkamlang</h2>
                <h6 className="text-center mt- mb-5" >Quyida mavzu va test sonini tanlang </h6>
                {/* <Modal /> */}
                <div className=" homeRow">
                    <div className="row">
                        <div className="col-3 answer">
                            <h6>Yonalishni tanlang</h6>
                            <select className="form-select form-select-sm p-2" aria-label=".form-select-sm example" onChange={(e) => setDirection(e.target.value)} >
                                <option value='dasturlash'>Dasturlash</option>
                                <option value="english">English</option>
                                <option value="matem">Matematika</option>
                            </select>
                        </div>
                        {
                            direction === 'english' ?
                                <div className="col-3 answer">
                                    <h6>Mavzuni tanlang</h6>
                                    <select className="form-select form-select-sm p-2" aria-label=".form-select-sm example" onChange={(e) => setTheme(e.target.value)} >
                                        <option value='general' >General</option>
                                        <option value="ielts">IELTS</option>
                                        <option value="englishKids">English kids</option>
                                    </select>
                                </div>
                                :
                                null
                        }
                        {
                            direction === 'matem' ?
                                <div className="col-3 answer">
                                    <h6>Mavzuni tanlang</h6>
                                    <select className="form-select form-select-sm p-2" aria-label=".form-select-sm example" onChange={(e) => setTheme(e.target.value)} >
                                        <option value='forLoop' >Matematika</option>
                                        <option value="boolean">Boolean</option>
                                        <option value="intager">Intager</option>
                                        <option value="minMax">Min & Max</option>
                                    </select>
                                </div>
                                :
                                null
                        }
                        {
                            direction === 'dasturlash' ?
                                <div className="col-3 answer">
                                    <h6>Mavzuni tanlang</h6>
                                    <select className="form-select form-select-sm p-2" aria-label=".form-select-sm example" onChange={(e) => setTheme(e.target.value)} >
                                        <option value='forLoop' >For & While</option>
                                        <option value="boolean">Boolean</option>
                                        <option value="intager">Intager</option>
                                        <option value="minMax">Min & Max</option>
                                    </select>
                                </div>
                                :
                                null
                        }
                        <div className="col-3 answer">
                            <h6>Testlar soni</h6>
                            <select className="form-select form-select-sm p-2" aria-label=".form-select-sm example" onChange={(e) => setCount(e.target.value)}>
                                <option value='5'>5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option value="20">20</option>
                            </select>
                        </div>
                        <div className="col-3 answer">
                            <h6>Vaqtni tanlang (minut)</h6>
                            <select className="form-select form-select-sm p-2" aria-label=".form-select-sm example" onClick={(e) => setTime(e.target.value)} >
                                <option value='1'>1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </select>
                        </div>
                    </div>
                    <button id="boshlashBtn" onClick={() => navigate('/examPage', { state: { id: 1, theme: theme, count: count } })}>Boshlash</button>
                </div>
            </div>
        </>
    )
}