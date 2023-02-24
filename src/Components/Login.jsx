import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { loginContext } from "./ContextProvider/DataProvider";
import { useNavigate } from "react-router-dom";
import kirishImg from '../images/bg/kirishImg.png'

export default function Login() {

    const [loginCon, setLoginCon] = useContext(loginContext)

    const navigate = useNavigate();

    const [login, setLogin] = useState([]);

    const [data, setData] = useState([])
    const [adminPassword, setAdminPassword] = useState('')
    const [adminLogin, setAdminLogin] = useState('')

    useEffect(() => {
        axios.get('http://localhost:4000/users')
            .then(res => {
                setLogin(res.data)
            })
            .catch(err => console.log(err))

    }, [])

    const [currectLogin, setCurrectLogin] = useState('adminPageOpen')

    function openAdmin() {
        setCurrectLogin('')
    }

    function openAdminPage() {
        const filter = login.filter(info => info.password.toLowerCase() == adminPassword.toLowerCase() && info.login.toLowerCase() == adminLogin.toLowerCase())
        if (!filter.length < 1) {
            setLoginCon(true)
            navigate('/admin')
            setCurrectLogin('adminPageOpen')
        } else {
        }
    }


    const [tel, setTel] = useState('')
    const [password, setPassword] = useState('')

    const loginLength = login.length;

    const [telRequest, setTelRequest] = useState('login : ')
    const [parolRequest, setParolRequest] = useState('*****')


    const [notFound, setNotFound] = useState('')

    function check() {
        if (tel.length > 1 && password.length > 1) {
            for (let i = 0; i < loginLength; i += 2) {
                if (login[i].login == tel && login[i].password == password) {
                    setLoginCon(true)
                    navigate('/home')
                } else {
                    for (let i = 1; i < loginLength; i += 2) {
                        if (login[i].login == tel && login[i].password == password) {
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


    function ozingizniSinang() {
        setLoginCon(true)
        navigate('/home')
    }


    return (
        <div className="logIn">
            <div className="row">
                <div className="col-6 loginResponsive logInBg">
                    <div className="textTizim">
                        <p style={{ color: '#7A3700' }}>Infinity</p>
                        <p>test </p>
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

                    <div className=" container  p-5">
                        <h4 style={{ color: 'red' }}>{notFound}</h4>
                        <div className="w-50" style={{ margin: '0 auto', textAlign: 'left' }}>
                            <span>Loginni kiriting: </span>
                            <input type="text" className="form-control mb-3" placeholder={telRequest} value={tel} onChange={(e) => setTel(e.target.value)} required />
                            <span>Parol : </span>
                            <input type="text" className="form-control  mb-3" placeholder={parolRequest} value={password} onChange={(e) => setPassword(e.target.value)} />
                            <button className="btn w-100 " style={{ background: "#FBC400" }} onClick={() => check()}><strong>Tizimga kirish</strong></button>
                            <p className="mt-3 text-center" >
                                <span className="loginLinks" onClick={openAdmin}>
                                    Admin
                                </span>
                                |
                                <span className="loginLinks" onClick={ozingizniSinang}>
                                    O'zingizni sinang
                                </span>
                            </p>
                        </div>
                    </div>
                <p><a href="/deleteQuestions">delete</a></p>
                </div>
            </div>
            <div className={currectLogin}>
                <div className="adminMalumoti">
                    <div>
                        <h2 style={{ textAlign: 'center' }}>Admin ma'lumotini kiriting </h2>
                        {/* <p style={{ color: 'red', textAlign: 'center' }}>{error}</p> */}
                        <p>Login</p>
                        <input type="text" className='form-control mb-4' placeholder="Login" onChange={(e) => setAdminLogin(e.target.value)} />
                        <p>Parol</p>
                        <input type="text" className='form-control mb-4' placeholder="Parol" onChange={(e) => setAdminPassword(e.target.value)} />
                        <button className="btn w-100 p-2 color-white mb-2" style={{ background: '#FBC400' }} onClick={openAdminPage}><strong>Kirish</strong></button>
                        <button className="btn btn-primary w-100 p-2" onClick={() => setCurrectLogin('adminPageOpen')}>Orqaga qaytish</button>
                    </div>
                </div>
            </div>
        </div >
    )
}