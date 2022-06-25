import React from 'react'
import Leftbar from '../components/Leftbar'
import Navbar from '../components/Navbar'
import '../assets/Transactions.css'
import { Button, Card, } from '@material-ui/core'
import { Check, ToggleOff } from '@material-ui/icons'
import { ToggleOn } from '@mui/icons-material'
import { useState, useEffect } from "react";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { NavLink, useNavigate } from 'react-router-dom'
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

    const userIdGet = JSON.parse(localStorage.getItem('user'));
    const userId = userIdGet.id

    const [dataForm, setDataForm] = useState({ userId: userId });

    const [categories, setCategories] = useState([]);
    const [isValdCategory, setIsValdCategory] = useState(false);
    const [validBenif, setValidBenif] = useState(false);

    const [comptes, setComptes] = useState([])

    let navigate = useNavigate();

    const compte = JSON.parse(localStorage.getItem('data'));
    let idCompte = compte?.comptes[0]?.id

    let max = 0;

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

    const getAllCategories = () => {
        axios.get('http://localhost:5000/api/categories', { headers: authHeader() }).then(res => {
            setCategories(res.data)
        }).catch(err => {
            console.log('ERROR : ', err)
        })
    }

    useEffect(() => {
        getAllCategories()
        setDataForm({ ...dataForm, "devise": valueSelect })
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
                setDataForm({ ...dataForm, "numTel": e.target.value, })
            } else {
                setPattNum(true)
                setValidNum(false)
            }
        }
    }

    const handleCategory = (e) => {
        if (e.target.value !== '0') {
            setIsValdCategory(true);
        } else {
            setIsValdCategory(false);
        }
    }

    const handleNomBenef = (e) => {
        if (e.target.value === "") {
            setValidBenif(false);
        } else {
            setValidBenif(true);
            setDataForm({ ...dataForm, "exp_name": e.target.value });
        }
    }

    const handleMontant = (e) => {
        const value = e.target.value
        if (e.target.value === "") {
            setValidMontant(false)
        } else {
            setValidMontant(true);
            setDataForm({ ...dataForm, "montant": value });
        }
    }

    // Compte à rebours 
    function chrono() {
        const now = new Date().getTime();
        const countDownDate = new Date('Jun 19, 2022').getTime();

        const distanceBase = countDownDate - now;
        const days = Math.floor(distanceBase / (1000 * 60 * 60 * 24));
        const heures = Math.floor((distanceBase % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const min = Math.floor((distanceBase % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distanceBase % (1000 * 60)) / (1000))

        dataRebours.jours = days;
        dataRebours.heures = heures;
        dataRebours.min = min;
        dataRebours.seconds = seconds;

        //console.log(days + " jour " + heures + ' Heures ' + min + ' minutes ' + seconds + ' Seconds')
    }

    const countDown = setInterval(() => {
        chrono()
    }, 1000);

    const montant = compte?.comptes[0]?.montant;

    const handleSubmit = (e) => {

        if (validNum && validMontant && isValdCategory) {
            if (parseInt(montant) >= parseInt(dataForm.montant)) {
                let netMontant = montant - dataForm.montant;
                axios.put(`http://localhost:5000/api/comptes/${idCompte}`, { montant: netMontant }, { headers: authHeader() }).then(res => {

                }).catch(err => {
                    console.log('ERROR : ', err);
                })

                axios.post("http://localhost:5000/api/transactions", dataForm, { headers: authHeader() }).then((response) => {
                    swal({ title: "Succès", icon: 'success', text: `Transaction effectuée avec succès` });
                    navigate('/transaction');
                }).catch((error) => {
                    console.error(error.message)
                });
            } else {
                swal({ title: "Avertissement", icon: 'error', text: `Transaction n'a pas réussi car votre solde est insuffisant.` });
            }
        }

        setClicBtn(true);
    }

    const errSelectCategory = {
        fontSize: "12.5px",
        marginLeft: "15px",
        color: 'red'
    }

    return (
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
                        <div className='transaction'>
                            <NavLink to="/transaction">
                                <KeyboardBackspaceIcon /> Retour
                            </NavLink>
                            <h5 className="mt-3"> Créer une transaction
                            </h5>

                            <div className='col-12'>
                                <Card className="p-3 card">
                                    <div className='d-flex'>
                                        <h6>
                                            Compte ONYO-BT

                                            <br />
                                            <h5 className='valueCompte'>
                                                {
                                                    etatClic === false ? "******"
                                                        :
                                                        <>  {comptes?.data?.montant}
                                                            <span style={{ color: 'red' }}> {compte?.comptes[0]?.devise}</span> </>
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
                                </Card>

                                <Card className='card p-3 mt-2'>
                                    <h5>Identités du bénéficiaire</h5>

                                    <div className='row'>
                                        <div className='col-6'>
                                            <h6>Nom du bénéficiaire</h6>
                                            <input onChange={handleNomBenef}
                                                style={{ width: "100%", }}
                                                className='form-control mt-1' placeholder='Entrer le nom du bénéficiaire' />
                                            {
                                                clicBtn === true && (
                                                    <>
                                                        {validBenif === false ?
                                                            <span style={errSelectCategory}>Veuillez renseigner un le nom du bénéficiaire svp !</span> :
                                                            <Check style={{ fontSize: '15px', color: 'green', }} />}
                                                    </>
                                                )
                                            }
                                        </div>

                                        <div className='col-6'>
                                            <h6>Numéro de téléphone</h6>
                                            <input onChange={handleNumPhone} type="text"
                                                style={{ width: "100%", }}
                                                className='form-control mt-1' placeholder='Entrer un numéro de téléphone' />
                                            {
                                                clicBtn === true && (
                                                    <>
                                                        {validNum ?
                                                            "" : pattNum === false ?
                                                                <span style={errSelectCategory}>Veuillez renseigner un numéro de téléphone svp !</span> :
                                                                <span style={errSelectCategory}>Entrer un numéro de téléphone valide</span>
                                                        }
                                                    </>
                                                )
                                            }
                                        </div>
                                    </div>


                                    <div className='row'>

                                        <div className='col-6 '>
                                            <h6 className='mt-2'>Choisir un motif</h6>
                                            <select className='form-control'
                                                onChange={(e) => (setDataForm({ ...dataForm, 'categoryId': e.target.value }),
                                                    handleCategory(e))} style={{ boxShadow: 'none', border: '2px solid #0071c0', marginTop: '5px' }}>
                                                <option value={0}>--Choisir une option--</option>
                                                {

                                                    categories ?
                                                        categories.map(val => {
                                                            return (
                                                                <>
                                                                    <option key={val.id} value={val.id}>{val.nom}</option>
                                                                </>
                                                            )
                                                        })
                                                        : ""
                                                }
                                            </select>
                                            {
                                                clicBtn ?
                                                    dataForm.categoryId == '0' || !dataForm.categoryId ?
                                                        <span style={errSelectCategory}>Veuillez sélectionner une catégorie svp</span>
                                                        : ""
                                                    : ""
                                            }

                                        </div>

                                        <div className='col-6'>
                                            <h6 className='mt-2'>Montant</h6>
                                            <input onChange={(e) => {
                                                handleMontant(e);
                                            }}
                                                style={{ width: "100%", }} type='number'
                                                className="mt-1 form-control" placeholder='Entrer un montant' />
                                            {
                                                clicBtn === true && (
                                                    <>
                                                        {validMontant === false ?
                                                            <span style={errSelectCategory}>Veuillez renseigner un montant svp !</span> :
                                                            <Check style={{ fontSize: '15px', color: 'green', }} />}
                                                    </>
                                                )
                                            }
                                        </div>
                                    </div>

                                    <div className='col-12'>
                                        <Button variant="contained" className="mb-2 mt-3" onClick={handleSubmit}
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