import React, { useEffect, useState } from 'react'
import Leftbar from '../components/Leftbar'
import Navbar from '../components/Navbar'
import axios from 'axios';
import '../assets/Ressources.css';
import authHeader from '../auth/auth-header';
import { Button, Card } from '@material-ui/core';
import Load from '../components/Load';
import { Delete } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import AddCode from '../dialogs/AddCode';
import swal from "sweetalert";
import AddCategory from '../dialogs/AddCategory';


function Categories() {

    const [category, setCategory] = useState([]);
    const [show, setShow] = useState(false)

    const getAllCategory = () => {
        axios.get('http://localhost:5000/api/categories/', { headers: authHeader() }).then(res => {
            setCategory(res.data)
        }).catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        getAllCategory()
    }, [])

    const handleEdit = () => {

    }

    const showModal = () => {
        setShow(true)
    }

    const closeModal = () => {
        setShow(false)
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
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex">
                                        <div style={{marginRight: '10px'}}>
                                            <input type="search" className="form-control" placeholder="Rechercher..." />
                                        </div>
                                        <div>
                                            <button className="btn btn-primary" onClick={showModal}>
                                                Ajouter une nouvelle catégorie
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card ressource mt-2">
                                <div className='card-header'> <h5>Catégories</h5> </div>
                                <div className="card-body">
                                    <table className='table table-borderless'>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Nom</th>
                                                <th>Déscription</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {category && category.map((val, key) => {
                                                return (
                                                    <>
                                                        <tr>
                                                            <td>{key + 1}</td>
                                                            <td>{val.nom}</td>
                                                            <td>{val.description}</td>

                                                            <td style={{ width: '240px' }}>
                                                                <button className='btn btn-primary' onClick={handleEdit}>
                                                                    <i className='fa fa-edit'></i> Editer
                                                                </button>
                                                                <button className="btn btn-danger" style={{ marginLeft: '10px' }}>
                                                                    <i className="fa fa-trash"></i> Supprimer
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    </>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <AddCategory
                show={show}
                close={closeModal}
                getAllCategory={getAllCategory}
            />
        </>
    )
}

export default Categories