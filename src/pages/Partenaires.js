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


function Partenaires() {

   

    return (
        <div>
            <Navbar />

            <div className='col-12'>
                <div className='d-flex'>
                    <div className='col-2'><Leftbar /></div>
                    <div className='col-10 ressources' style={{ marginTop: '70px' }}>
                        <h5>Codes pour accéder dans les contenus ONYO-BT</h5>
                        <h6>
                            Il y a {codes ? codes.length + " codes générés" : "0 Code"}
                        </h6>

                        <Button onClick={showModalAddCode} variant='contined' style={{ border: "1px solid #0071c0", color: "blue" }}>
                            <span style={{ color: 'red' }}>Créer un code</span>
                        </Button>

                        <Card className='card mt-4'>
                            <table className='table table-striped table-borderless'>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Code</th>
                                        <th>Statut</th>
                                        <th>Validité</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        codes ?

                                            codes.map((val, key) => {
                                                return (
                                                    <tr key={key}>
                                                        <td>{key + 1}</td>

                                                        <td>{val.content}</td>
                                                        <td>
                                                            {
                                                                val.statut === '0' ? <span style={{ fontWeight: 'bold', color: "orange" }}>Non utilisé</span> :
                                                                    val.statut === '1' && <span style={{ fontWeight: 'bold', color: 'green' }}>Déjà utilisé</span>
                                                            }
                                                        </td>
                                                        <td>1h 48min</td>
                                                        <td style={{ width: '80px' }}>
                                                            <Button variant='contained' onClick={(e) => deleteCodeHandle(val.id)}>
                                                                <Delete />
                                                            </Button>
                                                        </td>

                                                    </tr>
                                                )
                                            })

                                            : <tr className="textPasData">
                                                <td colSpan='8px'>
                                                    <Load />
                                                </td>
                                            </tr>

                                    }
                                </tbody>
                            </table>
                        </Card>
                    </div>
                </div>
            </div>

            <AddCode
                show={etatModal}
                close={closeModal}
                getAllCodes={getAllCodes}
            />
        </div>
    )
}

export default Partenaires