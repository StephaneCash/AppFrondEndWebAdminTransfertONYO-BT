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
import { useNavigate } from 'react-router-dom'
import VerifCodeTransaction from '../dialogs/VerifCodeTransaction'

function Transactions() {

  const [data, setData] = useState([]);
  const [valSearch, setValSearch] = useState('');
  const [code, setCode] = useState('');
  const [id, setId] = useState('');
  const [valueInputCode, setValueInputCode] = useState('');

  const [etat, setEtat] = useState(0);
  const [showModalVerif, setShowModalVerif] = useState(false);

  const getAllTransaction = () => {
    axios.get("http://localhost:5000/api/transactions").then(res => {
      if (res.status === 200) {
        setData(res.data)
      }
    }).catch(error => {
      console.log(error)
    })
  }

  const navigate = useNavigate();

  const verifCode = (code, id) => {
    setCode(code);
    setId(id);
    setShowModalVerif(true);
  }

  const onChange = (e) => {
    setValueInputCode(e.target.value);
  }

  const confirmVerif = () => {
    if (code === valueInputCode) {
      setEtat(2);
      setShowModalVerif(false);
    } else {
      setEtat(3)
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
                  <Button variant='outlined' onClick={() => navigate('/addTransaction')}>
                    <AddCircle className='iconAddTr' />
                  </Button>
                </div>
              </div>

              <TextField type="search" placeholder='Rechercher' variant='outlined' style={{ marginRight: "25px" }}
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
                                <td>{val.id_trans}</td>
                                <td>
                                  {
                                    etat === 2 && id === val.id_trans && code === valueInputCode ? val.content_code : "***************"
                                  }
                                </td>
                                <td>{val.exp_name}</td>

                                <td></td>
                                <td>
                                  {val.statut === 1 && <>`En cours...` <Pending style={{ color: 'orange' }} /> </>}
                                  {val.statut === 2 && <>En pause...<StopCircle style={{ color: 'blue', marginLeft: '10px' }} /></>}
                                  {val.statut === 3 && <>Effectuée. <CheckCircleTwoTone style={{ color: 'green', marginLeft: '11px' }} /></>}
                                  {val.statut === 0 && <>Bloquée. <Close style={{ color: "red", marginLeft: '20px' }} /></>}
                                </td>
                                <td>
                                  {etat === 2 && id === val.id_trans && code === valueInputCode ? val.montant : "***********"}
                                </td>
                                <td>{val.dateCreate}</td>
                                <td style={{ width: '120px' }}>
                                  <DoneAll style={{ fontSize: '20px', cursor: 'pointer' }}
                                    onClick={() => verifCode(val.content_code, val.id_trans)} />
                                  <Edit style={{ fontSize: '20px' }} />
                                  <Info style={{ fontSize: '20px' }} />
                                  <CancelScheduleSendIcon style={{ fontSize: '20px' }} />
                                  <Delete style={{ fontSize: '20px' }} />
                                </td>
                              </tr>
                            )
                          })

                        : <tr className="textPasData">
                          <td colSpan='8px'>Pas de données disponibles.</td>
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