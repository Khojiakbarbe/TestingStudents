import React, { useState, useEffect } from "react";
import axios from "axios";



export default function EditAdminPassword() {

    const [id, setId] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/users/')
            .then(res => {
                setId(res.data[0]._id)
            })
            .catch(err => console.log(err))
    }, [])

    const [login, setUser] = useState('')
    const [password, setPassword] = useState('')


    function changeAdmin() {
        axios.put('http://localhost:4000/users/', {
            id: id,
            new: {
                login, 
                password
            }
        })
            .then(res => {
                console.log(res.data);
            })
            .catch(err => console.log(err))
    }
    return (
        <div className="container pt-5 w-50">
            <input type="text" placeholder="user" onChange={(e) => setUser(e.target.value)} className="form-control mb-3" />
            <input type="text" placeholder="password" onChange={(e) => setPassword(e.target.value)} className="form-control" />
            <button className="btn btn-warning mt-3" onClick={() => changeAdmin()}>Save</button>
        </div>
    )
}