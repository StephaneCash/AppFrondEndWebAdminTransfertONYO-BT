import React, { useEffect, useState } from 'react'
import Leftbar from '../components/Leftbar'
import Navbar from '../components/Navbar'
import axios from 'axios';
import '../assets/Ressources.css';
import authHeader from '../auth/auth-header';
import { Button, Card } from '@material-ui/core';
import Load from '../components/Load';
import { Delete } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import AddCode from '../dialogs/AddCode';
import swal from "sweetalert";


function ConfigVideo() {

    const [data, setData] = useState([])

    const getAllCodes = () => {
        axios.get('http://localhost:5000/api/videos/', { headers: authHeader() }).then(res => {
            setData(res.data.data)
        }).catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        getAllCodes();
    }, [])

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
                            <div className="ressources">
                                <div className="card">
                                    <div className='card-body'>
                                        Configuration <i className="fa fa-cog fa-spin"></i>
                                    </div>
                                </div>

                                <div className="card mt-3">
                                    <div className='card-body'>
                                        <table className="table table-borderless">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Description</th>
                                                    <th>Vidéo</th>
                                                    <th>Prix</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    data ? data.map((val, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>{index + 1}</td>
                                                                <td>{val.nom}</td>
                                                                <td>
                                                                    <img src={val.content} width='50' />
                                                                </td>
                                                                <td>{val.prix ? val.prix + " ONYO-BT" : "Prix non défini"} </td>
                                                                <td style={{width:'120px'}}>
                                                                    <button className='btn btn-success'>
                                                                        <i className="fa fa-edit"></i> Editer
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    }) : "Pas de données"
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ConfigVideo