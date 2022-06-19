import React, { useEffect, useState } from 'react'
import Leftbar from '../components/Leftbar'
import Navbar from '../components/Navbar'
import axios from 'axios';
import '../assets/Ressources.css';
import authHeader from '../auth/auth-header';
import Load from '../components/Load';
import swal from "sweetalert";
import AddCategory from '../dialogs/AddCategory';


function Categories() {

    const initialiseValues = { id: "", nom: "", description: "" };
    const [formData, setFormData] = useState(initialiseValues);
    const [errList, setErrList] = useState({})

    const [category, setCategory] = useState([]);
    const [show, setShow] = useState(false)

    const nom = formData.nom;
    const description = formData.description;

    const [search, setSearch] = useState('');

    const getAllCategory = () => {
        axios.get('http://localhost:5000/api/categories/', { headers: authHeader() }).then(res => {
            setCategory(res.data)
        }).catch(err => {
            console.log(err)
            setErrList(err.data)
        })
    }

    const showModal = () => {
        setShow(true)
    }

    const submitData = () => {
        if (formData.id) {
            axios.put(`http://localhost:5000/api/categories/${formData.id}`, { nom, description }, { headers: authHeader() }).then(res => {
                swal({ title: "Succès", icon: 'success', text: `Catégorie éditée avec succès` });
                closeModal()
                getAllCategory()
                setFormData(initialiseValues);
            }).catch(err => {
                console.log(err)
            })
        } else {
            if (formData) {
                axios.post('http://localhost:5000/api/categories/', { nom, description }, { headers: authHeader() }).then(res => {
                    swal({ title: "Succès", icon: 'success', text: `Catégorie ajoutée avec succès` });
                    closeModal()
                    getAllCategory()
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

    const deleteCategory = (id) => {

        swal({
            title: "Avertissement.",
            text: "Etes-vous sûr de vouloir supprimer cette catégorie ?",
            icon: "warning",
            buttons: true,
            dangerMode: true
        }).then((willDelete) => {
            if (willDelete) {
                axios.delete(`http://localhost:5000/api/categories/${id}`, { headers: authHeader() }).then(res => {
                    console.log('RES :: ', res)
                    getAllCategory();
                }).catch(err => {
                    console.log(err)
                })
                swal('Catgorie supprimée avec succès', {
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
        getAllCategory();
    }, [])

    const handleEdit = (val) => {
        setFormData(val);
        showModal();
    }

    const closeModal = () => {
        setShow(false);
        setFormData(initialiseValues);
    }

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
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex">
                                        <div style={{ marginRight: '10px' }}>
                                            <input type="search" onChange={handleValueSearch} className="form-control" placeholder="Rechercher..." />
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
                                <div className='card-header'> <h6> {category?.length} Catégories</h6> </div>
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
                                            {category.length ? category.filter(val => {
                                                return val?.nom?.toLowerCase().includes(search);
                                            }).map((val, key) => {
                                                return (
                                                    <>
                                                        <tr>
                                                            <td>{key + 1}</td>
                                                            <td>{val.nom}</td>
                                                            <td>{val.description}</td>

                                                            <td style={{ width: '240px' }}>
                                                                <button className='btn btn-primary' onClick={(e) => handleEdit(val)}>
                                                                    <i className='fa fa-edit'></i> Editer
                                                                </button>
                                                                <button onClick={(e) => deleteCategory(val.id)} className="btn btn-danger" style={{ marginLeft: '10px' }}>
                                                                    <i className="fa fa-trash"></i> Supprimer
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    </>
                                                )
                                            }) : <tr className="textPasData">
                                                <td colSpan='4px'>
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

            <AddCategory
                show={show}
                close={closeModal}
                submitData={submitData}
                onChange={onChange}
                data={formData}
            />
        </>
    )
}

export default Categories