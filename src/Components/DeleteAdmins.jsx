import React, { useState, useEffect } from "react";
import axios from "axios";



export default function DeleteAdmins() {

    const [allAdmins, setAllAdmins] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:4000/users')
            .then(res => {
                setAllAdmins(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    const filter = []
    for (let i = 1; i < allAdmins.length; i++) {
        filter.push(allAdmins[i])
    }

    const [request, setRequest] = useState('')

    const [id, setId] = useState('')

    function showRequest(id) {
        setId(id)
        setRequest('giveRequest')
    }

    function deleteAdmin() {
        axios.delete('http://localhost:4000/users', { data: { id } })
            .then(res => {
                console.log('data successfully deleted');
                setRequest('')
                setAllAdmins(allAdmins.filter(p => p._id !== id))

            })
    }



    return (
        <>
            {
                request.length > 0 ?
                    <div className="adminMalumoti">
                        <div>
                            <h2 style={{ textAlign: 'center' }}>Test haqiqatdan o'chirilsinmi</h2>
                            <button className="btn w-50 p-2 color-white " style={{ background: '#FBC400' }} onClick={() => deleteAdmin()}><strong>O'chirish</strong></button>
                            
                            <button className="btn btn-primary w-50 p-2" onClick={() => setRequest('')}>Qoldirish</button>
                        </div>
                    </div>
                    :
                    null
            }
            <div className="container p-3">
                <div className="row">
                    {allAdmins.length > 0 ?
                        filter.map(post => {
                            return (
                                <div key={post._id} className="col-3 p-3 mb-2 ">
                                    <div className="bg-dark p-3" style={{ color: 'white' }}>
                                        <h4>User : {post.login}</h4>
                                        <h4>Parol : {post.password}</h4>
                                        <br />
                                        <button className="btn btn-danger" onClick={() => showRequest(post._id)}>Delete</button>
                                    </div>
                                </div>
                            )
                        })
                        :
                        <p>kuting</p>
                    }

                </div>
            </div>

        </>
    )
}