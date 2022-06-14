import React, { useEffect, useState } from 'react'
import Leftbar from '../components/Leftbar'
import Navbar from '../components/Navbar'
import axios from 'axios';
import '../assets/Ressources.css';
import authHeader from '../auth/auth-header';
import { Button, Card } from '@material-ui/core';
import Load from '../components/Load';
import { Delete } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import AddCode from '../dialogs/AddCode';
import swal from "sweetalert";


function Partenaires() {

    const [data, setData] = useState([]);

    const getAllPartenaires = () => {
        axios.get('http://localhost:5000/api/partenaires/v1/categories', { headers: authHeader() }).then(res => {
            setData(res.data.data)
        })
    }

    useEffect(() => {
        getAllPartenaires()
    }, [])

    console.log(data)

    return (
        <div>
            <Navbar />

            <div className='col-12'>
                <div className='d-flex'>
                    <div className='col-2'><Leftbar /></div>
                    <div className='col-10 ressources' style={{ marginTop: '70px' }}>
                        0 Partenaires trouvés

                        <Card>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Nom</th>
                                        <th>Catégorie</th>
                                        <th>Description</th>
                                        <th>Options</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map((val, index) => {
                                            <tr>
                                                <td>{index}</td>
                                                <td>{val.nom}</td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </table>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Partenaires