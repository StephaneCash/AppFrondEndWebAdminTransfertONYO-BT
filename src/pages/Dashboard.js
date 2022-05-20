import React from 'react'

import Leftbar from "../components/Leftbar";
import NavBar from "../components/Navbar";
import { Card } from '@material-ui/core';

import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import CoPresentIcon from '@mui/icons-material/CoPresent';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PublicIcon from '@mui/icons-material/Public';
import SoapIcon from '@mui/icons-material/Soap';

import '../assets/Dashboard.css';

function Dashboard() {
    return (
        <>
            <NavBar />

            <div className='col-12'>
                <div className='d-flex'>
                    <div className='col-2'><Leftbar /></div>
                    <div className='col-10 col10 dashboard' style={{ marginTop: '70px' }}>
                        <div className='d-flex card1'>
                            <div className='col-3'>
                                <Card className="card">
                                    <div className='d-flex'>
                                        <div className='textCard'>
                                            <h6>Transactions</h6> 
                                            <hr />
                                            <h4>12</h4>
                                        </div>
                                        <div className='iconCard'>
                                            <AttachMoneyIcon />
                                        </div>
                                    </div>
                                </Card>
                            </div>
                            <div className='col-3'>
                                <Card className="card">
                                    <div className='d-flex'>
                                        <div className='textCard'>
                                            <h6>Clients</h6> 
                                            <hr />
                                            <h4>17</h4>
                                        </div>
                                        <div className='iconCard'>
                                            <CoPresentIcon />
                                        </div>
                                    </div>
                                </Card>
                            </div>
                            <div className='col-3'>
                                <Card className="card">
                                    <div className='d-flex'>
                                        <div className='textCard'>
                                            <h6>Parténaires</h6>
                                            <hr />
                                            <h4>6</h4>
                                        </div>
                                        <div className='iconCard'>
                                            <PublicIcon />
                                        </div>
                                    </div>
                                </Card>
                            </div>

                            <div className='col-3'>
                                <Card className="card">
                                    <div className='d-flex'>
                                        <div className='textCard'>
                                            <h6>Notifications</h6>
                                            <hr />
                                            <h4>2</h4>
                                        </div>
                                        <div className='iconCard'>
                                            <CircleNotificationsIcon/>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard