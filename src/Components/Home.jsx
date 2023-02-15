import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'

import { timeContext } from "./ContextProvider/DataProvider";
import Navbar from "./Navbar";


export default function Home() {

    const navigate = useNavigate();

    const [forFilterType, setForFilterType] = useState('')
    const [type, setType] = useState([])
    const [typeForTheme, setTypeForTheme] = useState('')
    const [choosenTheme, setChoosenTheme] = useState('')

    const [theme, setTheme] = useState([])

    useEffect(() => {
        axios.get('http://localhost:4000/questions')
            .then(res => {
                setTypeForTheme(res.data)
                for (let i = 0; i < forFilterType.length; i++) {
                    if (forFilterType[i].type.includes(type.type)) {
                        i++
                    }
                }
            })
            .catch(err => console.log(err))
    }, [])



    function handleTheme() {
        const filter = type.filter(find => find.type.toLowerCase().includes(typeForTheme.toLowerCase()))
        setChoosenTheme(filter)
    }


    const [count, setCount] = useState('5')

    const [time, setTime] = useContext(timeContext)


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
                            <select className="form-select form-select-sm p-2" aria-label="form-select-sm example" onClick={handleTheme} onChange={(e) => setTypeForTheme(e.target.value)} >
                                {type && type.map(post => {
                                    return (
                                        <option key={post.id} value={post.type}>{post.type}</option>
                                    )
                                })}
                            </select>
                        </div>

                        <div className="col-3 answer">
                            <h6>Mavzuni tanlang</h6>
                            <select className="form-select form-select-sm p-2" aria-label=".form-select-sm example" onChange={(e) => setTheme(e.target.value)} >
                                {choosenTheme && choosenTheme.map(post => {
                                    return (
                                        <option key={post.id} value={post.theme}>{post.theme}</option>
                                    )
                                })
                                }
                            </select>
                        </div>

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
                    <button id="boshlashBtn" onClick={() => navigate('/examPage', { state: { id: 1, type : type , theme: theme, count: count } })}>Boshlash</button>
                </div>
            </div>
        </>
    )
}