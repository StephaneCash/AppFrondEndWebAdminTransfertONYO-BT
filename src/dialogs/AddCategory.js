import { Modal } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles"
import { Button } from "@material-ui/core";
import "../assets/VerifCodeTransaction.css";
import { Close, Done } from '@material-ui/icons'
import axios from "axios";
import { useState, useEffect } from 'react'
import authHeader from '../auth/auth-header';
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";


const useStyles = makeStyles((theme) => ({
    modal: {

    },
}))

const AddCategory = (props) => {

    const closeModalVerif = props.close;
    const [nom, setNom] = useState(0);
    const [etat, setEtat] = useState(false)
    const [validTextArea, setValidTextArea] = useState(false)
    const [description, setDescription] = useState('')

    const [clic, setClic] = useState(false);

    let getAllCategory = props.getAllCategory;

    const onChange = (e) => {
        if (e.target.value === "") {
            setEtat(false);
        } else {
            setEtat(true)
            setNom(e.target.value)
        }
    }

    const onChangeTextArea = (e) => {
        if (e.target.value === "") {
            setValidTextArea(false);
        } else {
            setValidTextArea(e.target.value);
            setDescription(e.target.value)
        }
    }

    const ajouterCategorie = () => {
        setClic(true)
        if (etat && validTextArea) {
            axios.post('http://localhost:5000/api/categories/', { description, nom }, { headers: authHeader() }).then(res => {
                swal({ title: "Succès", icon: 'success', text: `Catégorie ajoutée avec succès` });
                closeModalVerif()
                getAllCategory()
            }).catch(err => {
                console.log(err)
            })
        }
    }

    const classes = useStyles();

    return (
        <div className="verifTransaction">
            <Modal show={props.show} className={classes.modal} style={{ marginTop: "80px" }}>
                <Modal.Header>
                    <div className="col-12">
                        <div className='d-flex'>
                            <div className="col-10">
                                <h5>Ajout d'une catégorie</h5>
                            </div>
                            <div className="col-2">
                                <button
                                    style={{ float: 'right', boxShadow: 'none', border: '1px solid silver' }}
                                    className='btn'
                                    onClick={closeModalVerif}
                                >
                                    <Close />
                                </button>
                            </div>
                        </div>
                    </div>
                </Modal.Header>
                <Modal.Body>

                    <div className="row">
                        <div className="col-12">
                            <label>Entrer un nom</label>
                            <input className=' form-control mt-1'
                                placeholder="Entrer un nom"
                                type='test'
                                onChange={e => onChange(e)}
                                style={{ width: "100%", boxShadow: 'none' }}
                            />
                            <div style={{ marginLeft: '15px', fontSize: '12px', }}>
                                {clic && !etat ? <div className="text-danger">
                                    Nom doit être vdie*
                                </div> : ''}
                            </div>

                            <label className="mt-2">Entrer une description</label>
                            <textarea className=' form-control mt-1' placeholder="Entrer une description" onChange={e => onChangeTextArea(e)} style={{ width: "100%", boxShadow: 'none' }}> </textarea>
                            <div style={{ marginLeft: '15px', fontSize: '12px', }}>
                                {clic && !validTextArea ? <div className="text-danger">
                                    Description ne doit être vdie*
                                </div> : ''}
                            </div>
                        </div>
                    </div>

                    <button className="btn"
                        onClick={ajouterCategorie}
                        style={{
                            marginTop: '10px',
                            backgroundColor: "red", color: 'white', width: "100%",
                        }}>
                        Ajouter
                    </button>

                </Modal.Body>
                <Modal.Footer style={{ paddingRight: "30px" }}>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default AddCategory;