import React from 'react'
import Leftbar from '../components/Leftbar'
import Navbar from '../components/Navbar'
import '../assets/Transactions.css'
import { Card, TextField } from '@material-ui/core'
import { useEffect, useState } from 'react';
import axios from 'axios'
import { Close, Delete, DoneAll, Pending, StopCircle } from '@mui/icons-material'
import { Edit, Info, AddCircle, } from '@material-ui/icons'
import { Button, } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MoreVert from '@mui/icons-material/MoreVert';
import { NavLink } from 'react-router-dom'
import VerifCodeTransaction from '../dialogs/VerifCodeTransaction'
import Load from '../components/Load';
import authHeader from '../auth/auth-header';

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
    axios.get("http://localhost:5000/api/transactions/v1/categories", { headers: authHeader() }).then(res => {
      if (res.data) {
        setData(res.data)
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
        axios.put(`http://localhost:5000/api/transactions/${id}`, { statut: 1 }, { headers: authHeader() }).then(res => {
          getAllTransaction()
        }).catch(err => {
          console.log('ERROR : ', err);
        })
      } else {
        setEtat(3)
      }
    }
  }

  // Mettre à jour une transaction

  const handleUpdateTransaction = (id) => {
    alert(id)
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

              <TextField type="search" label='Rechercher'
                className="searchTransition mb-3" onChange={(e) => setValSearch(e.target.value)} />

              <Card className='card'>
                <table className='table table-striped table-borderless'>
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Code</th>
                      <th>Bénéficiaire</th>
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
                          return (
                            val.exp_name.toLowerCase().includes(valSearch) ? val.exp_name.toLowerCase().includes(valSearch) : "Aucune donnée trouvée."
                          )
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
                                <td>
                                  {val.statut === 0 && <span style={{ color: 'orange', fontWeight: 'bold' }}>En cours...</span>}
                                  {val.statut === 2 && <span style={{ color: 'blue', fontWeight: 'bold' }}>En pause.</span>}
                                  {val.statut === 1 && <span style={{ color: 'green', fontWeight: 'bold' }}>Effectuée. </span>}
                                  {val.statut === 3 && <span style={{ color: "red", fontWeight: 'bold' }}>Bloquée. </span>}
                                </td>
                                <td>
                                  {etat === 2 && id === val.id && code === valueInputCode ? val.montant + " " + val.devise : "***********"}
                                </td>
                                <td>{val.createdAt}</td>
                                <td style={{ maxWidth: '350px' }}>

                                  <div className="box">
                                    <input type='checkbox' id='checkbox' />

                                    <div className="menu">
                                      <div className="menuItems" onClick={() => verifCode(val.content_code, val.id)} style={{ cursor: 'pointer' }}>
                                        <DoneAll className="iconAction"
                                        /> Vérifier
                                      </div>
                                      <div className="menuItems" style={{ cursor: 'pointer' }} onClick={() => handleUpdateTransaction(val.id)}>
                                        <Edit className="iconAction" />
                                        Editer
                                      </div>
                                      <div className="menuItems" style={{ cursor: 'pointer' }}>
                                        <Close className="iconAction" />
                                        Stopper
                                      </div>
                                      <div className="menuItems" style={{ cursor: 'pointer' }}>
                                        <Delete className="iconAction" /> Supprimer
                                      </div>

                                    </div>
                                  </div>

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