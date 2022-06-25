import React from 'react'
import Leftbar from '../components/Leftbar'
import Navbar from '../components/Navbar'
import '../assets/Transactions.css'
import { Card } from '@material-ui/core'
import { useEffect, useState } from 'react';
import axios from 'axios'
import { Close, DoneAll } from '@mui/icons-material'
import { AddCircle, } from '@material-ui/icons'
import { Button, } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { NavLink } from 'react-router-dom'
import VerifCodeTransaction from '../dialogs/VerifCodeTransaction'
import Load from '../components/Load';
import authHeader from '../auth/auth-header';
import swal from "sweetalert";


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

  const [mt, setMt] = useState(0) // MONTANT RECUPERE DANS LA TABLE

  const verifCode = (code, id, montant) => {
    setCode(code);
    setId(id);
    setShowModalVerif(true);
    setEtat(1);
    setMt(montant)
  }

  const onChange = (e) => {
    if (e.target.value === "") {
      setVerifInput(true)
    } else {
      setValueInputCode(e.target.value);
      setVerifInput(false)
    }
  }

  const [comptes, setComptes] = useState([])

  const compte = JSON.parse(localStorage.getItem('data'));
  let idCompte = compte?.comptes[0]?.id

  const getComptes = () => {
    axios.get(`http://localhost:5000/api/comptes/${idCompte}`, { headers: authHeader() }).then(res => {
      setComptes(res.data)
    }).catch(err => {
      console.log(err)
    })
  }

  useEffect(() => {
    getComptes()
  }, [])

  const confirmVerif = () => {
    if (verifInput) {
      setEtat(4);
    } else {
      if (code === valueInputCode) {
        setEtat(2);
        setShowModalVerif(false);
        axios.put(`http://localhost:5000/api/comptes/${idCompte}`, { montant: parseInt(comptes?.data?.montant) + parseInt(mt) }, { headers: authHeader() }).then(res => {

        }).catch(err => {
          console.log('ERROR : ', err);
        })
        axios.put(`http://localhost:5000/api/transactions/${id}`, { statut: 1, }, { headers: authHeader() }).then(res => {
          getAllTransaction()
        }).catch(err => {
          console.log('ERROR : ', err);
        })
      } else {
        setEtat(3)
      }
    }
  }

  const debloquerTransaction = (id) => {
    swal({
      title: "Avertissement.",
      text: "Etes-vous sûr de vouloir débloquer cette transaction ?",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then((willDelete) => {
      if (willDelete) {
        axios.put(`http://localhost:5000/api/transactions/${id}`, { statut: 0 }, { headers: authHeader() }).then(res => {
          getAllTransaction()
        }).catch(err => {
          console.log('ERROR : ', err);
        })
        swal('Transaction débloquée avec succès', {
          icon: "success",
        });
      }
    }).catch((error) => {
      console.log(error);
    })
  }

  const stopperTransaction = (id) => {

    swal({
      title: "Avertissement.",
      text: "Etes-vous sûr de vouloir bloquer cette transaction ?",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then((willDelete) => {
      if (willDelete) {
        axios.put(`http://localhost:5000/api/transactions/${id}`, { statut: 3 }, { headers: authHeader() }).then(res => {
          getAllTransaction()
        }).catch(err => {
          console.log('ERROR : ', err);
        })
        swal('Transaction bloquée avec succès', {
          icon: "success",
        });
      }
    }).catch((error) => {
      console.log(error);
    })

  }

  const closeModalVerif = () => {
    setShowModalVerif(false);
  }

  useEffect(() => {
    getAllTransaction()
  }, [])

  const userIdGet = JSON.parse(localStorage.getItem('user'));
  const userId = userIdGet.id

  return (
    <div>

      <div className='col-12'>
        <div className="d-flex">
          <div className="col-2">
            <Leftbar />
          </div>
          <div className="col-10">
            <div className="col-12">
              <Navbar />
            </div>
            <div className="col-12" style={{ marginTop: '80px' }}>
              <div className='transaction'>

                <div className="card">
                  <div className="card-body">
                    <div className="d-flex">
                      <div style={{ marginRight: '10px' }}>
                        <h4>Transactions <i className="fa fa-usd"></i></h4>
                      </div>
                      <div style={{ marginRight: '10px' }}>
                        <input type="search" className="form-control" placeholder="Rechercher..." />
                      </div>

                      <NavLink to='addTransaction'>
                        <button className='btn btn-primary' style={{ cursor: 'pointer' }} >
                          Créer une transaction
                        </button>
                      </NavLink>
                    </div>
                  </div>
                </div>

                <div className='card mt-3'>
                  <table className='table table-borderless'>
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

                          data?.data.length ?

                            data.data.filter(val => {
                              return val.exp_name.toLowerCase().includes(valSearch) ? val.exp_name.toLowerCase().includes(valSearch) : "Aucune donnée trouvée."

                            }).map((val, key) => {
                              if (val.userId === userId) {
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
                                      {val.statut === 0 && <span style={{ color: 'orane' }}>En cours...</span>}
                                      {val.statut === 1 && <span style={{ color: 'green', }}>Effectuée. </span>}
                                      {val.statut === 3 && <span style={{ color: "red", }}>Bloquée. </span>}
                                    </td>
                                    <td>
                                      {etat === 2 && id === val.id && code === valueInputCode ? val.montant + " " + val.devise : "***********"}
                                    </td>
                                    <td>{val.createdAt}</td>
                                    <td style={{ maxWidth: '190px' }}>

                                      <div className="box">
                                        <input type='checkbox' id='checkbox' />

                                        <div className="menu">
                                          {val.statut === 3 ?
                                            <div className="menuItems" style={{ cursor: 'pointer' }} onClick={(e) => debloquerTransaction(val.id)}>
                                              <Close className="iconAction" />
                                              Débloquer
                                            </div> : <>
                                              {val.statut === 1 ? <span style={{ color: 'green', marginLeft: '7px', backgroundColor: 'green', color: 'white', padding: '5px', borderRadius: '5px' }}>
                                                Transaction effectuée</span> :
                                                <>
                                                  <div className="menuItems" onClick={() => verifCode(val.content_code, val.id, val.montant)} style={{ cursor: 'pointer' }}>
                                                    <DoneAll className="iconAction"
                                                    /> Vérifier
                                                  </div>

                                                  <div className="menuItems" style={{ cursor: 'pointer' }} onClick={(e) => stopperTransaction(val.id)}>
                                                    <Close className="iconAction" />
                                                    Stopper
                                                  </div>
                                                </>
                                              }

                                            </>
                                          }

                                        </div>
                                      </div>

                                    </td>
                                  </tr>
                                )
                              }
                            })

                            :
                            <tr className="textPasData">
                              <td colSpan='8px'>
                                Aucune transaction disponible
                              </td>
                            </tr>
                          :
                          data.length === '0' ? "Aucune donnée enregistrée."
                            : <tr className="textPasData">
                              <td colSpan='8px'>
                                <Load />
                              </td>
                            </tr>

                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >

      <VerifCodeTransaction
        show={showModalVerif}
        closeModal={closeModalVerif}
        confirmVerif={confirmVerif}
        onChange={onChange}
        etat={etat}
      />
    </div >
  )
}

export default Transactions