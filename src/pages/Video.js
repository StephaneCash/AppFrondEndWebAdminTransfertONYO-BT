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


function Video() {

    const [data, setData] = useState([]);

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
                                            <h4 style={{ marginRight: '10px' }}>Liste de vidéos <i className="fa fa-video-camera"></i></h4>
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

export default Video