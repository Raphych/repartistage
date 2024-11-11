import { CCol, CFooter } from '@coreui/react'
import React from 'react'
const AppFooter = () => {
  return (
    <CFooter className='mt-4 pt-3'>
      <CCol className='col-12'>
        <p className="px-4 text-center">
          <small>Des Questions?<br/>raphnunez@gmail.com</small>
        </p>
      </CCol>
    </CFooter>
  )
}

export default React.memo(AppFooter)
