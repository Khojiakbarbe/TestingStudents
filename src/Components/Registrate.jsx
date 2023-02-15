import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import kirishImg from '../images/bg/kirishImg.png'

export default function Registrate() {


    const navigate = useNavigate();


    const [myPassword, setMyPassword] = useState('infinity')
    const [checkPassword, setCheckPassword] = useState('')
    const [checkClass, setCheckClass] = useState('')
    const[error, setError] = useState('')


    function handleCHeck(){
        if(checkPassword == myPassword){
            setCheckClass('hiddenCheckRegistrate')
        }else{
            setError("---- parol noto'g'ri ----")
        }
    }

    const [loginRequest, setLoginRequest] = useState('')
    const [parolRequest, setParolRequest] = useState('')

    const [login, setlogin] = useState('')
    const [password, setpassword] = useState('')


    function check() {
        if (login.length > 5 && password.length > 5) {
            axios.post('http://localhost:4000/users', {
                login,
                password
            })
                .then(res => {
                    console.log(res.data);
                })
                .catch(err => console.log(err))
            navigate('/')
        } else {
            setLoginRequest("eng kami 6ta belgi bolishi kerak")
            setParolRequest("eng kami 6ta belgi bolishi kerak")
        }
    }


    return (
        <>
            <div className={checkClass}>
                <div className="container w-50 p-5">
                    <h5>Parolni kiriting  <span style={{color : 'red'}}>{error}</span></h5>
                    <input type="text" className='form-control' onChange={(e) => setCheckPassword(e.target.value)} />
                    <button className="btn btn-primary m-3" onClick={() => navigate('/')}>Orqaga qaytish</button>
                    <button className="btn btn-danger" onClick={handleCHeck}>Kirish</button>
                </div>
            </div>
            {
                checkClass == 'hiddenCheckRegistrate' ?
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
                            <div className="col-6 loginInputs loginResponsive">
                                <div >
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
                                        <span>Yangi loginni kiriting: </span>
                                        <span style={{ color: 'red' }}>{loginRequest}</span>
                                        <input type="text" className="form-control mb-3" placeholder={loginRequest} value={login} onChange={(e) => setlogin(e.target.value)} required />
                                        <span>Yangi parol : </span>
                                        <input type="text" className="form-control  mb-3" placeholder={parolRequest} value={password} onChange={(e) => setpassword(e.target.value)} />
                                        <button className="btn w-100  btn-danger" onClick={() => check()}>Login</button>
                                        <p className="mt-3 linkToRegistrate" onClick={() => navigate('/')}>login</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                    :
                    null
            }
        </>
    )
}