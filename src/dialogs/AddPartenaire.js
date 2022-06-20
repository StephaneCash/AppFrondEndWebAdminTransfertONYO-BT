import { Modal } from "react-bootstrap";
import "../assets/VerifCodeTransaction.css";
import { Close, Done } from '@material-ui/icons'
import { useState, useEffect } from "react"
import axios from 'axios';
import authHeader from '../auth/auth-header';


const AddPartenaire = (props) => {

    const closeModalVerif = props.close;
    const submitData = props.submitData;
    const onChange = props.onChange;
    const partenaire = props.data;

    const [categories, setCategories] = useState([])

    const { id, nom, numTel, adresse, categoryId } = partenaire;

    const getAllCategories = () => {
        axios.get('http://localhost:5000/api/categories', { headers: authHeader() }).then(res => {
            setCategories(res.data)
        }).catch(err => {
            console.log('ERROR : ', err)
        })
    }

    useEffect(() => {
        getAllCategories()
    }, [])

    return (
        <div className="verifTransaction">
            <Modal show={props.show} style={{ marginTop: "80px" }}>
                <Modal.Header style={{ backgroundColor: '#0071c1', color: '#fff' }}>
                    <div className="col-12">
                        <div className='d-flex'>
                            <div className="col-10">
                                <h5>{partenaire.id ? 'Editer le partenaire ' + id : 'Ajout d\'un partenaire'}</h5>
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
                <Modal.Body style={{ padding: '40px 20px' }}>

                    <div className="row">
                        <div className="col-12">
                            <label>Entrer un nom</label>
                            <input className=' form-control mt-1'
                                placeholder="Entrer un nom"
                                id='nom'
                                value={nom}
                                type='text'
                                onChange={e => onChange(e)}
                                style={{ width: "100%", boxShadow: 'none' }}

                            />

                            <label>Entrer un numéro de téléphone</label>
                            <input className=' form-control mt-1'
                                placeholder="Entrer un numéro de téléphone"
                                id='numTel'
                                type='number'
                                value={numTel}
                                onChange={e => onChange(e)}
                                style={{ width: "100%", boxShadow: 'none' }}

                            />
                            <label>Entrer un nom</label>
                            <input className=' form-control mt-1'
                                placeholder="Entrer une adresse"
                                id='adresse'
                                value={adresse}
                                type='text'
                                onChange={e => onChange(e)}
                                style={{ width: "100%", boxShadow: 'none' }}

                            />
                            <label>Choisir une catégorie</label>
                            <select className='form-control' id="categoryId"
                                onChange={e => onChange(e)}
                                style={{ boxShadow: 'none', border: '2px solid #0071c0', marginTop: '5px' }}>
                                <option>--Choisir une option--</option>
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
                        </div>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <button className="btn"
                        onClick={submitData}
                        style={{
                            backgroundColor: "red", color: 'white', width: "auto",
                        }}>
                        {id ? "Editer" : "Ajouter"}
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default AddPartenaire;