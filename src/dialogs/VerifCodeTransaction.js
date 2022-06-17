import { Modal } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles"
import "../assets/VerifCodeTransaction.css";
import { Close, Done } from '@material-ui/icons'


const VerifCodeTransaction = (props) => {

    const closeModalVerif = props.closeModal;

    const confirmVerif = props.confirmVerif;
    const etat = props.etat;
    const onChange = props.onChange;

    return (
        <div className="verifTransaction">
            <Modal show={props.show} style={{ marginTop: "80px" }}>
                <Modal.Header>
                    <div className="col-12">
                        <div className='d-flex'>
                            <div className="col-10">
                                <h5>Vérification de code</h5>
                                <h6 style={{ marginTop: "30px" }}>
                                    Entrer votre code pour afficher le montant et autoriser le virement.
                                </h6>
                            </div>
                            <div className="col-2">
                                <button className="btn"
                                    style={{ float: 'right' }}
                                    variant="outlined"
                                    onClick={closeModalVerif}
                                >
                                    <Close />
                                </button>
                            </div>
                        </div>
                    </div>
                </Modal.Header>
                <Modal.Body>

                    <input variant='filled' className='form-control'
                        onChange={e => onChange(e)}
                        style={{ width: "100%" }}
                    />
                    <span className="text-danger" style={{fontSize: "12px"}}>{etat === 3 ? "Code invalide" : etat === 4 && "Ce champ ne doit être vdie"}</span>

                    <button onClick={confirmVerif} className='btn mt-2' style={{width: "100%"}}>
                        Vérifier
                    </button>

                </Modal.Body>
                <Modal.Footer style={{ paddingRight: "30px" }}>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default VerifCodeTransaction;