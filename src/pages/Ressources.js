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


function Ressources() {

    const [codes, setCodes] = useState([]);
    const [etatModal, setEtatModal] = useState(false);

    const getAllCodes = () => {
        axios.get('http://localhost:5000/api/generates/', { headers: authHeader() }).then(res => {
            setCodes(res.data.data)
        }).catch(err => {
            console.log(err)
        })
    }

    const deleteCodeHandle = (id) => {

        swal({
            title: "Avertissement.",
            text: "Etes-vous sûr de vouloir supprimer ce code ?",
            icon: "warning",
            buttons: true,
            dangerMode: true
        }).then((willDelete) => {
            if (willDelete) {
                axios.delete(`http://localhost:5000/api/generates/${id}`, { headers: authHeader() }).then(res => {
                    console.log('RES :: ', res)
                    getAllCodes();
                }).catch(err => {
                    console.log(err)
                })
                swal('Code supprimé avec succès', {
                    icon: "success",
                });
            }
        }).catch((error) => {
            console.log(error);
        })

    }

    const showModalAddCode = () => {
        setEtatModal(true)
    }

    const closeModal = () => {
        setEtatModal(false);
    }

    const handlePrint = () => {
        alert('Vous ne pouvez pas encore imprimer')
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
                            <div className="card ressources">
                                <div className="card-body">
                                    <div className="col-12">
                                        <div className="row" style={{ paddingLeft: '-15px' }}>
                                            <div className="col-6">
                                                <input type="search" className="form-control" placeholder="Rechercher..." />
                                            </div>
                                            <div className="col-6">
                                                <button className="btn btn-primary" onClick={showModalAddCode}>
                                                    Ajouter un nouveau code
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card mt-3">
                                <div className="card-header">Liste de codes {codes && codes.length}</div>
                                <div className="card-body">
                                    <table className="table table">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Code</th>
                                                <th>Montant</th>
                                                <th>Statut</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                codes && codes.map((value, index) => {
                                                    return (
                                                        <>
                                                            <tr key={value.id}>
                                                                <td>{index + 1}</td>
                                                                <td>{value.content}</td>
                                                                <td>{value.montant}</td>
                                                                <td>{value.statut}</td>
                                                                <td style={{ width: "140px" }}>
                                                                    <button className="btn btn-danger" onClick={(e) => deleteCodeHandle(value.id)}>
                                                                        <i className="fa fa-trash"></i> Supprimer
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        </>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <AddCode
                show={etatModal}
                close={closeModal}
                getAllCodes={getAllCodes}
            />
        </>
    )
}

export default Ressources