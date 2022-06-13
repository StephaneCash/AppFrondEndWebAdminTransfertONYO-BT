import { Modal } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles"
import { Button, TextField } from "@material-ui/core";
import "../assets/VerifCodeTransaction.css";
import { Close, Done } from '@material-ui/icons'
import axios from "axios";
import { useState, useEffect } from 'react'
import authHeader from '../auth/auth-header';


const useStyles = makeStyles((theme) => ({
    modal: {

    },
}))

const AddCode = (props) => {

    const closeModalVerif = props.close;
    const [montant, setMontant] = useState(0);
    const [etat, setEtat] = useState(false)

    const [clic, setClic] = useState(false)

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
        axios.post('http://localhost:5000/api/generates/', { montant }, { headers: authHeader() }).then(res => {
            console.log(res, ' RESULT')
        }).catch(err => {
            console.log(err)
        })
        //closeModalVerif()
    }

    let array = [1, 4, 0, 0, 8, 6, 8, 8, 9, 0]

    const classes = useStyles();

    return (
        <div className="verifTransaction">
            <Modal show={props.show} className={classes.modal} style={{ marginTop: "80px" }}>
                <Modal.Header>
                    <div className="col-12">
                        <div className='d-flex'>
                            <div className="col-10">
                                <h5>Création du code</h5>
                                <h6 style={{ marginTop: "30px" }}>
                                    Entrer le montant pour le code
                                </h6>
                            </div>
                            <div className="col-2">
                                <Button
                                    style={{ float: 'right' }}
                                    variant="outlined"
                                    onClick={closeModalVerif}
                                >
                                    <Close />
                                </Button>
                            </div>
                        </div>
                    </div>
                </Modal.Header>
                <Modal.Body>

                    <div className="row">
                        <div className="col-6">
                            <select className="form-control" style={{ boxShadow: 'none' }}>
                                <option>
                                    1
                                </option>
                            </select>
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

                    <Button variant='contained'
                        onClick={ajouterCode}
                        style={{
                            marginTop: '10px',
                            backgroundColor: "#6363e0", color: 'white', width: "100%",
                        }}>
                        Ajouter
                    </Button>

                </Modal.Body>
                <Modal.Footer style={{ paddingRight: "30px" }}>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default AddCode;