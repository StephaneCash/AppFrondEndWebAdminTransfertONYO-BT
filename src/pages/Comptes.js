import React, { useEffect, useState } from 'react'
import Leftbar from '../components/Leftbar'
import Navbar from '../components/Navbar'
import axios from 'axios';
import '../assets/Ressources.css';
import authHeader from '../auth/auth-header';
import { Card } from '@material-ui/core';
import Load from '../components/Load';
import { ToggleOff } from '@material-ui/icons';
import { Link, NavLink } from 'react-router-dom';
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

    const [dataUser, setDataUser] = useState([])
    const [montantUser, setMontantUser] = useState(0)

    const getComptes = () => {
        axios.get("http://localhost:5000/api/users", { headers: authHeader() }).then(res => {
            if (res.data) {
                setDataUser(res.data.data)
            }
        }).catch(error => {
            console.log(error)
        })
    }

    useEffect(() => {
        getComptes();
    }, [])

    const dataComptesU = () => {
        dataUser.map((val => {
            if (val.role === 'Admin') {
                val.comptes.map((res => {
                    setMontantUser(res.montant)
                }))
            }
        }))
    }

    useEffect(() => {
        dataComptesU()
    })

    const userRole = JSON.parse(localStorage.getItem('user'));
    console.log(partenaires)
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
                                                {etatClic ?
                                                    userRole.role === 'Admin' ? montantUser :
                                                    partenaires[max - 1]?.comptes?.map((val, key) => {
                                                        return <> {val.montant} <span style={{ color: 'red' }}>OBT</span></>
                                                    }) : "******"
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