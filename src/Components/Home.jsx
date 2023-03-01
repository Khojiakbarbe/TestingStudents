import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'

import { timeContext } from "./ContextProvider/DataProvider";
import Navbar from "./Navbar";


export default function Home() {

    const navigate = useNavigate();

    const [allType, setAllType] = useState([])

    const [type, setType] = useState([]) // ["dasturlash"]

    const [typeForTheme, setTypeForTheme] = useState('')
    const [choosenTheme, setChoosenTheme] = useState('')

    const [theme, setTheme] = useState([])

    useEffect(() => {
        axios.get('http://localhost:4000/questions')
            .then(res => {
                setAllType(res.data)
                let allTypes = [];
                for (let i = 0; i < res.data.length; i++) {
                    if (!allTypes.includes(res.data[i].type)) {
                        allTypes.push(res.data[i].type)
                    }
                }
                setType(allTypes);
            })
            .catch(err => console.log(err))
    }, [])



    function handleTheme() {
        const filter = allType.filter(find => find.type.toLowerCase().includes(typeForTheme.toLowerCase()))
        let allTheme = []
        for (let i = 0; i < filter.length; i++) {
            if (!allTheme.includes(filter[i].theme)) {
                allTheme.push(filter[i].theme)
            }
        }
        setChoosenTheme(allTheme)
    }


    const [count, setCount] = useState('5')

    const [time , setTime] = useState('');
    const [timeCon, setTimeCon] = useContext(timeContext)

    if(time < 61){
        setTimeCon(time)
    }else{
        setTimeCon(60)
    }

    console.log(timeCon);



    return (
        <>
            <div className="home">
                <Navbar />
                <h2 className="text-center">Bilmingizni biz bilan mustahkamlang</h2>
                <h6 className="text-center mt- mb-5" >Quyida mavzu va test sonini tanlang </h6>
                <div className=" homeRow">
                    <div className="row">
                        <div className="col-3 answer">
                            <h6>Yonalishni tanlang</h6>
                            <select className="form-select form-select-sm p-2" aria-label="form-select-sm example" onClick={handleTheme} onChange={(e) => setTypeForTheme(e.target.value)} >
                            <option value="">Fanni tanlang</option>
                                {type && type.map((post, inx) => {
                                    return (
                                        <option key={inx} value={post}>{post.charAt(0).toUpperCase() + post.slice(1)}</option>
                                    )
                                })}
                            </select>
                        </div>

                        <div className="col-3 answer">
                            <h6>Mavzuni tanlang</h6>
                            <select className="form-select form-select-sm p-2" aria-label=".form-select-sm example" onChange={(e) => setTheme(e.target.value)} >
                                <option value="">Mavzuni tanlang</option>
                                {choosenTheme && choosenTheme.map(post => {
                                    return (
                                        <option key={post.id} value={post.theme}>{post.charAt(0).toUpperCase() + post.slice(1)}</option>
                                    )
                                })
                                }
                            </select>
                        </div>

                        <div className="col-3 answer">
                            <h6>Testlar soni</h6>
                            <input type="number" placeholder="testlar sonini kiriting" className="form-contro p-2" onChange={(e) => setCount(e.target.value)} />
                        </div>
                        <div className="col-3 answer">
                            <h6>Vaqtni tanlang (minut)</h6>
                            <input type="number" placeholder="Test vaqtini kiriting" onChange={(e) => setTime(e.target.value)} />
                        </div>
                    </div>
                    <button id="boshlashBtn" onClick={() => navigate('/examPage', { state: { id: 1, type: typeForTheme.toLowerCase(), theme: theme.toLowerCase(), count: count } })}>Boshlash</button>
                </div>
            </div>
        </>
    )
}