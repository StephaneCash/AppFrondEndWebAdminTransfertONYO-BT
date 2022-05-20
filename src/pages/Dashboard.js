import React from 'react'

import Leftbar from "../components/Leftbar";
import NavBar from "../components/Navbar";
import { Card, CardContent } from '@material-ui/core';
import { Line, Bar } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';

import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import CoPresentIcon from '@mui/icons-material/CoPresent';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PublicIcon from '@mui/icons-material/Public';
import SoapIcon from '@mui/icons-material/Soap';

import '../assets/Dashboard.css';
Chart.register(...registerables);

function Dashboard() {

    const data4 = {
        labels: ['Nov 01', 'Nov 02', 'Nov 03', 'Nov 04', 'Nov 05', 'Nov 06', 'Nov 07'],
        datasets: [
            {
                label: 'Statistics',
                data: [2, 9, 3, 5, 2, 3, 6],
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
                data: [19, 15, 14, 9, 8, 9, 11, 11, 12, 9, 5, 6, 13, 7, 8, 12, 3, 12, 14, 14, 14, 11, 9, 7, 5],
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
                                            <CircleNotificationsIcon />
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </div>

                        <div className='d-flex card2'>
                            <div className='col-6'>
                                <Card className='card'>
                                    <CardContent>
                                        <h5>Statistics</h5>
                                    </CardContent>
                                    <CardContent>
                                        <Bar data={data4} options={options2} />
                                    </CardContent>
                                </Card>
                            </div>
                            <div className='col-6'>
                                <Card className='card'>
                                    <CardContent>
                                        <h5>Transactions Semestrielles</h5>
                                    </CardContent>
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