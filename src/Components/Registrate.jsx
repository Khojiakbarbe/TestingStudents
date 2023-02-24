import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import kirishImg from '../images/bg/kirishImg.png'

export default function Registrate() {


    const navigate = useNavigate();



    const [manager, setManager] = useState('')
    const [subject, setSubject] = useState('')
    const [theme, setTheme] = useState('')
    const [numberOfQuestions, setNumberOfQuestions] = useState('')
    const [givenTime, setGivenTime] = useState('')

    function check() {
        axios.post('http://localhost:4000/sessions', {
            manager,
            subject,
            theme,
            numberOfQuestions,
            givenTime
        })
            .then(res => {
                console.log(res.data);
            })
            .catch(err => console.log(err))
        navigate('/')
    }


    return (

        <div className="logIn">

            <div className="row">
                <div className="col-6 loginResponsive logInBg">
                    <div className="textTizim">
                        <p style={{ color: '#7A3700' }}>Infinity</p>
                        <p>registratisya </p>
                        <p>tizimi</p>
                        <img src={kirishImg} alt="" />
                    </div>
                </div>
                <div className="col-6 loginInputs loginResponsive" style={{ marginTop: '5%' }}>
                    <div>
                        <h1 >Infinity</h1>
                        <svg xmlns="http://www.w3.org/2000/svg" className="line1" width="200" height="1.5" viewBox="0 0 150 1" fill="none">
                            <line opacity="0.2" y1="0.5" x2="150" y2="0.5" stroke="black" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" className="line2" width="150" height="1" viewBox="0 0 150 1" fill="none">
                            <line opacity="0.2" y1="0.5" x2="150" y2="0.5" stroke="black" />
                        </svg>
                        <p className="loginInfo">
                            <span>Ro'hatdan o'tish uchun iltimos sorovlarni toldiring</span>
                        </p>
                    </div>

                    <div className=" container W-50 p-5">
                        <div className="w-50" style={{ margin: '0 auto', textAlign: 'left' }}>


                            <span>Fan</span>
                            <select className="form-select form-select-sm p-2" aria-label=".form-select-sm example" onChange={(e) => setSubject(e.target.value)} >
                                <option value="">Yo'nalishni tanlang</option>
                                <option value="boshqasi">boshqasi</option>
                            </select>

                            <span>Mavzu</span>
                            <select className="form-select form-select-sm p-2" aria-label=".form-select-sm example" onChange={(e) => setTheme(e.target.value)}  >
                                <option value="">Yo'nalishni tanlang</option>
                                <option value="boshqasi">boshqasi</option>
                            </select>

                            <span>Testlar soni </span>
                            <input onChange={(e) => setNumberOfQuestions(e.target.value)} value={numberOfQuestions} type="number" className="form-control  mb-3" placeholder="1" />

                            <span>Vaqt ( minut ) </span>
                            <input type="number" onChange={(e) => setGivenTime(e.target.value)} value={givenTime} className="form-control  mb-3" placeholder="1" />


                            <button className="btn w-100  btn-danger" onClick={() => check()}>Saqlash</button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}