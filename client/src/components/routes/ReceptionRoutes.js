import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

function ReceptionRoutes({children}) {
    const user=useSelector(state => state.userReducer.currentUser)
    const token=localStorage.getItem('token')
    const role=user.role
  return (
    <>  {token && role==="reception"   ?children:<Navigate to="/" /> }</>
  )
}

export default ReceptionRoutes