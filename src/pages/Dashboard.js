import React from 'react'

import Leftbar from "../components/Leftbar";
import NavBar from "../components/Navbar";

function Dashboard() {
    return (
        <>
            <NavBar />

            <div className='col-12'>
                <div className='d-flex'>
                    <div className='col-2'><Leftbar /></div>
                    <div className='col-10' style={{ marginTop: '70px' }}>Main</div>
                </div>
            </div>
        </>
    )
}

export default Dashboard