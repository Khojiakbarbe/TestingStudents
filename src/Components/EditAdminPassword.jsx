import React, { useState, useEffect, useContext } from "react";
import axios from "axios";



export default function EditAdminPassword() {

    const [change, setChange] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/users')
            .then(res => {
                setChange(res.data[0])
            })
            .catch(err => console.log(err))
    }, [])

    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')

    
    return (
        <div className="container pt-5">
            <input type="text" placeholder="user" onChange={(e) => setUser(e.target.value)} className="form-control mb-3" />
            <input type="text" placeholder="password" onChange={(e) => setPassword(e.target.value)} className="form-control" />
        </div>
    )
}