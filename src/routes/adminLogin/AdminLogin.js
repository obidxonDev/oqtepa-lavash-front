import React, { useState } from 'react'
import './AdminLogin.css'
import axios from '../../api'
import { useNavigate } from 'react-router-dom'

function AdminLogin() {

  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const nav = useNavigate()

  function handleLogin(e) {
    setLoading(true)
    e.preventDefault()
    axios.post("/admin/login", {login, password})
      .then(res => {
        console.log(res);
        if(res.data.innerData){
          localStorage.setItem("auth-token", res.data.innerData.token)
          setErrMsg('')
          nav("/admin")
        }
      })
      .catch(err => { 
        setErrMsg(err.response.data.msg)
      })
      .finally(() => setLoading(false))
  }

  return (
    <div className='admin__login__container'>
      <div className="admin__login__box">
         <h2>Tizimga Kirish</h2>
         {errMsg && <p style={{color: 'red'}}>{errMsg}</p>}
         <form action="" onSubmit={handleLogin}>
            <input type="text" required placeholder='Login' value={login} onChange={e => setLogin(e.target.value)}/>
            <input type="text" required placeholder='Password' value={password} onChange={e => setPassword(e.target.value)}/> 
            <button disabled={loading}> {loading ? "Loading..." : "Login"} </button> 
         </form>
      </div>
    </div>
  )
}

export default AdminLogin