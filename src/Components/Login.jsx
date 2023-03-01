import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { loginContext } from "./ContextProvider/DataProvider";
import { useNavigate } from "react-router-dom";
import kirishImg from '../images/bg/kirishImg.png'

export default function Login() {

    const [loginCon, setLoginCon] = useContext(loginContext)

    const navigate = useNavigate();


    // For admin page
    const [login, setLogin] = useState([]);

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
        }
    }
    const handleKeyAdmin = (event) => {
        if (event.key === 'Enter') {
            const filter = login.filter(info => info.password.toLowerCase() == adminPassword.toLowerCase() && info.login.toLowerCase() == adminLogin.toLowerCase())
            if (!filter.length < 1) {
                setLoginCon(true)
                navigate('/admin')
                setCurrectLogin('adminPageOpen')
            }
        } else {
            console.log(user.length);
        }
    }

    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')




    const [notFound, setNotFound] = useState('')

    function check() {
        if (user.length > 1 && password.length > 1) {
            axios.post('http://localhost:4000/students', {
                user,
                password
            })
                .then(res => {
                    if (res.data.status === 200) {
                        setLoginCon(true)
                        navigate('/examPage2', { state: { id: 1, data: res.data, user: user, password: password } })

                    } else {
                        setNotFound("O'quvchi topilmadi")
                        setUser('')
                        setPassword('')
                    }
                })
        }
    }
    const checkUserPassword = (event) => {
        if (event.key === 'Enter') {
            if (user.length > 1 && password.length > 1) {
                axios.post('http://localhost:4000/students', {
                    user,
                    password
                })
                    .then(res => {
                        if (res.data.status === 200) {
                            setLoginCon(true)
                            navigate('/examPage2', { state: { id: 1, data: res.data, user: user, password: password } })

                        } else {
                            setNotFound("O'quvchi topilmadi")
                            setUser('')
                            setPassword('')
                        }
                    })
            }
        }
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
                            <input type="text" className="form-control mb-3" placeholder='login' value={user} onChange={(e) => setUser(e.target.value)} required />
                            <span>Parol : </span>
                            <input type="password" className="form-control  mb-3" placeholder='parol' value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={checkUserPassword} />
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
                </div>
            </div>
            <div className={currectLogin}>
                <div className="adminMalumoti">
                    <div>
                        <h2 style={{ textAlign: 'center' }}>Admin ma'lumotini kiriting </h2>
                        <p>Login</p>
                        <input type="text" className='form-control mb-4' placeholder="Login" onChange={(e) => setAdminLogin(e.target.value)} />
                        <p>Parol</p>
                        <input type="password" className='form-control mb-4' placeholder="Parol" onChange={(e) => setAdminPassword(e.target.value)} onKeyDown={handleKeyAdmin} />
                        <button className="btn w-100 p-2 color-white mb-2" style={{ background: '#FBC400' }} onClick={openAdminPage}><strong>Kirish</strong></button>
                        <button className="btn btn-primary w-100 p-2" onClick={() => setCurrectLogin('adminPageOpen')}>Orqaga qaytish</button>
                    </div>
                </div>
            </div>
        </div >
    )
}