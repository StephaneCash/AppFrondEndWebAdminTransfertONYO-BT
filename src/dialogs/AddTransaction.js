import React from 'react'
import Leftbar from '../components/Leftbar'
import Navbar from '../components/Navbar'
import '../assets/Transactions.css'
import { Button, Card, TextField } from '@material-ui/core'
import { ToggleOff } from '@material-ui/icons'
import { ToggleOn } from '@mui/icons-material'
import { useState } from "react";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { NavLink } from 'react-router-dom'
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';

function AddTransaction() {

    const [etatClic, setEtatClic] = useState(false);

    // Visualiser le code
    const handleClick = () => {
        setEtatClic(!etatClic);
    }

    return (
        <div>
            <Navbar />

            <div className='col-12'>
                <div className='d-flex'>
                    <div className='col-2'><Leftbar /></div>
                    <div className='col-10' style={{ marginTop: '70px' }}>
                        <div className='transaction'>
                            <NavLink to="/transaction">
                                <KeyboardBackspaceIcon /> Retour
                            </NavLink>
                            <h3 className="mt-3"> Créer une transaction</h3>

                            <div className='col-12'>
                                <Card className="p-3 card">
                                    <div className='d-flex'>
                                        <h6>
                                            Compte ONYO-BT

                                            <br />
                                            <h5 className='valueCompte'>
                                                {
                                                    etatClic === false ? "******"
                                                        : "3500 FC"
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
                                    <hr style={{ marginTop: '-10px' }} />
                                    <div className="col-12 blocDevise">
                                        <div className='col-2 textBloc'>
                                            <label>Choisir la devise</label>
                                            <select className="form-control">
                                                <option>CDF</option>
                                                <option>USD</option>
                                            </select>
                                        </div>

                                        <h6 style={{ marginLeft: '10px' }}>
                                            Devise courante <br />
                                            <h6 style={{ fontWeight: 'bold' }}>CDF Compte</h6>
                                        </h6>
                                    </div>
                                </Card>

                                <Card className='card p-3 mt-2'>
                                    <h5>Identités du bénéficiaire</h5>
                                    <label>Entrer un numéro de téléphone du bénéficiaire</label>
                                    <TextField variant='outlined' className='mb-3 mt-3' placeholder='Entrer un numéro de téléphone' />

                                    <label>Montant</label>
                                    <TextField variant='outlined' className="mt-3 mb-4" placeholder='Entrer un montant' />

                                    <div className='col-4'>
                                        <Button variant="contained" className="mb-2"
                                            style={{ color: 'white', backgroundColor: "red" }}>
                                            Continuer <TrendingFlatIcon />
                                        </Button>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddTransaction