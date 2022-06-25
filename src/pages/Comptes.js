import React, { useEffect, useState } from 'react'
import Leftbar from '../components/Leftbar'
import Navbar from '../components/Navbar'
import axios from 'axios';
import '../assets/Ressources.css';
import authHeader from '../auth/auth-header';
import { Card } from '@material-ui/core';
import Load from '../components/Load';
import { ToggleOff } from '@material-ui/icons';
import { NavLink } from 'react-router-dom';
import { ToggleOn } from '@mui/icons-material';


function Comptes() {

    const [etatClic, setEtatClic] = useState(false)
    const [comptes, setComptes] = useState([])

    const handleClick = () => {
        setEtatClic(!etatClic)
    }

    const compte = JSON.parse(localStorage.getItem('data'));
    let idCompte = compte?.comptes[0]?.id

    const getComptes = () => {
        axios.get(`http://localhost:5000/api/comptes/${idCompte}`, { headers: authHeader() }).then(res => {
            setComptes(res.data)
        }).catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        getComptes()
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
                                <div className="card-header">
                                    <h5>
                                        Compte ONYO-BT pour {compte?.nom}
                                    </h5>
                                </div>
                                <Card className="p-3 mt-2 mb-2">
                                    <div className='d-flex'>
                                        <h6>
                                            Votre solde
                                            <br />
                                            <h5 className='valueCompte'>
                                                {etatClic ?
                                                    <>  {comptes?.data?.montant}
                                                        <span style={{ color: 'red' }}> {compte?.comptes[0]?.devise}</span> </>
                                                    : '****'

                                                }
                                            </h5>
                                        </h6>

                                        <p>
                                            {
                                                etatClic === false ? <ToggleOff className='toggleBtn'
                                                    onClick={handleClick}
                                                    style={{
                                                        fontSize: '40px', color: "#333", marginTop: '-10px'
                                                    }}
                                                /> : <ToggleOn
                                                    className='toggleBtn'
                                                    onClick={handleClick}
                                                    style={{
                                                        fontSize: '40px', color: "#333", marginTop: '-10px'
                                                    }}
                                                />
                                            }
                                        </p>
                                    </div>
                                    <hr />
                                    <p>
                                        OBT Compte
                                    </p>
                                    <p>
                                        <NavLink to="/transaction">
                                            <i className="fa fa-arrow-left"></i> Retour
                                        </NavLink>
                                    </p>
                                </Card>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Comptes