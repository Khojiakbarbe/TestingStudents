import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { loginContext } from "./ContextProvider/DataProvider";
import { useNavigate } from "react-router-dom";
import kirishImg from '../images/bg/kirishImg.png'

export default function Login() {

    const [loginCon, setLoginCon] = useContext(loginContext)

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

    const [telRequest, setTelRequest] = useState('login : ')
    const [parolRequest, setParolRequest] = useState('*****')


    const [notFound, setNotFound] = useState('')

    function check() {
        if (tel.length > 1 && password.length > 1) {
            for (let i = 0; i < loginLength; i += 2) {
                if (login[i].tel == tel && login[i].password == password) {
                    setLoginCon(true)
                    navigate('/home')
                } else {
                    for (let i = 1; i < loginLength; i += 2) {
                        if (login[i].tel == tel && login[i].password == password) {
                            setLoginCon(true)
                            navigate('/home')
                        } else {
                            setLoginCon('false')
                            i--;
                        }
                    }
                    i++;
                    setNotFound("Login yoki parol notog'ri")
                    setTelRequest("login : ")
                    setParolRequest("*****")
                }
            }
        } else {
            setTelRequest("To'ldirilmagan ⚠")
            setParolRequest("To'ldirilmagan ⚠")
        }
        setTel('')
        setPassword('')
    }


    return (
        <div className="logIn">
            <div className="row">
                <div className="col-6 loginResponsive logInBg">
                    <div className="textTizim">
                        <p style={{ color: '#7A3700' }}>Infinity</p>
                        <p>boshqaruv </p>
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
                            <span>Testda qatnashish uchun iltimos Login va Parolni kiriting</span>
                        </p>
                    </div>

                    <div className=" container W-50 p-5">
                        <h4 style={{ color: 'red' }}>{notFound}</h4>
                        <div className="w-50" style={{ margin: '0 auto', textAlign: 'left' }}>
                            <span>Loginni kiriting: </span>
                            <input type="text" className="form-control mb-3" placeholder={telRequest} value={tel} onChange={(e) => setTel(e.target.value)} required />
                            <span>Parol : </span>
                            <input type="text" className="form-control  mb-3" placeholder={parolRequest} value={password} onChange={(e) => setPassword(e.target.value)} />
                            <button className="btn w-100  btn-danger" onClick={() => check()}>Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}