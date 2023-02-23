import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import logo from '../images/bg/logoBgWhite.png'


export default function NewQuestions() {
    const navigate = useNavigate();

    const { state } = useLocation();
    const { type, theme } = state;

    // For post
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')
    const [questionImg, setQuestionImg] = useState('')


    const [count, setCount] = useState(1)




    function sendQuestion() {
        if (question.length > 5 && answer.length > 1) {
            const formDate = new FormData();

            formDate.append('type', type)
            formDate.append('theme', theme)
            formDate.append('question', question)
            formDate.append('answer', answer)
            formDate.append('questionImg', questionImg)


            axios.post('http://localhost:4000/questions', formDate)
                .then(res => {
                    setQuestion('')
                    setAnswer('')
                    setCount(count + 1)
                    console.log(res.data, 'data is saved');
                })
                .catch(err => console.log(err))
        } else {
            alert('Savol va javob ni kiriting')
        }
    }


    return (
        <>
            <div className="text-center pt-3">
                <img src={logo} className='img-fluid' />
            </div>
            <div className="container pt-2">
                <h6>{type} / {theme}</h6>
                <div className=" row">
                    <div className="col answer">
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlTextarea1" className="form-label">{count}-savol</label>
                            <textarea className="textArea" id="exampleFormControlTextarea1" placeholder="Savolni kiriting" value={question} onChange={(e) => setQuestion(e.target.value)} rows="12"></textarea>
                        </div>
                    </div>
                    <div className="col-3 answer border mt-3">
                        <input type="file" name="questionImg" accept='image/png, image/jpg, image/jpeg' onChange={e => setQuestionImg(e.target.files[0])} />
                        <img src={questionImg} alt="" />
                    </div>
                </div>
                <div className="">
                    <input type="text" placeholder="To'g'ri javob" className="newQuestionAnswer" value={answer} onChange={(e) => setAnswer(e.target.value)} />
                </div>
                <button className="btn newQuestionSave" onClick={() => sendQuestion()}><h5>Saqlash</h5></button>
                <div style={{ textAlign: 'end' }}>
                    <button className="btn btn-warning mt-2" onClick={() => navigate('/')}>Tugatish
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none">
                            <path d="M8.90991 19.9201L15.4299 13.4001C16.1999 12.6301 16.1999 11.3701 15.4299 10.6001L8.90991 4.08008" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>
        </>
    )
}