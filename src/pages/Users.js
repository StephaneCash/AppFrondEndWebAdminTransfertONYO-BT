import React from 'react'
import Leftbar from '../components/Leftbar'
import Navbar from '../components/Navbar'
import '../assets/Transactions.css'
import { Card, TextField } from '@material-ui/core'
import { useEffect, useState } from 'react';
import axios from 'axios'
import { Close, DoneAll, Pending } from '@mui/icons-material'
import { Edit, Info, AddCircle, Group, Delete, ClosedCaption, } from '@material-ui/icons'
import { Button, } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { NavLink } from 'react-router-dom'
import VerifCodeTransaction from '../dialogs/VerifCodeTransaction'
import Load from '../components/Load';
import authHeader from '../auth/auth-header';
import swal from "sweetalert";


function Users() {

    const [data, setData] = useState([]);
    const [valSearch, setValSearch] = useState('');
    const [code, setCode] = useState('');
    const [id, setId] = useState('');
    const [valueInputCode, setValueInputCode] = useState('');

    const [etat, setEtat] = useState(0);
    const [showModalVerif, setShowModalVerif] = useState(false);

    const [verifInput, setVerifInput] = useState(false)

    const getAllTransaction = () => {
        axios.get("http://localhost:5000/api/users", { headers: authHeader() }).then(res => {
            if (res.data) {
                setData(res.data.data)
                console.log('RESULT:', res.data.data)
            }
        }).catch(error => {
            console.log(error)
        })
    }

    const verifCode = (code, id) => {
        setCode(code);
        setId(id);
        setShowModalVerif(true);
        setEtat(1);
    }

    const onChange = (e) => {
        if (e.target.value === "") {
            setVerifInput(true)
        } else {
            setValueInputCode(e.target.value);
            setVerifInput(false)
        }
    }

    const confirmVerif = () => {
        if (verifInput) {
            setEtat(4);
        } else {
            if (code === valueInputCode) {
                setEtat(2);
                setShowModalVerif(false);
                axios.put(`http://localhost:5000/api/transactions/${id}`, { statut: 1 }, { headers: authHeader() }).then(res => {
                    getAllTransaction()
                }).catch(err => {
                    console.log('ERROR : ', err);
                })
            } else {
                setEtat(3)
            }
        }
    }

    // Mettre à jour une transaction

    const handleUpdateTransaction = (id) => {
        alert(id)
    }

    const stopperTransaction = (id) => {

        swal({
            title: "Avertissement.",
            text: "Etes-vous sûr de vouloir bloquer cette transaction ?",
            icon: "warning",
            buttons: true,
            dangerMode: true
        }).then((willDelete) => {
            if (willDelete) {
                axios.put(`http://localhost:5000/api/transactions/${id}`, { statut: 3 }, { headers: authHeader() }).then(res => {
                    getAllTransaction()
                }).catch(err => {
                    console.log('ERROR : ', err);
                })
                swal('Transaction bloquée avec succès', {
                    icon: "success",
                });
            }
        }).catch((error) => {
            console.log(error);
        })

    }

    const closeModalVerif = () => {
        setShowModalVerif(false);
    }

    useEffect(() => {
        getAllTransaction()
    }, [])

    return (
        <div>
            <Navbar />

            <div className='col-12'>
                <div className='d-flex'>
                    <div className='col-2'><Leftbar /></div>
                    <div className='col-10' style={{ marginTop: '70px' }}>
                        <div className='transaction'>

                            <div className="card">
                                <div className="card-body">

                                    <div className='d-flex'>
                                        <h4>Utilisateurs <Group /></h4>

                                        <div style={{marginLeft: '10px'}}>
                                            <input type="search" placeholder="Rechercher..." className="form-control" onChange={(e) => setValSearch(e.target.value)} />
                                        </div>

                                        <div className="addTransactionIcon">
                                            <span className="textAddTransaction"></span>
                                            <NavLink to='add'>
                                                <button className="btn">
                                                    Créer un utilisateur
                                                </button>
                                            </NavLink>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className='card mt-2'>
                                <table className='table table-borderless'>
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Nom</th>
                                            <th>Email</th>
                                            <th>Statut</th>
                                            <th>Date création</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {

                                            data &&
                                            data.map((val, key) => {
                                                return (
                                                    <tr key={key}>
                                                        <td>{key}</td>
                                                        <td>{val.nom}</td>
                                                        <td>{val.email}</td>
                                                        <td>
                                                            {
                                                                val.statut === 0 && <span style={{ color: 'orange' }}>Non connecté</span>
                                                                || val.statut === 1 && <span style={{ color: 'green' }}>Connecté</span>
                                                                || val.statut === 2 && <span style={{ color: 'red' }}>Bloqué</span>
                                                            }
                                                        </td>
                                                        <td>{val.createdAt}</td>
                                                        <td style={{ width: '140px' }}>
                                                            <button className="btn">
                                                                <Close /> Bloquer
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
    )
}

export default Users