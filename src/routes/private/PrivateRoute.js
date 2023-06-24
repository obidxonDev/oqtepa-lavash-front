import React from 'react'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'

function PrivateRoute() {
  const auth = localStorage.getItem("auth-token")
  return auth ? 
  <Outlet/>
  :
  <Routes>
    <Route path='*' element={<Navigate replace to="/login" />}/>
  </Routes> 
}

export default PrivateRoute