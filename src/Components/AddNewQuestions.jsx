import React, { useState, useEffect } from "react";
import axios from 'axios'
import Navbar from "./Navbar";

import { useNavigate } from 'react-router-dom'


export default function AddNewQuestions() {

    const navigate = useNavigate()



    const [myPassword, setMyPassword] = useState('infinity')
    const [checkPassword, setCheckPassword] = useState('')
    const [checkClass, setCheckClass] = useState('')
    const [error, setError] = useState('')


    function handleCHeck() {
        if (checkPassword == myPassword) {
            setCheckClass('hiddenCheckRegistrate')
        } else {
            setError("---- parol xato ----")
        }
    }



    const [allDate, setAllDate] = useState([])
    useEffect(() => {
        axios.get('http://localhost:4000/questions')
            .then(res => {
                setAllDate(res.data)
            })
            .catch(err => console.log(err))
    }, [])



    // For post
    const [type, setType] = useState('')
    const [theme, setTheme] = useState('')



    let forType = [];
    for (let i = 0; i < allDate.length; i++) {
        if (!forType.includes(allDate[i].type)) {
            forType.push(allDate[i].type)
        }
    }

    let forTheme = [];
    const filterTheme = allDate.filter(post => post.type.toLowerCase().includes(type));
    for (let i = 0; i < filterTheme.length; i++) {
        if (!forTheme.includes(filterTheme[i].theme)) {
            forTheme.push(filterTheme[i].theme)
        }
    }

    const [newDirection, setNewDirection] = useState(false)
    return (
        <>
            <div className={checkClass}>
                <div className="adminMalumoti">
                    <div>
                        <h2 style={{ textAlign: 'center' }}>Admin ma'lumotini kiriting <span style={{ color: 'red' }}>{error}</span></h2>
                        <p>Login</p>
                        <input type="text" className='form-control mb-4' placeholder="Login" onChange={(e) => setCheckPassword(e.target.value)} />
                        <button className="btn w-100 p-2 color-white mb-2" style={{ background: '#FBC400' }} onClick={handleCHeck}><strong>Kirish</strong></button>
                        <button className="btn btn-primary w-100 p-2" onClick={() => navigate('/')}>Orqaga qaytish</button>
                    </div>
                </div>
            </div>
            <div className="home">
                <Navbar />
                <div>
                    <h2 style={{ textAlign: 'center' }}>Test tuzish</h2>
                    <h4 className="mb-5" style={{ textAlign: 'center' }}>Fan va mavzuni tanlang</h4>
                    <div className="newQuestions">
                        <div className="row mt-5" style={{ margin: '0 auto' }} >
                            <div className="col-6 ">
                                <h3>Fan</h3>
                                <select className="form-select form-select-sm p-2" aria-label=".form-select-sm example" onChange={(e) => { setType(e.target.value); if (e.target.value == 'boshqasi') setNewDirection(true); else setNewDirection(false); }}  >
                                    <option value="">Yo'nalishni tanlang</option>
                                    {forType.map((post, ind) => {
                                        return (
                                            <option key={ind} value={post}>{post}</option>
                                        )
                                    })}
                                    <option value="boshqasi">boshqasi</option>
                                </select>
                                {
                                    newDirection ?
                                        <input placeholder="yangi yo'nalishni kiriting" type="text" className="form-control mb-3 mt-3 w-100" onChange={(e) => setType(e.target.value)} />
                                        :
                                        null
                                }
                            </div>
                            <div className="col-6 ">
                                <h3>Mavzu</h3>
                                {
                                    newDirection ?
                                        <input type="text" placeholder="yangi mavzuni kiriting" className="form-control mb-3 w-100" onChange={(e) => setTheme(e.target.value)} />
                                        :
                                        <select className="form-select form-select-sm p-2" aria-label=".form-select-sm example" onChange={(e) => setTheme(e.target.value)} >
                                            <option value="">Mavzuni tanlang</option>
                                            {forTheme.map((post, ind) => {
                                                return (
                                                    <option key={ind} value={post}>{post}</option>
                                                )
                                            })}
                                        </select>
                                }
                            </div>
                        </div>
                        {
                            type.length > 3 && theme.length > 3 ?
                                <button className="btn mt-4 p-2" onClick={() => navigate('/newQuestions', { state: { id: 1, type: type, theme: theme } })}>Test kiritish</button>
                                :
                                <button className="btn mt-4" disabled>Test kiritish</button>

                        }
                    </div>
                </div>
            </div >
        </>
    )
}