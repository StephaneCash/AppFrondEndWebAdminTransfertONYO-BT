import React, { useEffect, useState } from 'react'
import Leftbar from '../components/Leftbar'
import Navbar from '../components/Navbar'
import axios from 'axios';
import '../assets/Ressources.css';
import authHeader from '../auth/auth-header';
import { Button, Card } from '@material-ui/core';
import Load from '../components/Load';
import { Delete } from '@material-ui/icons';
import { Link, NavLink } from 'react-router-dom';
import AddCode from '../dialogs/AddCode';
import swal from "sweetalert";


function Partenaires() {

    const [data, setData] = useState([]);

    const getAllPartenaires = () => {
        axios.get('http://localhost:5000/api/partenaires/v1/categories', { headers: authHeader() }).then(res => {
            setData(res.data.data)
        })
    }

    useEffect(() => {
        getAllPartenaires()
    }, [])

    return (
        <div>
            <div className='col-12'>
                <div className="d-flex">
                    <div className="col-2">
                        <Leftbar />
                    </div>
                    <div className="col-10">
                        <div className="col-12">
                            <Navbar />
                        </div>
                        <div className="col-12" style={{ marginTop: '80px' }}>
                            <div className='col-12 ressources' style={{ marginTop: '70px' }}>

                                <div className="card">
                                    <div className="card-body">
                                        <div className="d-flex">
                                            <div style={{ marginRight: '10px' }}>
                                                <input type="search" className="form-control" placeholder="Rechercher..." />
                                            </div>

                                            <NavLink to='addTransaction'>
                                                <button className='btn btn-primary' style={{ cursor: 'pointer' }} >
                                                    Ajouter un partenaire
                                                </button>
                                            </NavLink>
                                        </div>
                                    </div>
                                </div>


                                <div className='card'>
                                    <table className='table table-borderless'>
                                        <thead>
                                            <tr>
                                                <th>Id</th>
                                                <th>Nom</th>
                                                <th>Catégorie</th>
                                                <th>Numéro de téléphone</th>
                                                <th>Adresse</th>
                                                <th>Statut</th>
                                                <th>Options</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                data && data.map((val, key) => {
                                                    return (
                                                        <tr>
                                                            <td>{key + 1}</td>
                                                            <td>{val.nom}</td>
                                                            <td>{val.categories ? val.categories.nom : 'Aucune catégorie assigée'} </td>
                                                            <td>{val.numTel}</td>
                                                            <td>{val.adresse}</td>
                                                            <td>{val.statut === 0 ? "Non opérationnel" : "Opérationnel"}</td>
                                                            <td style={{ width: '240px' }}>
                                                                <button className="btn">
                                                                    <i className="fa fa-trash"></i> Supprimer
                                                                </button>
                                                                <button className="btn" style={{ marginLeft: "10px" }}>
                                                                    <i className="fa fa-edit"></i> Editer
                                                                </button>
                                                            </td>
                                                        </tr>
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
        </div>
    )
}

export default Partenaires