import React, { useEffect, useState } from 'react'
import Leftbar from '../components/Leftbar'
import Navbar from '../components/Navbar'
import axios from 'axios';
import '../assets/Ressources.css';
import authHeader from '../auth/auth-header';
import Load from '../components/Load';
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

    const printHandle = () => {
        return window.print()
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
                                        <div className="row">
                                            <div className="col-4">
                                                <input type="search" className="form-control" placeholder="Rechercher..." />
                                            </div>
                                            <div className="col-4">
                                                <button className="btn btn-primary" onClick={showModalAddCode} style={{ width: "100%" }}>
                                                    Ajouter un nouveau code
                                                </button>
                                            </div>
                                            <div className="col-4">
                                                <button className="btn btn-primary" onClick={printHandle} style={{ width: "100%" }}>
                                                    Imprimer <i className='fa fa-print'></i>
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
                                                                <td id="valContent">{value.content}</td>
                                                                <td>{value.montant}</td>
                                                                <td>
                                                                    {
                                                                        value.statut == 0 ? "Non utilisé" : "Utilisé"
                                                                    }
                                                                </td>
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