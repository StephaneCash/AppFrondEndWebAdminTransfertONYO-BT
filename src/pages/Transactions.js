import React from 'react'
import Leftbar from '../components/Leftbar'
import Navbar from '../components/Navbar'
import '../assets/Transactions.css'
import { Card, TextField } from '@material-ui/core'
import { useEffect, useState } from 'react';
import axios from 'axios'
import { CheckCircleTwoTone, Delete, DoneAll, Pending, StopCircle } from '@mui/icons-material'
import { Edit, Info, AddCircle, Done, Close } from '@material-ui/icons'
import CancelScheduleSendIcon from '@mui/icons-material/CancelScheduleSend';
import { Button } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { NavLink } from 'react-router-dom'
import VerifCodeTransaction from '../dialogs/VerifCodeTransaction'
import Load from '../components/Load'

function Transactions() {

  const [data, setData] = useState([]);
  const [valSearch, setValSearch] = useState('');
  const [code, setCode] = useState('');
  const [id, setId] = useState('');
  const [valueInputCode, setValueInputCode] = useState('');

  const [etat, setEtat] = useState(0);
  const [showModalVerif, setShowModalVerif] = useState(false);

  const [verifInput, setVerifInput] = useState(false)

  const getAllTransaction = () => {
    axios.get("http://localhost:5000/api/transactions/all").then(res => {
      
      if (res.data.status === 200) {
        setData(res.data)
        console.log('result :: ', res.data)
      }
    }).catch(error => {
      console.log(error)
    })
  }

  

  const verifCode = (code, id) => {
    setCode(code);
    setId(id);
    setShowModalVerif(true);
    setEtat(1);
  }

  const onChange = (e) => {
    if (e.target.value === "") {
      setVerifInput(true)
    } else {
      setValueInputCode(e.target.value);
      setVerifInput(false)
    }
  }

  const confirmVerif = () => {
    if (verifInput) {
      setEtat(4);
    } else {
      if (code === valueInputCode) {
        setEtat(2);
        setShowModalVerif(false);
      } else {
        setEtat(3)
      }
    }
  }

  const closeModalVerif = () => {
    setShowModalVerif(false);
  }

  useEffect(() => {
    getAllTransaction()
  }, [])

  return (
    <div>
      <Navbar />

      <div className='col-12'>
        <div className='d-flex'>
          <div className='col-2'><Leftbar /></div>
          <div className='col-10' style={{ marginTop: '70px' }}>
            <div className='transaction'>
              <div className='d-flex'>
                <h4>Transactions <AttachMoneyIcon /></h4>
                <div className="addTransactionIcon">
                  <span className="textAddTransaction">Créer une transaction</span>
                  <NavLink to='addTransaction'>
                    <Button variant='outlined'>
                      <AddCircle className='iconAddTr' />
                    </Button>
                  </NavLink>
                </div>
              </div>

              <TextField type="search" label='Rechercher' variant='filled' style={{ marginRight: "25px" }}
                className="searchTransition mb-3" onChange={(e) => setValSearch(e.target.value)} />

              <Card className='card'>
                <table className='table table-striped table-borderless'>
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Code</th>
                      <th>Expéditeur</th>
                      <th>Dévise</th>
                      <th>Statut</th>
                      <th>Montant</th>
                      <th>Date création</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      data.data ?

                        data.data.filter(val => {
                          return val.exp_name.toLowerCase().includes(valSearch);
                        })
                          .map((val, key) => {
                            return (
                              <tr key={key}>
                                <td>{val.id}</td>
                                <td>
                                  {
                                    etat === 2 && id === val.id && code === valueInputCode ? val.content_code : "***************"
                                  }
                                </td>
                                <td>{val.exp_name}</td>

                                <td></td>
                                <td>
                                  {val.statut === 1 && <>En cours... <Pending style={{ color: 'orange' }} /> </>}
                                  {val.statut === 2 && <>En pause...<StopCircle style={{ color: 'blue', marginLeft: '10px' }} /></>}
                                  {val.statut === 3 && <>Effectuée. <CheckCircleTwoTone style={{ color: 'green', marginLeft: '11px' }} /></>}
                                  {val.statut === 0 && <>Bloquée. <Close style={{ color: "red", marginLeft: '20px' }} /></>}
                                </td>
                                <td>
                                  {etat === 2 && id === val.id && code === valueInputCode ? val.montant + " CDF" : "***********"}
                                </td>
                                <td>{val.createdAt}</td>
                                <td style={{ width: '120px' }}>
                                  <DoneAll style={{ fontSize: '20px', cursor: 'pointer' }}
                                    onClick={() => verifCode(val.content_code, val.id)} />
                                  <Edit style={{ fontSize: '20px' }} />
                                  <Info style={{ fontSize: '20px' }} />
                                  <CancelScheduleSendIcon style={{ fontSize: '20px' }} />
                                  <Delete style={{ fontSize: '20px' }} />
                                </td>
                              </tr>
                            )
                          })

                        : <tr className="textPasData">
                          <td colSpan='8px'>
                            <Load />
                          </td>
                        </tr>

                    }
                  </tbody>
                </table>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <VerifCodeTransaction
        show={showModalVerif}
        closeModal={closeModalVerif}
        confirmVerif={confirmVerif}
        onChange={onChange}
        etat={etat}
      />
    </div>
  )
}

export default Transactions