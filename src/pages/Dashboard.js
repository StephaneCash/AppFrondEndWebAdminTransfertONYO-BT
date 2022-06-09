import React from 'react'
import { Link, useLocation } from 'react-router-dom';

import Leftbar from "../components/Leftbar";
import NavBar from "../components/Navbar";
import { Card, CardContent } from '@material-ui/core';
import { Line, Bar } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';

import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import CoPresentIcon from '@mui/icons-material/CoPresent';
import AppsIcon from '@mui/icons-material/Apps';

import PublicIcon from '@mui/icons-material/Public';

import '../assets/Dashboard.css';
Chart.register(...registerables);

function Dashboard() {

    const location = useLocation();

    console.log('USER CONNECTED : ', location.state.data.nom)

    const data4 = {
        labels: ['Nov 01', 'Nov 02', 'Nov 03', 'Nov 04', 'Nov 05', 'Nov 06', 'Nov 07', "Dec 1", "Dec4", 'Dec 6', 'Dec 7', 'Dec 8', 'Dec 9', 'Jan 1'],
        datasets: [
            {
                label: 'Statistics',
                data: [21, 9, 3, 15, 2, 3, 6, 11, 9, 1, 2, 7, 8, 22],
                backgroundColor: [
                    'silver',
                ],
                borderColor: [
                    '#555',
                ],
                borderWidth: 1,
            },
        ],
    };

    const options2 = {
        scales: {
            y: {
                beginAtZero: true,
            }
        }
    };

    const data5 = {
        labels: ['Nov 01', 'Nov 02', 'Nov 03', 'Nov 04', 'Nov 05', 'Nov 06', 'Nov 07', 'Nov 08', 'Nov 09', 'Nov 10', 'Nov 11', 'Nov 12', 'Nov 13', 'Nov 14', 'Nov 15', 'Nov 16', 'Nov 17', 'Nov 18', 'Nov 19', 'Nov 20', 'Nov 21'],
        datasets: [
            {
                label: 'Transactions ',
                data: [19, 15, 14, 9, 8, 9, 11, 11, 12, 9, 5, 6, 5, 7, 8, 7, 5, 5, 4, 4, 2, 1, 4, 7, 5],
                fill: false,
                backgroundColor: 'silver',
                borderColor: 'red',
                width: "23px"
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            }
        }
    };

    return (
        <>
            <NavBar />

            <div className='col-12'>
                <div className='d-flex'>
                    <div className='col-2'><Leftbar /></div>
                    <div className='col-10 col10 dashboard' style={{ marginTop: '70px' }}>
                        <h4 className='mt-2' style={{ marginLeft: '10px' }}>Dashboard <AppsIcon id='AppIcon' />
                            <br />
                            <br />
                            Salut {location.state ? location.state.data.nom : ""} ,
                        </h4>
                        <div className='d-flex card1'>
                            <div className='col-3'>
                                <Card className="card">
                                    <div className='d-flex'>
                                        <div className='textCard'>
                                            <h6>
                                                <Link to='/transaction'>Transactions</Link>
                                            </h6>
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
                                            <CircleNotificationsIcon />
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </div>

                        <div className='d-flex card2'>
                            <div className='col-6'>
                                <Card className='card22'>
                                    <h5 style={{ marginLeft: '15px', marginTop: '10px' }}>Statistics</h5>
                                    <CardContent>
                                        <Bar data={data4} options={options2} />
                                    </CardContent>
                                </Card>
                            </div>
                            <div className='col-6'>
                                <Card className='card22'>
                                    <h5 style={{ marginLeft: '15px', marginTop: '10px' }}>Transactions Semestrielles</h5>
                                    <CardContent>
                                        <Line
                                            data={data5}
                                            options={options}
                                        />
                                    </CardContent>
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