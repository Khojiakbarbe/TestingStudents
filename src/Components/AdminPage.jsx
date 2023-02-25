import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminPage() {

    const navigate = useNavigate();

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [checkClass, setCheckClass] = useState('hiddenCheckRegistrate')
    const [error, setError] = useState('')



    // for delete question page


    const [deletePage, setDeletePage] = useState('')

    function forDeletePage() {
        setDeletePage('siuu')
    }
    function backFromDelete() {
        setDeletePage('')
    }

    const [questions, setQuestions] = useState([])

    useEffect(() => {
        axios.get('http://localhost:4000/questions')
            .then(res => {
                setQuestions(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    const [type, setType] = useState('')
    const [theme, setTheme] = useState('')


    let forType = [];
    for (let i = 0; i < questions.length; i++) {
        if (!forType.includes(questions[i].type)) {
            forType.push(questions[i].type)
        }
    }

    let forTheme = [];
    const filterTheme = questions.filter(post => post.type.toLowerCase().includes(type));
    for (let i = 0; i < filterTheme.length; i++) {
        if (!forTheme.includes(filterTheme[i].theme)) {
            forTheme.push(filterTheme[i].theme)
        }
    }

    // for add admin
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
                    setCheckClass('hiddenCheckRegistrate')
                })
                .catch(err => console.log(err))
        }
        else {
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
                        <div className="col-md-6 mb-3" >
                            <div className='adminPageCols' onClick={() => navigate('/registrate')}>
                                <h1>
                                    O'quvchilarni ro'yhatdan o'tkazish
                                </h1>
                            </div>
                        </div>
                        <div className="col-md-6 mb-3" >
                            <div className='adminPageCols' onClick={() => navigate('/addQuestions')}>
                                <h1>
                                    Yangi test kiritish
                                </h1>
                            </div>
                        </div>
                        <div className="col-md-6 mb-3" >
                            <div className='adminPageCols' onClick={forDeletePage}>
                                <h1>
                                    Mavjud testlarni o'chirish
                                </h1>
                            </div>
                        </div>
                        <div className="col-md-6 mb-3" >
                            <div className='adminPageCols' onClick={addAdmin}>
                                <h1>
                                    Yangi admin qoshish
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                deletePage.length > 1 ?
                    <div >
                        <div className="adminMalumoti">
                            <div>
                                <h2 style={{ textAlign: 'center' }}>Fan va mavzuni tanlang</h2>
                                <p style={{ color: 'red' }}>{error}</p>
                                <p>Fanni tanlang</p>
                                <select className="form-select form-select-sm p-2 mb-3" aria-label=".form-select-sm example" onChange={(e) => setType(e.target.value)} >
                                    <option value="">Fanni tanlang</option>
                                    {
                                        forType.map(post => {
                                            return (
                                                <option value={post}>{post}</option>
                                            )
                                        })
                                    }
                                </select>
                                <p>Mavzuni tanlang</p>
                                <select className="form-select form-select-sm p-2" aria-label=".form-select-sm example" onChange={(e) => setTheme(e.target.value)} >
                                    <option value="">Mavzuni tanlang</option>
                                    {
                                        forTheme.map(post => {
                                            return (
                                                <option value={post}>{post}</option>
                                            )
                                        })
                                    }
                                </select>
                                <button className="btn w-100 p-2 color-white mt-3 mb-2" style={{ background: '#FBC400' }} onClick={() => navigate('/deleteQuestions', { state: { id: 1, type: type, theme: theme } })}><strong>Testlarni ko'rish</strong></button>
                                <button className="btn btn-primary w-100 p-2" onClick={backFromDelete}>Orqaga qaytish</button>
                            </div>
                        </div>
                    </div>
                    :
                    null
            }

            <div className={checkClass}>
                <div className="adminMalumoti">
                    <div>
                        <h2 style={{ textAlign: 'center' }}>Admin ma'lumotini kiriting </h2>
                        <p style={{ color: 'red' }}>{error}</p>
                        <p>Yangi login</p>
                        <input type="text" className='form-control mb-4' placeholder="Login" onChange={(e) => setLogin(e.target.value)} value={login} />
                        <p>Yangi parol</p>
                        <input type="text" className='form-control mb-4' placeholder="Parol" onChange={(e) => setPassword(e.target.value)} value={password} />
                        <button className="btn w-100 p-2 color-white mb-2" style={{ background: '#FBC400' }} onClick={addNewLogin}><strong>Saqlash</strong></button>
                        <button className="btn btn-primary w-100 p-2" onClick={orqaga}>Orqaga qaytish</button>
                    </div>
                </div>
            </div>
        </>
    )
}