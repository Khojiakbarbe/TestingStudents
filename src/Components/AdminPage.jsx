import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminPage() {

    const navigate = useNavigate();

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [checkClass, setCheckClass] = useState('hiddenCheckRegistrate')
    const [error, setError] = useState('')



    function addAdmin() {
        setCheckClass('')
    }

    function addNewLogin() {
        if (login.length > 4 && password.length > 6) {
            axios.post('http://localhost:4000/users', {
                login,
                password
            })
                .then(res => {
                    console.log('data is saved' + res.data)
                    setError('saqlandi')
                })
                .catch(err => console.log(err))
        }
        else{
            setError('Login yoki parol qiymati yetarli emas')
        }
        setLogin('')
        setPassword('')
    }

    function orqaga() {
        setCheckClass('hiddenCheckRegistrate')
    }

    return (
        <>
            <div className="home">
                <div className="container pt-5">
                    <div className="btn btn-danger mb-5" onClick={() => navigate('/')}>Orqaga</div>
                    <div className="row">
                        <div className="col-md-3">
                            <button className="btn btn-danger w-100 mb-3" onClick={() => navigate('/registrate')}>Registratsiya</button>
                        </div>
                        <div className="col-md-3">
                            <button className="btn btn-danger w-100 mb-3" onClick={() => navigate('/addQuestions')}>Test kiritish</button>
                        </div>
                        <div className="col-md-3">
                            <button className="btn btn-danger w-100 mb-3" onClick={() => navigate('/deleteQuestions')}>Mavjud testlarni o'chirish</button>
                        </div>
                        <div className="col-md-3">
                            <button className="btn btn-danger w-100 mb-3" onClick={addAdmin} >Admin qoshish</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={checkClass}>
                <div className="adminMalumoti">
                    <div>
                        <h2 style={{ textAlign: 'center' }}>Admin ma'lumotini kiriting </h2>
                        <p style={{color : 'red'}}>{error}</p>
                        <p>Login</p>
                        <input type="text" className='form-control mb-4' placeholder="Login" onChange={(e) => setLogin(e.target.value)} value={login} />
                        <p>Parol</p>
                        <input type="text" className='form-control mb-4' placeholder="Parol" onChange={(e) => setPassword(e.target.value)} value={password}/>
                        <button className="btn w-100 p-2 color-white mb-2" style={{ background: '#FBC400' }} onClick={addNewLogin}><strong>Saqlash</strong></button>
                        <button className="btn btn-primary w-100 p-2" onClick={orqaga}>Orqaga qaytish</button>
                    </div>
                </div>
            </div>
        </>
    )
}