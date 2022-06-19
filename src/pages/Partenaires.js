import React, { useEffect, useState } from 'react'
import Leftbar from '../components/Leftbar'
import Navbar from '../components/Navbar'
import axios from 'axios';
import '../assets/Ressources.css';
import authHeader from '../auth/auth-header';
import { Button, Card } from '@material-ui/core';
import Load from '../components/Load';
import { Delete } from '@material-ui/icons';
import { Link, NavLink } from 'react-router-dom';
import AddCode from '../dialogs/AddCode';
import swal from "sweetalert";
import AddPartenaire from '../dialogs/AddPartenaire'


function Partenaires() {

    const initialiseValues = { id: "", nom: "", description: "", numTel: '', adresse: '', categoeyId: '' };
    const [formData, setFormData] = useState(initialiseValues);

    const [data, setData] = useState([]);
    const [show, setShow] = useState(false)

    const getAllPartenaires = () => {
        axios.get('http://localhost:5000/api/partenaires/v1/categories', { headers: authHeader() }).then(res => {
            setData(res.data.data)
        })
    }

    const nom = formData.nom;
    const numTel = formData.numTel;
    const adresse = formData.adresse;
    const categoeyId = formData?.categoeyId;

    const submitData = () => {
        if (formData.id) {
            axios.put(`http://localhost:5000/api/partenaires/${formData.id}`, { nom, numTel, adresse, categoeyId }, { headers: authHeader() }).then(res => {
                swal({ title: "Succès", icon: 'success', text: `Partenaire édité avec succès` });
                closeModal()
                getAllPartenaires()
                setFormData(initialiseValues);
            }).catch(err => {
                console.log(err)
            })
        } else {
            if (formData) {
                axios.post('http://localhost:5000/api/partenaires/', { nom, numTel, adresse, categoeyId }, { headers: authHeader() }).then(res => {
                    swal({ title: "Succès", icon: 'success', text: `Partenaire ajouté avec succès` });
                    closeModal()
                    getAllPartenaires()
                    setFormData(initialiseValues);
                }).catch(err => {
                    swal({ title: "Avertissement", icon: 'warning', text: `${err.response.data.message[0].substring(18) || err.response.data.message[1].substring(18)}` });
                    console.log(err.response.data.message)
                })
            } else {
                alert('Veuillez remplir tous les champs svp')
            }
        }
    }

    const handleEdit = (val) => {
        setFormData(val);
        showModal();
    }

    const handleDelete = (id) => {

        swal({
            title: "Avertissement.",
            text: "Etes-vous sûr de vouloir supprimer ce partenaire ?",
            icon: "warning",
            buttons: true,
            dangerMode: true
        }).then((willDelete) => {
            if (willDelete) {
                axios.delete(`http://localhost:5000/api/partenaires/${id}`, { headers: authHeader() }).then(res => {
                    console.log('RES :: ', res)
                    getAllPartenaires();
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
        console.log(formData)
        const { value, id } = e.target;
        setFormData({ ...formData, [id]: value });
    };


    useEffect(() => {
        getAllPartenaires()
    }, [])

    const showModal = () => {
        setShow(true)
    }

    const closeModal = () => {
        setShow(false)
    }

    return (
        <div>
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
                            <div className='col-12 ressources' style={{ marginTop: '70px' }}>

                                <div className="card">
                                    <div className="card-body">
                                        <div className="d-flex">
                                            <div style={{ marginRight: '10px' }}>
                                                <h4>Partenaires <i className="fa fa-users"></i></h4>
                                            </div>
                                            <div style={{ marginRight: '10px' }}>
                                                <input type="search" className="form-control" placeholder="Rechercher..." />
                                            </div>

                                            <button className='btn btn-primary' style={{ cursor: 'pointer' }} onClick={showModal} >
                                                Ajouter un partenaire
                                            </button>
                                        </div>
                                    </div>
                                </div>


                                <div className='card mt-2'>
                                    <table className='table table-borderless'>
                                        <thead>
                                            <tr>
                                                <th>Id</th>
                                                <th>Nom</th>
                                                <th>Catégorie</th>
                                                <th>Numéro de téléphone</th>
                                                <th>Adresse</th>
                                                <th>Statut</th>
                                                <th>Options</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                data.length ? data.map((val, key) => {
                                                    return (
                                                        <tr>
                                                            <td>{key + 1}</td>
                                                            <td>{val.nom}</td>
                                                            <td>{val.categories ? val.categories.nom : 'Aucune catégorie assigée'} </td>
                                                            <td>{val.numTel}</td>
                                                            <td>{val.adresse}</td>
                                                            <td>{val.statut === 0 ? "Non opérationnel" : "Opérationnel"}</td>
                                                            <td style={{ width: '240px' }}>
                                                                <button className="btn" onClick={(e) => handleDelete(val.id)}>
                                                                    <i className="fa fa-trash"></i> Supprimer
                                                                </button>
                                                                <button className="btn" style={{ marginLeft: "10px" }} onClick={(e) => handleEdit(val)}>
                                                                    <i className="fa fa-edit"></i> Editer
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    )
                                                }) : <tr className="textPasData">
                                                    <td colSpan='8px'>
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
            <AddPartenaire
                show={show}
                close={closeModal}
                data={formData}
                submitData={submitData}
                onChange={onChange}
            />
        </div>
    )
}

export default Partenaires