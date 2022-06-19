import { Modal } from "react-bootstrap";
import "../assets/VerifCodeTransaction.css";
import { Close, Done } from '@material-ui/icons'
import axios from "axios";
import { useState, useEffect } from 'react'
import authHeader from '../auth/auth-header';
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";


const AddCode = (props) => {

    const closeModalVerif = props.close;
    const [montant, setMontant] = useState(0);
    const [etat, setEtat] = useState(false)

    const [nbr, setNbr] = useState(1)

    const [clic, setClic] = useState(false);

    let getAllCodes = props.getAllCodes;

    const onChange = (e) => {
        if (e.target.value === "") {
            setEtat(false);
        } else {
            setEtat(true)
            setMontant(e.target.value)
        }
    }

    const ajouterCode = () => {

        setClic(true)
        if (etat) {
            for (let i = 1; i <= nbr; i++) {
                axios.post('http://localhost:5000/api/generates/', { montant }, { headers: authHeader() }).then(res => {
                    swal({ title: "Succès", icon: 'success', text: `${nbr} ${nbr > 1 ? ' codes ajoutés' : 'code ajouté'} avec succès` });
                    closeModalVerif()
                    getAllCodes()
                }).catch(err => {
                    console.log(err)
                })
            }
        }

    }

    function handleSelected(e) {
        setNbr(parseInt(e.target.value))
    }

    return (
        <div className="verifTransaction">
            <Modal show={props.show} style={{ marginTop: "80px" }}>
                <Modal.Header>
                    <div className="col-12">
                        <div className='d-flex'>
                            <div className="col-10">
                                <h5>Création du code</h5>
                                <h6 style={{ marginTop: "30px" }} id="h6">
                                    Entrer le montant pour le code
                                </h6>
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
                        <div className="col-6">
                            <input className="form-control" type='number' placeholder="Entrer le nombre de fois" style={{ boxShadow: 'none' }} onChange={handleSelected} />
                        </div>
                        <div className="col-6">
                            <input className=' form-control'
                                placeholder="Entrer le montant"
                                type='number'
                                onChange={e => onChange(e)}
                                style={{ width: "100%", boxShadow: 'none' }}
                            />
                            <div style={{ marginLeft: '15px', fontSize: '12px', }}>
                                {clic && !etat ? <div>
                                    Ce champ ne doit être vdie
                                </div> : ''}
                            </div>
                        </div>
                    </div>

                    <button className="btn"
                        onClick={ajouterCode}
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

export default AddCode;