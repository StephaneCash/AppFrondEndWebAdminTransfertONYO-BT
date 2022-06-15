import React from 'react'
import Leftbar from '../components/Leftbar'
import Navbar from '../components/Navbar'

function AccueilPartenaire() {
    return (
        <>
            <div className='col-12'>
                <div className="d-flex">
                    <div className="col-2">
                        <Leftbar />
                    </div>
                    <div className="col-10">
                        <div className="col-12">
                            <Navbar />
                        </div>
                        <div className="col-12" style={{ marginTop: '80px', marginLeft:"10px" }}>
                            <h4>Bienvu(e) dans ONYO-BT, veuillez compléter quelques informations</h4>

                            <div className='col-4'>

                                <div className="form-group">
                                    <label>Entrer le nom</label>
                                    <input type="text" className="form-control" />
                                </div>

                                <div className="form-group">
                                    <label>Entrer le nom</label>
                                    <input type="text" className="form-control" />
                                </div>

                                <div className="form-group">
                                    <label>Entrer le nom</label>
                                    <input type="text" className="form-control" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AccueilPartenaire