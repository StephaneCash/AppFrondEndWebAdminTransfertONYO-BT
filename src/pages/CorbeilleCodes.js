import React, { useEffect, useState, useRef } from 'react'
import Leftbar from '../components/Leftbar'
import Navbar from '../components/Navbar'
import axios from 'axios';
import '../assets/Ressources.css';
import authHeader from '../auth/auth-header';
import Load from '../components/Load';
import swal from "sweetalert";


function CorbeilleCodes() {

    const [codes, setCodes] = useState([]);

    const [search, setSearch] = useState('')

    const componentRef = useRef();

    const getAllCodes = () => {
        axios.get('http://localhost:5000/api/codesCopies/', { headers: authHeader() }).then(res => {
            setCodes(res.data.data)
        }).catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        getAllCodes();
    }, [])

    codes.forEach((val) => {
        if (val.statut === 1) {
            setTimeout(() => {
                axios.delete(`http://localhost:5000/api/codesCopies/${val.id}`, { headers: authHeader() })
                    .then(res => {
                        getAllCodes();
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }, 15000);
        }
    })

    return (
        <>
            <div className='col-12'>
                <div className="d-flex">
                    <div className="col-2">
                        <Leftbar />
                    </div>
                    <div className="col-10 ressources">
                        <div className="col-12">
                            <Navbar />
                        </div>
                        <div className="col-12" style={{ marginTop: '80px' }}>
                            <div className="card">
                                <div className="card-header">
                                    Corbeilles Codes {codes?.length}
                                </div>
                            </div>
                            <div className="card mt-3">
                                <table className='table table-borderless'>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Code</th>
                                            <th>Montant</th>
                                            <th>Statut</th>
                                            <th>Date de création</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            codes?.length ? codes.map((val, key) => {
                                                return (
                                                    <tr key={key}>
                                                        <td>{key + 1}</td>
                                                        <td>{val.content}</td>
                                                        <td>{val.montant}</td>
                                                        <td>
                                                            {
                                                                val.statut === 0 ? <span className="text-danger">Non utilisé</span> :
                                                                    <span className="text-success">Déjà utilisé</span>
                                                            }
                                                        </td>
                                                        <td>{val.createdAt}</td>
                                                    </tr>
                                                )
                                            }) :
                                                <tr className="textPasData">
                                                    <td colSpan='5px'>
                                                        <Load />
                                                    </td>
                                                </tr>
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CorbeilleCodes