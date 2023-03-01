import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import kirishImg from '../images/bg/kirishImg.png'

export default function Registrate() {


    const navigate = useNavigate();


    const [info, setInfo] = useState([])
    const [takenUsers, setTakenUsers] = useState([])

    useEffect(() => {
        axios.get('http://localhost:4000/questions')
            .then(res => {
                setInfo(res.data)
            })
            .catch(err => console.log(err))

        axios.get('http://localhost:4000/users')
            .then(res => {
                setTakenUsers(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    const users = [];
    for(let i = 1; i < takenUsers.length; i++){
        users.push(takenUsers[i])
    }




    // Post
    const [manager, setManager] = useState('')
    const [subject, setSubject] = useState('')
    const [theme, setTheme] = useState('')
    const [numberOfQuestions, setNumberOfQuestions] = useState(1)
    const [givenTime, setGivenTime] = useState(1)


    const [checkClass, setCheckClass] = useState('hiddenCheckRegistrate')
    function addStudent() {
        if (manager.length > 1 && subject.length > 1 && theme.length > 1 && numberOfQuestions > 0 && givenTime > 0) {
            setCheckClass('')
        } else {
            setEmpty("Barcha so'rov to'ldirilmagan")
            console.log('empty');
        }
    }

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('')

    const [students, setStudents] = useState([]);
    const [studentCount, setStudentCount] = useState(1);

    const [empty, setEmpty] = useState('')

    function pushStudents() {
        students.push({
            "user": user,
            "password": password
        })
        setUser('');
        setPassword('');
        setStudentCount(studentCount + 1)
    }


    function check() {
        if (user.length > 1 && password.length > 1) {
            students.push({
                "user": user,
                "password": password
            })
            setUser('');
            setPassword('')
        }

        if (manager.length > 1 && subject.length > 1 && theme.length > 1 && numberOfQuestions > 0 && givenTime > 0 && students.length > 0) {
            axios.post('http://localhost:4000/sessions', {
                manager,
                subject,
                theme,
                numberOfQuestions,
                givenTime,
                students
            })
                .then(res => {
                    console.log(res.data);
                })
                .catch(err => console.log(err))
            navigate('/')
        }
    }
    // filter

    const type = [];
    for (let i = 0; i < info.length; i++) {
        if (!type.includes(info[i].type)) {
            type.push(info[i].type)
        }
    }

    const forTheme = [];
    const filterTheme = info.filter(post => post.type.toLowerCase().includes(subject));
    for (let i = 0; i < filterTheme.length; i++) {
        if (!forTheme.includes(filterTheme[i].theme)) {
            forTheme.push(filterTheme[i].theme)
        }
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
                            <h2 style={{ color: 'red' }}>{empty}</h2>
                            <span>Manager</span>
                            <select className="form-select form-select-sm p-2" aria-label=".form-select-sm example" onChange={(e) => setManager(e.target.value)} >
                                <option value="">Menejerni tanlang</option>
                                {
                                    users.map((post, ind) => {
                                        return (
                                            <option key={ind} value={post.login}>{post.login}</option>
                                        )
                                    })
                                }
                            </select>


                            <span>Fan</span>
                            <select className="form-select form-select-sm p-2" aria-label=".form-select-sm example" onChange={(e) => setSubject(e.target.value)} >
                                <option value="">Yo'nalishni tanlang</option>
                                {
                                    type.map((post, ind) => {
                                        return (
                                            <option key={ind} value={post}>{post}</option>
                                        )
                                    })
                                }
                            </select>

                            <span>Mavzu</span>
                            <select className="form-select form-select-sm p-2" aria-label=".form-select-sm example" onChange={(e) => setTheme(e.target.value)}  >
                                <option value="">Yo'nalishni tanlang</option>
                                {
                                    forTheme.map((post, ind) => {
                                        return (
                                            <option key={ind} value={post}>{post}</option>
                                        )
                                    })
                                }
                            </select>

                            <span>Testlar soni </span>
                            <input onChange={(e) => setNumberOfQuestions(e.target.value)} value={numberOfQuestions} type="number" className="form-control  mb-3" placeholder="1" />

                            <span>Vaqt ( minut ) </span>
                            <input type="number" onChange={(e) => setGivenTime(e.target.value)} value={givenTime} className="form-control  mb-3" placeholder="1" />

                            <button className="btn w-100  btn-danger" onClick={() => addStudent()} >O'quvchilarni biriktirish</button>

                        </div>

                    </div>
                </div>
                <div className={checkClass}>
                    <div className="adminMalumoti">
                        <div>
                            <h2 style={{ textAlign: 'center' }}>{studentCount}-o'quvchini kiritng</h2>
                            <p>O'quvchi</p>
                            <input type="text" className='form-control mb-4' placeholder="User" value={user} onChange={(e) => setUser(e.target.value)} />
                            <p>Parol</p>
                            <input type="text" className='form-control mb-4' placeholder="Parol" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <button className="btn w-100 p-2 color-white mb-2" style={{ background: '#FBC400' }} onClick={pushStudents}><strong>Saqlash va keyingi oquvchini kiritsh</strong></button>
                            <button className="btn btn-danger w-100 p-2" onClick={() => check()}>Ma'lumotni saqlash</button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}