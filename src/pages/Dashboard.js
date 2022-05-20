import React from 'react'

import Leftbar from "../components/Leftbar";
import NavBar from "../components/Navbar";
import { Card } from '@material-ui/core';

import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import '../assets/Dashboard.css';

function Dashboard() {
    return (
        <div className="dashboard">
            <NavBar />

            <div className='col-12'>
                <div className='d-flex'>
                    <div className='col-2'><Leftbar /></div>
                    <div className='col-10 col10' style={{ marginTop: '70px' }}>
                        <div className='d-flex card1'>
                            <div className='col-3'>
                                <Card className="card">
                                    <div className='d-flex'>
                                        <div className='textCard'>Transactions</div>
                                        <div className='iconCard'>
                                            <AttachMoneyIcon />
                                        </div>
                                    </div>
                                </Card>
                            </div>
                            <div className='col-3'>
                                <Card className="card">1</Card>
                            </div>
                            <div className='col-3'>
                                <Card className="card">1</Card>
                            </div>

                            <div className='col-3'>
                                <Card className="card">1</Card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard