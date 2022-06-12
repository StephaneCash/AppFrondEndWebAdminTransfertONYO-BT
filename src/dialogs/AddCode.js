import React from 'react'
import Leftbar from '../components/Leftbar'
import Navbar from '../components/Navbar'
import { Button, Card, TextField } from '@material-ui/core'
import { useState, useEffect } from "react";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { NavLink, useNavigate } from 'react-router-dom'
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import authHeader from '../auth/auth-header';
import swal from "sweetalert";
import axios from 'axios';


function AddCode() {

    return (
        <div>
            <Navbar />

            <div className='col-12'>
                <div className='d-flex'>
                    <div className='col-2'><Leftbar /></div>
                    <div className='col-10' style={{ marginTop: '70px' }}>
                        <div className='transaction'>
                            <NavLink to="/ressources">
                                <KeyboardBackspaceIcon /> Retour
                            </NavLink>
                            <h3 className="mt-3"> Créer un code
                            </h3>

                            <div className='col-12'>
                                <Card className="p-3 card">
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddCode