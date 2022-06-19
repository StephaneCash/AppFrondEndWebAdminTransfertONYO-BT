import { Modal } from "react-bootstrap";
import "../assets/VerifCodeTransaction.css";
import { Close, Done } from '@material-ui/icons'


const AddPrix = (props) => {

    const closeModalVerif = props.close;
    const submitData = props.submitData;
    const onChange = props.onChange;
    const data = props.data;

    const { id, montant, description } = data;

    return (
        <div className="verifTransaction">
            <Modal show={props.show} style={{ marginTop: "80px" }}>
                <Modal.Header>
                    <div className="col-12">
                        <div className='d-flex'>
                            <div className="col-10">
                                <h5>{id ? 'Editer le prix ' + id : 'Ajout d\'un prix'}</h5>
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
                            <label>Entrer un montant</label>
                            <input className=' form-control mt-1'
                                placeholder="Entrer un montant"
                                id='montant'
                                type='number'
                                onChange={e => onChange(e)}
                                style={{ width: "100%", boxShadow: 'none' }}
                                value={montant}
                            />

                            <label className="mt-2">Entrer une description</label>
                            <textarea className=' form-control mt-1' placeholder="Entrer une description" id="description" value={description} onChange={e => onChange(e)} style={{ width: "100%", boxShadow: 'none' }}> </textarea>
                        </div>
                    </div>

                    <button className="btn"
                        onClick={submitData}
                        style={{
                            marginTop: '10px',
                            backgroundColor: "red", color: 'white', width: "100%",
                        }}>
                        {id ? "Editer" : "Ajouter"}
                    </button>

                </Modal.Body>
                <Modal.Footer style={{ paddingRight: "30px" }}>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default AddPrix;