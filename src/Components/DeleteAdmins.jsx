import React, { useState, useEffect } from "react";
import axios, { all } from "axios";



export default function DeleteAdmins() {

    const [allAdmins, setAllAdmins] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:4000/users')
            .then(res => {
                setAllAdmins(res.data)
                // for (let i = 1; i < res.data.length; i++) {
                //     allAdmins.push(res.data[i])
                // }
            })
            .catch(err => console.log(err))
    }, [])

    const filter = []
    for (let i = 1; i < allAdmins.length; i++) {
        filter.push(allAdmins[i])
    }

    function deleteAdmin(id) {
        axios.delete('http://localhost:4000/users', { data: { id } })
            .then(res => {
                console.log('data successfully deleted');
                setAllAdmins(allAdmins.filter(p => p._id !== id))
            })
    }



    return (
        <div className="container p-3">
            <div className="row">
                {allAdmins.length > 0 ?
                    filter.map(post => {
                        return (
                            <div key={post._id} className="col-3 p-3 mb-2 ">
                                <div className="bg-dark p-3" style={{color:'white'}}>
                                    <h4>User : {post.login}</h4>
                                    <h4>Parol : {post.password}</h4>
                                    <br />
                                    <button className="btn btn-danger" onClick={() => deleteAdmin(post._id)}>Delete</button>
                                </div>
                            </div>
                        )
                    })
                    :
                    <p>kuting</p>
                }

            </div>
        </div>
    )
}