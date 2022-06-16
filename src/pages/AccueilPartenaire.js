import React from 'react'
import Leftbar from '../components/Leftbar'
import Navbar from '../components/Navbar'
import '../assets/AccueilPartenaire.css'

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
                        <div className="col-12" style={{ marginTop: '80px' }}>
                            <div className='accueil'>
                                <div className='card'>
                                    <h6>Veuillez compléter les informations demandées ci-dessous.</h6>
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