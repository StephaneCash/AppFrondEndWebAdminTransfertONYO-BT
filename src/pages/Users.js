import React from 'react'
import Leftbar from '../components/Leftbar'
import Navbar from '../components/Navbar'
import '../assets/Users.css'

function Users() {

    return (
        <div>
            <Navbar />

            <div className='col-12'>
                <div className='d-flex'>
                    <div className='col-2'><Leftbar /></div>
                    <div className='col-10' style={{ marginTop: '70px' }}>

                        <div className='users'>
                            <h3>Users</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Users