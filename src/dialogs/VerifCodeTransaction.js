import { Modal } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles"
import { Button, TextField } from "@material-ui/core";
import "../assets/VerifCodeTransaction.css";
import { Close, Done } from '@material-ui/icons'


const useStyles = makeStyles((theme) => ({
    modal: {

    },
}))

const VerifCodeTransaction = (props) => {

    const closeModalVerif = props.closeModal;

    const confirmVerif = props.confirmVerif;
    const etat = props.etat;
    const onChange = props.onChange;

    const classes = useStyles();

    return (
        <div className="verifTransaction">
            <Modal show={props.show} className={classes.modal} style={{ marginTop: "80px" }}>
                <Modal.Header>
                    <div className="col-12">
                        <div className='d-flex'>
                            <div className="col-10">
                                <h5>Vérification de code</h5>
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

                    <TextField variant='outlined' className='mb-3'
                        placeholder="Entrer le code à vérifier"
                        helperText={etat === 3 ? "Code invalide" : ""}
                        onChange={e => onChange(e)}
                        style={{ width: "100%" }}
                    />

                    <Button variant='contained'
                        onClick={confirmVerif}
                        style={{
                            marginTop: '-5px',
                            backgroundColor: "#6363e0", color: 'white', width: "100%",
                        }}>
                        Vérifier
                    </Button>

                </Modal.Body>
                <Modal.Footer style={{ paddingRight: "30px" }}>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default VerifCodeTransaction;