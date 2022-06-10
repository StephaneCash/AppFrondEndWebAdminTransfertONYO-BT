import React from 'react'
import Leftbar from '../components/Leftbar'
import Navbar from '../components/Navbar'
import '../assets/Transactions.css'
import { Button, Card, TextField } from '@material-ui/core'
import { Check, ToggleOff } from '@material-ui/icons'
import { ToggleOn } from '@mui/icons-material'
import { useState, useEffect } from "react";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { NavLink } from 'react-router-dom'
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import authHeader from '../auth/auth-header';
import swal from "sweetalert";
import axios from 'axios';


function AddTransaction() {

    const [etatClic, setEtatClic] = useState(false);
    const [validNum, setValidNum] = useState(false);
    const [validMontant, setValidMontant] = useState(false);
    const [clicBtn, setClicBtn] = useState(false);
    const [valueSelect, setValueSelect] = useState("CDF");
    const [pattNum, setPattNum] = useState(false);

    // Data récupérés dans les inputs

    const [dataForm, setDataForm] = useState({});
    const [numTel, setNumTel] = useState(0);
    const [montant, setMontant] = useState(0);

    const [categories, setCategories] = useState([]);

    const getAllCategories = () => {
        axios.get('http://localhost:5000/api/categories', { headers: authHeader() }).then(res => {
            setCategories(res.data)
        }).catch(err => {
            console.log('ERROR : ', err)
        })
    }

    //console.log('CATEGORIES : ', categories[0].id);

    useEffect(() => {
        getAllCategories()
    }, [])

    let dataRebours = {}

    let pattern = /[0-9]/;

    const handleClick = () => {
        setEtatClic(!etatClic);
    }

    const handleNumPhone = (e) => {
        if (e.target.value === "") {
            setValidNum(false)
        } else {
            if (e.target.value.match(pattern)) {
                setValidNum(true)
                setNumTel(e.target.value)
                setDataForm({ ...dataForm, "numTel": e.target.value })
            } else {
                setPattNum(true)
                setValidNum(false)
            }
        }
    }

    const handleCategory = (e) => {
        setDataForm({ ...dataForm, "categoryId": e.target.value });
    }

    const handleNomBenef = (e) => {
        setDataForm({ ...dataForm, "exp_name": e.target.value });
    }

    const handleMontant = (e) => {
        if (e.target.value === "") {
            setValidMontant(false)
        } else {
            setValidMontant(true)
            setMontant(e.target.value)
            setDataForm({ ...dataForm, "montant": e.target.value })
        }
    }

    // Compte à rebours 
    function chrono() {
        const now = new Date().getTime();
        const countDownDate = new Date('Jun 8, 2022').getTime();

        const distanceBase = countDownDate - now;
        const days = Math.floor(distanceBase / (1000 * 60 * 60 * 24));
        const heures = Math.floor((distanceBase % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const min = Math.floor((distanceBase % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distanceBase % (1000 * 60)) / (1000))

        dataRebours.jours = days;
        dataRebours.heures = heures;
        dataRebours.min = min;
        dataRebours.seconds = seconds;
    }

    const countDown = setInterval(() => {
        chrono()
    }, 1000);

    const handleSubmit = (e) => {
        setClicBtn(true);
        console.log(' result : ', dataForm);


        if (validNum && validMontant) {
            axios.post("http://localhost:5000/api/transactions", dataForm, { headers: authHeader() }).then((response) => {
                swal({ title: "Succès", icon: 'success', text: `Transaction effectuée avec succès` });
            }).catch((error) => {
                console.error(error.message)
            })
        }
    }

    const handleSelect = (e) => {
        setValueSelect(e.target.value);
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
                            <h3 className="mt-3"> Créer une transaction
                            </h3>

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
                                            <select className="form-control"
                                                onChange={handleSelect}
                                                style={{ boxShadow: 'none', border: '2px solid #0071c0' }}>
                                                <option>CDF</option>
                                                <option>USD</option>
                                            </select>
                                        </div>

                                        <h6 style={{ marginLeft: '10px' }}>
                                            Devise courante <br />
                                            <h6 style={{ fontWeight: 'bold', marginTop: '10px' }}>{valueSelect} </h6>
                                        </h6>
                                    </div>
                                </Card>

                                <Card className='card p-3 mt-2'>
                                    <h5>Identités du bénéficiaire</h5>

                                    <div className='row'>
                                        <div className='col-6'>
                                            <h6>Nom du bénéficiaire</h6>
                                            <TextField variant='outlined' onChange={handleNomBenef}
                                                style={{ width: "100%", }}
                                                helperText={
                                                    clicBtn === true && (
                                                        <>
                                                            {validMontant === false ?
                                                                "Veuillez renseigner un le nom du bénéficiaire svp !" :
                                                                <Check style={{ fontSize: '15px', color: 'green', }} />}
                                                        </>
                                                    )
                                                }
                                                className='mb-3 mt-3' placeholder='Entrer le nom du bénéficiaire' />
                                        </div>

                                        <div className='col-6'>
                                            <h6>Numéro de téléphone</h6>
                                            <TextField variant='outlined' onChange={handleNumPhone} type="text"
                                                style={{ width: "100%", }}
                                                helperText={
                                                    clicBtn === true && (
                                                        <>
                                                            {validNum ?
                                                                "" : pattNum === false ? "Veuillez renseigner un numéro de téléphone svp" :
                                                                    "Entrer un numéro de téléphone valide"
                                                            }
                                                        </>
                                                    )
                                                }
                                                className='mb-3 mt-3' placeholder='Entrer un numéro de téléphone' />
                                        </div>
                                    </div>


                                    <div className='row'>
                                        <div className='col-6'>
                                            <h6>Choisir un motif</h6>
                                            <select className='form-control' onChange={handleCategory} style={{ boxShadow: 'none', border: '2px solid #0071c0', marginTop: '19px' }}>

                                                {
                                                    categories ? categories.map((value) => {
                                                        return <option key={value.id} value={value.id}>{value.nom}</option>
                                                    }) : <option>Aucune catégorie trouvée</option>
                                                }
                                            </select>
                                        </div>

                                        <div className='col-6'>
                                            <h6>Montant</h6>
                                            <TextField variant='outlined' onChange={handleMontant}
                                                style={{ width: "100%", }}
                                                helperText={
                                                    clicBtn === true && (
                                                        <>
                                                            {validMontant === false ?
                                                                "Veuillez renseigner un montant svp !" :
                                                                <Check style={{ fontSize: '15px', color: 'green', }} />}
                                                        </>
                                                    )
                                                }
                                                className="mt-3 mb-4" placeholder='Entrer un montant' />
                                        </div>
                                    </div>

                                    <div className='col-12'>
                                        <Button variant="contained" className="mb-2" onClick={handleSubmit}
                                            style={{ color: 'white', backgroundColor: "red", float: 'right' }}>
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