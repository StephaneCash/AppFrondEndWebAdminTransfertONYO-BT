import React, { useEffect, useState, useRef } from 'react'
import Leftbar from '../components/Leftbar'
import Navbar from '../components/Navbar'
import axios from 'axios';
import '../assets/Ressources.css';
import authHeader from '../auth/auth-header';
import Load from '../components/Load';
import AddCode from '../dialogs/AddCode';
import swal from "sweetalert";
import logo from '../images/logo.jpeg';
import ReactToPrint from 'react-to-print';


function Ressources() {

    const [codes, setCodes] = useState([]);
    const [etatModal, setEtatModal] = useState(false);

    const [search, setSearch] = useState('')

    const componentRef = useRef();

    const getAllCodes = () => {
        axios.get('http://localhost:5000/api/generates/', { headers: authHeader() }).then(res => {
            setCodes(res.data.data)
        }).catch(err => {
            console.log(err)
        })
    }

    const deleteCodeHandle = (id) => {

        swal({
            title: "Avertissement.",
            text: "Etes-vous sûr de vouloir supprimer ce code ?",
            icon: "warning",
            buttons: true,
            dangerMode: true
        }).then((willDelete) => {
            if (willDelete) {
                axios.delete(`http://localhost:5000/api/generates/${id}`, { headers: authHeader() }).then(res => {
                    console.log('RES :: ', res)
                    getAllCodes();
                }).catch(err => {
                    console.log(err)
                })
                swal('Code supprimé avec succès', {
                    icon: "success",
                });
            }
        }).catch((error) => {
            console.log(error);
        })

    }

    const handleVider = () => {
        swal({
            title: "Avertissement.",
            text: "Etes-vous sûr de vouloir supprimer tous les codes ?",
            icon: "warning",
            buttons: true,
            dangerMode: true
        }).then((willDelete) => {
            if (willDelete) {
                axios.delete(`http://localhost:5000/api/generates`, { headers: authHeader() }).then(res => {
                    console.log('RES :: ', res)
                    getAllCodes();
                }).catch(err => {
                    console.log(err)
                })
                swal('Codes supprimés avec succès', {
                    icon: "success",
                });
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    const showModalAddCode = () => {
        setEtatModal(true)
    }

    const closeModal = () => {
        setEtatModal(false);
    }

    useEffect(() => {
        getAllCodes();
    }, [])

    const handleValueSearch = (e) => {
        setSearch(e.target.value)
    }

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
                                <div className="card-body">
                                    <div className="d-flex">
                                        <div style={{ marginRight: '10px' }}>
                                            <input type="search" onChange={handleValueSearch} className="form-control" placeholder="Rechercher..." />
                                        </div>
                                        <div style={{ marginRight: '10px' }}>
                                            <button className="btn btn-primary" onClick={showModalAddCode} style={{ width: "100%" }}>
                                                Ajout de codes
                                            </button>
                                        </div>
                                        <div>
                                            <ReactToPrint
                                                trigger={() => <button className="btn btn-primary" style={{ width: "100%" }}>
                                                    Imprimer <i className='fa fa-print'></i>
                                                </button>}
                                                content={() => componentRef.current}
                                            />
                                        </div>
                                        <div style={{ marginLeft: '10px' }}>
                                            <button className='btn' onClick={handleVider}>
                                                Libérer l'espace
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card mt-3">
                                <div className="card-header">Liste de codes {codes && codes.length}</div>
                                <div className="grille" ref={componentRef}>

                                    {codes.length && codes.map((value, key) => {
                                        return (
                                            <div className='card' key={key} onClick={(e) => deleteCodeHandle(value.id)}>
                                                <div className="col-12" style={{ border: '2px solid #0071c1', padding: '5px', cursor: "pointer" }}>
                                                    <div className="d-flex">
                                                        <div className="col-4">
                                                            <img src={logo} width='40' alt="Logo Onyobt" />
                                                        </div>
                                                        <div className="col-8" style={{ fontWeight: 'bold', textAlign: 'right' }}><span className='text-danger'>{value.montant}</span> <span className='text-primary'>OBT</span></div>
                                                    </div>
                                                    <div className="d-flex">
                                                        <div className="col-2"></div>
                                                        <div className="col-10" style={{ textAlign: 'center', border: "1px solid #0071c1", padding: "4px" }}>
                                                            {value.content}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}

                                </div>
                                <div className="text-center">
                                    {!codes.length && <Load />}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <AddCode
                show={etatModal}
                close={closeModal}
                getAllCodes={getAllCodes}
            />
        </>
    )
}

export default Ressources