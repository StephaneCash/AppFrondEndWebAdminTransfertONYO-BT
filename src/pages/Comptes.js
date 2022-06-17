import React, { useEffect, useState } from 'react'
import Leftbar from '../components/Leftbar'
import Navbar from '../components/Navbar'
import axios from 'axios';
import '../assets/Ressources.css';
import authHeader from '../auth/auth-header';
import { Button, Card } from '@material-ui/core';
import Load from '../components/Load';
import { Delete, ToggleOff } from '@material-ui/icons';
import { Link, NavLink } from 'react-router-dom';
import AddCode from '../dialogs/AddCode';
import swal from "sweetalert";
import { ToggleOn } from '@mui/icons-material';


function Comptes() {

    const [comptes, setComptes] = useState([])
    const [etatClic, setEtatClic] = useState(false)
    const [partenaires, setPartenaires] = useState([])

    const getComptePartenaires = () => {
        axios.get('http://localhost:5000/api/partenaires/v1/comptes/', { headers: authHeader() }).then(res => {
            setPartenaires(res.data.data)
        }).catch(err => {
            console.log(err)
        })
    }

    const getCompte = () => {
        axios.get('http://localhost:5000/api/comptes/', { headers: authHeader() }).then(res => {
            setComptes(res.data.data)
        }).catch(err => {
            console.log(err)
        })
    }

    const handleClick = () => {
        setEtatClic(!etatClic)
    }

    useEffect(() => {
        getComptePartenaires()
        getCompte()
    }, [])

    let max = 0;

    partenaires.forEach((res) => {
        if (res.id > max) {
            max = res.id
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
                            <div className="card ressources">
                                <div className="card-header"><h5>Compte ONYO-BT</h5></div>
                                <Card className="p-3 mt-2 mb-2">
                                    <div className='d-flex'>
                                        <h6>
                                            Votre solde
                                            <br />
                                            <h5 className='valueCompte'>
                                                {
                                                    etatClic === false ? "******"
                                                        : partenaires && partenaires[max - 1].comptes.map((val, key) => {
                                                            return <span key={key}>{val.montant} OBT</span>
                                                        })
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