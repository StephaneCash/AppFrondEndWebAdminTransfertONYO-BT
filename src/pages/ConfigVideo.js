import React, { useEffect, useState } from 'react'
import Leftbar from '../components/Leftbar'
import Navbar from '../components/Navbar'
import axios from 'axios';
import '../assets/Ressources.css';
import authHeader from '../auth/auth-header';
import Load from '../components/Load';
import swal from "sweetalert";
import AddPrix from '../dialogs/AddPrix';


function ConfigVideo() {

    const initialiseValues = { id: "", montant: "", description: "" };
    const [formData, setFormData] = useState(initialiseValues);

    const [data, setData] = useState([])
    const [show, setShow] = useState(false)

    const montant = parseInt(formData.montant);
    const description = formData.description;

    const getAllCodes = () => {
        axios.get('http://localhost:5000/api/prix-videos/', { headers: authHeader() }).then(res => {
            setData(res.data.data)
        }).catch(err => {
            console.log(err)
        })
    }

    const showModal = () => {
        setShow(true)
    }

    const submitData = () => {
        if (formData.id) {
            axios.put(`http://localhost:5000/api/prix-videos/${formData.id}`, { montant, description }, { headers: authHeader() }).then(res => {
                swal({ title: "Succès", icon: 'success', text: `Prix vidéo édité avec succès` });
                closeModal()
                getAllCodes()
                setFormData(initialiseValues);
            }).catch(err => {
                console.log(err)
            })
        } else {
            if (montant) {
                axios.post('http://localhost:5000/api/prix-videos/', { montant, description }, { headers: authHeader() }).then(res => {
                    swal({ title: "Succès", icon: 'success', text: `Prix vidéo ajouté avec succès` });
                    closeModal()
                    getAllCodes()
                    setFormData(initialiseValues);
                }).catch(err => {
                    swal({ title: "Avertissement", icon: 'warning', text: `${err.response.data.message[0].substring(18) || err.response.data.message[1].substring(18)}` });
                })
            } else {
                swal({ title: "Avertissement", icon: 'warning', text: `Veuillez remplir le champ montant svp.` });
            }
        }
    }

    const deletePrix = (id) => {

        swal({
            title: "Avertissement.",
            text: "Etes-vous sûr de vouloir supprimer ce prix ?",
            icon: "warning",
            buttons: true,
            dangerMode: true
        }).then((willDelete) => {
            if (willDelete) {
                axios.delete(`http://localhost:5000/api/prix-videos/${id}`, { headers: authHeader() }).then(res => {
                    getAllCodes();
                }).catch(err => {
                    console.log(err)
                })
                swal('Prix supprimé avec succès', {
                    icon: "success",
                });
            }
        }).catch((error) => {
            console.log(error);
        })

    }

    const onChange = (e) => {
        const { value, id } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    useEffect(() => {
        getAllCodes();
    }, [])

    const handleEdit = (val) => {
        setFormData(val);
        showModal();
    }

    const closeModal = () => {
        setShow(false);
        setFormData(initialiseValues);
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
                            <div className="ressources">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="d-flex">
                                            <div style={{ marginRight: '10px' }}>
                                                <h5>Configuration <i className="fa fa-cog fa-spin"></i></h5>
                                            </div>
                                            <div style={{ marginRight: '10px' }}>
                                                <input type="search" className="form-control" placeholder="Rechercher..." />
                                            </div>

                                            <button className='btn btn-primary' style={{ cursor: 'pointer' }} onClick={showModal} >
                                                Ajouter un prix
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="card mt-3">
                                    <div className='card-body'>
                                        <table className="table table-borderless">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Prix</th>
                                                    <th>Description</th>
                                                    <th>Date création</th>
                                                    <th>Date de modification</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    data.length ? data.map((val, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>{index + 1}</td>
                                                                <td>{val.montant} <span className='text-danger'>OBT</span></td>
                                                                <td>
                                                                    {val.description}
                                                                </td>

                                                                <td>{val.createdAt} </td>
                                                                <td>{val.updatedAt}</td>
                                                                <td style={{ width: '230px' }}>
                                                                    <button className='btn btn-success' onClick={() => handleEdit(val)} style={{ marginRight: '10px' }}>
                                                                        <i className="fa fa-edit"></i> Editer
                                                                    </button>
                                                                    <button className='btn btn-success' onClick={() => deletePrix(val.id)}>
                                                                        <i className="fa fa-trash"></i> Supprimer
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    }) :
                                                        <tr className="textPasData">
                                                            <td colSpan='6px'>
                                                                <Load />
                                                            </td>
                                                        </tr>
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <AddPrix
                show={show}
                close={closeModal}
                submitData={submitData}
                onChange={onChange}
                data={formData}
            />
        </>
    )
}

export default ConfigVideo