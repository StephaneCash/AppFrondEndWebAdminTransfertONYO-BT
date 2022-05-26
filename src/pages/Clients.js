import React from 'react'
import Leftbar from '../components/Leftbar'
import Navbar from '../components/Navbar'

function Clients() {
    return (
        <div>
            <Navbar />

            <div className='col-12'>
                <div className='d-flex'>
                    <div className='col-2'><Leftbar /></div>
                    <div className='col-10 transaction' style={{ marginTop: '70px' }}>
                        Clients
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Clients