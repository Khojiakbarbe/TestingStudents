import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function Login() {

    const navigate = useNavigate();

    const [login, setLogin] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:9000/login')
            .then(res => {
                setLogin(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    const [tel, setTel] = useState('')
    const [password, setPassword] = useState('')

    const loginLength = login.length;
    // useEffect(() => {
    function check() {
        for (let i = 0; i < loginLength; i += 2) {
            if (login[i].tel == tel && login[i].password == password) {
                navigate('/home')
            } else {
                for (let i = 1; i < loginLength; i += 2) {
                    if (login[i].tel == tel && login[i].password == password) {
                        navigate('/home')
                    }else{
                        i--
                    }
                }
                i++
            }
        }
        // })


    }


    return (
        <div className="logIn">
            <div className="row">
                <div className="col-6 loginResponsive logInBg">
                    <div className="textTizim">
                        <p style={{ color: '#7A3700' }}>Infinity</p>
                        <p>boshqaruv </p>
                        <p>tizimi</p>
                    </div>
                </div>
                <div className="col-6 loginResponsive">
                    <div className="loginInputs">
                        <h1 >Infinity</h1>
                        <svg xmlns="http://www.w3.org/2000/svg" className="line1" width="200" height="1.5" viewBox="0 0 150 1" fill="none">
                            <line opacity="0.2" y1="0.5" x2="150" y2="0.5" stroke="black" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" className="line2" width="150" height="1" viewBox="0 0 150 1" fill="none">
                            <line opacity="0.2" y1="0.5" x2="150" y2="0.5" stroke="black" />
                        </svg>
                        <p className="loginInfo">
                            <span>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti possimus distinctio ad unde sunt vel</span>
                        </p>
                    </div>

                    <div className=" container p-5">
                        <div className="w-50" style={{ margin: '0 auto' }}>
                            <span>Tel raqam: </span>
                            <input type="text" className="form-control mb-3" placeholder="tel: " onChange={(e) => setTel(e.target.value)} />
                            <span>Parol : </span>
                            <input type="text" className="form-control  mb-3" placeholder="******" onChange={(e) => setPassword(e.target.value)} />
                            <button className="btn w-100  btn-danger" onClick={() => check()}>Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}