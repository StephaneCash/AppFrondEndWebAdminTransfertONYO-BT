import { Modal } from "react-bootstrap";
import "../assets/VerifCodeTransaction.css";
import { Close, Done } from '@material-ui/icons'


const AddCategory = (props) => {

    const closeModalVerif = props.close;
    const submitData = props.submitData;
    const onChange = props.onChange;
    const category = props.data;

    const { id, nom, description } = category;

    return (
        <div className="verifTransaction">
            <Modal show={props.show} style={{ marginTop: "80px" }}>
                <Modal.Header>
                    <div className="col-12">
                        <div className='d-flex'>
                            <div className="col-10">
                                <h5>{id ? 'Editer la catégoie ' + id : 'Ajout d\'une catégorie'}</h5>
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
                                id='nom'
                                type='test'
                                onChange={e => onChange(e)}
                                style={{ width: "100%", boxShadow: 'none' }}
                                value={nom}
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

export default AddCategory;