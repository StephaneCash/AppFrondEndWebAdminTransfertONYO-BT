import React from 'react'
import Leftbar from '../components/Leftbar'
import Navbar from '../components/Navbar'
import '../assets/Transactions.css'
import { Card } from '@material-ui/core'
import { useEffect, useState } from 'react';
import axios from 'axios'
import { Delete } from '@mui/icons-material'
import { Edit, Info } from '@material-ui/icons'
import CancelScheduleSendIcon from '@mui/icons-material/CancelScheduleSend';

function Transactions() {

  const [data, setData] = useState([]);


  console.log(data)

  const getAllTransaction = () => {
    axios.get("http://localhost:5000/api/transactions").then(res => {
      if (res.status === 200) {
        setData(res.data)
      }
    }).catch(error => {
      console.log(error)
    })
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
          <div className='col-10 transaction' style={{ marginTop: '70px' }}>
            <h4>Transactions</h4>

            <Card className='card'>
              <table className='table table-striped table-borderless'>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Code</th>
                    <th>Expéditeur</th>
                    <th>Dévise</th>
                    <th>Montant</th>
                    <th>Date création</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    data.data?.map((val, key) => {
                      return (
                        <tr key={key}>
                          <td>{val.id_trans}</td>
                          <td>{val.content_code}</td>
                          <td></td>
                          <td></td>
                          <td>{val.montant}</td>
                          <td></td>
                          <td style={{ width: '110px' }}>
                            <Edit style={{ fontSize: '20px' }} />
                            <Info style={{ fontSize: '20px' }} />
                            <CancelScheduleSendIcon style={{ fontSize: '20px' }} />
                            <Delete style={{ fontSize: '20px' }} />
                          </td>
                        </tr>
                      )
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

export default Transactions