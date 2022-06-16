import React, { useState } from 'react'
import Leftbar from '../components/Leftbar'
import Navbar from '../components/Navbar'
import swal from "sweetalert";
import authHeader from '../auth/auth-header';
import '../assets/AccueilPartenaire.css'
import axios from 'axios'

function AccueilPartenaire() {

    const [nom, setNom] = useState('')
    const [adresse, setAdresse] = useState('')
    const [numTel, setTel] = useState("");
    const [desc, setDesc] = useState('')
    const [etat, setEtat] = useState(false)

    const submitData = () => {
        console.log('submit')
        if (nom) {
            axios.post('http://localhost:5000/api/partenaires/', { nom, adresse, numTel, desc }, { headers: authHeader() }).then(res => {
                swal({ title: "Succès", icon: 'success', text: `Vos données ont été soumises avec succès` });
                setEtat(true)
            }).catch(err => {
                console.log(err)
            })
        }
    }

    const submitCompte = () => {
        
    }

    return (
        <>
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
                            <div className='accueil'>
                                <div className='card'>
                                    <div className='card-header'>
                                        <h6>Veuillez compléter les informations demandées ci-dessous.</h6>
                                    </div>
                                    <div className='card-body'>
                                        <div className='col-12'>
                                            <div className='d-flex'>
                                                <div className='col-5'>
                                                    <h3>Informations sur le partenaire</h3>
                                                    {
                                                        etat ? <> <div className='form-group'>
                                                            <label>Nom</label>
                                                            <input type="text" className="form-control" placeholder="Entrer un nom"
                                                                onChange={(e) => setNom(e.target.value)} />
                                                        </div>

                                                            <div className='form-group mt-1'>
                                                                <label>Numéro de téléphone</label>
                                                                <input type="text" className="form-control" placeholder="Entrer un numéro de téléphone"
                                                                    onChange={(e) => setTel(e.target.value)} />
                                                            </div>

                                                            <div className='form-group mt-1'>
                                                                <label>Adresse</label>
                                                                <input type="text" className="form-control" placeholder="Entrer une adresse"
                                                                    onChange={(e) => setAdresse(e.target.value)} />
                                                            </div>

                                                            <div className='form-group mt-1'>
                                                                <label>Description</label>
                                                                <textarea className="form-control" onChange={(e) => setDesc(e.target.value)} style={{ boxShadow: 'none', border: '1px solid #0071c0' }} placeholder="Description"></textarea>
                                                            </div>

                                                            <div>
                                                                {nom && adresse && numTel && desc ?
                                                                    <button className="btn btn-danger mt-2" onClick={submitData}>
                                                                        Soummettre
                                                                    </button> : <button disabled className="btn btn-danger mt-2">
                                                                        Soummettre
                                                                    </button>
                                                                }
                                                            </div></> : <div className="alert alert-success">Vos données ont été souvegardées avec succès</div>
                                                    }
                                                </div>

                                                <div className="col-2"></div>
                                                <div className='col-5'>
                                                    <h3>Informations sur le compte</h3>
                                                    <div className='form-group'>
                                                        <label>Nom</label>
                                                        <input type="text" className="form-control" placeholder="Entrer un nom" />
                                                    </div>

                                                    <div className='form-group mt-1'>
                                                        <label>Devise</label>
                                                        <select className='form-control'>
                                                            <option>CDF</option>
                                                            <option>USD</option>
                                                            <option>Les deux</option>
                                                        </select>
                                                    </div>

                                                    <div>
                                                        <button className="btn btn-danger mt-2" onClick={submitCompte}>
                                                            Soummettre
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default AccueilPartenaire