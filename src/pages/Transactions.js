import React from 'react'
import Leftbar from '../components/Leftbar'
import Navbar from '../components/Navbar'

function Transactions() {
  return (
    <div>
      <Navbar />

      <div className='col-12'>
        <div className='d-flex'>
          <div className='col-2'><Leftbar /></div>
          <div className='col-10 transaction' style={{ marginTop: '70px' }}>
            Transactions
          </div>
        </div>
      </div>
    </div>
  )
}

export default Transactions